<!--
==============================================================================
DOCUMENT PURPOSE: Implementation Plan for Phase 2: Project Structure
==============================================================================

This plan describes HOW to implement project structure changes for Nx migration.
It is an infrastructure task, not a component implementation.

FOCUS: HOW
- How to merge package.json files
- What files need to be modified/deleted
- How to update configuration references
==============================================================================
-->

# Implementation Plan: Phase 2 - Project Structure

**Branch**: `001-cleanup-dependencies` | **Date**: 2026-01-28 | **Spec**: [phase-2-project-structure.md](../../docs/implementation-plans/phase-2-project-structure.md)
**Input**: Implementation plan from `docs/implementation-plans/phase-2-project-structure.md`
**Depends On**: Phase 1 (Nx Initialization) - ✅ Completed

## Summary

Consolidate the dual package.json structure into a single root package.json for Nx compatibility. This enables `nx release` for unified version management and simplifies the dependency tree.

## Current State Analysis

**Current Structure**:
- Root `package.json`: private=true, devDependencies, scripts
- `packages/package.json`: @skyscanner/backpack-web, runtime dependencies, peerDependencies
- `packages/package-lock.json`: Separate lock file for nested packages
- `postinstall` hook: `(cd packages && npm install)` runs nested install

**Target Structure**:
- Single root `package.json`: All dependencies, publish config, release info
- No `packages/package.json`
- No `packages/package-lock.json`
- No `postinstall` hook

## Technical Context

**Framework**: Nx (task orchestration and caching)
**Package Manager**: npm >=10.7.0
**Node Version**: >=18.20.4
**CI/CD**: GitHub Actions
**Publish Target**: npm as `@skyscanner/backpack-web`

## Constitution Check

*GATE: Infrastructure changes must not break existing functionality.*

### Core Principles Compliance

- [x] **Component-First Architecture**: N/A - This is infrastructure, not a component
- [x] **Naming Conventions**: N/A - No new components
- [x] **License Headers**: N/A - No new source files
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

### Files to Delete

```text
packages/package.json              # Runtime dependencies → merged to root
packages/package-lock.json         # Lock file → regenerated at root
```

### Files to Modify

```text
package.json                       # Merge all dependencies, add publishConfig
package-lock.json                  # Regenerate single lock file
.github/workflows/release.yml      # Update publish paths if needed
scripts/transpilation/*            # Remove copy-package-json script
```

### Files to Verify (Config Path Updates)

```text
jest.config.js                     # Check moduleNameMapper paths
.storybook/main.ts                 # Check webpack config paths
babel.config.js                    # Check preset/plugin paths
gulpfile.js                        # Check task paths
tsconfig.json                      # Check path aliases
eslint.config.js                   # Check config paths
.github/workflows/_build.yml       # Check CI paths
.github/workflows/pr.yml           # Check CI paths
.github/workflows/release.yml      # Check publish paths
```

## Phase 2: Project Structure Changes

### Step 1: Merge package.json Dependencies

**Action**: Copy all dependencies from packages/package.json to root package.json

**Current packages/package.json dependencies to merge**:
```json
{
  "dependencies": {
    "@floating-ui/react": "^0.26.12",
    "@popperjs/core": "^2.11.8",
    "@radix-ui/react-compose-refs": "^1.1.1",
    "@radix-ui/react-slider": "1.3.5",
    "@react-google-maps/api": "^2.19.3",
    "@skyscanner/bpk-foundations-web": "^24.1.0",
    "@skyscanner/bpk-svgs": "20.11.0",
    "a11y-focus-scope": "^1.1.3",
    "a11y-focus-store": "^1.0.0",
    "d3-path": "^3.1.0",
    "d3-scale": "^4.0.2",
    "downshift": "^9.0.10",
    "lodash": "^4.17.20",
    "lodash.clamp": "^4.0.3",
    "lodash.debounce": "^4.0.8",
    "normalize.css": "^8.0.1",
    "prop-types": "^15.7.2",
    "react-autosuggest": "^9.4.3",
    "react-table": "^7.8.0",
    "react-virtualized-auto-sizer": "1.0.20",
    "react-window": "^1.8.7"
  },
  "peerDependencies": {
    "date-fns": "3.3.1 - 4",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-transition-group": "^4.4.5",
    "sass": "^1",
    "sass-embedded": "^1"
  },
  "peerDependenciesMeta": {
    "sass": { "optional": true },
    "sass-embedded": { "optional": true }
  }
}
```

**Merge Strategy**:
1. Add `dependencies` to root package.json under new `dependencies` key
2. Add `peerDependencies` to root package.json
3. Add `peerDependenciesMeta` to root package.json

### Step 2: Update Root package.json Metadata

**Action**: Add publish configuration for @skyscanner/backpack-web

**Changes to make**:
```json
{
  "name": "@skyscanner/backpack-web",
  "version": "21.0.1",
  "description": "Backpack Design System web library",
  "repository": {
    "type": "git",
    "url": "git@github.com:Skyscanner/backpack.git"
  },
  "keywords": ["design system", "react", "react components"],
  "author": "Backpack Design System <backpack@skyscanner.net>",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/Skyscanner/backpack/issues"
  },
  "homepage": "https://github.com/Skyscanner/backpack#readme",
  "publishConfig": {
    "directory": "./dist",
    "access": "public"
  },
  "private": false
}
```

**Note**: Keep `private: true` until ready to publish. The `publishConfig.directory: "./dist"` tells npm to publish from the dist folder after transpilation.

### Step 3: Remove postinstall Hook

**Action**: Delete postinstall script from root package.json

**Current**:
```json
{
  "scripts": {
    "postinstall": "(cd packages && npm install)"
  }
}
```

**Target**: Remove this line entirely.

### Step 4: Remove transpile:copy-package-json Script

**Action**: Delete the script that copies packages/package.json to dist/

**Current**:
```json
{
  "scripts": {
    "transpile:copy-package-json": "cp ./packages/package.json ./dist/"
  }
}
```

**Target**: Remove this line. The root package.json with `publishConfig.directory` handles this.

### Step 5: Delete packages/package.json and packages/package-lock.json

**Action**: Remove the nested package files

```bash
rm packages/package.json
rm packages/package-lock.json
```

### Step 6: Regenerate package-lock.json

**Action**: Delete and regenerate the lock file

```bash
rm package-lock.json
npm install
```

**Verification**:
- No errors during install
- All dependencies resolved correctly
- Single lock file at root

### Step 7: Update Configuration File Paths

**Check and update these files if they reference packages/package.json**:

1. **Jest config** (if exists):
   - Check `moduleNameMapper` paths
   - Check `rootDir` configuration

2. **GitHub Actions workflows**:
   - `.github/workflows/release.yml`: Check publish step
   - Check any references to `packages/package.json` or `packages/package-lock.json`

3. **Scripts**:
   - `scripts/npm/check-bpk-dependencies.js`: May reference packages/package.json
   - `scripts/transpilation/*`: May reference packages/package.json

### Step 8: Verify Import Paths Still Work

**Action**: Ensure @backpack/* path aliases still resolve correctly

The path aliases configured in Phase 0.2 (`@backpack/*` → `packages/*`) should continue working since we're not moving any source files.

**Verification**:
```bash
npm run typecheck
npm run lint
npm test
```

## Testing Strategy

### Verification Tests

1. **Dependency Installation**
   ```bash
   rm -rf node_modules
   npm install
   ```
   - Should complete without errors
   - All dependencies should be available

2. **Build Verification**
   ```bash
   npm run build
   ```
   - Should complete successfully
   - Output in dist/ should be correct

3. **Test Suite**
   ```bash
   npm test
   ```
   - All tests should pass
   - No import errors

4. **Transpilation**
   ```bash
   npm run transpile
   ```
   - Should generate dist/ correctly
   - dist/package.json should NOT be needed (publishConfig handles this)

5. **Storybook**
   ```bash
   npm run storybook:dist
   ```
   - Should build successfully

### Rollback Plan

If tests fail:
1. Restore packages/package.json from git
2. Restore packages/package-lock.json from git
3. Revert root package.json changes
4. Run `npm install` in both directories
5. Document failure in migration log

## Dependencies

### Dependencies Being Merged

| From | Type | Notes |
|------|------|-------|
| packages/package.json | dependencies | 20+ runtime dependencies |
| packages/package.json | peerDependencies | React, date-fns, sass |
| packages/package.json | peerDependenciesMeta | Optional sass packages |

### No New External Dependencies

This phase only reorganizes existing dependencies.

## Deliverables Checklist

- [ ] All dependencies merged to root package.json
- [ ] packages/package.json deleted
- [ ] packages/package-lock.json deleted
- [ ] postinstall hook removed
- [ ] transpile:copy-package-json script removed
- [ ] publishConfig added to root package.json
- [ ] Single package-lock.json at root
- [ ] All configuration paths updated
- [ ] All tests pass
- [ ] Build completes successfully
- [ ] Storybook builds successfully

## Migration & Versioning

**Version Type**: PATCH

**Rationale**: Project structure consolidation is internal tooling that does not change the public API of any Backpack components. This qualifies as PATCH per `decisions/versioning-rules.md`.

**Breaking Changes**: None

**Deprecations**: None

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Config path not updated | Medium | Build fails | Comprehensive search for package.json references |
| Dependencies not fully merged | Low | Runtime errors | Diff check before/after |
| CI workflow breaks | Medium | Blocked releases | Test in PR before merge |
| Import resolution fails | Low | Build fails | Test all entry points |

## References

- **Implementation Plan**: `docs/implementation-plans/phase-2-project-structure.md`
- **Nx Documentation**: https://nx.dev/
- **Phase 1 Completion**: Nx initialization already done
- **Backpack Constitution**: `.specify/memory/constitution.md`
