# Tasks: TypeScript Migration for BpkTable

**Input**: Design documents from `/Users/irinawei/Projects/backpack/specs/090-table-typescript/`
**Prerequisites**: plan.md, spec.md, research.md, api-design.md, styling-guide.md

**Backpack Context**: Migration of existing `packages/bpk-component-table/` from Flow to TypeScript following Backpack constitution principles.

**Tests**: Existing tests will be migrated (not rewritten). Test logic must remain identical to ensure behavioral preservation.

**Organization**: Tasks grouped by user story to enable independent verification of each acceptance criterion.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Backpack Path Conventions

- **Component Package**: `packages/bpk-component-table/`
- **Source Files**: `packages/bpk-component-table/src/`
- **Test Files**: Same directory as source (e.g., `BpkTable-test.tsx`)
- **Examples**: `examples/bpk-component-table/`
- **Entry Point**: `packages/bpk-component-table/index.ts`

---

## Phase 1: User Story 6 - File Extension Correctness (Priority: P1)

**Goal**: Ensure all files have correct TypeScript extensions before type migration

**Why First**: File extensions must be correct before modifying type definitions. This prevents compiler confusion and ensures proper JSX transform.

**Independent Test**: Verify all `.tsx` files contain JSX and all `.ts` files contain no JSX. TypeScript compiles without extension-related warnings.

### Implementation

- [x] T001 [US6] Verify `packages/bpk-component-table/index.ts` has correct `.ts` extension (no JSX, only exports)
- [x] T002 [US6] Verify all component files use `.tsx` extension:
  - `packages/bpk-component-table/src/BpkTable.tsx`
  - `packages/bpk-component-table/src/BpkTableHead.tsx`
  - `packages/bpk-component-table/src/BpkTableBody.tsx`
  - `packages/bpk-component-table/src/BpkTableRow.tsx`
  - `packages/bpk-component-table/src/BpkTableCell.tsx`
  - `packages/bpk-component-table/src/BpkTableHeadCell.tsx`
- [x] T003 [US6] Verify all test files use `.tsx` extension:
  - `packages/bpk-component-table/src/BpkTable-test.tsx`
  - `packages/bpk-component-table/src/BpkTableHead-test.tsx`
  - `packages/bpk-component-table/src/BpkTableBody-test.tsx`
  - `packages/bpk-component-table/src/BpkTableRow-test.tsx`
  - `packages/bpk-component-table/src/BpkTableCell-test.tsx`
  - `packages/bpk-component-table/src/BpkTableHeadCell-test.tsx`
  - `packages/bpk-component-table/src/accessibility-test.tsx`
- [x] T004 [US6] Run TypeScript compiler to verify no file extension warnings

**Checkpoint**: All files have correct extensions. Ready for type migration.

---

## Phase 2: User Story 2 - Type System Migration (Priority: P1)

**Goal**: Migrate type definitions from Flow to TypeScript with proper inheritance patterns

**Independent Test**: TypeScript compiles without errors. Generated `.d.ts` files contain proper types. No `any` types in public API (except PropTypes which are retained).

### Type Migration Tasks

- [x] T005 [P] [US2] Update `packages/bpk-component-table/src/BpkTable.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableProps = { children: ReactNode; className?: string | null; } & Omit<HTMLAttributes<HTMLTableElement>, 'className'>`
  - Export type alongside component: `export type BpkTableProps`
  - Retain PropTypes for runtime validation
  - Verify no `React.` prefix usage

- [x] T006 [P] [US2] Update `packages/bpk-component-table/src/BpkTableHead.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableHeadProps = { children: ReactNode; } & HTMLAttributes<HTMLTableSectionElement>`
  - Export type alongside component
  - Retain PropTypes

- [x] T007 [P] [US2] Update `packages/bpk-component-table/src/BpkTableBody.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableBodyProps = { children: ReactNode; } & HTMLAttributes<HTMLTableSectionElement>`
  - Export type alongside component
  - Retain PropTypes

- [x] T008 [P] [US2] Update `packages/bpk-component-table/src/BpkTableRow.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableRowProps = { children: ReactNode; } & HTMLAttributes<HTMLTableRowElement>`
  - Export type alongside component
  - Retain PropTypes

- [x] T009 [P] [US2] Update `packages/bpk-component-table/src/BpkTableCell.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableCellProps = { children: ReactNode; className?: string | null; wordBreak?: boolean; } & Omit<HTMLAttributes<HTMLTableCellElement>, 'className'>`
  - Export type alongside component
  - Retain PropTypes

- [x] T010 [P] [US2] Update `packages/bpk-component-table/src/BpkTableHeadCell.tsx` type definitions:
  - Add `import type { ReactNode, HTMLAttributes } from 'react'`
  - Change type definition to: `export type BpkTableHeadCellProps = { children: ReactNode; className?: string | null; wordBreak?: boolean; } & Omit<HTMLAttributes<HTMLTableCellElement>, 'className'>`
  - Export type alongside component
  - Retain PropTypes

- [x] T011 [US2] Update `packages/bpk-component-table/index.ts` to export all types:
  - Add type exports: `export type { BpkTableProps } from './src/BpkTable'`
  - Add type exports for all 6 components
  - Verify file remains `.ts` (no JSX)

- [x] T012 [US2] Run TypeScript compilation to verify no errors or warnings

- [ ] T013 [US2] Verify generated `.d.ts` files contain all type exports in `packages/bpk-component-table/dist/`
  - Check for `BpkTable.d.ts`
  - Check for `BpkTableHead.d.ts`
  - Check for `BpkTableBody.d.ts`
  - Check for `BpkTableRow.d.ts`
  - Check for `BpkTableCell.d.ts`
  - Check for `BpkTableHeadCell.d.ts`
  - Check for `index.d.ts`

**Checkpoint**: All type definitions migrated. Types use proper inheritance with no `any` in public API. TypeScript compiles successfully.

---

## Phase 3: User Story 1 - API Compatibility (Priority: P1)

**Goal**: Verify migrated components maintain 100% API compatibility with Flow version

**Independent Test**: Existing consumer code works without modifications. JavaScript consumers experience zero changes. TypeScript consumers get accurate type checking.

### Verification Tasks

- [ ] T014 [US1] Create test TypeScript consumer file to verify type imports work correctly:
  - Import all 6 components with types
  - Use components with all prop combinations
  - Verify autocomplete for HTML attributes
  - Verify type checking for invalid props

- [ ] T015 [US1] Verify all component prop defaults remain unchanged:
  - `className = null` for all components
  - `wordBreak = false` for Cell and HeadCell

- [ ] T016 [US1] Verify all component exports remain unchanged in `packages/bpk-component-table/index.ts`

- [ ] T017 [US1] Run existing consumer code (if available in examples) to verify no breaking changes

**Checkpoint**: API is 100% compatible. No breaking changes detected.

---

## Phase 4: User Story 3 - Test Suite Preservation (Priority: P1)

**Goal**: Migrate test files to TypeScript while keeping test logic identical

**Independent Test**: All tests pass. Snapshots remain byte-for-byte identical. Coverage thresholds maintained.

### Test Migration Tasks

- [ ] T018 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTable-test.tsx`:
  - Keep test logic identical to original
  - Add type imports if helpful: `import type { RenderResult } from '@testing-library/react'`
  - Verify test passes
  - Verify snapshot identical

- [ ] T019 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableHead-test.tsx`:
  - Keep test logic identical
  - Verify test passes and snapshot identical

- [ ] T020 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableBody-test.tsx`:
  - Keep test logic identical
  - Verify test passes and snapshot identical

- [ ] T021 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableRow-test.tsx`:
  - Keep test logic identical
  - Verify test passes and snapshot identical

- [ ] T022 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableCell-test.tsx`:
  - Keep test logic identical
  - Verify test passes and snapshot identical

- [ ] T023 [P] [US3] Migrate `packages/bpk-component-table/src/BpkTableHeadCell-test.tsx`:
  - Keep test logic identical
  - Verify test passes and snapshot identical

- [ ] T024 [US3] Migrate `packages/bpk-component-table/src/accessibility-test.tsx`:
  - Keep test logic identical
  - Verify all accessibility tests pass
  - Verify jest-axe reports no violations

- [ ] T025 [US3] Run all tests and verify 100% pass rate: `npm test packages/bpk-component-table`

- [ ] T026 [US3] Verify test coverage meets thresholds:
  - Branches: ≥70%
  - Functions: ≥75%
  - Lines: ≥75%
  - Statements: ≥75%

**Checkpoint**: All tests migrated and passing. Coverage maintained. Snapshots identical.

---

## Phase 5: User Story 4 - Build & Bundle Integrity (Priority: P1)

**Goal**: Verify TypeScript version builds successfully and maintains bundle size

**Independent Test**: Build completes without errors. Bundle size within 1% of original. `.d.ts` files generated.

### Build Verification Tasks

- [ ] T027 [US4] Run production build: `npm run build`
  - Verify TypeScript compilation succeeds
  - Verify zero TypeScript errors
  - Verify zero TypeScript warnings

- [ ] T028 [US4] Verify `.d.ts` type declaration files generated in `packages/bpk-component-table/dist/`:
  - Check for `BpkTable.d.ts`
  - Check for `BpkTableHead.d.ts`
  - Check for `BpkTableBody.d.ts`
  - Check for `BpkTableRow.d.ts`
  - Check for `BpkTableCell.d.ts`
  - Check for `BpkTableHeadCell.d.ts`
  - Check for `index.d.ts`

- [ ] T029 [US4] Measure and compare bundle size:
  - Record Flow version bundle size
  - Record TypeScript version bundle size
  - Verify difference is within 1%

- [ ] T030 [US4] Verify no new dependencies added to root `package.json`
  - Check `devDependencies` section for any new packages
  - Only TypeScript type definition packages (`@types/*`) are acceptable
  - Note: This monorepo manages dependencies at the root level, not per-component

- [ ] T031 [US4] Run ESLint: `npm run lint`
  - Verify all linting rules pass
  - Verify no "React is not defined" warnings

- [ ] T032 [US4] Run Stylelint to verify styles unchanged

**Checkpoint**: Build successful. Bundle size stable. Type declarations generated.

---

## Phase 6: User Story 5 - Examples & Documentation Migration (Priority: P2)

**Goal**: Migrate Storybook examples and update documentation for TypeScript

**Independent Test**: Storybook stories render identically. Examples compile without errors. Documentation accurate for both TS and JS users.

### Examples Migration Tasks

- [ ] T033 [P] [US5] Migrate `examples/bpk-component-table/examples.tsx`:
  - Change file extension from `.js` to `.tsx`
  - Add TypeScript type annotations where helpful
  - Keep visual output identical
  - Verify examples compile without errors

- [ ] T034 [P] [US5] Migrate `examples/bpk-component-table/stories.tsx`:
  - Change file extension from `.js` to `.tsx`
  - Add type annotations for story metadata
  - Keep stories identical
  - Verify Storybook renders correctly

- [ ] T035 [US5] Run Storybook and verify all stories render correctly: `npm run storybook`

- [ ] T036 [US5] Update `packages/bpk-component-table/README.md`:
  - Add TypeScript usage section (minimal, <100 words)
  - Show type import example
  - Maintain JavaScript examples as primary
  - Keep description under 100 words total (British English)

- [ ] T037 [US5] Verify Percy visual regression tests pass (if applicable):
  - Run Percy tests
  - Verify zero visual differences

**Checkpoint**: Examples migrated. Documentation updated. Visual output identical.

---

## Phase 7: Polish & Final Verification

**Goal**: Final verification and cleanup before release

**Independent Test**: All acceptance criteria met. Ready for PATCH version release.

### Final Verification Tasks

- [ ] T038 Review all changed files for Flow artifacts:
  - Search for `/* @flow strict */` - should be removed
  - Search for `// $FlowFixMe` - should be removed
  - Search for `React.ReactNode` - should use `ReactNode` import
  - Search for `React.HTMLAttributes` - should use `HTMLAttributes` import

- [ ] T039 Run full test suite across entire monorepo to verify no regressions

- [ ] T040 Verify Constitution Compliance Checklist:
  - [x] Component-First Architecture (existing structure preserved)
  - [x] Naming Conventions (PascalCase, `.module.scss`, `*-test.tsx`)
  - [x] Modern Sass (already compliant, unchanged)
  - [x] Accessibility-First (tests migrated and passing)
  - [x] TypeScript (migrated with proper types)
  - [x] SemVer (PATCH version bump)
  - [x] Test Coverage (maintained at ≥70% branches, ≥75% functions/lines)
  - [x] Documentation (README updated)

- [ ] T041 Update CHANGELOG.md:
  - Document TypeScript migration
  - Note zero breaking changes
  - Mention improved type safety

- [ ] T042 Prepare for release:
  - Version bump (PATCH)
  - Update package.json version
  - Verify all files staged for commit

**Final Checkpoint**: Migration complete. All acceptance criteria met. Ready for PATCH release.

---

## Task Summary

**Total Tasks**: 42

**By Phase**:
- Phase 1 (US6 - File Extensions): 4 tasks
- Phase 2 (US2 - Type Migration): 9 tasks
- Phase 3 (US1 - API Compatibility): 4 tasks
- Phase 4 (US3 - Test Preservation): 9 tasks
- Phase 5 (US4 - Build & Bundle): 6 tasks
- Phase 6 (US5 - Examples & Docs): 5 tasks
- Phase 7 (Polish): 5 tasks

**Parallelizable Tasks**: 18 tasks marked with [P]

**By User Story**:
- US1 (API Compatibility): 4 tasks
- US2 (Type System): 9 tasks
- US3 (Test Preservation): 9 tasks
- US4 (Build & Bundle): 6 tasks
- US5 (Examples & Docs): 5 tasks
- US6 (File Extensions): 4 tasks
- Polish: 5 tasks

---

## Dependencies & Execution Order

### Critical Path (Sequential)
1. **US6** (File Extensions) MUST complete first
2. **US2** (Type Migration) depends on US6
3. **US1, US3, US4** depend on US2 completion
4. **US5** depends on US2 (can run in parallel with US1/US3/US4)
5. **Polish** depends on all user stories

### Parallel Opportunities

**After US6 completes, US2 type migration tasks can run in parallel**:
- T005-T010 (6 component type updates) can run simultaneously

**After US2 completes, multiple phases can run in parallel**:
- US1 (API verification): T014-T017
- US3 (Test migration): T018-T024 (7 tests in parallel)
- US4 (Build verification): T027-T032
- US5 (Examples): T033-T034 (2 files in parallel)

### Suggested Execution Strategy

**Sprint 1 - Foundation (Day 1)**:
- Complete US6 (file extensions) - 4 tasks
- Complete US2 (type migration) - 9 tasks in parallel
- Total: 13 tasks

**Sprint 2 - Verification (Day 2)**:
- Run US1, US3, US4, US5 in parallel
- US1: 4 tasks
- US3: 9 tasks (7 in parallel)
- US4: 6 tasks
- US5: 5 tasks (2 in parallel)
- Total: 24 tasks

**Sprint 3 - Polish & Release (Day 3)**:
- Complete Phase 7 (polish) - 5 tasks
- Total: 5 tasks

---

## Testing Strategy

**Test Migration Principle**: Keep test logic 100% identical. Only file extensions change.

**Verification Points**:
1. All tests pass after migration
2. Snapshots remain byte-for-byte identical
3. Coverage thresholds maintained
4. jest-axe accessibility tests pass

**No New Tests Required**: Existing tests already provide comprehensive coverage. Migration does not change functionality, so no new test cases needed.

---

## Success Criteria Checklist

Based on spec.md acceptance criteria:

### User Story 1 - API Compatibility
- [ ] Consumer code works without modifications
- [ ] All props function identically
- [ ] TypeScript consumers get proper types
- [ ] JavaScript consumers experience zero changes

### User Story 2 - Type System
- [ ] Optional props remain optional
- [ ] Required props remain required
- [ ] Default values unchanged
- [ ] No `any` types in public API

### User Story 3 - Test Preservation
- [ ] All tests migrated to TypeScript
- [ ] All tests pass (100% pass rate)
- [ ] Snapshots identical
- [ ] Coverage ≥70% branches, ≥75% functions/lines/statements

### User Story 4 - Build & Bundle
- [ ] TypeScript compiles without errors/warnings
- [ ] Bundle size within 1% of original
- [ ] `.d.ts` files generated for all exports
- [ ] No new dependencies added

### User Story 5 - Examples & Documentation
- [ ] Storybook examples migrated to TypeScript
- [ ] All stories render correctly
- [ ] Examples compile without errors
- [ ] README updated with TypeScript note

### User Story 6 - File Extensions
- [ ] JSX files use `.tsx` extension
- [ ] Non-JSX files use `.ts` extension
- [ ] Test files use `.tsx` extension
- [ ] TypeScript compiles without extension warnings

---

## Release Checklist

Before releasing TypeScript migration:

- [ ] All 42 tasks completed
- [ ] All 6 user stories verified
- [ ] All acceptance criteria met
- [ ] Constitution compliance verified
- [ ] Tests passing (100%)
- [ ] Build successful
- [ ] Bundle size stable
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped (PATCH)
- [ ] Ready for merge and npm publish

---

## References

- **Spec**: [spec.md](./spec.md)
- **Plan**: [plan.md](./plan.md)
- **Research**: [research.md](./research.md)
- **API Design**: [api-design.md](./api-design.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
- **Constitution**: `../.specify/memory/constitution.md`
- **Decisions**: `../../decisions/` directory
