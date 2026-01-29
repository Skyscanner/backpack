# Implementation Tasks: Checkbox Card Component

**Feature**: Checkbox Card (BpkCheckboxCard)
**Branch**: `001-checkbox-card`
**Specification**: [spec.md](./spec.md)
**Implementation Plan**: [plan.md](./plan.md)

---

## Overview

This document provides a sequenced task list for implementing the BpkCheckboxCard component. Tasks are organized by user story to enable independent, incremental delivery.

**Tech Stack**:
- React 18.3.1 with TypeScript 5.9.2
- CSS Modules + Sass (modern `@use` API)
- Jest 30 + Testing Library + jest-axe
- Backpack Design System (Monorepo)

**Total Tasks**: 54
**Parallel Opportunities**: 31 tasks can run in parallel

---

## Task Summary by User Story

| Phase | User Story | Priority | Tasks | Independent Test |
|-------|------------|----------|-------|------------------|
| 1 | Setup | - | 5 | N/A |
| 2 | Foundational | - | 4 | N/A |
| 3 | US1: Select Option and Trigger Search | P1 | 10 | Render with minimal props, verify selection and onChange |
| 4 | US2: Display Rich Content | P2 | 9 | Render with different content types, verify display |
| 5 | US3: Keyboard & Assistive Technology | P2 | 8 | Keyboard navigation, screen reader testing |
| 6 | US4: Visual Variants and States | P3 | 8 | Snapshot tests, Percy visual regression |
| 7 | US5: RTL Language Support | P3 | 5 | RTL mode rendering, layout verification |
| 8 | Polish & Documentation | - | 5 | Full integration tests |

---

## Dependencies & Execution Strategy

### User Story Dependencies
```
Setup (Phase 1)
  └─> Foundational (Phase 2)
       └─> US1 (Phase 3) ──┬─> US2 (Phase 4)
                           ├─> US3 (Phase 5)
                           ├─> US4 (Phase 6)
                           └─> US5 (Phase 7)
                                └─> Polish (Phase 8)
```

**Key Dependencies**:
- US1 must complete before other stories (provides base component)
- US2, US3, US4, US5 are independent of each other once US1 completes
- US2 and US3 are P2 priority, implement in parallel
- US4 and US5 are P3 priority, implement after P2 stories

### MVP Recommendation
**Minimum Viable Product**: Complete Phase 1, 2, and 3 (US1) only
- Provides core selection functionality
- Can ship independently
- ~19 tasks to MVP

### Parallel Execution Examples

**Phase 1 (Setup)**: All tasks sequential

**Phase 2 (Foundational)**: All tasks sequential

**Phase 3 (US1)**: 6 parallelizable tasks
```bash
# Run in parallel:
T010 [P] [US1] TypeScript types
T011 [P] [US1] Main component structure
T012 [P] [US1] Base SCSS structure
T013 [P] [US1] Unit tests setup
T015 [P] [US1] Accessibility tests setup
T016 [P] [US1] Form integration tests setup

# Then sequential:
T014 [US1] Selection logic implementation
T017 [US1] onChange callback implementation
T018 [US1] Snapshot tests
T019 [US1] Verify US1 acceptance criteria
```

**Phase 4-7 (US2-US5)**: Can run entirely in parallel after US1 completes
```bash
# All 4 stories can be developed concurrently:
Phase 4 (US2) || Phase 5 (US3) || Phase 6 (US4) || Phase 7 (US5)
```

---

## Phase 1: Setup

**Objective**: Initialize package structure and configuration

### Tasks

- [x] T001 Create package directory at packages/bpk-component-checkbox-card/
- [x] T002 Create index.ts export file at packages/bpk-component-checkbox-card/index.ts
- [x] T003 Create src/ directory structure per plan.md at packages/bpk-component-checkbox-card/src/BpkCheckboxCard/
- [x] T004 Add Apache 2.0 license headers to all TypeScript template files
- [x] T005 Create empty README.md at packages/bpk-component-checkbox-card/README.md

**Phase 1 Complete**: Package structure exists with proper licensing

---

## Phase 2: Foundational (Blocking Prerequisites)

**Objective**: Establish shared infrastructure needed by all user stories

### Tasks

- [x] T006 Define CHECKBOX_CARD_VARIANTS constants in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/common-types.ts
- [x] T007 Define CheckboxCardVariant type in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/common-types.ts
- [x] T008 Set up CSS Modules configuration in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T009 Import cssModules utility in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx

**Phase 2 Complete**: Common types and utilities available for all stories

---

## Phase 3: User Story 1 - Select Option and Trigger Search (Priority: P1)

**Story Goal**: Enable basic selection functionality with checkbox card

**Independent Test**: Render component with minimal props (label, price, onChange), verify selection state changes and callback invocation

**Acceptance Criteria**:
- Card toggles between selected/unselected on click
- onChange callback invoked with correct checked state
- Price displayed with Backpack formatting
- Parent component controls selection state (stateless component)

### Tasks

- [x] T010 [P] [US1] Define BpkCheckboxCardProps interface with checked, onChange, label, price props in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T011 [P] [US1] Create BpkCheckboxCard component structure with label wrapper and hidden input in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T012 [P] [US1] Add base SCSS classes (.bpk-checkbox-card, __input, __content) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T013 [P] [US1] Create unit test file with basic rendering test in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx
- [x] T014 [US1] Implement selection state toggle logic with handleChange handler in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T015 [P] [US1] Create accessibility test file with zero violations test in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/accessibility-test.tsx
- [x] T016 [P] [US1] Create form integration test file in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/form-test.tsx
- [x] T017 [US1] Implement onChange callback with (checked, event) signature in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T018 [US1] Add snapshot tests for checked and unchecked states in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx
- [x] T019 [US1] Verify all US1 acceptance scenarios pass

**US1 MVP Complete**: Basic checkbox card with selection functionality working

---

## Phase 4: User Story 2 - Display Rich Content (Priority: P2)

**Story Goal**: Support icons, images, labels, descriptions, and price display

**Independent Test**: Render cards with different content combinations, verify correct visual presentation

**Acceptance Criteria**:
- Icon displayed prominently when provided
- Image displayed with appropriate sizing
- Labels readable and properly positioned
- Indicator shown when selected
- BpkPrice integration works correctly

### Tasks

- [x] T020 [P] [US2] Add icon, image, description, indicator props to BpkCheckboxCardProps in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T021 [P] [US2] Add SCSS classes for content elements (__icon, __image, __text, __label, __description, __price, __indicator) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T022 [P] [US2] Import Sass mixins (typography, tokens) for text styling in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T023 [US2] Implement icon rendering logic with flex container in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T024 [US2] Implement image rendering logic with URL and ReactElement support in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T025 [US2] Implement label and description rendering with text truncation in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T026 [US2] Implement price display with string and ReactElement support in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T027 [US2] Implement conditional indicator rendering when checked in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T028 [US2] Add unit tests for all content prop combinations in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx

**US2 Complete**: Rich content display fully functional

---

## Phase 5: User Story 3 - Keyboard and Assistive Technology Support (Priority: P2)

**Story Goal**: Full keyboard navigation and screen reader support

**Independent Test**: Keyboard navigation simulation (Tab, Enter, Space), screen reader testing

**Acceptance Criteria**:
- Tab navigation focuses cards with visible indicator
- Space/Enter toggles selection
- ARIA attributes present and correct
- Focus moves sequentially through cards
- Disabled cards skipped in tab order

### Tasks

- [x] T029 [P] [US3] Add disabled, ariaLabel, name, value props to BpkCheckboxCardProps in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T030 [P] [US3] Add SCSS for focus indicator (__input:focus-visible) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T031 [US3] Implement ARIA attributes (role="checkbox", aria-checked, aria-disabled, aria-label) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T032 [US3] Implement disabled state logic preventing interaction in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T033 [US3] Add keyboard event tests (Space, Enter) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx
- [x] T034 [US3] Add jest-axe tests for all states (checked, unchecked, disabled) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/accessibility-test.tsx
- [x] T035 [US3] Add form integration tests with name/value attributes in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/form-test.tsx
- [x] T036 [US3] Verify zero accessibility violations with jest-axe

**US3 Complete**: Full accessibility compliance achieved

---

## Phase 6: User Story 4 - Visual Variants and States (Priority: P3)

**Story Goal**: Visual variants (with-background, no-background) and state styling

**Independent Test**: Snapshot tests and Percy visual regression for all variants/states

**Acceptance Criteria**:
- with-background variant shows visible background
- no-background variant uses borders only
- All states (default, hover, focus, selected, disabled) visually distinct
- Selected state obviously different
- Disabled state has reduced opacity

### Tasks

- [x] T037 [P] [US4] Add variant prop to BpkCheckboxCardProps with default in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T038 [P] [US4] Add variant modifier classes (--with-background, --no-background) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T039 [P] [US4] Add state modifier classes (--checked, --disabled, --checked--disabled) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T040 [P] [US4] Import Sass mixins (cards, shadows, borders, radii) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T041 [US4] Implement variant styling with background colors and elevation in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T042 [US4] Implement hover state styling with shadow and background changes in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T043 [US4] Implement disabled state styling with opacity and cursor in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T044 [US4] Add snapshot tests for all variant/state combinations in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx

**US4 Complete**: Visual variants and states fully implemented

---

## Phase 7: User Story 5 - RTL Language Support (Priority: P3)

**Story Goal**: Proper RTL layout with mirrored positioning

**Independent Test**: Render in RTL mode, verify layout mirroring

**Acceptance Criteria**:
- Icon position mirrored in RTL
- Content flows right-to-left
- Indicator position mirrored
- Text truncation works in RTL
- All visual elements properly positioned

### Tasks

- [x] T045 [P] [US5] Import RTL mixin (utils.bpk-rtl) in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T046 [US5] Add RTL support for icon positioning with order property in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T047 [US5] Add RTL support for image positioning with order property in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T048 [US5] Add RTL support for indicator absolute positioning in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss
- [x] T049 [US5] Add RTL snapshot tests in packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard-test.tsx

**US5 Complete**: RTL language support fully functional

---

## Phase 8: Polish & Documentation

**Objective**: Complete documentation, Storybook, and final integration

### Tasks

- [x] T050 [P] Write README.md with component description, usage examples, props table at packages/bpk-component-checkbox-card/README.md
- [x] T051 [P] Create Storybook stories for all use cases at examples/bpk-component-checkbox-card/stories.tsx
- [x] T052 [P] Add JSDoc comments to all props and component at packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.tsx
- [x] T053 Create Figma Code Connect integration at packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.figma.tsx
- [x] T054 Run full test suite and verify coverage thresholds (70% branches, 75% functions/lines/statements)

**Phase 8 Complete**: Component fully documented and production-ready

---

## Testing Strategy

### Unit Tests (BpkCheckboxCard-test.tsx)
- Rendering tests for all prop combinations
- onChange callback invocation tests
- Keyboard interaction tests (Space, Enter)
- Disabled state tests
- Edge case tests (long text, missing props)
- Snapshot tests for all variants and states
- **Target**: 70% branch coverage, 75% function/line/statement coverage

### Accessibility Tests (accessibility-test.tsx)
- Zero violations with jest-axe for all states
- ARIA attribute verification
- Keyboard navigation tests
- Focus indicator visibility tests
- **Target**: Zero accessibility violations

### Form Integration Tests (form-test.tsx)
- Form data submission with name/value
- Controlled state management
- Single and multi-selection patterns
- **Target**: All form scenarios passing

### Visual Regression Tests (Percy via Storybook)
- All variants (with-background, no-background)
- All states (default, hover, focus, selected, disabled)
- All content combinations
- Responsive breakpoints
- RTL rendering
- **Target**: Percy tests passing, no unexpected visual changes

---

## Implementation Guidelines

### Critical Patterns

1. **Native Checkbox**: Always use `<input type="checkbox">` for accessibility
2. **CSS Modules**: Use `cssModules` utility from `bpk-react-utils`
3. **Modern Sass**: Use `@use` with namespaces, never `@import`
4. **rem Units**: All sizing must use `rem`, never `px`
5. **Text Truncation**: Use `-webkit-line-clamp` with 2 lines for labels, 3 for descriptions
6. **RTL Support**: Use `@include utils.bpk-rtl` for all directional properties
7. **Performance**: Keep state changes under 100ms

### Common Pitfalls to Avoid

1. ❌ Using `@import` → ✅ Use `@use`
2. ❌ Using `px` units → ✅ Use `rem` units
3. ❌ Missing license headers → ✅ Add Apache 2.0 header to all files
4. ❌ Exposing className prop → ✅ Restrict per Constitution XI
5. ❌ Uncontrolled component → ✅ Always use controlled `checked` prop
6. ❌ Missing ariaLabel when no label → ✅ Validate in development

---

## Validation Checklist

Before marking component complete:

- [ ] All 54 tasks completed
- [ ] All 5 user stories independently testable
- [ ] All acceptance criteria verified
- [ ] Test coverage meets thresholds (70% branches, 75% functions/lines)
- [ ] Zero accessibility violations (jest-axe)
- [ ] Visual regression tests pass (Percy)
- [ ] TypeScript compiles without errors
- [ ] ESLint and Stylelint pass with zero warnings
- [ ] README.md complete with British English prose
- [ ] Storybook stories comprehensive
- [ ] JSDoc comments complete
- [ ] Figma Code Connect implemented
- [ ] All supported browsers tested
- [ ] Keyboard navigation working
- [ ] Screen reader compatible
- [ ] RTL languages supported
- [ ] Performance target met (<100ms state changes)

---

## References

- **Specification**: [spec.md](./spec.md)
- **Implementation Plan**: [plan.md](./plan.md)
- **Research**: [research.md](./research.md)
- **API Design**: [api-design.md](./api-design.md)
- **Styling Guide**: [styling-guide.md](./styling-guide.md)
- **Figma Design**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
