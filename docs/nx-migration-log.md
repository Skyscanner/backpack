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
