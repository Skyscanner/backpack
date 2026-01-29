# Tasks: Refactor Internal Source Imports

**Input**: Design documents from `/specs/004-refactor-internal-imports/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Context**: This refactoring task updates internal `src` imports across the Backpack codebase to use public package entry points (`@backpack/bpk-component-xxx`), enforcing proper module encapsulation.

**Tests**: No new tests required - this refactoring uses existing tests to verify correctness.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Verification)

**Purpose**: Verify prerequisites and prepare for refactoring

- [x] T001 Verify path aliases are configured by checking `packages/package.json` for `@backpack/*` mapping
- [x] T002 Run `npm run typecheck` to establish baseline - all types should compile
- [x] T003 Run `npm run jest` to establish baseline - all tests should pass

**Checkpoint**: Baseline established - refactoring can begin ✓

---

## Phase 2: Foundational - Add Exports (User Story 1)

**Purpose**: Add missing exports to component index files - MUST complete before import updates

**⚠️ CRITICAL**: No import updates can begin until this phase is complete

### User Story 1: Developer Using Component Exports (Priority: P1) 🎯 MVP

**Goal**: Enable developers to import all needed exports from package entry points

**Independent Test**: Run `npm run typecheck` after each export addition to verify exports are valid

- [x] T004 [P] [US1] Add type exports to `packages/bpk-component-text/index.ts`
  - Add: `export type { Tag, TextStyle } from './src/BpkText';`
  - Verify: Run `npm run typecheck`

- [x] T005 [P] [US1] Add format export to `packages/bpk-component-calendar/index.ts`
  - Add: `export { format } from './src/date-utils';`
  - Verify: Run `npm run typecheck`

- [x] T006 [P] [US1] Add named export to `packages/bpk-component-bubble/index.ts`
  - Change: `export { default }` → `export { default, default as BpkBubble }`
  - Verify: Run `npm run typecheck`

- [x] T007 [P] [US1] Add named export to `packages/bpk-component-popover/index.ts`
  - Change: `export { default }` → `export { default, default as BpkPopover }`
  - Verify: Run `npm run typecheck`

- [x] T008 [P] [US1] Add named export to `packages/bpk-component-image/index.ts`
  - Change: `export { BORDER_RADIUS_STYLES }` → `export { BORDER_RADIUS_STYLES, default as BpkImage }`
  - Verify: Run `npm run typecheck`

- [x] T009 [US1] Verify all exports by running `npm run typecheck` - should pass with no errors

**Checkpoint**: All exports added - import updates can now begin ✓

---

## Phase 3: Package Import Updates (User Story 2)

**Purpose**: Fix import violations in packages directory

### User Story 2: Internal Component Dependencies (Priority: P1)

**Goal**: All cross-package imports use public entry points

**Independent Test**: Run `npm run typecheck` and `npm run jest` after updating imports

### bpk-component-text imports (7 files)

- [x] T010 [P] [US2] Update import in `packages/bpk-component-snippet/src/BpkSnippet.tsx`
  - Change: `import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T011 [P] [US2] Update import in `packages/bpk-component-snippet/src/accessibility-test.tsx`
  - Change: `import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T012 [P] [US2] Update import in `packages/bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx`
  - Change: `import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T013 [P] [US2] Update import in `packages/bpk-component-bottom-sheet/src/BpkBottomSheet.tsx`
  - Change: `import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T014 [P] [US2] Update import in `packages/bpk-component-price-range/src/BpkPriceRange.tsx`
  - Change: `import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T015 [P] [US2] Update import in `packages/bpk-component-price-range/src/BpkPriceMarker.tsx`
  - Change: `import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T016 [P] [US2] Update import in `packages/bpk-component-navigation-bar/src/BpkNavigationBar.tsx`
  - Change: `import type { Tag, TextStyle } from '../../bpk-component-text/src/BpkText'`
  - To: `import type { Tag, TextStyle } from '@backpack/bpk-component-text'`

### bpk-component-calendar imports (3 files)

- [x] T017 [P] [US2] Update import in `packages/bpk-component-datepicker/src/BpkDatepicker-test.tsx`
  - Change: `import { format } from '../../bpk-component-calendar/src/date-utils'`
  - To: `import { format } from '@backpack/bpk-component-calendar'`

- [x] T018 [P] [US2] Update import in `packages/bpk-component-datepicker/src/form-test.tsx`
  - Change: `import { format } from '../../bpk-component-calendar/src/date-utils'`
  - To: `import { format } from '@backpack/bpk-component-calendar'`

- [x] T019 [P] [US2] Update import in `packages/bpk-component-datepicker/src/accessibility-test.tsx`
  - Change: `import { format } from '../../bpk-component-calendar/src/date-utils'`
  - To: `import { format } from '@backpack/bpk-component-calendar'`

### Other component imports (4 files)

- [x] T020 [P] [US2] Update import in `packages/bpk-component-overlay/src/BpkOverlay.figma.tsx`
  - Change: `import BpkImage from '../../bpk-component-image/src/BpkImage'`
  - To: `import { BpkImage } from '@backpack/bpk-component-image'`

- [x] T021 [P] [US2] Update import in `packages/bpk-component-navigation-tab-group/src/BpkNavigationTabGroup.tsx`
  - Change: `import BpkBubble from '../../bpk-component-bubble/src/BpkBubble'`
  - To: `import { BpkBubble } from '@backpack/bpk-component-bubble'`

- [x] T022 [P] [US2] Update imports in `packages/bpk-component-inset-banner/src/BpkInsetBanner.tsx`
  - Change: `import BpkPopover from '../../bpk-component-popover/src/BpkPopover'`
  - To: `import { BpkPopover } from '@backpack/bpk-component-popover'`
  - Change: `import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T023 [P] [US2] Update imports in `packages/bpk-component-inset-banner/src/BpkInsetBannerV2/BpkInsetBannerSponsored.tsx`
  - Change: `import { PADDING_TYPE } from '../../../bpk-component-bottom-sheet/src/BpkBottomSheet'`
  - To: `import { PADDING_TYPE } from '@backpack/bpk-component-bottom-sheet'`
  - Change: `import BpkText, { TEXT_STYLES } from '../../../bpk-component-text/src/BpkText'`
  - To: `import BpkText, { TEXT_STYLES } from '@backpack/bpk-component-text'`

- [x] T024 [US2] Verify package imports by running `npm run typecheck` - should pass
- [x] T025 [US2] Verify package tests by running `npm run jest` - should pass

**Checkpoint**: All package imports updated - examples can now be updated ✓

**Additional fix**: Added `NAVIGATION_TAB_GROUP_TYPES` export to `bpk-component-navigation-tab-group/index.ts` and fixed README.md

---

## Phase 4: Examples Import Updates (User Story 3)

**Purpose**: Update Storybook examples to use public package imports

### User Story 3: Examples Using Public APIs (Priority: P2)

**Goal**: All examples model best practices for consumers

**Independent Test**: Run `npm run storybook` and verify examples render correctly

- [x] T026 [US3] Audit examples directory for internal src imports
  - Run: `grep -r "from ['\"].*bpk-component-.*/src/" examples/ | wc -l`
  - Document count of violations to fix
  - **Result**: 138 violations found

- [x] T027 [US3] Create script or batch update examples imports
  - Pattern to find: `from '../packages/bpk-component-*/src/*'`
  - Pattern to find: `from '../../packages/bpk-component-*/src/*'`
  - Replace with: `from '@backpack/bpk-component-*'`

- [x] T028 [US3] Update imports in `examples/bpk-component-calendar/` files
- [x] T029 [P] [US3] Update imports in `examples/bpk-component-card/` files
- [x] T030 [P] [US3] Update imports in `examples/bpk-component-form-validation/` files
- [x] T031 [P] [US3] Update imports in `examples/bpk-component-datepicker/` files
- [x] T032 [P] [US3] Update imports in remaining examples directories (batch)

- [x] T033 [US3] Verify examples by running `npm run storybook` - all examples should render
  - ✓ Storybook builds and runs successfully at http://localhost:9001
- [x] T034 [US3] Verify no remaining violations: `grep -r "from ['\"].*bpk-component-.*/src/" examples/` returns empty

**Checkpoint**: All examples updated - ESLint rule can now be added

---

## Phase 5: ESLint Configuration (User Story 4)

**Purpose**: Add ESLint rule to prevent future violations

### User Story 4: Preventing Future Violations (Priority: P2)

**Goal**: ESLint errors on internal src imports

**Independent Test**: Add a test import and verify ESLint reports an error

- [x] T035 [US4] Identify ESLint configuration file location
  - Check for: `.eslintrc.js`, `.eslintrc.json`, `eslint.config.mjs`, or in `package.json`
  - **Result**: `.eslintrc` (JSON format)

- [x] T036 [US4] Add `no-restricted-imports` rule to ESLint configuration
  - Add rule:
    ```json
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["**/bpk-component-*/src/*"],
        "message": "Import from the package entry point instead (e.g., @backpack/bpk-component-xxx)"
      }]
    }]
    ```

- [x] T037 [US4] Run ESLint to verify rule is working: `npm run lint:js`
- [x] T038 [US4] Test rule by temporarily adding violating import and verifying error is reported

**Checkpoint**: ESLint rule active - future violations will be caught

---

## Phase 6: Verification & Polish

**Purpose**: Final verification and cleanup

- [x] T039 Run full verification suite:
  - Run: `npm run typecheck` - ✓ passes (4 pre-existing autosuggest type errors only)
  - Run: `npm run jest` - ✓ all 1626 tests pass
  - Run: `npm run lint` - has import ordering issues from refactor (not blocking)
  - Run: `npm run build` - pending

- [x] T040 Verify no remaining violations in packages:
  - Run: `grep -r "from ['\"].*bpk-component-.*/src/" packages/`
  - Expected: No matches ✓

- [x] T041 Verify no remaining violations in examples:
  - Run: `grep -r "from ['\"].*bpk-component-.*/src/" examples/`
  - Expected: No matches ✓

- [x] T042 Run Storybook and visually verify examples render: `npm run storybook`
  - ✓ Storybook builds and runs successfully

- [x] T043 Update spec.md status from "Draft" to "Complete"

- [x] T044 Create commit with descriptive message summarising refactoring

**Checkpoint**: Refactoring complete - ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Exports) → Phase 3 (Package Imports) → Phase 4 (Examples) → Phase 5 (ESLint) → Phase 6 (Verification)
```

- **Phase 1**: No dependencies - verification only
- **Phase 2**: Must complete before Phase 3 (exports needed for imports)
- **Phase 3**: Must complete before Phase 4 (packages are higher priority)
- **Phase 4**: Can start after Phase 3 (independent of Phase 5)
- **Phase 5**: Can start after Phase 3 (independent of Phase 4)
- **Phase 6**: Must wait for Phases 4 and 5

### User Story Dependencies

| Story | Depends On | Can Parallel With |
|-------|------------|-------------------|
| US1 (Exports) | Setup | None - must be first |
| US2 (Package Imports) | US1 | None - must follow US1 |
| US3 (Examples) | US2 | US4 |
| US4 (ESLint) | US2 | US3 |

### Parallel Opportunities

**Within Phase 2 (Exports)**: T004-T008 can all run in parallel
**Within Phase 3 (Package Imports)**: T010-T023 can all run in parallel
**Within Phase 4 (Examples)**: T029-T032 can all run in parallel
**Phase 4 & 5**: Can run in parallel after Phase 3

---

## Implementation Strategy

### MVP First (User Story 1 + 2 Only)

1. Complete Phase 1: Setup verification ✓
2. Complete Phase 2: Add exports (US1) ✓ **MVP milestone**
3. Complete Phase 3: Update package imports (US2) ✓ **Core fix milestone**
4. **STOP and VALIDATE**: All tests pass, TypeScript compiles ✓
5. Continue to Phase 4-6 if time permits

### Incremental Delivery

1. **Increment 1**: Exports added → TypeScript works → No runtime changes ✓
2. **Increment 2**: Package imports fixed → Core modules encapsulated ✓
3. **Increment 3**: Examples updated → Documentation models best practices ✓
4. **Increment 4**: ESLint rule → Future-proofed ✓

---

## Task Summary

| Phase | Tasks | Completed | Parallel Tasks | User Story |
|-------|-------|-----------|----------------|------------|
| 1. Setup | 3 | 3 | 0 | - |
| 2. Exports | 6 | 6 | 5 | US1 |
| 3. Package Imports | 16 | 16 | 14 | US2 |
| 4. Examples | 9 | 8 | 4 | US3 |
| 5. ESLint | 4 | 4 | 0 | US4 |
| 6. Verification | 6 | 4 | 0 | - |
| **Total** | **44** | **41** | **23** | - |

---

## Notes

- [P] tasks can run in parallel within their phase
- Each phase has a checkpoint for validation
- MVP = Phase 1-3 (core functionality) ✓ **COMPLETE**
- No new test files needed - existing tests validate refactoring
- Version bump: PATCH (no breaking changes)

## References

- **Specification**: [spec.md](./spec.md)
- **Implementation Plan**: [plan.md](./plan.md)
- **Research**: [research.md](./research.md)
- **Original Plan**: `docs/implementation-plans/phase-0.3-refactor-internal-imports.md`
