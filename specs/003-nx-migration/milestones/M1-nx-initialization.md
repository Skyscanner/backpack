# M1: Nx Initialization

**Priority**: P1 (Critical Path)
**Est. Effort**: Very Low
**Complexity**: Small
**Status**: Required

## Overview

Initialize an Nx workspace in the existing Backpack repository to enable task orchestration, caching, and dependency graph features.

## Why This Milestone?

### Strategic Context

Nx has been selected as Skyscanner Web's strategic monorepo tooling. Initializing Nx in Backpack is the first step toward:

- **Faster CI/CD**: Leveraging Nx's computation caching and affected commands
- **Better DX**: Visualizing the dependency graph and understanding project relationships
- **Future-proofing**: Aligning with the broader Skyscanner web ecosystem

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Run `npx nx@latest init` | This is Nx's official bootstrapping command that analyzes existing workspace tooling and creates appropriate configuration |
| Verify `nx.json` created | Confirms Nx is properly initialized and can recognize the workspace |
| Test `nx graph` | Validates that Nx can analyze the project structure and dependencies |
| Verify existing scripts work | **Critical**: Ensures zero disruption to current workflows - developers and CI continue working unchanged |
| CI pipeline passes | Confirms the change is production-safe and can be merged |

### What Happens If We Skip This?

Without Nx initialization, we cannot:
- Use `nx affected` to run only changed projects
- Enable computation caching
- Enforce module boundaries
- Visualize the dependency graph

This is the **foundation** for all subsequent milestones.

---

## User Story

As a Backpack maintainer, I want to initialize an Nx workspace in the existing repository so that I can start leveraging Nx's task orchestration, caching, and dependency graph features incrementally.

---

## Acceptance Scenarios

1. **Given** the Backpack repository, **When** `npx nx@latest init` is run, **Then** an `nx.json` configuration file is created at the root

2. **Given** Nx is initialized, **When** `nx graph` is executed, **Then** a dependency visualization is displayed

3. **Given** Nx is initialized, **When** existing `npm run build` is executed, **Then** the build completes successfully as before

4. **Given** Nx is initialized, **When** CI workflows run, **Then** all existing tests and checks pass without modification

---

## Verification Criteria

- [ ] `nx.json` exists at repository root
- [ ] `nx graph` command produces output
- [ ] All existing `npm run` scripts work unchanged
- [ ] CI pipeline passes (no breaking changes)
- [ ] No changes to consumer import paths

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Nx plugin peer dependency conflicts | CI/local build failures | Review dependency tree before committing; test in isolated branch |
| TypeScript `composite: true` conflicts | Build errors, missing `.d.ts` files | Keep composite disabled initially; investigate in separate spike if needed |

---

## Rollback Plan

If issues arise:
1. Revert the commit that adds `nx.json` and related config
2. Remove `nx` from `devDependencies`
3. CI and local development return to previous state

---

## Dependencies

- None (this is the first milestone)

## Blocks

- M2: Project Structure Confirmation
- M3: Storybook Colocation
- M4: Components as Nx Projects
- M5: Static Checks via Nx
- M6: Module Boundaries
