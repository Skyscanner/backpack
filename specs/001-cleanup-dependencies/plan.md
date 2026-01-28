<!--
==============================================================================
DOCUMENT PURPOSE: Implementation Plan for Phase 1: Nx Initialization
==============================================================================

This plan describes HOW to implement Nx initialization for the Backpack monorepo.
It is an infrastructure task, not a component implementation.

FOCUS: HOW
- How to install and configure Nx
- What files need to be created/modified
- How to integrate with existing CI/CD
==============================================================================
-->

# Implementation Plan: Phase 1 - Nx Initialization

**Branch**: `001-cleanup-dependencies` | **Date**: 2026-01-28 | **Spec**: [phase-1-nx-initialization.md](../../docs/implementation-plans/phase-1-nx-initialization.md)
**Input**: Implementation plan from `docs/implementation-plans/phase-1-nx-initialization.md`
**Depends On**: Phase 0.4 (Codegen Configuration) - ✅ Completed

## Summary

Initialize Nx in the Backpack monorepo to enable task caching, affected commands, and dependency graph visualization. This unlocks significant CI speedups through intelligent caching and targeted builds.

## Current State Analysis

**Already Completed (Phase 0.4)**:
- ✅ `nx.json` exists with basic namedInputs and targetDefaults
- ✅ `.svgs-checksum` file created for codegen integrity
- ✅ project.json files created for Icon, Spinner, Flare components
- ✅ Codegen scripts added (codegen:update-checksum, codegen:verify-checksum, codegen:validate)

**Not Yet Installed**:
- ❌ `nx` package not in devDependencies
- ❌ `@nx/workspace` package not in devDependencies
- ❌ Nx CLI commands not available
- ❌ CI workflow not configured for Nx caching
- ❌ .gitignore not updated for Nx cache directories

## Technical Context

**Framework**: Nx (task orchestration and caching)
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4
**CI/CD**: GitHub Actions
**Existing Build Tools**: Webpack 5, Babel 7, Gulp 5

## Constitution Check

*GATE: Infrastructure changes must not break existing functionality.*

### Core Principles Compliance

- [x] **Component-First Architecture**: N/A - This is infrastructure, not a component
- [x] **Naming Conventions**: N/A - No new components
- [x] **License Headers**: New scripts will include Apache 2.0 headers
- [x] **Modern Sass**: N/A - No style changes
- [x] **Accessibility-First**: N/A - No UI changes
- [x] **TypeScript**: N/A - Configuration files only (JSON)
- [x] **Test Coverage**: Existing tests must continue to pass
- [x] **Documentation**: Migration log will document all changes
- [x] **SemVer**: PATCH - Internal tooling change, no API impact

### Technology Compliance

- [x] **React Version**: N/A - No React code changes
- [x] **TypeScript Version**: N/A - No TypeScript code changes
- [x] **Browser Support**: N/A - Build tooling only

## Project Structure

### Files to Create

```text
docs/nx-migration-log.md           # Migration documentation
```

### Files to Modify

```text
package.json                       # Add nx, @nx/workspace to devDependencies
                                   # Add nx helper scripts
nx.json                            # Expand with test, lint, typecheck targets
.gitignore                         # Add .nx/cache, .nx/workspace-data
.github/workflows/_build.yml       # Add Nx cache to CI
```

## Phase 1: Nx Installation & Configuration

### Step 1: Install Nx Packages

**Action**: Add Nx packages to root devDependencies

```bash
npm install --save-dev nx @nx/workspace
```

**Packages**:
| Package | Version | Purpose |
|---------|---------|---------|
| `nx` | `^21.x` | Core Nx CLI and task runner |
| `@nx/workspace` | `^21.x` | Workspace utilities and generators |

**Note**: Version should be latest stable. Currently v21.x.

### Step 2: Configure nx.json

**Current State** (from Phase 0.4):
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "sharedGlobals": [
      "{workspaceRoot}/.svgs-checksum",
      "{workspaceRoot}/babel.config.js",
      "{workspaceRoot}/tsconfig.json"
    ],
    "svgSources": [
      "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/dist/**/*",
      "{workspaceRoot}/.svgs-checksum"
    ],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/eslint.config.js",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/src/**/*-test.[jt]s?(x)"
    ]
  },
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"]
    },
    "generate": {
      "cache": true,
      "inputs": ["svgSources", "{projectRoot}/**/*"]
    }
  },
  "defaultBase": "main"
}
```

**Target State** (add test, lint, typecheck targets):
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "sharedGlobals": [
      "{workspaceRoot}/.svgs-checksum",
      "{workspaceRoot}/babel.config.js",
      "{workspaceRoot}/tsconfig.json"
    ],
    "svgSources": [
      "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/dist/**/*",
      "{workspaceRoot}/.svgs-checksum"
    ],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/eslint.config.js",
      "!{projectRoot}/jest.config.[jt]s",
      "!{projectRoot}/src/**/*-test.[jt]s?(x)"
    ]
  },
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"]
    },
    "generate": {
      "cache": true,
      "inputs": ["svgSources", "{projectRoot}/**/*"]
    },
    "test": {
      "cache": true,
      "inputs": ["default", "^production"]
    },
    "lint": {
      "cache": true,
      "inputs": ["default", "{workspaceRoot}/.eslintrc", "{workspaceRoot}/eslint.config.js"]
    },
    "typecheck": {
      "cache": true,
      "inputs": ["default", "{workspaceRoot}/tsconfig.json"]
    }
  },
  "defaultBase": "main"
}
```

**Changes**:
- Add `test` target with caching enabled
- Add `lint` target with ESLint config inputs
- Add `typecheck` target with tsconfig input

### Step 3: Update .gitignore

**Add lines**:
```gitignore
# Nx
.nx/cache
.nx/workspace-data
```

**Location**: After existing node_modules entry

### Step 4: Configure TypeScript (Verification)

**Check**: Ensure tsconfig.json exists and references base config properly.

From Phase 0.2, tsconfig.json should already have:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@backpack/*": ["packages/*"]
    }
  }
}
```

**Action**: Verify this configuration is present. No changes needed if Phase 0.2 completed.

### Step 5: Update CI Workflow

**File**: `.github/workflows/_build.yml`

**Add Nx cache** to the Build job:

```yaml
- name: Restore Nx Cache
  uses: actions/cache/restore@9255dc7a253b0ccc959486e2bca901246202afeb # v5.0.1
  id: nx-cache
  with:
    path: .nx/cache
    key: nx-cache-${{ runner.os }}-${{ hashFiles('nx.json', 'package-lock.json') }}
    restore-keys: |
      nx-cache-${{ runner.os }}-

- name: Save Nx Cache
  uses: actions/cache/save@9255dc7a253b0ccc959486e2bca901246202afeb # v5.0.1
  if: always()
  with:
    path: .nx/cache
    key: nx-cache-${{ runner.os }}-${{ hashFiles('nx.json', 'package-lock.json') }}
```

**Insert after**: Node modules cache restore
**Insert before**: Setup logs directory

### Step 6: Add Nx Scripts to package.json

**Add to scripts**:
```json
{
  "scripts": {
    "nx": "nx",
    "nx:graph": "nx graph",
    "nx:affected": "nx affected",
    "nx:reset": "nx reset",
    "nx:show": "nx show projects"
  }
}
```

**Purpose**:
- `nx`: Direct access to nx CLI
- `nx:graph`: Visualize project dependency graph
- `nx:affected`: Run commands only on affected projects
- `nx:reset`: Clear Nx cache
- `nx:show`: List all Nx projects

### Step 7: Create Migration Log

**File**: `docs/nx-migration-log.md`

**Content**:
```markdown
# Nx Migration Log

## Phase 1: Nx Initialization

**Date**: [DATE]
**Branch**: `001-cleanup-dependencies`
**Commit**: [COMMIT_HASH]

### Changes Made

1. **Installed Nx packages**
   - Added `nx` and `@nx/workspace` to devDependencies
   - Version: ^21.x

2. **Updated nx.json**
   - Added `test`, `lint`, `typecheck` targetDefaults with caching enabled

3. **Updated .gitignore**
   - Added `.nx/cache` and `.nx/workspace-data`

4. **Updated CI workflow**
   - Added Nx cache restore/save steps to `.github/workflows/_build.yml`

5. **Added Nx scripts**
   - `nx`, `nx:graph`, `nx:affected`, `nx:reset`, `nx:show`

### Verification

- [ ] `npm install` completes successfully
- [ ] `npm run nx:show` lists projects
- [ ] `npm test` passes
- [ ] CI pipeline runs successfully with Nx cache

### Rollback Instructions

If issues occur, revert the following files:
- package.json (remove nx, @nx/workspace from devDependencies, remove nx scripts)
- nx.json (revert to Phase 0.4 state)
- .gitignore (remove .nx entries)
- .github/workflows/_build.yml (remove Nx cache steps)
```

## Testing Strategy

### Verification Tests

1. **Nx Installation**
   ```bash
   npm install
   npx nx --version  # Should show version
   npm run nx:show   # Should list projects with project.json
   ```

2. **Cache Functionality**
   ```bash
   npm run test      # First run - uncached
   npm run test      # Second run - should hit cache
   ```

3. **CI Pipeline**
   - Push changes to branch
   - Verify CI workflow completes successfully
   - Check Nx cache is saved/restored in subsequent runs

4. **Existing Tests**
   ```bash
   npm test          # All tests should pass
   npm run lint      # Linting should pass
   npm run typecheck # TypeScript should compile
   ```

### Rollback Plan

If tests fail:
1. Revert nx.json changes to Phase 0.4 state
2. Remove nx, @nx/workspace from devDependencies
3. Remove Nx scripts from package.json
4. Revert .gitignore changes
5. Revert CI workflow changes
6. Run `npm install` to regenerate lock file

## Dependencies

### New Dependencies

| Package | Type | Version | Purpose |
|---------|------|---------|---------|
| `nx` | devDependency | ^21.x | Core task runner |
| `@nx/workspace` | devDependency | ^21.x | Workspace utilities |

### Existing Dependencies (unchanged)

- All existing dependencies remain unchanged
- No runtime dependencies added

## Deliverables Checklist

- [ ] `nx` and `@nx/workspace` installed
- [ ] `nx.json` updated with test, lint, typecheck targets
- [ ] `.gitignore` updated for Nx cache
- [ ] CI workflow updated with Nx cache
- [ ] Nx helper scripts added to package.json
- [ ] Migration log created
- [ ] All existing tests pass
- [ ] CI pipeline completes successfully

## Migration & Versioning

**Version Type**: PATCH

**Rationale**: Nx initialization is internal tooling that does not change the public API of any Backpack components. This qualifies as PATCH per `decisions/versioning-rules.md`.

**Breaking Changes**: None

**Deprecations**: None

## References

- **Implementation Plan**: `docs/implementation-plans/phase-1-nx-initialization.md`
- **Nx Documentation**: https://nx.dev/
- **Phase 0.4 Completion**: Codegen configuration already done
- **Backpack Constitution**: `.specify/memory/constitution.md`
