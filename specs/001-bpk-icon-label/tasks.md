# Implementation Tasks: BpkIconLabel

**Feature**: BpkIconLabel Component
**Branch**: `001-bpk-icon-label`
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Created**: 2026-01-28

## Overview

This document contains the implementation tasks for BpkIconLabel - a compound component that displays an icon alongside text with optional inline links. Tasks are organized by user story to enable independent implementation and testing.

### User Stories from Spec

1. **[US1] Basic Icon with Text Label (P1)** - Foundation: Display icon + text
2. **[US2] Icon with Text and Link (P2)** - Link support: Add inline links
3. **[US3] Dark Background Support (P2)** - On-dark variant
4. **[US4] Optional Icon Display (P3)** - Hide icon option

### Implementation Strategy

**MVP Scope** (Minimum Viable Product):
- User Story 1 only (Basic Icon with Text)
- Delivers core value: icon + text display
- Fully testable and usable independently

**Incremental Delivery**:
- Phase 3: US1 (P1) - MVP, blocking for nothing
- Phase 4: US2 (P2) - Link support, independent of US3/US4
- Phase 5: US3 (P2) - On-dark variant, independent of US2/US4
- Phase 6: US4 (P3) - Hide icon, independent of US2/US3

---

## Phase 1: Setup & Infrastructure

**Goal**: Initialize package structure and development environment

### Tasks

- [ ] T001 Create package directory `packages/bpk-component-icon-label/`
- [ ] T002 Create `packages/bpk-component-icon-label/README.md` with boilerplate
- [ ] T003 Create `packages/bpk-component-icon-label/index.ts` export file
- [ ] T004 Create `packages/bpk-component-icon-label/docs/` directory for screenshots
- [ ] T005 Create `packages/bpk-component-icon-label/src/` directory structure
- [ ] T006 Create `packages/bpk-component-icon-label/src/BpkIconLabel/` component directory
- [ ] T007 Create `packages/bpk-component-icon-label/src/BpkIconLabel/__snapshots__/` directory
- [ ] T008 Create `examples/bpk-component-icon-label/` Storybook directory
- [ ] T009 [P] Create `packages/bpk-component-icon-label/src/BpkIconLabel/common-types.ts` with Apache 2.0 license header
- [ ] T010 [P] Create `packages/bpk-component-icon-label/src/themeAttributes.ts` with Apache 2.0 license header

---

## Phase 2: Foundational Components

**Goal**: Implement compound component structure with Context

**Blocking Prerequisites**: All of Phase 1 must be complete

### Tasks

- [ ] T011 Define TypeScript types in `packages/bpk-component-icon-label/src/BpkIconLabel/common-types.ts` (BpkIconLabelType, BpkIconLabelStyle, BpkIconLabelContext)
- [ ] T012 Create IconLabelContext in `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx` with license header
- [ ] T013 Implement BpkIconLabelRoot component in `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx` (context provider, default props)
- [ ] T014 Implement BpkIconLabelIcon component in `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx` (asChild pattern, context consumer)
- [ ] T015 Implement BpkIconLabelText component in `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx` (context consumer, children support)
- [ ] T016 Create main export structure in `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx` (Object.assign pattern with subcomponents)
- [ ] T017 Export all types and components from `packages/bpk-component-icon-label/src/BpkIconLabel/index.ts`
- [ ] T018 Re-export from `packages/bpk-component-icon-label/src/index.ts`
- [ ] T019 Re-export from `packages/bpk-component-icon-label/index.ts`

---

## Phase 3: User Story 1 - Basic Icon with Text Label (P1) ⭐ MVP

**Story Goal**: Developers can display an informational icon alongside text content

**Independent Test**: Render component with minimal props (icon + text), verify icon appears left of text with 8px spacing

**Priority**: P1 (Must Have - Foundation)
**Dependencies**: Phase 2 complete
**Can Run In Parallel**: No dependencies on other user stories

### Implementation Tasks

- [ ] T020 [US1] Create base SCSS file `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.module.scss` with Apache 2.0 license header
- [ ] T021 [US1] Import Sass mixins in BpkIconLabel.module.scss (@use tokens, typography, utils)
- [ ] T022 [US1] Implement `.bpk-icon-label` base class with flexbox layout (display: flex, align-items: flex-start, gap: 8px)
- [ ] T023 [US1] Implement `.bpk-icon-label__icon` class with fixed 16x16px size
- [ ] T024 [US1] Implement `.bpk-icon-label__text--body` class with typography.bpk-body-default() mixin
- [ ] T025 [US1] Implement `.bpk-icon-label__text--label-1` class with typography.bpk-label-1() mixin
- [ ] T026 [US1] Implement `.bpk-icon-label__text--footnote` class with typography.bpk-footnote() mixin
- [ ] T027 [US1] Apply default color tokens to text and icon (tokens.$bpk-text-primary-day)
- [ ] T028 [US1] Implement RTL support with utils.bpk-rtl mixin (flex-direction: row-reverse)
- [ ] T029 [US1] Import styles in BpkIconLabel.tsx and apply className logic

### Testing Tasks

- [ ] T030 [US1] Create `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel-test.tsx` with Apache 2.0 license header
- [ ] T031 [US1] Write test: renders with icon and text
- [ ] T032 [US1] Write test: renders with type="body" at 16px regular
- [ ] T033 [US1] Write test: renders with type="label-1" at 16px bold
- [ ] T034 [US1] Write test: renders with type="footnote" at 14px regular
- [ ] T035 [US1] Write snapshot tests for all 3 type variants
- [ ] T036 [US1] Create `packages/bpk-component-icon-label/src/BpkIconLabel/accessibility-test.tsx` with Apache 2.0 license header
- [ ] T037 [US1] Write jest-axe test: no accessibility violations with icon and text
- [ ] T038 [US1] Write test: icon has aria-hidden="true"
- [ ] T039 [US1] Run tests and verify 70% branch, 75% function/line/statement coverage for US1

### Storybook Tasks

- [ ] T040 [US1] Create `examples/bpk-component-icon-label/stories.tsx` with Apache 2.0 license header
- [ ] T041 [US1] Create `examples/bpk-component-icon-label/examples.tsx` with Apache 2.0 license header
- [ ] T042 [US1] Implement Default story (Body + Default style)
- [ ] T043 [US1] Implement story for type="body"
- [ ] T044 [US1] Implement story for type="label-1"
- [ ] T045 [US1] Implement story for type="footnote"
- [ ] T046 [US1] Add a11y addon to stories

---

## Phase 4: User Story 2 - Icon with Text and Link (P2)

**Story Goal**: Developers can add actionable inline links after text

**Independent Test**: Render component with inline link in Text children, verify link is clickable and properly styled

**Priority**: P2 (Should Have)
**Dependencies**: Phase 3 (US1) complete
**Can Run In Parallel**: Independent of US3, US4

### Implementation Tasks

- [ ] T047 [US2] Update BpkIconLabelText component to support ReactNode children (already done, verify)
- [ ] T048 [US2] Add link styling in BpkIconLabel.module.scss (.bpk-icon-label__text a)
- [ ] T049 [US2] Apply link color token (tokens.$bpk-text-link-day)
- [ ] T050 [US2] Add text-decoration: underline to links
- [ ] T051 [US2] Implement hover styles for links (minimal color change only)
- [ ] T052 [US2] Implement convenience API wrapper function in BpkIconLabel.tsx (BpkIconLabelSimple)
- [ ] T053 [US2] Add linkText, linkHref, onLinkClick props to convenience API

### Testing Tasks

- [ ] T054 [US2] Write test: renders with inline link in Text children
- [ ] T055 [US2] Write test: link is clickable and calls onClick handler
- [ ] T056 [US2] Write test: link has underline styling
- [ ] T057 [US2] Write test: link has proper color
- [ ] T058 [US2] Write snapshot test for component with link
- [ ] T059 [US2] Write accessibility test: link is keyboard accessible (Tab to focus)
- [ ] T060 [US2] Write accessibility test: link activates with Enter/Space
- [ ] T061 [US2] Run tests and verify coverage maintained above thresholds

### Storybook Tasks

- [ ] T062 [US2] Create story: Icon with text and inline link
- [ ] T063 [US2] Create story: Interactive link functionality demo
- [ ] T064 [US2] Create story: Convenience API with linkText/linkHref

---

## Phase 5: User Story 3 - Dark Background Support (P2)

**Story Goal**: Component works on dark backgrounds with proper contrast

**Independent Test**: Render with style="on-dark", verify text/icon colors are white

**Priority**: P2 (Should Have)
**Dependencies**: Phase 3 (US1) complete
**Can Run In Parallel**: Independent of US2, US4

### Implementation Tasks

- [ ] T065 [US3] Implement `.bpk-icon-label--on-dark` modifier class in BpkIconLabel.module.scss
- [ ] T066 [US3] Apply on-dark color tokens (tokens.$bpk-text-on-dark-day) to text and icon
- [ ] T067 [US3] Apply themeable properties for on-dark variant (--bpk-icon-label-on-dark-text-color)
- [ ] T068 [US3] Update link colors for on-dark variant
- [ ] T069 [US3] Update BpkIconLabelRoot to apply --on-dark class based on style prop

### Testing Tasks

- [ ] T070 [US3] Write test: renders with style="on-dark"
- [ ] T071 [US3] Write test: text color is white on dark background
- [ ] T072 [US3] Write test: icon color is white on dark background
- [ ] T073 [US3] Write test: link maintains proper contrast on dark
- [ ] T074 [US3] Write snapshot tests for all 3 types × on-dark style (6 total snapshots)
- [ ] T075 [US3] Write accessibility test: color contrast meets WCAG 2.2 AA on dark backgrounds
- [ ] T076 [US3] Run tests and verify coverage maintained

### Storybook Tasks

- [ ] T077 [US3] Create story: On dark background variant (Body + On-dark)
- [ ] T078 [US3] Create story: All type variants on dark background
- [ ] T079 [US3] Create story: On-dark with link

---

## Phase 6: User Story 4 - Optional Icon Display (P3)

**Story Goal**: Component can hide icon for text-only display

**Independent Test**: Render with showIcon={false}, verify only text displays

**Priority**: P3 (Nice to Have)
**Dependencies**: Phase 3 (US1) complete
**Can Run In Parallel**: Independent of US2, US3

### Implementation Tasks

- [ ] T080 [US4] Add conditional rendering logic in BpkIconLabel.tsx to hide icon wrapper
- [ ] T081 [US4] Update convenience API to support showIcon prop
- [ ] T082 [US4] Update CSS to handle spacing when icon is missing (gap still applies to flex)
- [ ] T083 [US4] Update compound API: allow Text without Icon as children

### Testing Tasks

- [ ] T084 [US4] Write test: renders without icon when showIcon=false (convenience API)
- [ ] T085 [US4] Write test: renders without Icon component (compound API)
- [ ] T086 [US4] Write test: spacing adjusts appropriately without icon
- [ ] T087 [US4] Write snapshot test for text-only variant
- [ ] T088 [US4] Write accessibility test: text-only has no violations
- [ ] T089 [US4] Run tests and verify coverage maintained

### Storybook Tasks

- [ ] T090 [US4] Create story: Text without icon (compound API)
- [ ] T091 [US4] Create story: showIcon={false} (convenience API)

---

## Phase 7: Theming Support

**Goal**: Enable runtime theme customization via BpkThemeProvider

**Dependencies**: Phases 3, 4, 5 complete (all styling in place)

### Implementation Tasks

- [ ] T092 Define theme attributes in `packages/bpk-component-icon-label/src/themeAttributes.ts` (iconLabelThemeAttributes, iconLabelOnDarkThemeAttributes)
- [ ] T093 Apply themeable-property mixin to all color properties in BpkIconLabel.module.scss
- [ ] T094 Export theme attributes from package index files
- [ ] T095 Test theme application with BpkThemeProvider wrapper

### Testing Tasks

- [ ] T096 Write test: theme attributes export correct values
- [ ] T097 Write test: theme colors apply via BpkThemeProvider
- [ ] T098 Write test: fallback to design tokens when no theme provided

### Storybook Tasks

- [ ] T099 Create story: Themed component with custom colors
- [ ] T100 Create story: Theme fallback behavior

---

## Phase 8: Documentation

**Goal**: Complete component documentation

**Dependencies**: All user story phases complete

### Tasks

- [ ] T101 Write comprehensive README.md in `packages/bpk-component-icon-label/README.md` (<100 words British English, compound API examples)
- [ ] T102 Add usage examples for all type variants to README
- [ ] T103 Add convenience API examples to README
- [ ] T104 Add props table with all properties documented
- [ ] T105 Add browser support information to README
- [ ] T106 Add RTL support notes to README
- [ ] T107 Add JSDoc comments to all components and props in BpkIconLabel.tsx
- [ ] T108 Add @example tags to JSDoc showing compound API usage
- [ ] T109 Create `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.figma.tsx` with Apache 2.0 license header
- [ ] T110 Connect component to Figma node ID 21640-6807 in .figma.tsx
- [ ] T111 Map props to Figma properties (type, style, icon) in .figma.tsx
- [ ] T112 Add Figma Code Connect usage examples

---

## Phase 9: Visual Regression & Cross-Browser Testing

**Goal**: Ensure visual consistency across browsers and prevent regressions

**Dependencies**: All user stories complete, Storybook stories created

### Tasks

- [ ] T113 Configure Percy visual regression tests for all Storybook stories
- [ ] T114 Capture baseline screenshots for all 6 primary variants
- [ ] T115 Capture baseline for no-icon variant
- [ ] T116 Capture baseline for long text wrapping
- [ ] T117 Capture baseline for RTL layout
- [ ] T118 Test component in Chrome 109+
- [ ] T119 Test component in Edge 129+
- [ ] T120 Test component in Firefox 131+
- [ ] T121 Test component in Safari 15+
- [ ] T122 Test component in Samsung 26+

---

## Phase 10: Polish & Integration

**Goal**: Final polish, edge case handling, and integration preparation

**Dependencies**: All previous phases complete

### Tasks

- [ ] T123 Handle edge case: Empty text prop (render empty or console warning)
- [ ] T124 Handle edge case: Extremely long text (verify wrapping behavior)
- [ ] T125 Handle edge case: Icon size mismatch (enforce 16x16px)
- [ ] T126 Handle edge case: Very long link text (verify wrapping)
- [ ] T127 Verify RTL layout with dir="rtl" attribute
- [ ] T128 Test keyboard navigation (Tab to link)
- [ ] T129 Test screen reader compatibility (manual test with VoiceOver/NVDA)
- [ ] T130 Test 200% text magnification
- [ ] T131 Test 400% zoom without horizontal scrolling
- [ ] T132 Run full linting (ESLint, Stylelint)
- [ ] T133 Run TypeScript type checking (no errors)
- [ ] T134 Run full test suite and verify all passing
- [ ] T135 Verify test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- [ ] T136 Take component screenshots for docs/ directory
- [ ] T137 Update package exports if needed
- [ ] T138 Prepare for PR: verify constitution checklist passes

---

## Task Statistics

**Total Tasks**: 138

**By Phase**:
- Phase 1 (Setup): 10 tasks
- Phase 2 (Foundational): 9 tasks
- Phase 3 (US1 - MVP): 27 tasks
- Phase 4 (US2): 18 tasks
- Phase 5 (US3): 15 tasks
- Phase 6 (US4): 12 tasks
- Phase 7 (Theming): 9 tasks
- Phase 8 (Documentation): 12 tasks
- Phase 9 (Visual Regression): 10 tasks
- Phase 10 (Polish): 16 tasks

**By User Story**:
- US1 (Basic Icon + Text): 27 tasks
- US2 (Links): 18 tasks
- US3 (On-dark): 15 tasks
- US4 (Hide Icon): 12 tasks
- Infrastructure/Polish: 66 tasks

**Parallelization Opportunities**: 5 tasks marked [P] in Setup/Foundational phases

---

## Dependencies & Execution Order

### Story Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational)
    ↓
Phase 3 (US1) ←─ MVP Milestone
    ├→ Phase 4 (US2) [Independent]
    ├→ Phase 5 (US3) [Independent]
    └→ Phase 6 (US4) [Independent]
         ↓
    Phase 7 (Theming)
         ↓
    Phase 8 (Documentation)
         ↓
    Phase 9 (Visual Regression)
         ↓
    Phase 10 (Polish)
```

### Independent User Stories

After Phase 3 (US1) completes, these can run in parallel:
- **US2 (Links)**: No dependency on US3 or US4
- **US3 (On-dark)**: No dependency on US2 or US4
- **US4 (Hide icon)**: No dependency on US2 or US3

### MVP Delivery

**Minimum Viable Product** (Phase 3 only):
- ✅ Deliverable after Phase 3 completes
- ✅ Core value: Icon + text display with 3 typography variants
- ✅ Fully testable independently
- ✅ Usable in production for basic use cases
- ⏭️ Skip Phases 4-6 for fastest delivery

**Full Feature Set** (All Phases):
- Complete after Phase 10
- All user stories (P1, P2, P3) implemented
- Production-ready with documentation and tests

---

## Parallel Execution Examples

### Within Phase 3 (US1)

Can run in parallel (different files, no dependencies):
- T020-T029: SCSS tasks (BpkIconLabel.module.scss)
- T030-T039: Test tasks (BpkIconLabel-test.tsx, accessibility-test.tsx)
- T040-T046: Storybook tasks (stories.tsx, examples.tsx)

### Across User Stories (After Phase 3)

Can run in parallel (independent stories):
- Phase 4 (US2): Link implementation team
- Phase 5 (US3): On-dark styling team
- Phase 6 (US4): Hide icon feature team

---

## Implementation Notes

### Critical Path

Must be done sequentially:
1. Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1)
2. Cannot start user stories until foundational compound component structure exists
3. Theming (Phase 7) requires all styling to be in place first

### Quick Start for Developers

**To implement MVP (US1 only)**:
1. Run tasks T001-T019 (Setup + Foundational)
2. Run tasks T020-T046 (US1 implementation)
3. Deploy with basic icon + text functionality

**To add features incrementally**:
1. After MVP: Pick any of US2, US3, or US4 (no interdependencies)
2. Complete chosen story phase
3. Deploy incremental update

### Testing Strategy

- Unit tests: Each story phase includes dedicated test tasks
- Accessibility tests: jest-axe tests per story
- Visual tests: Percy screenshots after all stories complete
- Integration tests: Phase 10 edge cases and cross-browser

### File Organization

All component files in:
```
packages/bpk-component-icon-label/src/BpkIconLabel/
├── BpkIconLabel.tsx              # Main component + context + subcomponents
├── BpkIconLabel.module.scss       # All styles
├── BpkIconLabel-test.tsx          # Unit tests
├── accessibility-test.tsx          # A11y tests
├── BpkIconLabel.figma.tsx         # Figma Code Connect
├── common-types.ts                 # TypeScript types
└── __snapshots__/                  # Jest snapshots
```

---

## Quality Gates

Before merging to main:
- [ ] All tests passing (T134)
- [ ] Coverage thresholds met (T135): 70% branches, 75% functions/lines/statements
- [ ] TypeScript compiles (T133)
- [ ] Linting passes (T132)
- [ ] Constitution checklist passes (T138)
- [ ] All user stories tested independently
- [ ] Visual regression tests pass
- [ ] Accessibility tests pass (jest-axe)
- [ ] Manual screen reader testing complete
- [ ] Documentation complete

---

## References

- **Spec**: [spec.md](./spec.md) - User stories and requirements
- **Plan**: [plan.md](./plan.md) - Technical approach and architecture
- **Research**: [research.md](./research.md) - Pattern decisions
- **API Design**: [api-design.md](./api-design.md) - TypeScript interfaces
- **Styling Guide**: [styling-guide.md](./styling-guide.md) - SCSS implementation
- **Constitution**: `.specify/memory/constitution.md` - Backpack standards
- **Decisions**: `decisions/` - Architecture decisions

---

## Task Format Validation

✅ **All tasks follow required format**: `- [ ] [TaskID] [P?] [Story?] Description with file path`

**Examples from this document**:
- ✅ `- [ ] T001 Create package directory packages/bpk-component-icon-label/`
- ✅ `- [ ] T009 [P] Create packages/bpk-component-icon-label/src/BpkIconLabel/common-types.ts with Apache 2.0 license header`
- ✅ `- [ ] T020 [US1] Create base SCSS file packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.module.scss with Apache 2.0 license header`
- ✅ `- [ ] T054 [US2] Write test: renders with inline link in Text children`
