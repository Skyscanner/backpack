# M4: Components as Nx Projects

**Priority**: P2
**Est. Effort**: Very Low
**Complexity**: Small
**Status**: Required

## Overview

Register each Backpack component as an Nx project by adding `project.json` and appropriate TypeScript configuration files.

## Why This Milestone?

### Strategic Context

Nx's power comes from understanding the project graph. By registering each component as a discrete project, we enable:

- **`nx affected`**: Only run tasks on changed projects and their dependents
- **Computation caching**: Skip work that hasn't changed
- **Precise dependency analysis**: Know exactly which projects depend on which
- **Task orchestration**: Run builds/tests in correct order based on dependencies

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Create `project.json` for each component | Registers the component with Nx so it appears in `nx show projects` and can be targeted by commands |
| Create `tsconfig.json` files | Enables TypeScript project references, allowing incremental compilation and better IDE support |
| Verify `nx show projects` | Confirms all ~92 components are recognized by Nx |
| Test `nx affected` | Validates that changing one component correctly identifies it and its dependents |
| Verify TypeScript compilation | Ensures project references don't break existing `.d.ts` generation or build output |

### What Happens If We Skip This?

Without project registration:
- `nx affected` won't know which projects changed
- No per-project caching benefits
- Cannot use `nx run <project>:<target>` syntax
- Module boundary enforcement (M6) won't work

### The Math: Why This Matters

With ~92 components, running all tests takes O(92) time. With `nx affected`:
- Change 1 component → test ~1-5 projects (dependents)
- **~90% reduction** in CI time for typical PRs

---

## User Story

As a Backpack maintainer, I want each component to be recognized as an Nx project so that I can use `nx affected` to only run tasks on changed projects, improving CI performance.

---

## Acceptance Scenarios

1. **Given** the component folders, **When** `project.json` files are created, **Then** each component is registered as an Nx project

2. **Given** projects are registered, **When** `nx show projects` is run, **Then** all ~92 components are listed

3. **Given** a component is modified, **When** `nx affected --target=test` is run, **Then** only that component and its dependents are tested

4. **Given** projects have tsconfig files, **When** TypeScript is compiled, **Then** project references work correctly

---

## Verification Criteria

- [ ] Every component has a `project.json`
- [ ] Every project has `tsconfig.json`, `tsconfig.lib.json`, and `tsconfig.spec.json`
- [ ] `nx show projects` lists all components
- [ ] `nx affected` correctly identifies changed projects
- [ ] TypeScript project references in sync

---

## Project Structure

Each component will have:

```
packages/bpk-component-button/
├── project.json           ← NEW: Nx project config
├── tsconfig.json          ← NEW: Base TypeScript config
├── tsconfig.lib.json      ← NEW: Library compilation config
├── tsconfig.spec.json     ← NEW: Test compilation config
└── src/
    └── ...
```

### Example `project.json`

```json
{
  "name": "bpk-component-button",
  "sourceRoot": "packages/bpk-component-button/src",
  "projectType": "library",
  "tags": ["scope:component", "type:ui"]
}
```

---

## Technical Considerations

| Consideration | Challenge | Solution |
|---------------|-----------|----------|
| `composite: true` | May conflict with Babel transpilation | Test incrementally; may need custom tsconfig |
| `.d.ts` generation | Project references might change output paths | Verify dist output matches current structure |
| Circular dependencies | May be exposed by project graph | Address in M6 or fix during this milestone |

---

## Automation Options

**Manual**: Create files by hand (tedious for 92 projects)

**Scripted**: Generate `project.json` and tsconfig files programmatically:
```bash
# Pseudocode
for dir in packages/bpk-*; do
  generate_project_json "$dir"
  generate_tsconfigs "$dir"
done
```

**Nx Generator**: Use `nx generate @nx/workspace:library` (may need customization)

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| TypeScript `composite: true` breaks build | No `.d.ts` files generated | Test with composite disabled first |
| Circular dependencies exposed | Nx graph analysis fails | Fix cycles or mark as allowed temporarily |
| Inconsistent project.json structure | Some projects missing targets | Use template and automation |

---

## Rollback Plan

If issues arise:
1. Remove all `project.json` files
2. Remove new `tsconfig.*.json` files
3. Components remain unregistered with Nx (basic init still works)

---

## Dependencies

- M1: Nx Initialization
- M2: Project Structure Confirmation
- M3: Storybook Colocation (recommended before, not blocking)

## Blocks

- M5: Static Checks via Nx (needs projects registered)
- M6: Module Boundaries (needs projects with tags)
