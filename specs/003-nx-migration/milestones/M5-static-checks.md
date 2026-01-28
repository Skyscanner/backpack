# M5: Static Checks via Nx

**Priority**: P2
**Est. Effort**: Low
**Complexity**: Small
**Status**: Required

## Overview

Configure all static checks (linting, testing, type checking) to run through Nx, enabling incremental execution and computation caching.

## Why This Milestone?

### Strategic Context

This is where the **real productivity gains** of Nx adoption are realized. By running tasks through Nx:

- **Caching**: If nothing changed, skip the work entirely
- **Affected**: Only run tasks on changed projects
- **Parallelization**: Run independent tasks concurrently
- **Orchestration**: Run tasks in correct dependency order

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Define `lint` target | ESLint runs per-project, enabling affected and cached linting |
| Define `test` target | Jest runs per-project, enabling affected and cached testing |
| Define `typecheck` target | TypeScript checks per-project, enabling incremental type checking |
| Update CI to use `nx affected` | **The payoff**: CI only runs what changed, dramatically reducing build times |
| Verify caching works | Confirms that repeated runs use cached results |

### What Happens If We Skip This?

Without Nx-powered static checks:
- CI continues running all tests for every PR
- No caching benefits
- All the work in M1-M4 provides minimal value
- Developer feedback remains slow

### Expected CI Time Improvement

| Scenario | Before (npm run) | After (nx affected) | Improvement |
|----------|------------------|---------------------|-------------|
| Change 1 component | ~10 min (all tests) | ~1-2 min (affected only) | **80-90%** |
| Change shared util | ~10 min (all tests) | ~5-8 min (dependents) | **20-50%** |
| No changes (cache hit) | ~10 min | ~30 sec (cached) | **95%+** |

---

## User Story

As a Backpack maintainer, I want all static checks (linting, testing, type checking) to run through Nx so that I can leverage incremental execution and caching for faster CI feedback.

---

## Acceptance Scenarios

1. **Given** Nx projects exist, **When** `nx run-many --target=lint` is executed, **Then** ESLint runs for all projects

2. **Given** Nx projects exist, **When** `nx run-many --target=test` is executed, **Then** Jest runs for all projects

3. **Given** Nx projects exist, **When** `nx run-many --target=typecheck` is executed, **Then** TypeScript type checking runs

4. **Given** CI workflow is updated, **When** `nx affected` replaces `npm run`, **Then** only changed projects are processed

5. **Given** caching is enabled, **When** the same task runs twice, **Then** the second run uses cached results

---

## Verification Criteria

- [ ] `nx run-many --target=lint` works for all projects
- [ ] `nx run-many --target=test` works for all projects
- [ ] `nx run-many --target=typecheck` works for all projects
- [ ] `nx run-many --target=storybook` works
- [ ] GitHub Actions updated to use `nx affected` or `nx run-many`
- [ ] Caching produces identical artifacts
- [ ] README updated with new commands

---

## Configuration Changes

### Project-Level Targets (in each `project.json`)

```json
{
  "targets": {
    "lint": {
      "executor": "@nx/eslint:lint",
      "options": {
        "lintFilePatterns": ["packages/bpk-component-button/**/*.{ts,tsx}"]
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "packages/bpk-component-button/jest.config.ts"
      }
    },
    "typecheck": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsc -p packages/bpk-component-button/tsconfig.lib.json --noEmit"
      }
    }
  }
}
```

### CI Workflow Changes

**Before**:
```yaml
- run: npm run lint
- run: npm run test
- run: npm run typecheck
```

**After**:
```yaml
- run: npx nx affected --target=lint --base=origin/main
- run: npx nx affected --target=test --base=origin/main
- run: npx nx affected --target=typecheck --base=origin/main
```

---

## Caching Configuration

In `nx.json`:
```json
{
  "targetDefaults": {
    "lint": {
      "cache": true
    },
    "test": {
      "cache": true,
      "inputs": ["default", "^default", "{workspaceRoot}/jest.config.ts"]
    },
    "typecheck": {
      "cache": true
    }
  }
}
```

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cache invalidation issues | Stale test results | Verify cache inputs include all relevant files |
| Jest config incompatibility | Tests fail to run | Test Jest executor locally first |
| Affected command misses changes | False negatives in CI | Verify dependency graph accuracy |

---

## Rollback Plan

If issues arise:
1. Keep `nx affected` in CI but add fallback to `npm run` on failure
2. Or revert CI changes and run full suite

---

## Dependencies

- M1: Nx Initialization
- M4: Components as Nx Projects (targets need projects)

## Blocks

- M6: Module Boundaries (lint infrastructure must work)
