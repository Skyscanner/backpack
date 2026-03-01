<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for developers executing
the BpkCardV2 implementation. Each task is executable without re-reading spec or plan.
==============================================================================
-->

# Tasks: BpkCardV2

**Status**: ✅ IMPLEMENTATION COMPLETE

**Input**: Design documents from `/specs/001-composable-card/`
**Prerequisites**: plan.md, spec.md (both required)

**Backpack Context**: Component implemented in `packages/bpk-component-card-v2/` following Backpack constitution and architecture decisions.

**Tests**: Mandatory for all Backpack components. All tasks include test requirements.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

---

## Phase 1: Setup (Package Initialization) ✅

**Purpose**: Initialize component package structure per Backpack standards

- [x] T001 Create package directory structure:
  - `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents`
  - `packages/bpk-component-card-v2/src/BpkCardV2/utils`
  - `packages/bpk-component-card-v2/src/BpkCardV2/__tests__`

- [x] T002 [P] Create `packages/bpk-component-card-v2/index.ts` with exports for BpkCardV2 namespace

- [x] T003 [P] Create `packages/bpk-component-card-v2/README.md` with component documentation

- [x] T004 [P] Create `packages/bpk-component-card-v2/src/BpkCardV2/` directory with Apache 2.0 license headers

**Checkpoint**: ✅ Package structure initialized per Backpack monorepo standards

---

## Phase 2: Foundational (Blocking Prerequisites) ✅

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T005 Create TypeScript types file `packages/bpk-component-card-v2/src/BpkCardV2/common-types.ts`:
  - BpkCardV2Props interface with variant, bgColor, children, className, ariaLabel, ariaLabelledBy
  - BpkCardV2BodyProps interface with children, split, splitRatio, className, padding
  - BpkCardV2HeaderProps, FooterProps, PrimaryProps, SecondaryProps interfaces
  - BpkCardV2Namespace type for namespace pattern
  - BpkCardV2Padding and BpkCardV2PaddingSize types
  - JSDoc comments for all props
  - **Constitution Check**: ✅ TypeScript with proper types, includes Apache 2.0 header

- [x] T006 [P] Create namespace file `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2.tsx`:
  - Namespace object exporting all subcomponents
  - JSDoc with usage examples
  - **Note**: Uses namespace pattern (not single root component)

- [x] T007 [P] Create subcomponent files in `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents/`:
  - `Root.tsx` - container with variant, bgColor props
  - `Header.tsx` - semantic `<header>` element with padding prop
  - `Body.tsx` - split layout logic with divider insertion
  - `Primary.tsx` - configurable width via CSS custom property
  - `Secondary.tsx` - remainder width
  - `Footer.tsx` - semantic `<footer>` element with padding prop
  - All include Apache 2.0 header and forwardRef

- [x] T007b Create utility file `packages/bpk-component-card-v2/src/BpkCardV2/utils/getPaddingStyle.ts`:
  - Converts padding prop to CSSProperties
  - Maps BpkSpacing token names to CSS custom properties
  - Supports string, vertical/horizontal, and granular padding objects

- [x] T008 [P] Create CSS Modules file `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2.module.scss`:
  - Base class `.bpk-card-v2` with border-radius, default shadow
  - Variant classes: `.bpk-card-v2--default`, `.bpk-card-v2--outlined`, `.bpk-card-v2--noElevation`
  - Subcomponent classes with proper styling
  - Mobile-first responsive using `breakpoints.bpk-breakpoint-above-mobile`
  - RTL support via `utils.bpk-rtl` mixin
  - Divider: horizontal on mobile (separate element), vertical on desktop (pseudo-element)
  - CSS custom properties for spacing tokens
  - **Constitution Check**: ✅ Modern Sass API with `@use`, BEM with `bpk-` prefix

- [x] T009 Verify constitution compliance:
  - [x] Files have Apache 2.0 license headers (`.tsx` and `.scss`)
  - [x] Component uses PascalCase (BpkCardV2)
  - [x] Styles use `.module.scss`
  - [x] Test files use `*-test.tsx` naming
  - [x] TypeScript with proper typing

**Checkpoint**: ✅ Foundation complete

---

## Phase 3: User Story 1 - Build Two-Column Split Layout (Priority: P1) ✅

**Goal**: Developers can create 70/30 split layout cards that stack vertically on mobile without custom CSS

- [x] T010 [P] [US1] Create unit test file `packages/bpk-component-card-v2/src/BpkCardV2/__tests__/BpkCardV2-test.tsx`:
  - Test rendering Body with split=true and Primary/Secondary children
  - Test default splitRatio (70/30)
  - Test custom splitRatio configurations
  - Test rendering without split
  - Verify CSS classes applied correctly

- [x] T011 [P] [US1] Create accessibility test `packages/bpk-component-card-v2/src/BpkCardV2/__tests__/accessibility-test.tsx`:
  - Test with jest-axe for zero violations
  - Test semantic HTML structure

- [x] T012 [US1] Implement Body component split layout logic:
  - Accept split prop (boolean, default false)
  - Accept splitRatio prop (0-100, default 70)
  - Inserts divider element between Primary and Secondary
  - Uses CSS custom property `--bpk-card-v2-primary-width` for ratio

- [x] T013 [US1] Implement divider rendering:
  - Horizontal divider on mobile (separate `<div>` element)
  - Vertical divider on desktop (CSS pseudo-element on Primary)
  - Uses `bpk-line-day` token for color
  - Uses `bpk-spacing-md()` for inset

- [x] T014 [P] [US1] Implement Primary and Secondary components:
  - Primary: width via CSS custom property
  - Secondary: remainder width via calc()
  - Both support className and children props
  - Both use forwardRef

- [x] T015 [US1] Split layout responsiveness verified

**Checkpoint**: ✅ Split layout fully functional and tested

---

## Phase 4: User Story 2 - Multi-Section Explicit Composition (Priority: P1) ✅

**Goal**: Designers can compose Header/Body/Footer explicitly without implicit child ordering confusion

- [x] T016 [P] [US2] Unit tests for Header/Body/Footer composition:
  - Test rendering with all three sections
  - Test rendering Body only (Header/Footer optional)
  - Test snapshots for combinations

- [x] T017 [P] [US2] Accessibility tests for semantic HTML:
  - Test `<header>` element for Header
  - Test `<footer>` element for Footer
  - Test `<div>` for Root and Body

- [x] T018 [US2] Implement Header subcomponent:
  - Render semantic `<header>` element
  - Support children, className, padding props
  - Uses forwardRef

- [x] T019 [US2] Implement Footer subcomponent:
  - Render semantic `<footer>` element
  - Support children, className, padding props
  - Uses forwardRef

- [x] T020 [US2] Root component renders children in order provided:
  - **Note**: Implementation does NOT reorder children automatically
  - Children render in the order specified by consumer
  - Explicit composition means explicit ordering

- [x] T021 [US2] Composition tests pass

**Checkpoint**: ✅ Multi-section composition working with explicit subcomponents

---

## Phase 5: User Story 3 - Visual Variants & Surface Colors (Priority: P1) ✅

**Goal**: Support "default", "outlined", and "noElevation" variants with 8 surface color tokens

- [x] T022 [P] [US3] Unit tests for variants and surface colors:
  - Test variant="default", variant="outlined", variant="noElevation"
  - Test all 8 bgColor tokens
  - Test snapshots

- [x] T023 [P] [US3] Storybook stories created

- [x] T024 [US3] Implement variant styling in CSS Modules:
  - `.bpk-card-v2--default`: shadow via `bpk-box-shadow-sm` mixin
  - `.bpk-card-v2--outlined`: border via `bpk-line-day` token, no shadow
  - `.bpk-card-v2--noElevation`: no shadow, no border

- [x] T025 [US3] Implement surface color support:
  - bgColor prop with 8 token values
  - Applied via `data-bg-color` attribute on Root
  - CSS selectors apply appropriate `$bpk-surface-*-day` token

- [x] T026 [US3] Surface color CSS selectors implemented:
  - 8 `[data-bg-color='...']` selectors
  - Uses Backpack design tokens directly

- [x] T027 [US3] All variant + surface color combinations verified

**Checkpoint**: ✅ Visual variants and surface colors fully implemented

---

## Phase 6: User Story 4 - Mobile-First Responsive Design (Priority: P2) ✅

**Goal**: Automatic layout adaptation across breakpoints without manual media query management

- [x] T028 [P] [US4] Responsive design tests:
  - Uses `breakpoints.bpk-breakpoint-above-mobile` mixin
  - Verified layout transitions

- [x] T029 [US4] Responsive CSS implemented:
  - Mobile-first: default to column layout (stacking)
  - Desktop: row layout via breakpoint mixin
  - Divider: horizontal element on mobile, pseudo-element on desktop
  - Sections: 100% width on mobile, ratio-based on desktop

- [x] T030 [US4] Responsive behavior verified:
  - Desktop: split layout with vertical divider
  - Mobile: stacked layout with horizontal divider
  - Primary first in both layouts

**Checkpoint**: ✅ Responsive design working across all breakpoints

---

## Phase 7: User Story 5 - Accessibility (Priority: P1) ✅

**Goal**: WCAG 2.1 Level AA compliance across all layouts and states

- [x] T031 [US5] Accessibility test suite in `packages/bpk-component-card-v2/src/BpkCardV2/__tests__/accessibility-test.tsx`:
  - jest-axe: zero violations verified
  - Semantic HTML enables proper announcements

- [x] T032 [US5] Semantic HTML verified:
  - `<header>` for Header component
  - `<footer>` for Footer component
  - `<div>` for Root, Body, Primary, Secondary

- [x] T033 [US5] RTL support implemented:
  - Uses `utils.bpk-rtl` mixin for directional styles
  - Divider pseudo-element positioned correctly in RTL
  - Logical properties for padding

- [x] T034 [US5] Accessibility verified:
  - jest-axe passes
  - All subcomponents support ref forwarding for focus management

**Checkpoint**: ✅ Accessibility compliance achieved

---

## Phase 8: Polish & Documentation ✅

**Purpose**: Complete documentation, finalize testing, prepare for release

- [x] T035 [P] README.md completed

- [x] T036 [P] Storybook stories completed:
  - Default story: basic Header/Body/Footer
  - Variant stories: default, outlined, noElevation
  - Surface color stories
  - Split layout stories
  - Complex product card example

- [x] T037 [P] JSDoc comments complete:
  - Component description with usage examples
  - All props documented
  - All subcomponents documented

- [ ] T038 [P] Figma Code Connect (pending)

- [x] T039 Test coverage verified

- [x] T040 Linting and type checks pass

- [ ] T041 Visual regression testing (pending Percy integration)

- [x] T042 Final verification checklist:
  - [x] All tests pass
  - [x] All accessibility tests pass: jest-axe
  - [x] TypeScript compiles without errors
  - [x] All 8 bgColor tokens supported
  - [x] All 3 variants (default, outlined, noElevation) working
  - [x] Split layout functional (70/30 default, configurable)
  - [x] Responsive behavior working
  - [x] RTL support implemented
  - [x] Padding prop system implemented

**Checkpoint**: ✅ Component implementation complete (pending Figma Code Connect and visual regression tests)

---

## Implementation Summary

### Completed Implementation
All phases completed. Component is fully functional with:

- **Namespace pattern**: `BpkCardV2.Root`, `BpkCardV2.Header`, `BpkCardV2.Body`, etc.
- **3 variants**: default, outlined, noElevation
- **8 surface colors**: All Backpack surface tokens supported
- **Split layout**: Configurable ratio, responsive divider
- **Padding system**: Flexible padding on Header, Body, Footer
- **Accessibility**: Semantic HTML, forwardRef support, jest-axe tested
- **RTL support**: Via bpk-rtl mixin

### Remaining Work
- [ ] T038: Figma Code Connect
- [ ] T041: Percy visual regression tests

---

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Implementation Plan**: `./plan.md`
- **Component Specification**: `./spec.md`
- **Architecture Decisions**: `decisions/` directory
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Similar Components**: Review `packages/bpk-component-card/`, `packages/bpk-component-accordion/`
