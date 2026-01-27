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

| Phase | Description | Task Count |
|-------|-------------|------------|
| 1 | Setup & Audit | 4 |
| 2 | User Story 1 - Dependency Updates (P1) | 13 |
| 3 | User Story 2 - Version Tightening (P1) | 5 |
| 4 | User Story 3 - Audit Report (P2) | 3 |
| 5 | Finalization | 6 |
| **Total** | | **31** |

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
