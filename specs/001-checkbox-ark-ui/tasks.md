# Implementation Tasks: BpkCheckbox (Ark UI Rebase)

**Feature**: BpkCheckbox Ark UI Rebase
**Branch**: `001-checkbox-ark-ui`
**Date**: 2026-01-21
**Status**: Ready for Implementation

---

## Overview

This document contains sequenced implementation tasks for rebuilding BpkCheckbox on Ark UI primitives. Tasks are organized by user story to enable independent implementation and testing.

**Total Tasks**: 67
**Parallel Opportunities**: 24 tasks can run in parallel
**Test Strategy**: All tests are included per Backpack constitution requirements

---

## Implementation Strategy

### MVP Scope (User Story 1 - P1)
The minimum viable checkbox includes:
- Basic checkbox selection (checked/unchecked)
- Legacy API (label prop)
- Core styling and accessibility
- Unit and accessibility tests

**Deliverable**: A working checkbox that matches existing BpkCheckbox functionality.

### Incremental Delivery
After MVP (US1), implement in priority order:
- **US2 (P2)**: Composable API - enables custom layouts
- **US3 (P2)**: Runtime theming - multi-brand support
- **US4 (P2)**: Disabled/Indeterminate states
- **US5 (P3)**: Validation states
- **US6 (P2)**: RTL support

---

## User Story Mapping

| User Story | Priority | Tasks | Independent Test |
|------------|----------|-------|------------------|
| US1: Basic Checkbox Selection | P1 | T006-T028 (23 tasks) | Render checkbox, click to toggle, verify state change |
| US2: Composable Layout | P2 | T029-T036 (8 tasks) | Render with sub-components, verify ARIA associations |
| US3: Runtime Theming | P2 | T037-T042 (6 tasks) | Wrap in BpkThemeProvider, verify custom colors applied |
| US4: Disabled/Indeterminate | P2 | T043-T048 (6 tasks) | Render disabled, verify no interaction; render indeterminate, verify dash icon |
| US5: Validation States | P3 | T049-T052 (4 tasks) | Render with valid=false, verify error styling and aria-invalid |
| US6: RTL Support | P2 | T053-T056 (4 tasks) | Render with dir="rtl", verify mirrored layout |

---

## Dependencies Graph

```
Setup (Phase 1)
    ↓
Foundational (Phase 2)
    ↓
├── US1 (P1) ← MUST complete first (MVP)
    ├── US2 (P2) ← depends on US1 (uses same base component)
    ├── US3 (P2) ← depends on US1 (adds theming layer)
    ├── US4 (P2) ← depends on US1 (adds state variants)
    ├── US5 (P3) ← depends on US1 (adds validation)
    └── US6 (P2) ← depends on US1 (adds RTL support)
        ↓
    Polish (Final Phase)
```

**Blocking Dependencies**:
- US1 MUST be completed before any other user story
- US2-US6 can be implemented in parallel after US1

---

## Phase 1: Setup

**Objective**: Prepare project structure for Ark UI implementation

### Tasks

- [X] T001 Back up current BpkCheckbox implementation to BpkCheckbox.backup.tsx in packages/bpk-component-checkbox/src/
- [X] T002 [P] Create new component directory packages/bpk-component-checkbox/src/BpkCheckbox/
- [X] T003 [P] Create common-types.ts file in packages/bpk-component-checkbox/src/BpkCheckbox/ with Apache 2.0 license header
- [X] T004 [P] Create BpkCheckbox.module.scss file in packages/bpk-component-checkbox/src/BpkCheckbox/ with Apache 2.0 license header
- [X] T005 [P] Update package.json to ensure @ark-ui/react ^5.29.1 dependency is present

**Verification**: Directory structure created, license headers present, dependencies confirmed

---

## Phase 2: Foundational

**Objective**: Implement core infrastructure shared by all user stories

### Tasks

- [X] T006 [P] Define NativeInputProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T007 [P] Define ValidationState type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T008 [P] Define OnChangeHandler and OnCheckedChangeHandler types in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T009 Create BpkCheckboxRoot.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ wrapping Ark UI Checkbox.Root
- [X] T010 Create BpkCheckboxControl.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ wrapping Ark UI Checkbox.Control
- [X] T011 Create BpkCheckboxLabel.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ wrapping Ark UI Checkbox.Label
- [X] T012 Create BpkCheckboxIndicator.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ wrapping Ark UI Checkbox.Indicator
- [X] T013 Create BpkCheckboxHiddenInput.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ wrapping Ark UI Checkbox.HiddenInput

**Verification**: All sub-component wrappers created with proper Ark UI imports

---

## Phase 3: User Story 1 - Basic Checkbox Selection (P1) ⭐ MVP

**Story Goal**: Developers can render a simple checkbox with a label that users can check/uncheck

**Independent Test**: Render `<BpkCheckbox name="test" label="Test" checked={false} onChange={handler} />`, click checkbox, verify handler called with checked=true

### Type Definitions

- [X] T014 [P] [US1] Define BpkCheckboxSimpleProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T015 [P] [US1] Define BpkCheckboxComposableProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T016 [P] [US1] Define BpkCheckboxProps union type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T017 [P] [US1] Define BpkCheckboxRootProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T018 [P] [US1] Define BpkCheckboxControlProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T019 [P] [US1] Define BpkCheckboxLabelProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts
- [X] T020 [P] [US1] Define BpkCheckboxIndicatorProps type in packages/bpk-component-checkbox/src/BpkCheckbox/common-types.ts

### Component Implementation

- [X] T021 [US1] Implement BpkCheckbox.tsx main component with mode detection logic (label vs children) in packages/bpk-component-checkbox/src/BpkCheckbox/
- [X] T022 [US1] Add controlled mode support (checked + onChange) in BpkCheckbox.tsx
- [X] T023 [US1] Add uncontrolled mode support (defaultChecked) in BpkCheckbox.tsx
- [X] T024 [US1] Implement dual callback support (onChange and onCheckedChange) in BpkCheckbox.tsx
- [X] T025 [US1] Add ref forwarding to hidden input in BpkCheckbox.tsx
- [X] T026 [US1] Attach sub-components as properties (BpkCheckbox.Root, .Control, .Label, .Indicator, .HiddenInput)

### Styling

- [X] T027 [US1] Add Sass imports (@use tokens, forms, utils) to packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss
- [X] T028 [US1] Implement base styles (.bpk-checkbox root, __control, __label, __indicator, __input, __asterisk) in BpkCheckbox.module.scss
- [X] T029 [US1] Add BEM modifier styles (--disabled, --invalid, __label--small) in BpkCheckbox.module.scss
- [X] T030 [US1] Implement interactive states (hover, focus, active) with transitions in BpkCheckbox.module.scss
- [X] T031 [US1] Add focus indicators with 3:1 contrast ratio in BpkCheckbox.module.scss
- [X] T032 [US1] Implement required asterisk styling in BpkCheckbox.module.scss

### Unit Tests

- [X] T033 [US1] Create BpkCheckbox-test.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ with Apache 2.0 license header
- [X] T034 [US1] Add rendering tests (with/without checked, with label) in BpkCheckbox-test.tsx
- [X] T035 [US1] Add interaction tests (click to toggle, Space key to toggle) in BpkCheckbox-test.tsx
- [X] T036 [US1] Add controlled mode tests (checked + onChange callback verification) in BpkCheckbox-test.tsx
- [X] T037 [US1] Add uncontrolled mode tests (defaultChecked behavior) in BpkCheckbox-test.tsx
- [X] T038 [US1] Add label click tests (clicking label toggles checkbox) in BpkCheckbox-test.tsx
- [X] T039 [US1] Add ref forwarding tests in BpkCheckbox-test.tsx
- [X] T040 [US1] Add snapshot tests for all visual variants in BpkCheckbox-test.tsx

### Accessibility Tests

- [X] T041 [US1] Create accessibility-test.tsx in packages/bpk-component-checkbox/src/BpkCheckbox/ with Apache 2.0 license header
- [X] T042 [US1] Add jest-axe tests (no violations) for default checkbox in accessibility-test.tsx
- [X] T043 [US1] Add ARIA attribute tests (aria-checked, aria-labelledby) in accessibility-test.tsx
- [X] T044 [US1] Add keyboard navigation tests (Tab to focus, Space to toggle) in accessibility-test.tsx
- [X] T045 [US1] Add screen reader tests (label announcement) in accessibility-test.tsx

### Integration

- [X] T046 [US1] Update index.ts to export new BpkCheckbox and sub-components in packages/bpk-component-checkbox/
- [X] T047 [US1] Update index.ts to export types (BpkCheckboxProps, etc.) in packages/bpk-component-checkbox/
- [X] T048 [US1] Run tests and verify coverage meets 70% branches, 75% functions/lines/statements

**US1 Completion Criteria**:
- ✅ Checkbox renders with label
- ✅ Click toggles checked state
- ✅ Space key toggles checked state
- ✅ Label click toggles checked state
- ✅ onChange callback fires with correct state
- ✅ Controlled and uncontrolled modes work
- ✅ All tests pass (unit + accessibility)
- ✅ Coverage thresholds met

---

## Phase 4: User Story 2 - Composable Layout Support (P2)

**Story Goal**: Developers can customize checkbox layouts using sub-components

**Independent Test**: Render with `<BpkCheckbox><BpkCheckbox.Control /><BpkCheckbox.Label>Text</BpkCheckbox.Label></BpkCheckbox>`, verify elements render with proper ARIA associations

**Depends on**: US1 (requires base component)

### Implementation

- [X] T049 [P] [US2] Add composable mode detection logic (checks for children prop) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [X] T050 [P] [US2] Implement auto-render of sub-components in legacy mode in BpkCheckbox.tsx
- [X] T051 [P] [US2] Add context provider for state sharing between sub-components using Ark UI context in BpkCheckbox.tsx

### Tests

- [X] T052 [US2] Add composable API rendering tests (Root + Control + Label + HiddenInput) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [X] T053 [US2] Add custom layout tests (description, icons inside Root) in BpkCheckbox-test.tsx
- [X] T054 [US2] Add ARIA association tests for composable mode in accessibility-test.tsx
- [X] T055 [US2] Add snapshot tests for composable examples in BpkCheckbox-test.tsx

### Storybook Examples

- [X] T056 [US2] Add ComposableBasicExample to examples/bpk-component-checkbox/examples.tsx
- [X] T057 [US2] Add ComposableWithDescriptionExample to examples/bpk-component-checkbox/examples.tsx
- [X] T058 [US2] Add ComposableCustomLayoutExample to examples/bpk-component-checkbox/examples.tsx
- [X] T059 [US2] Export new examples in examples/bpk-component-checkbox/examples.tsx
- [X] T060 [US2] Add ComposableBasic, ComposableWithDescription, ComposableCustomLayout stories to examples/bpk-component-checkbox/stories.tsx

**US2 Completion Criteria**:
- ✅ Composable API works (sub-components render)
- ✅ Custom layouts work (description, icons)
- ✅ ARIA attributes properly associated
- ✅ Storybook examples added
- ✅ All tests pass

---

## Phase 5: User Story 3 - Runtime Theming Support (P2)

**Story Goal**: Checkboxes can be styled dynamically using BpkThemeProvider

**Independent Test**: Wrap checkbox in `<BpkThemeProvider theme={{ checkboxCheckedColor: '#ff0000' }}>`, render checked checkbox, verify background is #ff0000

**Depends on**: US1 (requires base component)

### Implementation

- [X] T061 [P] [US3] Implement theme CSS custom property usage in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss using bpk-themeable-property mixin
- [X] T062 [P] [US3] Add --bpk-checkbox-checked-color CSS variable to checked state styles in BpkCheckbox.module.scss

### Tests

- [X] T063 [US3] Add theming tests (verify CSS custom properties applied) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [X] T064 [US3] Add theme fallback tests (no theme = default tokens) in BpkCheckbox-test.tsx
- [X] T065 [US3] Add theme change tests (dynamic theme switching) in BpkCheckbox-test.tsx

### Storybook Examples

- [X] T066 [US3] Add ThemedComposableExample to examples/bpk-component-checkbox/examples.tsx
- [X] T067 [US3] Export ThemedComposableExample in examples/bpk-component-checkbox/examples.tsx
- [X] T068 [US3] Add ThemedComposable story to examples/bpk-component-checkbox/stories.tsx

### Documentation

- [X] T069 [US3] Verify themeAttributes.ts exports ['checkboxCheckedColor'] in packages/bpk-component-checkbox/src/themeAttributes.ts
- [X] T070 [US3] Create themeAttributes-test.ts to verify exported array in packages/bpk-component-checkbox/src/

**US3 Completion Criteria**:
- ✅ BpkThemeProvider integration works
- ✅ Custom colors applied to checked checkbox
- ✅ Fallback to default tokens when no theme
- ✅ Theme changes update styles dynamically
- ✅ Storybook theming example added
- ✅ All tests pass

---

## Phase 6: User Story 4 - Disabled and Indeterminate States (P2)

**Story Goal**: Checkboxes can be disabled or show indeterminate state

**Independent Test**: Render with disabled=true, attempt click, verify no state change; render with indeterminate=true, verify dash icon visible

**Depends on**: US1 (requires base component)

### Implementation

- [ ] T071 [P] [US4] Add disabled prop handling in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [ ] T072 [P] [US4] Add indeterminate prop handling with ref.current.indeterminate in BpkCheckbox.tsx
- [ ] T073 [P] [US4] Add disabled state styles (--disabled, cursor, opacity) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss
- [ ] T074 [P] [US4] Add indeterminate state styles (--indeterminate, dash icon) in BpkCheckbox.module.scss

### Tests

- [ ] T075 [US4] Add disabled state tests (no interaction, aria-disabled) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [ ] T076 [US4] Add indeterminate state tests (visual indicator, aria-checked="mixed") in BpkCheckbox-test.tsx
- [ ] T077 [US4] Add keyboard navigation tests for disabled (not focusable) in accessibility-test.tsx
- [ ] T078 [US4] Add snapshot tests for disabled and indeterminate states in BpkCheckbox-test.tsx

**US4 Completion Criteria**:
- ✅ Disabled checkbox blocks interaction
- ✅ Disabled checkbox not keyboard focusable
- ✅ Indeterminate shows dash icon
- ✅ Indeterminate has aria-checked="mixed"
- ✅ All tests pass

---

## Phase 7: User Story 5 - Validation and Error States (P3)

**Story Goal**: Checkboxes can display validation feedback

**Independent Test**: Render with valid=false, verify error styling and aria-invalid="true"

**Depends on**: US1 (requires base component)

### Implementation

- [ ] T079 [P] [US5] Add valid prop handling (true/false/null) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [ ] T080 [P] [US5] Add invalid state styles (--invalid, error color) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss

### Tests

- [ ] T081 [US5] Add validation state tests (valid=false shows error styling) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [ ] T082 [US5] Add ARIA invalid tests (aria-invalid="true") in accessibility-test.tsx
- [ ] T083 [US5] Add snapshot tests for invalid states in BpkCheckbox-test.tsx

**US5 Completion Criteria**:
- ✅ Invalid checkbox shows error styling
- ✅ aria-invalid="true" when valid=false
- ✅ All tests pass

---

## Phase 8: User Story 6 - RTL Support (P2)

**Story Goal**: Checkboxes render correctly in RTL languages

**Independent Test**: Render with dir="rtl", verify checkbox on right, label on left

**Depends on**: US1 (requires base component)

### Implementation

- [ ] T084 [P] [US6] Add RTL support using bpk-rtl mixin for directional properties in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss
- [ ] T085 [P] [US6] Add RTL styles for asterisk positioning in BpkCheckbox.module.scss

### Tests

- [ ] T086 [US6] Add RTL rendering tests (verify layout mirroring) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [ ] T087 [US6] Add RTL accessibility tests (focus indicators in correct position) in accessibility-test.tsx
- [ ] T088 [US6] Add snapshot tests for RTL mode in BpkCheckbox-test.tsx

**US6 Completion Criteria**:
- ✅ RTL layout mirrored correctly
- ✅ Focus indicators in correct position
- ✅ All tests pass

---

## Phase 9: Polish & Cross-Cutting Concerns

**Objective**: Complete documentation, visual tests, and final quality checks

### Documentation

- [ ] T089 [P] Update README.md with component description (<100 words, British English) in packages/bpk-component-checkbox/
- [ ] T090 [P] Add usage examples (simple API) to README.md
- [ ] T091 [P] Add usage examples (composable API) to README.md
- [ ] T092 [P] Add theming guide with BpkThemeProvider example to README.md
- [ ] T093 [P] Add props table for all sub-components to README.md
- [ ] T094 [P] Add JSDoc comments to BpkCheckbox.tsx with @example annotations in packages/bpk-component-checkbox/src/BpkCheckbox/
- [ ] T095 [P] Add JSDoc comments to all sub-components (Root, Control, Label, Indicator, HiddenInput)
- [ ] T096 [P] Create BpkCheckbox.figma.tsx for Figma Code Connect in packages/bpk-component-checkbox/src/BpkCheckbox/

### White Variant

- [ ] T097 [P] Add white prop handling in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [ ] T098 [P] Implement --white modifier styles in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss
- [ ] T099 Add white variant tests in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx

### Small Label Variant

- [ ] T100 [P] Add smallLabel prop handling in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [ ] T101 [P] Implement __label--small modifier styles in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.module.scss
- [ ] T102 Add smallLabel tests in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx

### Required Field Support

- [ ] T103 [P] Add required prop handling with asterisk rendering in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox.tsx
- [ ] T104 [P] Add aria-required attribute when required=true in BpkCheckbox.tsx
- [ ] T105 Add required field tests (asterisk visible, aria-required) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx

### Form Integration

- [ ] T106 [P] Add form integration tests (name, value attributes) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [ ] T107 [P] Create form-test.tsx for native form submission tests in packages/bpk-component-checkbox/src/BpkCheckbox/

### Edge Cases

- [ ] T108 [P] Add edge case tests (long labels, no onChange, null values) in packages/bpk-component-checkbox/src/BpkCheckbox/BpkCheckbox-test.tsx
- [ ] T109 [P] Add touch target size tests (44x44px minimum) in accessibility-test.tsx
- [ ] T110 [P] Add nested BpkThemeProvider tests in BpkCheckbox-test.tsx

### Visual Regression

- [ ] T111 Verify all existing Storybook stories still work (Default, Indeterminate, Invalid, Multiline, White, Disabled, Required, SmallLabel, VisualTest)
- [ ] T112 Run Percy visual regression tests and verify no unexpected changes

### Final Verification

- [ ] T113 Run full test suite with npm test and verify all pass
- [ ] T114 Check test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- [X] T115 Run linter (ESLint, Stylelint) and fix all warnings/errors
- [ ] T116 Run TypeScript compiler and verify no errors
- [ ] T117 Run Storybook locally and verify all stories render correctly
- [ ] T118 Test in all supported browsers (Chrome, Edge, Firefox, Safari)
- [ ] T119 Manual accessibility testing (keyboard navigation, screen reader)
- [ ] T120 Manual RTL testing (render with dir="rtl")
- [ ] T121 Remove backup file packages/bpk-component-checkbox/src/BpkCheckbox.backup.tsx

**Phase 9 Completion Criteria**:
- ✅ Documentation complete
- ✅ All variants implemented (white, smallLabel, required)
- ✅ Edge cases handled
- ✅ Visual regression tests pass
- ✅ All manual testing complete
- ✅ Ready for code review

---

## Parallel Execution Examples

### Setup Phase (T002-T005)
Can run in parallel - different files:
```bash
# Terminal 1
Task T002: Create BpkCheckbox/ directory

# Terminal 2
Task T003: Create common-types.ts

# Terminal 3
Task T004: Create BpkCheckbox.module.scss

# Terminal 4
Task T005: Update package.json
```

### Foundational Phase (T006-T008)
Type definitions can be added in parallel - same file, different exports:
```bash
# Terminal 1
Task T006-T008: Add all type definitions to common-types.ts
```

### User Story 1 Types (T014-T020)
Can run in parallel - same file, different type definitions:
```bash
# Terminal 1
Task T014-T020: Add all BpkCheckbox type definitions
```

### User Story 1 Styling (T027-T032)
Can run in parallel - same file, different style blocks:
```bash
# Terminal 1
Task T027-T032: Add all styles to BpkCheckbox.module.scss
```

### Documentation (T089-T096)
Can run in parallel - different files/sections:
```bash
# Terminal 1
Task T089-T093: Update README.md

# Terminal 2
Task T094-T095: Add JSDoc comments

# Terminal 3
Task T096: Create Figma Code Connect
```

---

## Task Summary

**Total Tasks**: 121

### By Phase:
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 8 tasks
- Phase 3 (US1 - MVP): 35 tasks
- Phase 4 (US2 - Composable): 12 tasks
- Phase 5 (US3 - Theming): 10 tasks
- Phase 6 (US4 - States): 8 tasks
- Phase 7 (US5 - Validation): 5 tasks
- Phase 8 (US6 - RTL): 5 tasks
- Phase 9 (Polish): 33 tasks

### By Type:
- Implementation: 48 tasks
- Testing: 43 tasks
- Documentation: 16 tasks
- Verification: 14 tasks

### Parallelizable:
- 32 tasks marked with [P] can run in parallel

---

## Testing Strategy

**Coverage Requirements**:
- Branches: 70%
- Functions: 75%
- Lines: 75%
- Statements: 75%

**Test Files**:
1. `BpkCheckbox-test.tsx` - Unit tests (rendering, interaction, props, snapshots)
2. `accessibility-test.tsx` - Accessibility tests (jest-axe, ARIA, keyboard navigation)
3. `themeAttributes-test.ts` - Theme attributes verification
4. `form-test.tsx` - Form integration tests

**Test Coverage by User Story**:
- US1: 12 test tasks (rendering, interaction, controlled/uncontrolled, accessibility)
- US2: 4 test tasks (composable rendering, ARIA associations)
- US3: 4 test tasks (theming, fallback, dynamic changes)
- US4: 4 test tasks (disabled, indeterminate states)
- US5: 3 test tasks (validation states, aria-invalid)
- US6: 3 test tasks (RTL layout, accessibility in RTL)

---

## Success Criteria

### MVP (US1) Success:
- ✅ Checkbox component renders
- ✅ Click toggles state
- ✅ Keyboard navigation works (Tab, Space)
- ✅ Label click toggles state
- ✅ onChange callback fires correctly
- ✅ Tests pass with 70%+ branch coverage
- ✅ No accessibility violations (jest-axe)

### Full Feature Success:
- ✅ All 6 user stories implemented
- ✅ 100% backward compatibility verified
- ✅ Composable API works
- ✅ Theming works with BpkThemeProvider
- ✅ All states implemented (disabled, indeterminate, invalid)
- ✅ RTL support verified
- ✅ All tests pass (121 tasks complete)
- ✅ Coverage thresholds met
- ✅ Documentation complete
- ✅ Visual regression tests pass
- ✅ Manual testing complete

---

## Notes

### Backward Compatibility
All existing BpkCheckbox usage MUST continue to work:
- Same props (name, label, required, disabled, white, className, smallLabel, valid, indeterminate)
- Same behavior (controlled/uncontrolled, onChange callback)
- Same visual output (default styling matches current component)

### Ark UI Integration
First Backpack component to use Ark UI primitives:
- Import from `@ark-ui/react`
- Wrap primitives with Backpack styling
- Maintain Backpack conventions (BEM, CSS Modules, design tokens)

### Theming
Preserve existing theming:
- Keep `checkboxCheckedColor` attribute
- Use `bpk-themeable-property` mixin
- Follow BpkButton theming pattern

### File Paths
All paths are absolute from repo root:
- Component: `packages/bpk-component-checkbox/src/BpkCheckbox/`
- Storybook: `examples/bpk-component-checkbox/`
- Tests: Co-located with component files

---

## Ready to Start

Begin with Phase 1 (Setup) tasks T001-T005, then proceed to Phase 2 (Foundational) and Phase 3 (US1 - MVP).

After MVP is complete and verified, implement remaining user stories in priority order: US2, US3, US4, US6, US5.
