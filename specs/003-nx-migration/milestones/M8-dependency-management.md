# M8: Dependency Management

**Priority**: P3
**Est. Effort**: Medium
**Complexity**: Medium
**Status**: ⚠️ OPTIONAL

> **Note**: This milestone is optional and can be deferred if time-constrained. It addresses Production Standard compliance but is not required for core Nx functionality.

## Overview

Restructure dependencies to comply with the TypeScript Monorepo Production Standard, where each library declares its actual dependencies.

## Why This Milestone?

### Strategic Context

Currently, all dependencies are declared in a single `packages/package.json` shared by all components. The Production Standard requires:

- Shared dependencies in root `package.json`
- Component-specific dependencies in component `package.json`
- `@nx/dependency-checks` ESLint rule to verify correctness

### Why We Need Each Step

| Step | Why It's Needed |
|------|-----------------|
| Audit component imports | Identifies which dependencies each component actually uses |
| Restructure to root | Shared dependencies move to root for Dependabot and hoisting |
| Add per-component deps | Each component's `package.json` lists only what it imports |
| Enable dependency checks | ESLint rule catches missing or extraneous dependencies |
| Configure Dependabot | Automated updates target the correct `package.json` files |

### What Happens If We Skip This?

Without dependency management:
- Production Standard compliance is not met
- Dependency audits may miss unused or missing packages
- Future independent publishing would require this work anyway
- `@nx/dependency-checks` cannot be enabled

### Why It's Optional

This milestone is marked optional because:
- Core Nx functionality (affected, caching) works without it
- Significant refactoring effort (~4 weeks estimated)
- Current dependency structure works for single-package publishing
- Can be done in a future phase when time permits

---

## User Story

As a Backpack maintainer, I want dependencies to comply with the TypeScript Monorepo Production Standard so that each library declares its actual dependencies and CI can verify correctness.

---

## Acceptance Scenarios

1. **Given** current `packages/package.json`, **When** dependencies are audited, **Then** each component's actual imports are identified

2. **Given** audit results, **When** dependencies are restructured, **Then** shared deps are in root `package.json` and component-specific deps in component `package.json`

3. **Given** restructured dependencies, **When** `@nx/dependency-checks` runs, **Then** no violations are reported

4. **Given** Dependabot is configured, **When** updates are proposed, **Then** they target root `package.json`

---

## Verification Criteria

- [ ] Dependency audit completed
- [ ] Root `package.json` contains shared production dependencies
- [ ] `@nx/dependency-checks` ESLint rule enabled
- [ ] No dependency violations in CI
- [ ] Dependabot configured for root only
- [ ] `npm ci` succeeds
- [ ] `nx dep-graph` shows accurate dependencies

---

## Current vs Target Structure

**Current**:
```
package.json              ← devDependencies only
packages/package.json     ← ALL production dependencies
packages/bpk-component-button/
  └── (no package.json)
```

**Target**:
```
package.json              ← devDependencies + shared production deps
packages/bpk-component-button/
  └── package.json        ← component-specific dependencies
```

---

## Migration Steps

1. **Audit**: Script to extract imports from each component
   ```bash
   # Pseudocode
   for component in packages/bpk-*; do
     extract_imports "$component" > "$component/deps.txt"
   done
   ```

2. **Classify**: Determine which deps are shared vs component-specific
   - Shared: `react`, `prop-types`, `classnames`
   - Component-specific: `@popperjs/core` (only used by tooltip/popover)

3. **Restructure**: Move deps to appropriate `package.json` files

4. **Verify**: Run `npm ci` and all tests

---

## Risks to Monitor

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing dependency | Runtime error in production | Thorough testing; gradual rollout |
| Duplicate versions | Bundle bloat | Use `npm dedupe`; configure hoisting |
| Complex merge conflicts | Slows development | Do in single sprint; communicate with team |

---

## Rollback Plan

If issues arise:
1. Revert to single `packages/package.json`
2. Disable `@nx/dependency-checks` rule
3. Revisit in future phase

---

## Dependencies

- M4: Components as Nx Projects (components need `package.json` files anyway)
- M5: Static Checks via Nx (lint infrastructure for dependency checks)

## Blocks

- None (this is an optional leaf milestone)
