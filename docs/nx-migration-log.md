# Nx Migration Log

## Phase 1: Nx Initialization

**Date**: 2026-01-28
**Branch**: `001-cleanup-dependencies`

### Changes Made

1. **Installed Nx packages**
   - Added `nx` and `@nx/workspace` to devDependencies
   - Version: ^22.4.2

2. **Updated nx.json**
   - Added `test`, `lint`, `typecheck` targetDefaults with caching enabled

3. **Updated .gitignore**
   - Added `.nx/cache` and `.nx/workspace-data`

4. **Updated CI workflow**
   - Added Nx cache restore/save steps to `.github/workflows/_build.yml`

5. **Added Nx scripts**
   - `nx`, `nx:graph`, `nx:affected`, `nx:reset`, `nx:show`

### Verification

- [x] `npm install` completes successfully
- [x] `npm run nx:show` lists projects (bpk-component-spinner, bpk-component-flare, bpk-component-icon)
- [x] `npm test` passes (330 test suites, 1640 tests)
- [ ] CI pipeline runs successfully with Nx cache (pending push)

### Rollback Instructions

If issues occur, revert the following files:
- package.json (remove nx, @nx/workspace from devDependencies, remove nx scripts)
- nx.json (revert to Phase 0.4 state)
- .gitignore (remove .nx entries)
- .github/workflows/_build.yml (remove Nx cache steps)

### Previous Phases

- **Phase 0.4**: Codegen configuration - Completed
  - Created nx.json with namedInputs and targetDefaults for build/generate
  - Created project.json files for Icon, Spinner, Flare components
  - Added codegen scripts

- **Phase 0.1**: Dependency cleanup - Completed
  - Upgraded normalize.css to ^8.0.1
  - Removed object-assign polyfill
  - Removed intersection-observer polyfill
  - Locked @skyscanner/bpk-svgs to exact version 20.11.0
  - Tightened React peer dependency to ^18.0.0

---

## Phase 2: Project Structure Consolidation

**Date**: 2026-01-28
**Branch**: `001-cleanup-dependencies`

### Changes Made

1. **Merged dependencies to root package.json**
   - Added 20 runtime dependencies from packages/package.json to root
   - Added peerDependencies (date-fns, react, react-dom, react-transition-group, sass, sass-embedded)
   - Added peerDependenciesMeta for optional sass packages
   - Removed duplicates from devDependencies

2. **Updated package.json metadata**
   - Changed name from `backpack` to `@skyscanner/backpack-web`
   - Changed version from `0.0.1` to `21.0.1`
   - Added description, keywords, bugs, homepage
   - Updated publishConfig with `directory: "./dist"` and `access: "public"`

3. **Removed obsolete scripts and hooks**
   - Removed `postinstall` hook (was: `cd packages && npm install`)
   - Removed `transpile:copy-package-json` script
   - Updated `clean:node_modules` to not reference packages/node_modules

4. **Deleted nested package files**
   - Removed `packages/package.json`
   - Removed `packages/package-lock.json`

5. **Updated CI workflows**
   - Updated `.github/workflows/_build.yml` cache keys and paths
   - Updated `.github/workflows/release.yml` cache keys and paths
   - Removed references to `packages/node_modules/` and `packages/package-lock.json`

6. **Fixed test file**
   - Updated `packages/bpk-component-autosuggest/check-autosuggest-version-test.js`
   - Changed import from `../package.json` to `../../package.json`

### Verification

- [x] `npm install` completes successfully (single lock file)
- [x] `npm run build` completes successfully
- [x] `npm run jest` passes (330 test suites, 1640 tests)
- [x] `npm run typecheck` passes
- [ ] CI pipeline runs successfully (pending push)

### Rollback Instructions

If issues occur, run:
```bash
git checkout HEAD -- packages/package.json packages/package-lock.json package.json .github/workflows/_build.yml .github/workflows/release.yml packages/bpk-component-autosuggest/check-autosuggest-version-test.js
npm install && cd packages && npm install
```
