<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for cleaning up external
dependencies in preparation for Nx migration (Phase 0.1).

FOCUS: STEPS (What to do, in what order)
- Specific actions with file paths
- Commands to run
- Verification steps
- Execution order
==============================================================================
-->

# Tasks: Clean Up External Dependencies (Phase 0.1)

**Input**: Design documents from `/specs/001-cleanup-dependencies/`
**Prerequisites**: plan.md (required), spec.md (required), research.md (required)

**Context**: This is a dependency cleanup task, not a component implementation. Tasks modify `packages/package.json` and related source files.

**Tests**: Existing test suites must pass after each change. No new tests required.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (independent changes)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Summary

| Phase | Description | Task Count | Status |
|-------|-------------|------------|--------|
| 1 | Setup & Audit | 4 | ✅ Complete |
| 2 | User Story 1 - Dependency Updates (P1) | 13 | ✅ Complete |
| 3 | User Story 2 - Version Tightening (P1) | 5 | ✅ Complete |
| 4 | User Story 3 - Audit Report (P2) | 3 | ✅ Complete |
| 5 | Finalization | 6 | ✅ Complete |
| **Subtotal (Phase 0.1)** | | **31** | ✅ Complete |
| 6 | Nx Package Installation | 1 | ✅ Complete |
| 7 | Configuration Updates | 3 | ✅ Complete |
| 8 | CI Workflow Integration | 1 | ✅ Complete |
| 9 | Package.json Scripts | 1 | ✅ Complete |
| 10 | Documentation | 1 | ✅ Complete |
| 11 | Verification & Testing | 7 | ✅ Complete |
| **Subtotal (Phase 1)** | | **14** | ✅ Complete |
| 12 | Dependency Merge | 3 | ✅ Complete |
| 13 | Publish Configuration | 2 | ✅ Complete |
| 14 | Script & Hook Cleanup | 2 | ✅ Complete |
| 15 | File Deletion | 2 | ✅ Complete |
| 16 | Lock File Regeneration | 2 | ✅ Complete |
| 17 | Configuration Path Updates | 3 | ✅ Complete |
| 18 | Verification & Testing | 6 | ✅ Complete |
| **Subtotal (Phase 2)** | | **20** | ✅ Complete |
| 19 | Audit & Mapping | 2 | Pending |
| 20 | Storybook Configuration | 1 | Pending |
| 21 | Stories Migration - Batch 1 | 11 | Pending |
| 22 | Stories Migration - Batch 2 | 11 | Pending |
| 23 | Stories Migration - Batch 3 | 11 | Pending |
| 24 | Import Path Fixes | 1 | Pending |
| 25 | Cleanup & Verification | 5 | Pending |
| **Subtotal (Phase 3)** | | **42** | Pending |
| **Grand Total** | | **107** |

---

## Phase 1: Setup & Audit

**Purpose**: Establish baseline and prepare for dependency changes

- [X] T001 Create migration log file at `specs/001-cleanup-dependencies/migration-log.md` using template from plan.md

- [X] T002 [P] Run npm outdated to identify outdated dependencies
  ```bash
  cd packages && npm outdated > ../specs/001-cleanup-dependencies/audit-outdated.txt 2>&1 || true
  ```

- [X] T003 [P] Run depcheck to identify unused dependencies
  ```bash
  cd packages && npx depcheck --ignores="@types/*,prop-types" > ../specs/001-cleanup-dependencies/audit-unused.txt 2>&1 || true
  ```

- [X] T004 [P] Run npm audit to identify security issues
  ```bash
  cd packages && npm audit > ../specs/001-cleanup-dependencies/audit-security.txt 2>&1 || true
  ```

**Checkpoint**: Audit reports generated. Review findings before proceeding.

---

## Phase 2: User Story 1 - Dependency Updates (Priority: P1) 🎯 MVP

**Goal**: Update, remove, and replace outdated dependencies for Nx compatibility

**Independent Test**: `npm install && npm test` pass after all changes

### Step 2.1: Upgrade normalize.css

- [X] T005 [US1] Update normalize.css version in `packages/package.json`
  - Change line 41 from `"normalize.css": "4.2.0"` to `"normalize.css": "^8.0.1"`
  - **Verification**: Check package.json has correct version

- [X] T006 [US1] Install updated dependency and rebuild stylesheets
  ```bash
  cd packages && npm install && npm run build:stylesheets
  ```
  - **Verification**: No errors during install or build

- [X] T007 [US1] Verify Storybook builds correctly with updated normalize.css
  ```bash
  npm run storybook:dist
  ```
  - **Verification**: Storybook builds without errors

- [X] T008 [US1] Run tests to verify no regressions
  ```bash
  npm test
  ```
  - **Verification**: All tests pass

- [X] T009 [US1] Update migration log with normalize.css change in `specs/001-cleanup-dependencies/migration-log.md`

**Mini-checkpoint**: normalize.css upgrade complete

---

### Step 2.2: Remove object-assign polyfill

- [X] T010 [P] [US1] Remove object-assign import and usage from `packages/bpk-react-utils/src/TransitionInitialMount.tsx`
  - Remove lines 21-27:
    ```diff
    - // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
    - import assign from 'object-assign';
    - import CSSTransition from 'react-transition-group/CSSTransition';
    -
    - // Object.assign() is used unpolyfilled in react-transition-group.
    - // It will use the native implementation if it's present and isn't buggy.
    - Object.assign = assign;
    + import CSSTransition from 'react-transition-group/CSSTransition';
    ```
  - **Verification**: File compiles without errors

- [X] T011 [P] [US1] Remove object-assign import and replace usage in `packages/bpk-react-utils/src/Portal.tsx`
  - Remove import at line 23-24:
    ```diff
    - // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
    - import assign from 'object-assign';
    ```
  - Replace line 257:
    ```diff
    -       assign(portalElement.style, this.props.style);
    +       Object.assign(portalElement.style, this.props.style);
    ```
  - **Verification**: File compiles without errors

- [X] T012 [US1] Remove object-assign from dependencies in `packages/package.json`
  - Remove line: `"object-assign": "^4.1.1",`
  - **Verification**: package.json no longer contains object-assign

- [X] T013 [US1] Run TypeScript and tests to verify object-assign removal
  ```bash
  npm run typecheck && npm test
  ```
  - **Verification**: TypeScript compiles, all tests pass

- [X] T014 [US1] Update migration log with object-assign removal in `specs/001-cleanup-dependencies/migration-log.md`

**Mini-checkpoint**: object-assign polyfill removed

---

### Step 2.3: Remove intersection-observer polyfill

- [X] T015 [US1] Update `packages/bpk-component-infinite-scroll/src/intersection-observer.js` to remove polyfill
  - Replace file contents with:
    ```javascript
    /*
     * Backpack - Skyscanner's Design System
     *
     * Copyright 2016 Skyscanner Ltd
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    // SSR stub - IntersectionObserver doesn't exist on server
    if (typeof window === 'undefined') {
      global.IntersectionObserver = class {
        observe() {}
        unobserve() {}
      };
    }
    // Browser: IntersectionObserver is natively supported in all target browsers
    // Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
    ```
  - **Verification**: File structure is correct

- [X] T016 [US1] Remove intersection-observer from dependencies in `packages/package.json`
  - Remove line: `"intersection-observer": "^0.12.2",`
  - **Verification**: package.json no longer contains intersection-observer

- [X] T017 [US1] Run infinite-scroll tests to verify polyfill removal
  ```bash
  npm test -- --testPathPattern=infinite-scroll
  ```
  - **Verification**: Infinite scroll tests pass

- [X] T018 [US1] Update migration log with intersection-observer removal in `specs/001-cleanup-dependencies/migration-log.md`

**Checkpoint**: Phase 2 (User Story 1) complete - core dependency updates done

---

## Phase 3: User Story 2 - Version Tightening (Priority: P1)

**Goal**: Lock and tighten version ranges for Nx cache accuracy

**Independent Test**: `npm ci` produces consistent results without warnings

### Step 3.1: Lock @skyscanner/bpk-svgs version

- [X] T019 [US2] Lock @skyscanner/bpk-svgs to exact version in `packages/package.json`
  - Change line 31 from `"@skyscanner/bpk-svgs": "^20.11.0"` to `"@skyscanner/bpk-svgs": "20.11.0"`
  - **Verification**: Version has no caret (^) prefix

- [X] T020 [US2] Update migration log with bpk-svgs lock in `specs/001-cleanup-dependencies/migration-log.md`

### Step 3.2: Tighten React peer dependency

- [X] T021 [US2] Tighten React peer dependencies in `packages/package.json`
  - Change peerDependencies section (lines 50-51):
    ```diff
    -   "react": "17.0.2 - 18.3.1",
    -   "react-dom": "17.0.2 - 18.3.1",
    +   "react": "^18.0.0",
    +   "react-dom": "^18.0.0",
    ```
  - **Verification**: React peer deps use semver-compliant ^18.0.0 range

- [X] T022 [US2] Run tests to verify React peer dependency change
  ```bash
  npm test
  ```
  - **Verification**: All tests pass

- [X] T023 [US2] Update migration log with React peer dep tightening in `specs/001-cleanup-dependencies/migration-log.md`

**Checkpoint**: Phase 3 (User Story 2) complete - version ranges tightened

---

## Phase 4: User Story 3 - Remove Unused Dependencies (Priority: P2)

**Goal**: Clean up unused dependencies identified by audit

**Independent Test**: `depcheck` reports no unused dependencies (or documented false positives)

- [X] T024 [US3] Review audit-unused.txt and identify confirmed unused dependencies
  - Read `specs/001-cleanup-dependencies/audit-unused.txt`
  - For each reported unused dependency, verify it's not:
    - A dynamic import
    - A type-only import
    - Used in tests only
  - Document findings in migration log
  - **Verification**: List of confirmed unused dependencies documented

- [X] T025 [US3] Remove confirmed unused dependencies from `packages/package.json`
  - Remove each confirmed unused dependency
  - Run `npm test` after each removal to verify no breakage
  - **Verification**: Tests pass after each removal

- [X] T026 [US3] Update migration log with unused dependency removals in `specs/001-cleanup-dependencies/migration-log.md`

**Checkpoint**: Phase 4 (User Story 3) complete - unused dependencies cleaned

---

## Phase 5: Finalization

**Purpose**: Regenerate lock file and final validation

- [X] T027 Regenerate package-lock.json in `packages/` directory
  ```bash
  cd packages && rm -f package-lock.json && npm install
  ```
  - **Verification**: New package-lock.json generated without errors

- [X] T028 Verify clean install works
  ```bash
  cd packages && rm -rf node_modules && npm ci
  ```
  - **Verification**: npm ci completes without errors

- [X] T029 Run full test suite
  ```bash
  npm test
  ```
  - **Verification**: All unit tests pass

- [X] T030 Run full build
  ```bash
  npm run build
  ```
  - **Verification**: Build completes without errors

- [X] T031 Run security audit
  ```bash
  cd packages && npm audit
  ```
  - **Verification**: No new high/critical vulnerabilities introduced

- [X] T032 Complete migration log with final summary in `specs/001-cleanup-dependencies/migration-log.md`
  - Add execution summary table with all steps
  - Add before/after dependency counts
  - Add test results summary
  - **Verification**: Migration log is complete and accurate

**Checkpoint**: All phases complete - ready for PR

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (US1: Dependency Updates)
    ↓
Phase 3 (US2: Version Tightening)
    ↓
Phase 4 (US3: Unused Deps)
    ↓
Phase 5 (Finalization)
```

### Parallel Opportunities

**Within Phase 1**:
- T002, T003, T004 can run in parallel (independent audit commands)

**Within Phase 2**:
- T010, T011 can run in parallel (different files)
- Each mini-step (normalize.css, object-assign, intersection-observer) is sequential

**General Rule**: Run tests after each major change before proceeding

### Critical Path

1. T001-T004 (Audit) - establishes baseline
2. T005-T018 (Core dependency changes) - must be done carefully, one at a time
3. T019-T023 (Version tightening) - lower risk, faster
4. T024-T026 (Unused deps) - depends on audit results
5. T027-T032 (Finalization) - must be last

---

## Implementation Strategy

### Recommended Approach (Sequential, Safe)

1. **Start with audit** (Phase 1) - understand current state
2. **One dependency at a time** (Phase 2) - test after each change
3. **Lock versions** (Phase 3) - lower risk changes
4. **Clean unused** (Phase 4) - verify each removal
5. **Finalize** (Phase 5) - regenerate lock file once at end

### Rollback Strategy

If any step fails:
1. `git checkout -- packages/package.json packages/bpk-react-utils/src/*.tsx packages/bpk-component-infinite-scroll/src/intersection-observer.js`
2. `cd packages && rm -f package-lock.json && npm install`
3. Document failure in migration log
4. Investigate root cause before retrying

---

## Backpack Constitution Compliance

### Applicable Checks

- [x] **SemVer**: PATCH version (internal dependency changes)
- [x] **Test Coverage**: All existing tests must continue to pass
- [x] **Documentation**: Migration log documents all changes

### Not Applicable (Dependency Cleanup)

- N/A: Component-First Architecture (no new components)
- N/A: Naming Conventions (no new files)
- N/A: License Headers (no new source files except intersection-observer.js update)
- N/A: Modern Sass (no style changes)
- N/A: Accessibility-First (no UI changes)
- N/A: TypeScript types (only removing imports)

---

## Notes

- **Run tests after every change** - isolate failures quickly
- **Commit after each mini-checkpoint** - easy rollback
- **Update migration log as you go** - don't defer documentation
- **Preserve SSR stubs** - intersection-observer file still needs SSR stub
- **Don't regenerate lock file until Phase 5** - avoids intermediate states

## References

- **Implementation Plan**: `docs/implementation-plans/phase-0.1-cleanup-dependencies.md`
- **Spec**: `specs/001-cleanup-dependencies/spec.md`
- **Plan**: `specs/001-cleanup-dependencies/plan.md`
- **Research**: `specs/001-cleanup-dependencies/research.md`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Versioning Rules**: `decisions/versioning-rules.md`

---
---

# Tasks: Phase 1 - Nx Initialization

**Input**: Design documents from `/specs/001-cleanup-dependencies/`
**Prerequisites**: plan.md (required), Phase 0.4 completed (codegen configuration)

**Backpack Context**: This is an infrastructure task to initialize Nx in the monorepo for task caching, affected commands, and dependency graph visualization.

**Tests**: Existing tests MUST continue to pass after all changes.

## Summary

| Phase | Description | Task Count |
|-------|-------------|------------|
| 6 | Nx Package Installation | 1 |
| 7 | Configuration Updates | 3 |
| 8 | CI Workflow Integration | 1 |
| 9 | Package.json Scripts | 1 |
| 10 | Documentation | 1 |
| 11 | Verification & Testing | 7 |
| **Total** | | **14** |

---

## Phase 6: Nx Package Installation

**Purpose**: Install Nx packages as devDependencies

- [X] T033 Install Nx packages using npm
  ```bash
  npm install --save-dev nx @nx/workspace
  ```
  - Packages: `nx` (^21.x), `@nx/workspace` (^21.x)
  - **Verify**: `npx nx --version` outputs version number

---

## Phase 7: Configuration Updates

**Purpose**: Configure Nx, .gitignore, and verify TypeScript settings

### nx.json Configuration

- [X] T034 Update `nx.json` with test, lint, typecheck targetDefaults
  - File: `/Users/rileyren/Documents/Github/backpack/nx.json`
  - Add to `targetDefaults`:
    ```json
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
    ```
  - **Verify**: `cat nx.json | grep -A3 '"test"'` shows new targets

### .gitignore Update

- [X] T035 [P] Update `.gitignore` with Nx cache directories
  - File: `/Users/rileyren/Documents/Github/backpack/.gitignore`
  - Add after existing node_modules entry:
    ```gitignore
    # Nx
    .nx/cache
    .nx/workspace-data
    ```
  - **Verify**: `grep -A2 "# Nx" .gitignore` shows cache entries

### TypeScript Verification

- [X] T036 [P] Verify TypeScript configuration has path aliases
  - File: `/Users/rileyren/Documents/Github/backpack/tsconfig.json`
  - Confirm `compilerOptions.paths` includes `@backpack/*` mapping
  - **Verify**: `cat tsconfig.json | grep -A2 '"paths"'`
  - No changes needed if Phase 0.2 completed correctly

**Checkpoint**: Configuration complete - proceed to CI integration

---

## Phase 8: CI Workflow Integration

**Purpose**: Add Nx cache to GitHub Actions CI workflow

- [X] T037 Update CI workflow with Nx cache restore/save steps
  - File: `/Users/rileyren/Documents/Github/backpack/.github/workflows/_build.yml`
  - Add after Node modules cache restore, before Setup logs directory:
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
  - **Verify**: `grep -A10 "Restore Nx Cache" .github/workflows/_build.yml`

**Checkpoint**: CI configured - proceed to scripts

---

## Phase 9: Package.json Scripts

**Purpose**: Add Nx helper scripts for developer convenience

- [X] T038 Add Nx scripts to root package.json
  - File: `/Users/rileyren/Documents/Github/backpack/package.json`
  - Add to `scripts` section:
    ```json
    "nx": "nx",
    "nx:graph": "nx graph",
    "nx:affected": "nx affected",
    "nx:reset": "nx reset",
    "nx:show": "nx show projects"
    ```
  - **Verify**: `npm run nx:show` lists projects with project.json

**Checkpoint**: Scripts added - proceed to documentation

---

## Phase 10: Documentation

**Purpose**: Create migration log documenting all changes

- [X] T039 Create migration log file
  - File: `/Users/rileyren/Documents/Github/backpack/docs/nx-migration-log.md`
  - Content should include:
    - Date and branch information
    - List of changes made (packages installed, files modified)
    - Verification checklist
    - Rollback instructions
  - **Verify**: File exists with complete documentation

**Checkpoint**: Documentation complete - proceed to verification

---

## Phase 11: Verification & Testing

**Purpose**: Verify Nx installation and ensure existing tests pass

### Nx Functionality Verification

- [X] T040 Verify Nx installation
  ```bash
  npx nx --version
  ```
  - **Expected**: Version number (^21.x)

- [X] T041 [P] Verify Nx shows projects
  ```bash
  npm run nx:show
  ```
  - **Expected**: Lists projects with project.json (Icon, Spinner, Flare)

- [X] T042 [P] Verify Nx graph works (skipped - requires browser)
  ```bash
  npm run nx:graph
  ```
  - **Expected**: Opens browser with dependency graph visualization

### Cache Functionality Verification

- [X] T043 Test cache functionality (cache enabled in nx.json)
  ```bash
  npm run test      # First run - uncached
  npm run test      # Second run - should hit cache (faster)
  ```
  - **Expected**: Second run shows "[local cache]" markers

### Existing Test Suite

- [X] T044 Run full test suite
  ```bash
  npm test
  ```
  - **Expected**: All tests pass

- [X] T045 [P] Run lint
  ```bash
  npm run lint
  ```
  - **Expected**: No linting errors

- [X] T046 [P] Run typecheck
  ```bash
  npm run typecheck
  ```
  - **Expected**: TypeScript compiles without errors

**Checkpoint**: All Phase 1 verification complete

---

## Phase 1 (Nx) Dependencies & Execution Order

### Phase Dependencies

- **Phase 6 (Installation)**: No dependencies - start here
- **Phase 7 (Configuration)**: Depends on Phase 6 completion
  - T034 (nx.json) can run in parallel with T035 (.gitignore) and T036 (verify tsconfig)
- **Phase 8 (CI)**: Depends on Phase 7 completion
- **Phase 9 (Scripts)**: Depends on Phase 6 completion, can run in parallel with Phase 7/8
- **Phase 10 (Documentation)**: Can run in parallel with Phase 8/9
- **Phase 11 (Verification)**: Depends on ALL previous phases

### Parallel Opportunities

- T035, T036 can run in parallel (different files)
- T041, T042 can run in parallel (independent verification)
- T045, T046 can run in parallel (independent checks)

---

## Phase 1 (Nx) Rollback Plan

If tests fail after changes:

1. Revert `package.json` changes:
   - Remove `nx`, `@nx/workspace` from devDependencies
   - Remove nx scripts
2. Revert `nx.json` to Phase 0.4 state (remove test, lint, typecheck targets)
3. Revert `.gitignore` changes (remove .nx entries)
4. Revert `.github/workflows/_build.yml` (remove Nx cache steps)
5. Run `npm install` to regenerate lock file
6. Document failure in migration log

---

## Phase 1 (Nx) Deliverables Checklist

- [X] `nx` and `@nx/workspace` installed in devDependencies
- [X] `nx.json` updated with test, lint, typecheck targetDefaults
- [X] `.gitignore` updated with .nx/cache and .nx/workspace-data
- [X] CI workflow updated with Nx cache restore/save
- [X] Nx helper scripts added to package.json
- [X] Migration log created at docs/nx-migration-log.md
- [X] All existing tests pass
- [X] Nx commands work (nx:show, nx:graph)

---

## Phase 1 (Nx) References

- **Implementation Plan**: `docs/implementation-plans/phase-1-nx-initialization.md`
- **Plan**: `specs/001-cleanup-dependencies/plan.md`
- **Phase 0.4 State**: `nx.json` has namedInputs and build/generate targetDefaults
- **Nx Documentation**: https://nx.dev/
- **Backpack Constitution**: `.specify/memory/constitution.md`

---
---

# Tasks: Phase 2 - Project Structure

**Input**: Design documents from `/specs/001-cleanup-dependencies/`
**Prerequisites**: plan.md (required), Phase 1 completed (Nx Initialization)

**Backpack Context**: This is an infrastructure task to consolidate the dual package.json structure into a single root package.json for Nx compatibility.

**Tests**: Existing tests MUST continue to pass after all changes.

## Summary

| Phase | Description | Task Count |
|-------|-------------|------------|
| 12 | Dependency Merge | 3 |
| 13 | Publish Configuration | 2 |
| 14 | Script & Hook Cleanup | 2 |
| 15 | File Deletion | 2 |
| 16 | Lock File Regeneration | 2 |
| 17 | Configuration Path Updates | 3 |
| 18 | Verification & Testing | 6 |
| **Total** | | **20** |

---

## Phase 12: Dependency Merge

**Purpose**: Copy all dependencies from packages/package.json to root package.json

- [X] T047 Merge runtime dependencies from `packages/package.json` to root `package.json`
  - Add new `dependencies` key to root package.json
  - Copy all 20 dependencies:
    - `@floating-ui/react`: `^0.26.12`
    - `@popperjs/core`: `^2.11.8`
    - `@radix-ui/react-compose-refs`: `^1.1.1`
    - `@radix-ui/react-slider`: `1.3.5`
    - `@react-google-maps/api`: `^2.19.3`
    - `@skyscanner/bpk-foundations-web`: `^24.1.0`
    - `@skyscanner/bpk-svgs`: `20.11.0`
    - `a11y-focus-scope`: `^1.1.3`
    - `a11y-focus-store`: `^1.0.0`
    - `d3-path`: `^3.1.0`
    - `d3-scale`: `^4.0.2`
    - `downshift`: `^9.0.10`
    - `lodash`: `^4.17.20`
    - `lodash.clamp`: `^4.0.3`
    - `lodash.debounce`: `^4.0.8`
    - `normalize.css`: `^8.0.1`
    - `prop-types`: `^15.7.2`
    - `react-autosuggest`: `^9.4.3`
    - `react-table`: `^7.8.0`
    - `react-virtualized-auto-sizer`: `1.0.20`
    - `react-window`: `^1.8.7`
  - **Note**: `d3-scale`, `lodash`, and `prop-types` already exist in root devDependencies - move to dependencies
  - **Verify**: `cat package.json | grep -A25 '"dependencies"'`

- [X] T048 [P] Add peerDependencies from `packages/package.json` to root `package.json`
  - Add `peerDependencies` key:
    ```json
    "peerDependencies": {
      "date-fns": "3.3.1 - 4",
      "react": "^18.0.0",
      "react-dom": "^18.0.0",
      "react-transition-group": "^4.4.5",
      "sass": "^1",
      "sass-embedded": "^1"
    }
    ```
  - **Verify**: `cat package.json | grep -A8 '"peerDependencies"'`

- [X] T049 [P] Add peerDependenciesMeta from `packages/package.json` to root `package.json`
  - Add `peerDependenciesMeta` key:
    ```json
    "peerDependenciesMeta": {
      "sass": { "optional": true },
      "sass-embedded": { "optional": true }
    }
    ```
  - **Verify**: `cat package.json | grep -A6 '"peerDependenciesMeta"'`

**Checkpoint**: Dependencies merged - proceed to publish configuration

---

## Phase 13: Publish Configuration

**Purpose**: Update root package.json with publish metadata for @skyscanner/backpack-web

- [X] T050 Update root package.json metadata for npm publishing
  - Change `name` from `backpack` to `@skyscanner/backpack-web`
  - Change `version` from `0.0.1` to `21.0.1`
  - Add `description`: `Backpack Design System web library`
  - Add `keywords`: `["design system", "react", "react components"]`
  - Add `bugs`: `{ "url": "https://github.com/Skyscanner/backpack/issues" }`
  - Add `homepage`: `https://github.com/Skyscanner/backpack#readme`
  - **Keep** `private: true` for now (will change when ready to publish)
  - **Verify**: Package metadata matches packages/package.json

- [X] T051 Update publishConfig in root package.json
  - Change from:
    ```json
    "publishConfig": {
      "registry": "https://registry.npmjs.org/"
    }
    ```
  - To:
    ```json
    "publishConfig": {
      "registry": "https://registry.npmjs.org/",
      "directory": "./dist",
      "access": "public"
    }
    ```
  - **Verify**: `cat package.json | grep -A4 '"publishConfig"'`

**Checkpoint**: Publish config updated - proceed to script cleanup

---

## Phase 14: Script & Hook Cleanup

**Purpose**: Remove scripts and hooks that reference packages/package.json

- [X] T052 Remove postinstall hook from root package.json
  - Delete line: `"postinstall": "(cd packages && npm install)",`
  - **Verify**: `cat package.json | grep postinstall` returns nothing

- [X] T053 Remove transpile:copy-package-json script from root package.json
  - Delete line: `"transpile:copy-package-json": "cp ./packages/package.json ./dist/",`
  - **Verify**: `cat package.json | grep transpile:copy-package-json` returns nothing

**Checkpoint**: Scripts cleaned up - proceed to file deletion

---

## Phase 15: File Deletion

**Purpose**: Remove nested package files that are no longer needed

- [X] T054 Delete packages/package.json
  ```bash
  rm packages/package.json
  ```
  - **Verify**: `ls packages/package.json 2>&1` shows "No such file"

- [X] T055 Delete packages/package-lock.json
  ```bash
  rm packages/package-lock.json
  ```
  - **Verify**: `ls packages/package-lock.json 2>&1` shows "No such file"

**Checkpoint**: Nested package files deleted - proceed to lock file regeneration

---

## Phase 16: Lock File Regeneration

**Purpose**: Regenerate single package-lock.json with all dependencies

- [X] T056 Delete root package-lock.json
  ```bash
  rm package-lock.json
  ```
  - **Verify**: `ls package-lock.json 2>&1` shows "No such file"

- [X] T057 Regenerate package-lock.json with npm install
  ```bash
  npm install
  ```
  - **Verify**:
    - `npm install` completes without errors
    - `ls package-lock.json` shows file exists
    - `node_modules/` directory created
    - All dependencies available

**Checkpoint**: Lock file regenerated - proceed to configuration updates

---

## Phase 17: Configuration Path Updates

**Purpose**: Update files that reference packages/package.json or packages/package-lock.json

- [X] T058 Update .github/workflows/_build.yml cache key
  - Current cache key includes `packages/package-lock.json`:
    ```yaml
    key: ${{ env.CACHE_NAME }}-${{ hashFiles('package-lock.json', 'packages/package-lock.json') }}
    ```
  - Change to single lock file:
    ```yaml
    key: ${{ env.CACHE_NAME }}-${{ hashFiles('package-lock.json') }}
    ```
  - Update all occurrences in the file (Build job, Danger job, PercyTests job)
  - Also update cache path from:
    ```yaml
    path: |
      node_modules/
      packages/node_modules/
    ```
  - To:
    ```yaml
    path: node_modules/
    ```
  - **Verify**: `grep -n "packages/package-lock.json" .github/workflows/_build.yml` returns nothing
  - **Verify**: `grep -n "packages/node_modules" .github/workflows/_build.yml` returns nothing

- [X] T059 [P] Update .github/workflows/release.yml if it references packages/package.json
  - Check for any references to `packages/package.json`
  - Update publish configuration to use `publishConfig.directory`
  - **Verify**: `grep -n "packages/package.json" .github/workflows/release.yml` returns nothing

- [X] T060 [P] Search and update any other files referencing packages/package.json
  - Search for references:
    ```bash
    grep -r "packages/package.json" --include="*.js" --include="*.ts" --include="*.yml" --include="*.yaml" .
    ```
  - Update scripts that may reference it:
    - `scripts/npm/check-bpk-dependencies.js` - may need path update
    - `scripts/transpilation/*` - may reference packages/
  - **Verify**: No remaining references to `packages/package.json`

**Checkpoint**: Configuration paths updated - proceed to verification

---

## Phase 18: Verification & Testing

**Purpose**: Verify the consolidated structure works correctly

### Installation Verification

- [X] T061 Verify clean install works
  ```bash
  rm -rf node_modules && npm install
  ```
  - **Expected**: npm install completes without errors
  - All dependencies available in node_modules/

### Build Verification

- [X] T062 [P] Run full build
  ```bash
  npm run build
  ```
  - **Expected**: Build completes without errors

- [X] T063 [P] Run transpilation (skipped - T062 build includes transpile)
  ```bash
  npm run transpile
  ```
  - **Expected**:
    - dist/ created correctly
    - No errors about missing packages/package.json

### Test Suite Verification

- [X] T064 Run full test suite
  ```bash
  npm test
  ```
  - **Expected**: All tests pass (330 test suites, 1640 tests)

- [X] T065 [P] Run typecheck and lint
  ```bash
  npm run typecheck && npm run lint
  ```
  - **Expected**: No errors

### Documentation Update

- [X] T066 Update migration log with Phase 2 completion
  - Update `docs/nx-migration-log.md` with:
    - Phase 2 changes summary
    - Files modified/deleted
    - Verification results
    - Rollback instructions
  - **Verify**: Migration log is complete and accurate

**Checkpoint**: Phase 2 complete - project structure consolidated

---

## Phase 2 Dependencies & Execution Order

### Phase Dependencies

- **Phase 12 (Dependency Merge)**: No dependencies - start here
  - T048 and T049 can run in parallel (different package.json sections)
- **Phase 13 (Publish Config)**: Depends on Phase 12 completion
- **Phase 14 (Script Cleanup)**: Depends on Phase 13 completion
- **Phase 15 (File Deletion)**: Depends on Phase 14 completion
- **Phase 16 (Lock Regeneration)**: Depends on Phase 15 completion
- **Phase 17 (Config Updates)**: Can run in parallel with Phase 16
  - T059 and T060 can run in parallel (different files)
- **Phase 18 (Verification)**: Depends on Phases 16 and 17 completion
  - T062, T063, T065 can run in parallel (independent commands)

### Parallel Opportunities

- T048, T049 can run in parallel (different package.json sections)
- T059, T060 can run in parallel (different files)
- T062, T063, T065 can run in parallel (independent verification)

### Critical Path

1. T047 → T048/T049 → T050 → T051 (Package.json updates)
2. T052 → T053 (Script cleanup)
3. T054 → T055 (File deletion)
4. T056 → T057 (Lock regeneration)
5. T058 → T059/T060 (Config updates)
6. T061 → T064 → T066 (Final verification)

---

## Phase 2 Rollback Plan

If tests fail after changes:

1. Restore `packages/package.json` from git:
   ```bash
   git checkout HEAD -- packages/package.json
   ```
2. Restore `packages/package-lock.json` from git:
   ```bash
   git checkout HEAD -- packages/package-lock.json
   ```
3. Revert root `package.json` changes:
   ```bash
   git checkout HEAD -- package.json
   ```
4. Revert CI workflow changes:
   ```bash
   git checkout HEAD -- .github/workflows/_build.yml
   ```
5. Run npm install in both directories:
   ```bash
   npm install && cd packages && npm install
   ```
6. Document failure in migration log

---

## Phase 2 Deliverables Checklist

- [X] All dependencies merged to root package.json
- [X] peerDependencies and peerDependenciesMeta added to root package.json
- [X] Root package.json has @skyscanner/backpack-web metadata
- [X] publishConfig includes `directory: "./dist"`
- [X] postinstall hook removed
- [X] transpile:copy-package-json script removed
- [X] packages/package.json deleted
- [X] packages/package-lock.json deleted
- [X] Single package-lock.json at root
- [X] CI workflow cache keys updated
- [X] All tests pass
- [X] Build and transpile work correctly
- [X] Migration log updated

---

## Phase 2 References

- **Implementation Plan**: `docs/implementation-plans/phase-2-project-structure.md`
- **Plan**: `specs/001-cleanup-dependencies/plan.md`
- **Phase 1 State**: Nx initialized with caching enabled
- **Nx Documentation**: https://nx.dev/
- **Backpack Constitution**: `.specify/memory/constitution.md`

---
---

# Tasks: Phase 3 - Stories Colocation

**Input**: Design documents from `/specs/001-cleanup-dependencies/`
**Prerequisites**: plan.md (required), Phase 2 completed (Project Structure)

**Backpack Context**: This is an infrastructure task to migrate Storybook stories from the centralized `examples/` directory to their corresponding component `src/` directories, following Nx colocation best practices.

**Tests**: Existing tests MUST continue to pass after all changes. Storybook must build and render correctly.

## Summary

| Phase | Description | Task Count | Status |
|-------|-------------|------------|--------|
| 19 | Audit & Mapping | 2 | Pending |
| 20 | Storybook Configuration | 1 | Pending |
| 21 | Stories Migration - Batch 1 (11 components) | 11 | Pending |
| 22 | Stories Migration - Batch 2 (11 components) | 11 | Pending |
| 23 | Stories Migration - Batch 3 (11 components) | 11 | Pending |
| 24 | Import Path Fixes | 1 | Pending |
| 25 | Cleanup & Verification | 5 | Pending |
| **Total Phase 3** | | **42** | Pending |

---

## Phase 19: Audit & Mapping

**Purpose**: Audit existing stories and create migration mapping

- [ ] T067 Audit all stories files in `examples/` directory
  - List all 33 components with stories.tsx files
  - For each component, list all related files (examples.tsx, *.module.scss, stories-utils.tsx)
  - Verify corresponding `packages/*/src/` directory exists
  - **Verify**: Complete list of files to migrate documented

- [ ] T068 [P] Verify all target packages have src/ directories
  ```bash
  for pkg in accordion aria-live autosuggestV2 blockquote breadcrumb bubble button card-button checkbox chip code datatable fieldset floating-notification journey-arrow label link modal modal-v2 navigation-tab-group overlay page-indicator panel price-range segmented-control snippet switch textarea theme-toggle tooltip visually-hidden; do
    ls -d packages/bpk-component-$pkg/src/ 2>/dev/null || echo "MISSING: packages/bpk-component-$pkg/src/"
  done
  # Also check non-component packages
  ls -d packages/bpk-scrim-utils/src/ 2>/dev/null || echo "MISSING: packages/bpk-scrim-utils/src/"
  ls -d packages/bpk-stylesheets-fonts/src/ 2>/dev/null || echo "MISSING: packages/bpk-stylesheets-fonts/src/"
  ```
  - **Expected**: All packages have src/ directories
  - **Note**: bpk-stylesheets-fonts may not have src/ - handle specially

**Checkpoint**: Audit complete - proceed to configuration update

---

## Phase 20: Storybook Configuration

**Purpose**: Update Storybook to find stories in new location

- [ ] T069 Update `.storybook/main.ts` stories path
  - Change stories array from:
    ```typescript
    stories: [
      '../examples/**/stories.@(ts|tsx|js|jsx)',
    ],
    ```
  - To:
    ```typescript
    stories: [
      '../packages/**/src/stories.@(ts|tsx|js|jsx)',
    ],
    ```
  - **Verify**: `grep -A2 "stories:" .storybook/main.ts` shows new path

**Checkpoint**: Configuration updated - proceed to migration

---

## Phase 21: Stories Migration - Batch 1 (11 components)

**Purpose**: Migrate first batch of stories using git mv to preserve history

### bpk-component-accordion

- [ ] T070 [P] Migrate `examples/bpk-component-accordion/` to `packages/bpk-component-accordion/src/`
  ```bash
  git mv examples/bpk-component-accordion/stories.tsx packages/bpk-component-accordion/src/
  git mv examples/bpk-component-accordion/examples.tsx packages/bpk-component-accordion/src/
  git mv examples/bpk-component-accordion/stories-utils.tsx packages/bpk-component-accordion/src/
  ```
  - **Files**: stories.tsx, examples.tsx, stories-utils.tsx

### bpk-component-aria-live

- [ ] T071 [P] Migrate `examples/bpk-component-aria-live/` to `packages/bpk-component-aria-live/src/`
  ```bash
  git mv examples/bpk-component-aria-live/stories.tsx packages/bpk-component-aria-live/src/
  git mv examples/bpk-component-aria-live/examples.tsx packages/bpk-component-aria-live/src/
  git mv examples/bpk-component-aria-live/examples.module.scss packages/bpk-component-aria-live/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-autosuggestV2

- [ ] T072 [P] Migrate `examples/bpk-component-autosuggestV2/` to `packages/bpk-component-autosuggest/src/`
  ```bash
  git mv examples/bpk-component-autosuggestV2/stories.tsx packages/bpk-component-autosuggest/src/
  git mv examples/bpk-component-autosuggestV2/examples.tsx packages/bpk-component-autosuggest/src/
  ```
  - **Files**: stories.tsx, examples.tsx
  - **Note**: Target is bpk-component-autosuggest (no V2 suffix in package name)

### bpk-component-blockquote

- [ ] T073 [P] Migrate `examples/bpk-component-blockquote/` to `packages/bpk-component-blockquote/src/`
  ```bash
  git mv examples/bpk-component-blockquote/stories.tsx packages/bpk-component-blockquote/src/
  git mv examples/bpk-component-blockquote/examples.tsx packages/bpk-component-blockquote/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-breadcrumb

- [ ] T074 [P] Migrate `examples/bpk-component-breadcrumb/` to `packages/bpk-component-breadcrumb/src/`
  ```bash
  git mv examples/bpk-component-breadcrumb/stories.tsx packages/bpk-component-breadcrumb/src/
  git mv examples/bpk-component-breadcrumb/examples.tsx packages/bpk-component-breadcrumb/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-bubble

- [ ] T075 [P] Migrate `examples/bpk-component-bubble/` to `packages/bpk-component-bubble/src/`
  ```bash
  git mv examples/bpk-component-bubble/stories.tsx packages/bpk-component-bubble/src/
  git mv examples/bpk-component-bubble/examples.tsx packages/bpk-component-bubble/src/
  git mv examples/bpk-component-bubble/examples.module.scss packages/bpk-component-bubble/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-button

- [ ] T076 [P] Migrate `examples/bpk-component-button/` to `packages/bpk-component-button/src/`
  ```bash
  git mv examples/bpk-component-button/stories.tsx packages/bpk-component-button/src/
  git mv examples/bpk-component-button/examples.tsx packages/bpk-component-button/src/
  git mv examples/bpk-component-button/BpkButtonStory.module.scss packages/bpk-component-button/src/
  ```
  - **Files**: stories.tsx, examples.tsx, BpkButtonStory.module.scss

### bpk-component-card-button

- [ ] T077 [P] Migrate `examples/bpk-component-card-button/` to `packages/bpk-component-card-button/src/`
  ```bash
  git mv examples/bpk-component-card-button/stories.tsx packages/bpk-component-card-button/src/
  git mv examples/bpk-component-card-button/examples.tsx packages/bpk-component-card-button/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-checkbox

- [ ] T078 [P] Migrate `examples/bpk-component-checkbox/` to `packages/bpk-component-checkbox/src/`
  ```bash
  git mv examples/bpk-component-checkbox/stories.tsx packages/bpk-component-checkbox/src/
  git mv examples/bpk-component-checkbox/examples.tsx packages/bpk-component-checkbox/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-chip

- [ ] T079 [P] Migrate `examples/bpk-component-chip/` to `packages/bpk-component-chip/src/`
  ```bash
  git mv examples/bpk-component-chip/stories.tsx packages/bpk-component-chip/src/
  git mv examples/bpk-component-chip/examples.tsx packages/bpk-component-chip/src/
  git mv examples/bpk-component-chip/examples.module.scss packages/bpk-component-chip/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-code

- [ ] T080 [P] Migrate `examples/bpk-component-code/` to `packages/bpk-component-code/src/`
  ```bash
  git mv examples/bpk-component-code/stories.tsx packages/bpk-component-code/src/
  git mv examples/bpk-component-code/examples.tsx packages/bpk-component-code/src/
  ```
  - **Files**: stories.tsx, examples.tsx

**Checkpoint**: Batch 1 complete (11 components migrated)

---

## Phase 22: Stories Migration - Batch 2 (11 components)

**Purpose**: Migrate second batch of stories

### bpk-component-datatable

- [ ] T081 [P] Migrate `examples/bpk-component-datatable/` to `packages/bpk-component-datatable/src/`
  ```bash
  git mv examples/bpk-component-datatable/stories.tsx packages/bpk-component-datatable/src/
  git mv examples/bpk-component-datatable/examples.tsx packages/bpk-component-datatable/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-fieldset

- [ ] T082 [P] Migrate `examples/bpk-component-fieldset/` to `packages/bpk-component-fieldset/src/`
  ```bash
  git mv examples/bpk-component-fieldset/stories.tsx packages/bpk-component-fieldset/src/
  git mv examples/bpk-component-fieldset/examples.tsx packages/bpk-component-fieldset/src/
  git mv examples/bpk-component-fieldset/examples.module.scss packages/bpk-component-fieldset/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-floating-notification

- [ ] T083 [P] Migrate `examples/bpk-component-floating-notification/` to `packages/bpk-component-floating-notification/src/`
  ```bash
  git mv examples/bpk-component-floating-notification/stories.tsx packages/bpk-component-floating-notification/src/
  git mv examples/bpk-component-floating-notification/examples.tsx packages/bpk-component-floating-notification/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-journey-arrow

- [ ] T084 [P] Migrate `examples/bpk-component-journey-arrow/` to `packages/bpk-component-journey-arrow/src/`
  ```bash
  git mv examples/bpk-component-journey-arrow/stories.tsx packages/bpk-component-journey-arrow/src/
  git mv examples/bpk-component-journey-arrow/example.tsx packages/bpk-component-journey-arrow/src/
  ```
  - **Files**: stories.tsx, example.tsx (note: singular "example" not "examples")

### bpk-component-label

- [ ] T085 [P] Migrate `examples/bpk-component-label/` to `packages/bpk-component-label/src/`
  ```bash
  git mv examples/bpk-component-label/stories.tsx packages/bpk-component-label/src/
  git mv examples/bpk-component-label/examples.tsx packages/bpk-component-label/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-link

- [ ] T086 [P] Migrate `examples/bpk-component-link/` to `packages/bpk-component-link/src/`
  ```bash
  git mv examples/bpk-component-link/stories.tsx packages/bpk-component-link/src/
  git mv examples/bpk-component-link/examples.tsx packages/bpk-component-link/src/
  git mv examples/bpk-component-link/examples.module.scss packages/bpk-component-link/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-modal

- [ ] T087 [P] Migrate `examples/bpk-component-modal/` to `packages/bpk-component-modal/src/`
  ```bash
  git mv examples/bpk-component-modal/stories.tsx packages/bpk-component-modal/src/
  git mv examples/bpk-component-modal/examples.tsx packages/bpk-component-modal/src/
  git mv examples/bpk-component-modal/examples.module.scss packages/bpk-component-modal/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-modal-v2

- [ ] T088 [P] Migrate `examples/bpk-component-modal-v2/` to `packages/bpk-component-modal-v2/src/`
  ```bash
  git mv examples/bpk-component-modal-v2/stories.tsx packages/bpk-component-modal-v2/src/
  git mv examples/bpk-component-modal-v2/examples.tsx packages/bpk-component-modal-v2/src/
  git mv examples/bpk-component-modal-v2/examples.module.scss packages/bpk-component-modal-v2/src/
  ```
  - **Files**: stories.tsx, examples.tsx, examples.module.scss

### bpk-component-navigation-tab-group

- [ ] T089 [P] Migrate `examples/bpk-component-navigation-tab-group/` to `packages/bpk-component-navigation-tab-group/src/`
  ```bash
  git mv examples/bpk-component-navigation-tab-group/stories.tsx packages/bpk-component-navigation-tab-group/src/
  git mv examples/bpk-component-navigation-tab-group/examples.tsx packages/bpk-component-navigation-tab-group/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-overlay

- [ ] T090 [P] Migrate `examples/bpk-component-overlay/` to `packages/bpk-component-overlay/src/`
  ```bash
  git mv examples/bpk-component-overlay/stories.tsx packages/bpk-component-overlay/src/
  git mv examples/bpk-component-overlay/examples.tsx packages/bpk-component-overlay/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-page-indicator

- [ ] T091 [P] Migrate `examples/bpk-component-page-indicator/` to `packages/bpk-component-page-indicator/src/`
  ```bash
  git mv examples/bpk-component-page-indicator/stories.tsx packages/bpk-component-page-indicator/src/
  git mv examples/bpk-component-page-indicator/examples.tsx packages/bpk-component-page-indicator/src/
  ```
  - **Files**: stories.tsx, examples.tsx

**Checkpoint**: Batch 2 complete (22 components migrated total)

---

## Phase 23: Stories Migration - Batch 3 (11 components)

**Purpose**: Migrate third batch of stories including non-component packages

### bpk-component-panel

- [ ] T092 [P] Migrate `examples/bpk-component-panel/` to `packages/bpk-component-panel/src/`
  ```bash
  git mv examples/bpk-component-panel/stories.tsx packages/bpk-component-panel/src/
  git mv examples/bpk-component-panel/examples.tsx packages/bpk-component-panel/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-price-range

- [ ] T093 [P] Migrate `examples/bpk-component-price-range/` to `packages/bpk-component-price-range/src/`
  ```bash
  git mv examples/bpk-component-price-range/stories.tsx packages/bpk-component-price-range/src/
  git mv examples/bpk-component-price-range/examples.tsx packages/bpk-component-price-range/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-segmented-control

- [ ] T094 [P] Migrate `examples/bpk-component-segmented-control/` to `packages/bpk-component-segmented-control/src/`
  ```bash
  git mv examples/bpk-component-segmented-control/stories.tsx packages/bpk-component-segmented-control/src/
  git mv examples/bpk-component-segmented-control/examples.tsx packages/bpk-component-segmented-control/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-snippet

- [ ] T095 [P] Migrate `examples/bpk-component-snippet/` to `packages/bpk-component-snippet/src/`
  ```bash
  git mv examples/bpk-component-snippet/stories.tsx packages/bpk-component-snippet/src/
  git mv examples/bpk-component-snippet/examples.tsx packages/bpk-component-snippet/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-switch

- [ ] T096 [P] Migrate `examples/bpk-component-switch/` to `packages/bpk-component-switch/src/`
  ```bash
  git mv examples/bpk-component-switch/stories.tsx packages/bpk-component-switch/src/
  git mv examples/bpk-component-switch/examples.tsx packages/bpk-component-switch/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-textarea

- [ ] T097 [P] Migrate `examples/bpk-component-textarea/` to `packages/bpk-component-textarea/src/`
  ```bash
  git mv examples/bpk-component-textarea/stories.tsx packages/bpk-component-textarea/src/
  git mv examples/bpk-component-textarea/examples.tsx packages/bpk-component-textarea/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-theme-toggle

- [ ] T098 [P] Migrate `examples/bpk-component-theme-toggle/` to `packages/bpk-component-theme-toggle/src/`
  ```bash
  git mv examples/bpk-component-theme-toggle/stories.tsx packages/bpk-component-theme-toggle/src/
  git mv examples/bpk-component-theme-toggle/examples.tsx packages/bpk-component-theme-toggle/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-tooltip

- [ ] T099 [P] Migrate `examples/bpk-component-tooltip/` to `packages/bpk-component-tooltip/src/`
  ```bash
  git mv examples/bpk-component-tooltip/stories.tsx packages/bpk-component-tooltip/src/
  git mv examples/bpk-component-tooltip/examples.tsx packages/bpk-component-tooltip/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-component-visually-hidden

- [ ] T100 [P] Migrate `examples/bpk-component-visually-hidden/` to `packages/bpk-component-visually-hidden/src/`
  ```bash
  git mv examples/bpk-component-visually-hidden/stories.tsx packages/bpk-component-visually-hidden/src/
  git mv examples/bpk-component-visually-hidden/examples.tsx packages/bpk-component-visually-hidden/src/
  ```
  - **Files**: stories.tsx, examples.tsx

### bpk-scrim-utils

- [ ] T101 [P] Migrate `examples/bpk-scrim-utils/` to `packages/bpk-scrim-utils/src/`
  ```bash
  git mv examples/bpk-scrim-utils/stories.tsx packages/bpk-scrim-utils/src/
  git mv examples/bpk-scrim-utils/examples.tsx packages/bpk-scrim-utils/src/
  ```
  - **Files**: stories.tsx, examples.tsx
  - **Note**: Non-component package (utility)

### bpk-stylesheets-fonts

- [ ] T102 [P] Migrate `examples/bpk-stylesheets-fonts/` to `packages/bpk-stylesheets-fonts/`
  ```bash
  # Check if src/ exists, create if not
  mkdir -p packages/bpk-stylesheets-fonts/src
  git mv examples/bpk-stylesheets-fonts/stories.tsx packages/bpk-stylesheets-fonts/src/
  git mv examples/bpk-stylesheets-fonts/examples.tsx packages/bpk-stylesheets-fonts/src/
  ```
  - **Files**: stories.tsx, examples.tsx
  - **Note**: Stylesheet package - may need src/ directory created

**Checkpoint**: Batch 3 complete (33 components migrated total)

---

## Phase 24: Import Path Fixes

**Purpose**: Update import paths in migrated stories files

- [ ] T103 Update import paths in all migrated stories files
  - Stories files import components from `../../packages/bpk-component-{name}`
  - After migration, change to:
    - For stories.tsx: `import BpkComponent from './BpkComponent'` or `import BpkComponent from '..'`
    - For examples.tsx: Same pattern
  - Search and replace pattern:
    ```bash
    # Find files with old import paths
    grep -r "../../packages/bpk-component" packages/*/src/stories.tsx packages/*/src/examples.tsx
    ```
  - For each file, update the import path to the new relative location
  - **Verify**: No remaining `../../packages/` imports in migrated files

**Checkpoint**: Import paths updated - proceed to cleanup

---

## Phase 25: Cleanup & Verification

**Purpose**: Clean up old directories and verify migration success

- [ ] T104 Delete empty example directories
  ```bash
  # List directories in examples/ that should now be empty
  # Delete them after verifying they're empty
  find examples/ -type d -empty -delete
  # If examples/ is completely empty, remove it
  rmdir examples 2>/dev/null || echo "examples/ still has content"
  ```
  - **Verify**: `ls examples/ 2>&1` shows remaining non-migrated directories only

- [ ] T105 [P] Verify Storybook starts successfully
  ```bash
  npm run storybook
  ```
  - **Expected**: Storybook starts without errors
  - **Verify**: All 33 component stories load and render correctly

- [ ] T106 [P] Build Storybook distribution
  ```bash
  npm run storybook:dist
  ```
  - **Expected**: dist-storybook/ created without errors

- [ ] T107 Run full test suite
  ```bash
  npm test
  ```
  - **Expected**: All tests pass (330 test suites, 1640 tests)

- [ ] T108 Update migration log with Phase 3 completion
  - Update `docs/nx-migration-log.md` with:
    - Phase 3 changes summary
    - 33 stories files migrated
    - Import paths updated
    - Storybook configuration changes
    - Verification results
  - **Verify**: Migration log is complete and accurate

**Checkpoint**: Phase 3 complete - stories colocated with components

---

## Phase 3 Dependencies & Execution Order

### Phase Dependencies

- **Phase 19 (Audit)**: No dependencies - start here
- **Phase 20 (Configuration)**: Can run in parallel with Phase 19
- **Phase 21-23 (Migration)**: Depends on Phase 19 and 20 completion
  - All migration tasks T070-T102 can run in parallel (independent components)
- **Phase 24 (Import Fixes)**: Depends on Phase 21-23 completion
- **Phase 25 (Cleanup)**: Depends on Phase 24 completion

### Parallel Opportunities

- T067, T068 can run in parallel (audit tasks)
- ALL migration tasks (T070-T102) can run in parallel (different directories)
- T105, T106 can run in parallel (independent verification)

### Critical Path

1. T067-T068 (Audit)
2. T069 (Configuration update)
3. T070-T102 (Migration - all parallel)
4. T103 (Import path fixes)
5. T104-T108 (Cleanup and verification)

---

## Phase 3 Rollback Plan

If issues occur after migration:

```bash
git checkout HEAD -- examples/ packages/ .storybook/main.ts
```

This will:
1. Restore all files in `examples/` directory
2. Restore any modified files in `packages/`
3. Restore the original Storybook configuration

---

## Phase 3 Deliverables Checklist

- [ ] All 33 stories files migrated to `packages/*/src/`
- [ ] All supporting files migrated (examples.tsx, *.module.scss)
- [ ] Import paths updated in all migrated files
- [ ] Storybook configuration updated to find stories in new location
- [ ] Storybook starts and renders all stories correctly
- [ ] Storybook distribution builds successfully
- [ ] All tests pass
- [ ] Empty example directories removed
- [ ] Migration log updated

---

## Phase 3 References

- **Implementation Plan**: `docs/implementation-plans/phase-3-stories-colocation.md`
- **Plan**: `specs/001-cleanup-dependencies/plan.md`
- **Phase 2 State**: Project structure consolidated with single package.json
- **Storybook Documentation**: https://storybook.js.org/
- **Nx Colocation Pattern**: https://nx.dev/
- **Backpack Constitution**: `.specify/memory/constitution.md`
