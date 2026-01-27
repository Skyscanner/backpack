# M6: Module Boundaries Configuration

**Priority**: P3
**Est. Effort**: Low
**Complexity**: Small
**Status**: Required

## Overview

Configure Nx module boundaries to enforce architectural rules, preventing incorrect dependencies between components.

## Why This Milestone?

### Strategic Context

As codebases grow, it's easy for dependencies to become tangled. Module boundaries enforce rules like:

- "A component should not depend on Storybook-only code"
- "Shared utilities should not depend on specific components"
- "Internal helpers should not be imported by other packages"

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Assign tags to projects | Tags categorize projects (e.g., `scope:component`, `type:util`) so rules can reference them |
| Configure ESLint rule | `@nx/enforce-module-boundaries` checks imports against the rules at lint time |
| Define boundary rules | Specifies which tags can depend on which other tags |
| Verify current code passes | Ensures existing imports don't violate the new rules (or documents exceptions) |
| Document rules | Helps developers understand why certain imports are disallowed |

### What Happens If We Skip This?

Without module boundaries:
- Components may accidentally import from incorrect packages
- Circular dependencies can creep in undetected
- Code review becomes the only defense against bad imports
- Dependency graph becomes increasingly tangled over time

### Example Boundary Violations

| Violation | Why It's Bad |
|-----------|--------------|
| `bpk-button` imports from `bpk-card` internals | Creates hidden coupling; breaking changes cascade |
| `bpk-mixins` imports from `bpk-button` | Utility should not depend on consumer |
| Component imports from `examples/` | Test code leaked into production |

---

## User Story

As a Backpack architect, I want to enforce module boundaries so that components cannot incorrectly depend on each other, maintaining clean architecture and enabling accurate dependency analysis.

---

## Acceptance Scenarios

1. **Given** Nx projects with tags, **When** ESLint `@nx/enforce-module-boundaries` rule is configured, **Then** invalid imports are flagged as errors

2. **Given** boundary rules exist, **When** a component imports from a forbidden domain, **Then** lint fails with clear error message

3. **Given** boundary rules exist, **When** all current imports are valid, **Then** lint passes without violations

---

## Verification Criteria

- [ ] All projects have appropriate tags in `project.json`
- [ ] `.eslintrc` includes `@nx/enforce-module-boundaries` rule
- [ ] Invalid imports produce lint errors
- [ ] Current codebase passes boundary checks
- [ ] Documentation explains boundary rules

---

## Tag Taxonomy

| Tag | Applied To | Description |
|-----|------------|-------------|
| `scope:component` | `bpk-component-*` | Public UI components |
| `scope:util` | `bpk-mixins`, `bpk-stylesheets` | Shared utilities |
| `scope:internal` | Internal helpers | Not for external use |
| `type:ui` | Visual components | Renders UI |
| `type:logic` | Non-visual utilities | Pure logic/data |
| `type:config` | Configuration packages | Build/tooling config |

---

## Example Rules Configuration

In `.eslintrc`:
```json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:component",
            "onlyDependOnLibsWithTags": ["scope:component", "scope:util"]
          },
          {
            "sourceTag": "scope:util",
            "onlyDependOnLibsWithTags": ["scope:util"]
          },
          {
            "sourceTag": "scope:internal",
            "onlyDependOnLibsWithTags": ["scope:internal", "scope:util"]
          }
        ]
      }
    ]
  }
}
```

---

## Handling Existing Violations

If current code violates the rules:

1. **Fix the violation**: Refactor to comply
2. **Allow exception**: Add to `allowCircularSelfDependency` or specific exception
3. **Refactor later**: Mark with TODO and add to tech debt backlog

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Existing violations block merge | CI fails on every PR | Audit current imports first; allow exceptions initially |
| Over-restrictive rules | Legitimate imports blocked | Start permissive, tighten over time |
| Developer confusion | Invalid PRs submitted | Document rules clearly; helpful error messages |

---

## Rollback Plan

If issues arise:
1. Disable `@nx/enforce-module-boundaries` rule temporarily
2. Address violations in subsequent PRs
3. Re-enable rule once violations are fixed

---

## Dependencies

- M4: Components as Nx Projects (needs projects with tags)
- M5: Static Checks via Nx (lint infrastructure must work)

## Blocks

- None (this is a leaf milestone)
