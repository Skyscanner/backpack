# Specification: Refactor Internal Source Imports

**Package Branch**: `004-refactor-internal-imports`
**Created**: 2026-01-27
**Status**: Complete
**Input**: User description: "按照docs/implementation-plans/phase-0.3-refactor-internal-imports.md对代码进行修改" (Refactor code according to phase-0.3 implementation plan)

## Overview

This specification defines the requirements for refactoring internal `src` imports across the Backpack codebase to enforce proper module encapsulation. Components currently import directly from other components' internal source directories, violating module boundaries. This task will fix these violations and prevent future occurrences.

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Module Encapsulation**: All imports will use public package entry points
- [x] **TypeScript**: Changes will maintain TypeScript compatibility
- [x] **Test Coverage**: Existing tests will continue to pass after refactoring
- [x] **No Breaking Changes**: Public APIs remain unchanged; only import paths change
- [x] **Backward Compatibility**: Consumers using public APIs are unaffected

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Using Component Exports (Priority: P1)

Developers consuming Backpack components import from the package entry point and get access to all public exports including constants, types, and components.

**Why this priority**: This is the core value - enabling proper module consumption patterns that support encapsulation and future refactoring.

**Independent Test**: Can be tested by importing from a refactored component and verifying all previously-internal exports are accessible.

**Acceptance Scenarios**:

1. **Given** a developer needs `TEXT_STYLES` from bpk-component-text, **When** they import from `@backpack/bpk-component-text`, **Then** `TEXT_STYLES` is available as a named export
2. **Given** a developer needs `format` utility from bpk-component-calendar, **When** they import from `@backpack/bpk-component-calendar`, **Then** `format` is available as a named export
3. **Given** a developer needs `PADDING_TYPE` from bpk-component-bottom-sheet, **When** they import from `@backpack/bpk-component-bottom-sheet`, **Then** `PADDING_TYPE` is available as a named export

---

### User Story 2 - Internal Component Dependencies (Priority: P1)

Components that depend on other components' exports use the public package entry point rather than reaching into internal source directories.

**Why this priority**: Fixing existing violations is essential to enforce module boundaries and enable independent component evolution.

**Independent Test**: Can be tested by verifying all package-level imports compile and function correctly.

**Acceptance Scenarios**:

1. **Given** bpk-component-bottom-sheet needs `TEXT_STYLES`, **When** the component is compiled, **Then** it imports from `@backpack/bpk-component-text` (not `../../bpk-component-text/src/BpkText`)
2. **Given** bpk-component-datepicker needs `format`, **When** the component is compiled, **Then** it imports from `@backpack/bpk-component-calendar` (not `../../bpk-component-calendar/src/date-utils`)
3. **Given** bpk-component-navigation-tab-group needs `BpkBubble`, **When** the component is compiled, **Then** it imports from `@backpack/bpk-component-bubble` (not `../../bpk-component-bubble/src/BpkBubble`)

---

### User Story 3 - Examples Using Public APIs (Priority: P2)

Storybook examples and demo code import components using the same patterns that external consumers would use.

**Why this priority**: Examples serve as documentation and should model best practices for consumers.

**Independent Test**: Can be tested by verifying all examples compile and render correctly.

**Acceptance Scenarios**:

1. **Given** an example needs calendar components, **When** the example imports, **Then** it uses `@backpack/bpk-component-calendar` entry point
2. **Given** an example needs form validation, **When** the example imports, **Then** it uses `@backpack/bpk-component-form-validation` entry point

---

### User Story 4 - Preventing Future Violations (Priority: P2)

ESLint rules prevent developers from creating new internal src imports.

**Why this priority**: Preventing new violations ensures the refactoring effort has lasting value.

**Independent Test**: Can be tested by adding an internal src import and verifying ESLint reports an error.

**Acceptance Scenarios**:

1. **Given** a developer writes `from '../../bpk-component-text/src/BpkText'`, **When** ESLint runs, **Then** an error is reported
2. **Given** a developer writes `from '@backpack/bpk-component-text'`, **When** ESLint runs, **Then** no error is reported

---

### Edge Cases

- What happens when an internal export is not in the public index?
  - The export MUST be added to the component's `index.ts` before refactoring the import
- What happens if a component has circular dependency after refactoring?
  - Dependencies must be analysed to avoid cycles; may require extracting shared utilities
- What happens with type-only imports?
  - Type imports should also use the public entry point
- What happens with test file imports?
  - Test files within the same component may still use relative imports to internal files; cross-component test imports must use public entry points

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All internal exports currently accessed from other packages MUST be re-exported from the component's `index.ts`
- **FR-002**: All cross-package imports MUST use the `@backpack/bpk-component-xxx` alias (not relative paths)
- **FR-003**: Package `index.ts` files MUST export all public types, constants, and components
- **FR-004**: ESLint MUST be configured to error on `**/src/*` import patterns for cross-package imports
- **FR-005**: The refactoring MUST NOT change any runtime behaviour
- **FR-006**: The refactoring MUST NOT change any public API signatures

### Components Requiring Export Updates

Based on the audit, these components need additional exports in their `index.ts`:

| Component                   | Exports to Add                                                                                      |
|-----------------------------|-----------------------------------------------------------------------------------------------------|
| `bpk-component-text`        | `TEXT_STYLES`, `Tag`, `TextStyle`                                                                   |
| `bpk-component-calendar`    | `format` (from date-utils), `BpkCalendarWeek`, `CALENDAR_SELECTION_TYPE`, `composeCalendar`, props  |
| `bpk-component-bottom-sheet`| `PADDING_TYPE`                                                                                      |
| `bpk-component-bubble`      | `BpkBubble` (verify already exported)                                                               |
| `bpk-component-popover`     | `BpkPopover` (verify already exported)                                                              |
| `bpk-component-image`       | `BpkImage` (verify already exported)                                                                |

### Files Requiring Import Updates

**Packages Directory** (19 files - high priority):

| File | Current Import Pattern | New Import Pattern |
|------|------------------------|-------------------|
| `bpk-component-inset-banner/src/BpkInsetBannerV2/BpkInsetBannerSponsored.tsx` | `../../../bpk-component-bottom-sheet/src/...` | `@backpack/bpk-component-bottom-sheet` |
| `bpk-component-inset-banner/src/BpkInsetBannerV2/BpkInsetBannerSponsored.tsx` | `../../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-inset-banner/src/BpkInsetBanner.tsx` | `../../bpk-component-popover/src/...` | `@backpack/bpk-component-popover` |
| `bpk-component-inset-banner/src/BpkInsetBanner.tsx` | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-datepicker/src/*-test.tsx` (3 files) | `../../bpk-component-calendar/src/date-utils` | `@backpack/bpk-component-calendar` |
| `bpk-component-bottom-sheet/src/BpkBottomSheet.tsx` | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-price-range/src/*.tsx` (2 files) | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-overlay/src/BpkOverlay.figma.tsx` | `../../bpk-component-image/src/...` | `@backpack/bpk-component-image` |
| `bpk-component-chip-group/src/BpkMultiSelectChipGroup.tsx` | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-navigation-tab-group/src/BpkNavigationTabGroup.tsx` | `../../bpk-component-bubble/src/...` | `@backpack/bpk-component-bubble` |
| `bpk-component-navigation-bar/src/BpkNavigationBar.tsx` | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |
| `bpk-component-snippet/src/*.tsx` (2 files) | `../../bpk-component-text/src/...` | `@backpack/bpk-component-text` |

**Examples Directory** (82+ files - lower priority):
- All examples importing from internal `src` directories must be updated to use `@backpack/bpk-component-xxx` entry points

### Non-Functional Requirements

- **NFR-001**: All existing tests MUST pass after refactoring
- **NFR-002**: Build process MUST complete without errors
- **NFR-003**: TypeScript compilation MUST succeed without type errors
- **NFR-004**: No changes to bundle size beyond normal variance

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero ESLint errors for `no-restricted-imports` rule after refactoring
- **SC-002**: All unit tests pass
- **SC-003**: TypeScript compiles without errors
- **SC-004**: Build completes successfully
- **SC-005**: Zero matches for `from '../../bpk-component-*/src/'` pattern in `packages/` directory
- **SC-006**: Zero matches for `from '../bpk-component-*/src/'` pattern in `packages/` directory
- **SC-007**: Zero matches for internal src import patterns in `examples/` directory

## Dependencies & Related Components

**Affected Packages** (those needing export updates):
- `bpk-component-text`
- `bpk-component-calendar`
- `bpk-component-bottom-sheet`
- `bpk-component-bubble`
- `bpk-component-popover`
- `bpk-component-image`

**Dependent Packages** (those with imports to fix):
- `bpk-component-inset-banner`
- `bpk-component-datepicker`
- `bpk-component-bottom-sheet`
- `bpk-component-price-range`
- `bpk-component-overlay`
- `bpk-component-chip-group`
- `bpk-component-navigation-tab-group`
- `bpk-component-navigation-bar`
- `bpk-component-snippet`
- All example directories

## Testing Strategy

### Verification Tests
- Run existing unit tests to ensure no regressions
- Run TypeScript compiler to ensure type safety
- Run build to ensure bundling works correctly

### Regression Tests
- Verify affected components render correctly in Storybook
- Verify no console warnings or errors in browser

### Lint Verification
- Run ESLint with the new `no-restricted-imports` rule
- Verify all files pass the new rule

## Assumptions

- The `@backpack/*` path aliases are already configured and working (per phase 0.2)
- Components' `index.ts` files already export their default component
- Adding exports to `index.ts` does not constitute a breaking change
- The examples directory uses the same path alias configuration as packages

## Migration & Versioning

**Version Type**: PATCH

**Rationale**: This is a purely internal refactoring that:
- Does not change any public APIs
- Does not change runtime behaviour
- Only modifies import paths and adds exports

**Breaking Changes**: None

## Open Questions

- [x] Q1: Should examples directory also be refactored? **Answer**: Yes, examples should model best practices for consumers
- [x] Q2: Are path aliases already configured? **Answer**: Yes, per phase 0.2 implementation

## References

- **Implementation Plan**: `docs/implementation-plans/phase-0.3-refactor-internal-imports.md`
- **Path Alias Configuration**: Phase 0.2 TypeScript path aliases
- **Backpack Constitution**: `.specify/memory/constitution.md`
