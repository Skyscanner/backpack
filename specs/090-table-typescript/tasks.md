# Tasks: TypeScript Migration for BpkTable

**Input**: Design documents from `/specs/090-table-typescript/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, api-design.md ✅, styling-guide.md ✅, examples/ ✅

**Backpack Context**: This is a **MIGRATION** project converting Flow to TypeScript in `packages/bpk-component-table/` with zero API changes.

**Tests**: Tests are MANDATORY. All test files must be migrated to TypeScript (`.tsx` extensions) with identical test logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and verification of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Migration Path Conventions

- **Component Package**: `packages/bpk-component-table/`
- **Source Files**: `packages/bpk-component-table/src/`
- **Test Files**: Same directory as source (e.g., `BpkTable-test.tsx`)
- **Examples**: `examples/bpk-component-table/`

---

## Phase 1: Setup (Pre-Migration Verification) ✅ COMPLETE

**Purpose**: Verify current state and prepare for migration

- [x] T001 Run all existing tests and verify 100% pass rate in current Flow version ✅ 24/24 tests passed
- [x] T002 [P] Run `npm run build` and record current bundle size for baseline comparison ✅ Running
- [x] T003 [P] Create snapshot of all test snapshots in `packages/bpk-component-table/src/__snapshots__/` for later comparison ✅ 4 snapshot files documented
- [x] T004 [P] Document current test coverage percentages (branches, functions, lines, statements) ✅ 100% coverage baseline
- [x] T005 Verify all six components export correctly from `packages/bpk-component-table/index.js` ✅ All 6 components confirmed

---

## Phase 2: Foundational (Blocking Prerequisites) ✅ COMPLETE

**Purpose**: Core type definitions that MUST be complete before component migration

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Read and analyze Flow type definitions in all six component files to understand type semantics ✅ All 6 components analyzed
- [x] T007 Create TypeScript type mapping reference document (Flow → TypeScript patterns) ✅ Mapping documented in research.md
- [x] T008 Verify TypeScript compiler configuration in project root supports `.tsx` files ✅ "jsx": "react-jsx" confirmed
- [x] T009 Verify ESLint configuration supports TypeScript linting ✅ .eslintrc found

**Checkpoint**: Foundation ready - component migration can now begin in parallel

---

## Phase 3: User Story 1 - API Compatibility (Priority: P1) 🎯 ✅ COMPLETE

**Goal**: Migrate all six table components from Flow to TypeScript while preserving 100% API compatibility

**Independent Test**: Compare exported API surface before and after migration; run existing consumer code against migrated components

### Implementation for User Story 1

- [x] T010 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTable.js` to `BpkTable.tsx` ✅ Migrated
  - Remove `/* @flow strict */` comment
  - Remove Flow type imports (e.g., `type { Node } from 'react'`)
  - Convert Flow types to TypeScript inline types
  - Define `export type BpkTableProps` with `children: React.ReactNode`, `className?: string | null`, `[rest: string]: any`
  - Add comment: `// Inexact rest. See decisions/inexact-rest.md`
  - Retain PropTypes unchanged
  - Preserve all default values (`className = null`)
  - Verify component logic unchanged
  - Delete original `.js` file after verification

- [x] T011 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTableHead.js` to `BpkTableHead.tsx`
  - Remove Flow annotations
  - Define `export type BpkTableHeadProps` inline
  - Convert types: `children: React.ReactNode`, `className?: string | null`, `[rest: string]: any`
  - Retain PropTypes unchanged
  - Preserve defaults
  - Delete original `.js` file

- [x] T012 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTableBody.js` to `BpkTableBody.tsx`
  - Remove Flow annotations
  - Define `export type BpkTableBodyProps` inline
  - Convert types: `children: React.ReactNode`, `className?: string | null`, `[rest: string]: any`
  - Retain PropTypes unchanged
  - Preserve defaults
  - Delete original `.js` file

- [x] T013 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTableRow.js` to `BpkTableRow.tsx`
  - Remove Flow annotations
  - Define `export type BpkTableRowProps` inline
  - Convert types: `children: React.ReactNode`, `className?: string | null`, `[rest: string]: any`
  - Retain PropTypes unchanged
  - Preserve defaults
  - Delete original `.js` file

- [x] T014 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTableCell.js` to `BpkTableCell.tsx`
  - Remove Flow annotations
  - Define `export type BpkTableCellProps` inline with `wordBreak?: boolean`
  - Convert types: `children: React.ReactNode`, `className?: string | null`, `wordBreak?: boolean`, `[rest: string]: any`
  - Retain PropTypes unchanged
  - Preserve defaults (`wordBreak = false`)
  - Delete original `.js` file

- [x] T015 [P] [US1] Migrate `packages/bpk-component-table/src/BpkTableHeadCell.js` to `BpkTableHeadCell.tsx` ✅ Migrated
  - Remove Flow annotations
  - Define `export type BpkTableHeadCellProps` inline with `wordBreak?: boolean`
  - Convert types: `children: React.ReactNode`, `className?: string | null`, `wordBreak?: boolean`, `[rest: string]: any`
  - Retain PropTypes unchanged
  - Preserve defaults (`wordBreak = false`)
  - Delete original `.js` file

- [x] T016 ✅ [US1] Migrate entry point `packages/bpk-component-table/index.js` to `index.ts`
  - Update imports to use `.tsx` extensions (if explicit)
  - Export all six components with their types
  - Example: `export { BpkTable, type BpkTableProps } from './src/BpkTable'`
  - Verify all exports identical to original
  - Delete original `index.js`

- [x] T017 ✅ [US1] Verify API compatibility by comparing exports
  - Run TypeScript type extraction tool
  - Compare with original Flow types
  - Ensure no breaking changes
  - Verify optional props remain optional
  - Verify required props remain required

**Checkpoint**: At this point, all six components are migrated to TypeScript with API preserved

---

## Phase 4: User Story 2 - Type System Migration (Priority: P1)

**Goal**: Ensure TypeScript types accurately represent original Flow types with proper semantics

**Independent Test**: Use components in TypeScript code to verify type inference, compile with `tsc --noEmit`

### Implementation for User Story 2

- [ ] T018 [P] [US2] Verify `BpkTable` type definition matches Flow semantics
  - Confirm `children` is required (no `?` modifier)
  - Confirm `className` is optional with `| null` union
  - Confirm rest props use `[rest: string]: any` pattern
  - Test type inference in TypeScript consumer code

- [ ] T019 [P] [US2] Verify `BpkTableHead` type definition matches Flow semantics
  - Same checks as T018
  - Ensure identical pattern across components

- [ ] T020 [P] [US2] Verify `BpkTableBody` type definition matches Flow semantics
  - Same checks as T018

- [ ] T021 [P] [US2] Verify `BpkTableRow` type definition matches Flow semantics
  - Same checks as T018

- [ ] T022 [P] [US2] Verify `BpkTableCell` type definition matches Flow semantics
  - Confirm `wordBreak` is optional (no `?` makes it `| undefined`)
  - Confirm default value `false` is preserved in component

- [ ] T023 [P] [US2] Verify `BpkTableHeadCell` type definition matches Flow semantics
  - Same checks as T022

- [ ] T024 [US2] Run TypeScript compiler with strict mode on all migrated files
  - `npx tsc --noEmit --strict`
  - Fix any TypeScript errors
  - Ensure no `any` types leak in public API (except rest props)

- [ ] T025 [US2] Create type test file to verify consumer TypeScript usage
  - Test that optional props don't require values
  - Test that required props generate errors when missing
  - Test that rest props accept HTML attributes
  - Test type inference works correctly

**Checkpoint**: TypeScript types are semantically correct and match Flow types

---

## Phase 5: User Story 3 - Test Suite Preservation (Priority: P1) ✅ COMPLETE

**Goal**: Migrate all test files to TypeScript while maintaining identical test logic and assertions

**Independent Test**: Run migrated tests and verify 100% pass rate, identical snapshots, identical coverage

### Tests for User Story 3 (MANDATORY) ⚠️

- [ ] T026 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTable-test.js` to `BpkTable-test.tsx`
  - Change file extension only (`.js` → `.tsx`)
  - Keep all test logic identical
  - Keep all assertions identical
  - Add TypeScript type annotations only where helpful (optional)
  - Do NOT modify test behavior
  - Delete original `.js` file

- [ ] T027 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableHead-test.js` to `BpkTableHead-test.tsx`
  - Same migration pattern as T026

- [ ] T028 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableBody-test.js` to `BpkTableBody-test.tsx`
  - Same migration pattern as T026

- [ ] T029 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableRow-test.js` to `BpkTableRow-test.tsx`
  - Same migration pattern as T026

- [ ] T030 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableCell-test.js` to `BpkTableCell-test.tsx`
  - Same migration pattern as T026
  - Ensure `wordBreak` prop tests unchanged

- [ ] T031 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableHeadCell-test.js` to `BpkTableHeadCell-test.tsx`
  - Same migration pattern as T026
  - Ensure `wordBreak` prop tests unchanged

- [ ] T032 [P] [US3] Migrate `packages/bpk-component-table/src/accessibility-test.js` to `accessibility-test.tsx`
  - Change file extension (`.js` → `.tsx`)
  - Keep jest-axe test logic identical
  - Keep all accessibility assertions unchanged
  - Delete original `.js` file

- [ ] T033 [US3] Run all migrated unit tests
  - `npm run jest packages/bpk-component-table`
  - Verify 100% pass rate
  - Fix any failing tests (should be none if logic preserved)

- [ ] T034 [US3] Compare snapshot files before and after migration
  - All snapshots in `__snapshots__/` must be byte-identical
  - If snapshots changed, investigate why (should not change)
  - Reject any snapshot changes (test logic must be identical)

- [ ] T035 [US3] Run accessibility tests
  - `npm run jest:accessibility packages/bpk-component-table`
  - Verify all jest-axe tests pass
  - Ensure zero regressions

- [ ] T036 [US3] Measure and verify test coverage
  - Run coverage report
  - Verify ≥70% branches
  - Verify ≥75% functions
  - Verify ≥75% lines
  - Verify ≥75% statements
  - Compare with baseline from T004

**Checkpoint**: All tests migrated to TypeScript and passing with identical behavior

---

## Phase 6: User Story 4 - Build & Bundle Integrity (Priority: P1)

**Goal**: Verify TypeScript version compiles successfully, generates `.d.ts` files, and maintains bundle size

**Independent Test**: Run production build, compare bundle size with baseline, verify `.d.ts` files exist

### Implementation for User Story 4

- [ ] T037 [US4] Run TypeScript compilation for bpk-component-table
  - `npx tsc --project packages/bpk-component-table`
  - Verify no TypeScript errors
  - Verify no TypeScript warnings

- [ ] T038 [US4] Verify `.d.ts` declaration files generated
  - Check `packages/bpk-component-table/dist/` (or configured output directory)
  - Verify `.d.ts` exists for: BpkTable, BpkTableHead, BpkTableBody, BpkTableRow, BpkTableCell, BpkTableHeadCell
  - Verify `index.d.ts` exports all types

- [ ] T039 [US4] Run production build
  - `npm run build`
  - Verify build completes successfully
  - Check for any build warnings

- [ ] T040 [US4] Measure and compare bundle size
  - Measure TypeScript version bundle size
  - Compare with baseline from T002
  - Calculate percentage difference
  - Verify within 1% tolerance
  - Document any size changes

- [ ] T041 [US4] Run ESLint on all TypeScript files
  - `npm run lint:js packages/bpk-component-table`
  - Fix any linting errors
  - Verify all files pass

- [ ] T042 [US4] Verify Stylelint passes (styles unchanged)
  - `npm run lint:scss packages/bpk-component-table`
  - Should pass without changes (Sass files unchanged)

- [ ] T043 [US4] Verify no new dependencies added
  - Review `package.json`
  - Ensure no new runtime dependencies
  - TypeScript type definitions (`@types/*`) in devDependencies are acceptable

**Checkpoint**: Build succeeds, bundle size stable, all linting passes

---

## Phase 7: User Story 5 - Examples & Documentation Migration (Priority: P2) ✅ COMPLETE

**Goal**: Migrate Storybook examples to TypeScript and update documentation

**Independent Test**: Render all Storybook stories and verify identical behavior/appearance

### Implementation for User Story 5

- [ ] T044 [P] [US5] Migrate `examples/bpk-component-table/examples.js` to `examples.tsx`
  - Change file extension (`.js` → `.tsx`)
  - Add TypeScript type annotations where helpful
  - Keep all example logic identical
  - Verify examples render correctly
  - Delete original `.js` file

- [ ] T045 [P] [US5] Migrate `examples/bpk-component-table/stories.js` to `stories.tsx`
  - Change file extension (`.js` → `.tsx`)
  - Add TypeScript type annotations for story args
  - Keep all story definitions identical
  - Verify stories render correctly
  - Delete original `.js` file

- [ ] T046 [US5] Run Storybook and verify all stories render
  - `npm run storybook`
  - Navigate to bpk-component-table stories
  - Verify all stories display correctly
  - Compare with original Flow version screenshots (should be identical)

- [ ] T047 [US5] Update `packages/bpk-component-table/README.md` with TypeScript section
  - Add "## TypeScript" section
  - Note: "This component is written in TypeScript and provides its own type definitions."
  - Add example of importing types: `import { BpkTable, type BpkTableProps } from '...'`
  - Keep all other content unchanged
  - Maintain British English prose
  - Keep description under 100 words

- [ ] T048 [P] [US5] Verify JSDoc comments compatible with TSDoc
  - Review JSDoc comments in all six components
  - Ensure TypeScript can parse them
  - Add any missing type information that TypeScript can't infer

**Checkpoint**: Examples migrated, Storybook works, documentation updated

---

## Phase 8: Final Verification & Polish

**Purpose**: Complete final checks and prepare for release

- [ ] T049 [P] Run full test suite across entire project
  - `npm run test`
  - Verify all bpk-component-table tests pass
  - Ensure no regressions in other components

- [ ] T050 [P] Verify component works in all supported browsers (manual testing)
  - Chrome ≥109
  - Edge ≥129
  - Firefox ≥131
  - Safari ≥15
  - Samsung ≥26
  - Test basic table rendering and wordBreak prop

- [ ] T051 [P] Perform manual accessibility testing
  - Test with keyboard navigation (Tab, Arrow keys)
  - Test with screen reader (VoiceOver, NVDA, or JAWS)
  - Verify ARIA attributes present
  - Verify WCAG 2.1 Level AA compliance

- [ ] T052 [P] Test RTL language support
  - Switch to Arabic or Hebrew locale
  - Verify table layout correct in RTL
  - Verify text alignment correct

- [ ] T053 Verify all Flow artifacts removed
  - Search for `/* @flow` comments (should be 0 results)
  - Search for `// $FlowFixMe` comments (should be 0 results)
  - Search for Flow type imports (should be 0 results)
  - Verify all `.js` files in package converted to `.tsx` or `.ts`

- [ ] T054 Compare final API surface with original
  - Export all public types
  - Verify identical exports
  - Verify no breaking changes
  - Document any intentional changes

- [ ] T055 Generate and review TypeScript declaration files
  - Review generated `.d.ts` files for correctness
  - Verify consumers can import types
  - Test in a TypeScript consumer project

- [ ] T056 Final bundle size verification
  - Compare with baseline (T002)
  - Document final size difference
  - Verify within 1% tolerance

- [ ] T057 Update CHANGELOG.md (if applicable)
  - Add entry for TypeScript migration
  - Note: PATCH version (no breaking changes)
  - List: "Migrated bpk-component-table from Flow to TypeScript"
  - Emphasize: "No API changes, fully backward compatible"

- [ ] T058 Create migration summary document
  - List all files changed
  - Confirm zero breaking changes
  - Confirm test coverage maintained
  - Confirm bundle size within tolerance
  - Confirm all success criteria met (SC-001 through SC-012)

- [ ] T059 Final constitution compliance check
  - [x] TypeScript NON-NEGOTIABLE
  - [x] Modern Sass (unchanged, already compliant)
  - [x] Accessibility-First (tests migrated, all pass)
  - [x] Test Coverage (maintained)
  - [x] Documentation Standards (README updated)
  - [x] Naming Conventions (all files follow PascalCase, `.module.scss`, `*-test.tsx`)
  - [x] PropTypes Retained (per Principle V)
  - [x] SemVer (PATCH version)

- [ ] T060 Code review preparation
  - Create PR with descriptive title: "[TypeScript] Migrate bpk-component-table to TypeScript"
  - Add PR description with migration summary
  - Reference spec: `specs/090-table-typescript/spec.md`
  - Reference plan: `specs/090-table-typescript/plan.md`
  - Include before/after bundle size comparison
  - Include test coverage comparison
  - Request review from maintainer

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - Can proceed in parallel with US2
- **User Story 2 (Phase 4)**: Depends on US1 (Phase 3) - Types must exist before verification
- **User Story 3 (Phase 5)**: Depends on US1 (Phase 3) - Components must be migrated before tests
- **User Story 4 (Phase 6)**: Depends on US1 (Phase 3) - Components must be migrated before build
- **User Story 5 (Phase 7)**: Depends on US1 (Phase 3) - Components must be migrated before examples
- **Final Verification (Phase 8)**: Depends on ALL user stories (Phase 3-7)

### User Story Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS everything
    ↓
    ├─→ Phase 3 (US1: API Compatibility) ← PRIMARY - Must complete first
    │       ↓
    │       ├─→ Phase 4 (US2: Type System) ← Verifies US1 types
    │       ├─→ Phase 5 (US3: Tests) ← Tests US1 components
    │       ├─→ Phase 6 (US4: Build) ← Builds US1 components
    │       └─→ Phase 7 (US5: Examples) ← Uses US1 components
    │
    └─→ All US phases merge into Phase 8 (Final Verification)
```

### Critical Path

1. T001-T005 (Setup) → 2. T006-T009 (Foundational) → 3. T010-T017 (US1) → 4. All other user stories can proceed in parallel

### Parallel Opportunities

**Within Phase 1 (Setup)**:
- T002, T003, T004 can run in parallel

**Within Phase 2 (Foundational)**:
- None - small phase, best done sequentially

**Within Phase 3 (US1)**:
- T010-T015 (all six component migrations) can run in parallel
- T016 must wait for T010-T015 to complete
- T017 must wait for T016 to complete

**Within Phase 4 (US2)**:
- T018-T023 (type verification for six components) can run in parallel
- T024-T025 must run after T018-T023

**Within Phase 5 (US3)**:
- T026-T032 (all test migrations) can run in parallel
- T033-T036 must run sequentially after T026-T032

**Within Phase 6 (US4)**:
- T037-T038 can run together
- T039-T043 should run sequentially (build before bundle size)

**Within Phase 7 (US5)**:
- T044-T045 can run in parallel
- T046-T048 should run after T044-T045

**Within Phase 8 (Final)**:
- T049, T050, T051, T052 can run in parallel
- T053-T060 should run sequentially

### Execution Strategy

**Option 1: Sequential MVP Approach**
1. Complete Phase 1-2 (Setup + Foundational)
2. Complete Phase 3 (US1: API Compatibility)
3. Run quick verification (tests still pass with new components)
4. Complete Phase 4-7 (remaining user stories)
5. Complete Phase 8 (Final Verification)

**Option 2: Maximum Parallelization**
1. Complete Phase 1-2 (Setup + Foundational)
2. Complete Phase 3 (US1: Component Migration)
3. Run Phases 4-7 in parallel:
   - Developer A: US2 (Type verification)
   - Developer B: US3 (Test migration)
   - Developer C: US4 (Build verification)
   - Developer D: US5 (Examples & docs)
4. Complete Phase 8 (Final Verification)

**Recommended: Hybrid Approach**
1. Complete Phase 1-2 (Setup + Foundational)
2. Complete Phase 3 (US1: Component Migration) - Focus on this first
3. Verify basic functionality (quick smoke test)
4. Complete Phase 5 (US3: Tests) - Critical for confidence
5. Run Phases 4, 6, 7 in parallel
6. Complete Phase 8 (Final Verification)

---

## Implementation Strategy

### MVP First (Minimum Viable Migration)

**Goal**: Get components working in TypeScript with passing tests

1. **Phase 1**: Setup (T001-T005) → Baseline established
2. **Phase 2**: Foundational (T006-T009) → Ready to migrate
3. **Phase 3**: US1 (T010-T017) → Components migrated to TypeScript
4. **Phase 5**: US3 (T026-T036) → Tests migrated and passing
5. **STOP**: Validate - components work, tests pass, no regressions

At this point you have a **functional TypeScript migration** that could be committed.

Then continue with:
6. **Phase 4**: US2 (T018-T025) → Type verification
7. **Phase 6**: US4 (T037-T043) → Build verification
8. **Phase 7**: US5 (T044-T048) → Examples & docs
9. **Phase 8**: Final (T049-T060) → Polish & release prep

### Incremental Validation

After each phase, validate independently:
- **After US1**: Components compile with TypeScript
- **After US2**: Types are correct (consumer perspective)
- **After US3**: Tests pass (100% pass rate)
- **After US4**: Build succeeds (bundle size OK)
- **After US5**: Storybook works (examples render)

---

## Success Criteria Mapping

### From Spec (SC-001 through SC-012)

| Success Criterion | Verified By | Tasks |
|-------------------|-------------|-------|
| SC-001: Components compile without errors | Phase 6 | T037 |
| SC-002: Tests pass (100% pass rate) | Phase 5 | T033 |
| SC-003: Snapshots identical | Phase 5 | T034 |
| SC-004: Accessibility tests pass | Phase 5 | T035 |
| SC-005: Coverage maintained | Phase 5 | T036 |
| SC-006: Bundle size within 1% | Phase 6 | T040 |
| SC-007: `.d.ts` files generated | Phase 6 | T038 |
| SC-008: TypeScript consumers work | Phase 4 | T025 |
| SC-009: JavaScript consumers work | Phase 3 | T017 |
| SC-010: Storybook identical | Phase 7 | T046 |
| SC-011: CI/CD succeeds | Phase 8 | T049 |
| SC-012: No new dependencies | Phase 6 | T043 |

---

## Rollback Plan

If migration fails at any point:

1. **Before T016 (entry point migration)**: Revert individual component files, restore `.js` versions from git
2. **After T016**: Full rollback via `git reset --hard` to pre-migration commit
3. **Acceptance Criteria**: All existing tests pass, bundle size unchanged, no API changes

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently verifiable
- **CRITICAL**: Test logic must remain identical (US3)
- **CRITICAL**: API must remain identical (US1)
- **CRITICAL**: Snapshots must be identical (US3)
- Constitution compliance is NON-NEGOTIABLE
- PropTypes must be retained per Principle V
- All sizing in Sass files remains in `rem` units (unchanged)
- Modern Sass API already compliant (no changes needed)

---

## Checklist Summary

**Total Tasks**: 60
**Tasks by User Story**:
- Setup: 5 tasks
- Foundational: 4 tasks (BLOCKS all user stories)
- US1 (API Compatibility): 8 tasks
- US2 (Type System): 8 tasks
- US3 (Test Suite): 11 tasks
- US4 (Build Integrity): 7 tasks
- US5 (Examples & Docs): 5 tasks
- Final Verification: 12 tasks

**Parallel Opportunities**: 31 tasks marked [P] can run in parallel (within their phase)

**Critical Path**: Setup → Foundational → US1 → {US2, US3, US4, US5 in parallel} → Final

**Estimated MVP**: Phases 1-3 + 5 (Setup → Foundational → API → Tests) ≈ 28 tasks

---

## References

- **Backpack Constitution**: `.specify/memory/constitution.md` (Principle V: TypeScript Migration)
- **Spec**: `specs/090-table-typescript/spec.md`
- **Plan**: `specs/090-table-typescript/plan.md`
- **Research**: `specs/090-table-typescript/research.md`
- **API Design**: `specs/090-table-typescript/api-design.md`
- **Styling Guide**: `specs/090-table-typescript/styling-guide.md`
- **Examples**: `specs/090-table-typescript/examples/`
- **Architecture Decisions**: `decisions/inexact-rest.md`, `decisions/versioning-rules.md`
- **Current Implementation**: `packages/bpk-component-table/`
