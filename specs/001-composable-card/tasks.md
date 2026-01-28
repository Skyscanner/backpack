<!--
==============================================================================
DOCUMENT PURPOSE: Break down plan.md into executable STEPS (Task List)
==============================================================================

This task list provides specific, actionable steps for developers executing
the BpkCardV2 implementation. Each task is executable without re-reading spec or plan.
==============================================================================
-->

# Tasks: BpkCardV2

**Input**: Design documents from `/specs/001-composable-card/`
**Prerequisites**: plan.md, spec.md (both required)

**Backpack Context**: Component will be implemented in `packages/bpk-component-card-v2/` following Backpack constitution and architecture decisions in `.specify/memory/constitution.md`

**Tests**: Mandatory for all Backpack components. All tasks include test requirements.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

---

## Phase 1: Setup (Package Initialization)

**Purpose**: Initialize component package structure per Backpack standards

- [ ] T001 Create package directory structure:
  - `mkdir -p packages/bpk-component-card-v2/src/BpkCardV2/subcomponents`
  - `mkdir -p packages/bpk-component-card-v2/docs/{screenshots,design-assets}`
  - `mkdir -p examples/bpk-component-card-v2`

- [ ] T002 [P] Create `packages/bpk-component-card-v2/index.ts` with exports for BpkCardV2 and subcomponents (Header, Body, Primary, Secondary, Footer)

- [ ] T003 [P] Create `packages/bpk-component-card-v2/README.md` stub with component title, brief description, installation, and browser support

- [ ] T004 [P] Create `packages/bpk-component-card-v2/src/BpkCardV2/` directory with Apache 2.0 license header template files

**Checkpoint**: Package structure initialized per Backpack monorepo standards

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create TypeScript types file `packages/bpk-component-card-v2/src/BpkCardV2/common-types.ts`:
  - BpkCardV2Props interface with variant, bgColor, children, className, ariaLabel, ariaLabelledBy
  - BpkCardV2BodyProps interface with children, split, splitRatio, className
  - BpkCardV2HeaderProps, FooterProps, PrimaryProps, SecondaryProps interfaces
  - JSDoc comments for all props
  - **Constitution Check**: TypeScript with proper types, includes Apache 2.0 header

- [ ] T006 [P] Create root component file `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2.tsx`:
  - Component props interface
  - Root context provider for subcomponents (if needed)
  - Render semantic `<div>` with BEM class names
  - Support all 8 bgColor tokens via data attribute or class modifier
  - Attach subcomponents (Header, Body, Footer, etc.) to component
  - JSDoc with examples

- [ ] T007 [P] Create subcomponent files in `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents/`:
  - `Header.tsx` - semantic `<header>` element
  - `Body.tsx` - split layout logic, flex container
  - `Primary.tsx` - flex-1, ~70% width on desktop
  - `Secondary.tsx` - ~30% width on desktop
  - `Footer.tsx` - semantic `<footer>` element
  - All include Apache 2.0 header

- [ ] T008 [P] Create CSS Modules file `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2.module.scss`:
  - Base class `.bpk-card-v2` with border-radius, default shadow, rem sizing
  - Variant classes: `.bpk-card-v2--default`, `.bpk-card-v2--outlined`
  - Subcomponent classes: `__header`, `__body`, `__body--split`, `__primary`, `__divider`, `__secondary`, `__footer`
  - Mobile-first responsive: breakpoint at 768px
  - RTL support (logical properties, no left/right)
  - Divider: 1px line with 4px inset (hidden on mobile)
  - Import from `bpk-mixins` and `@skyscanner/bpk-foundations-web`
  - **Constitution Check**: Modern Sass API with `@use`, BEM with `bpk-` prefix, rem units, no magic numbers

- [ ] T009 Verify constitution compliance:
  - [ ] Files have Apache 2.0 license headers (`.tsx` and `.scss`)
  - [ ] Component uses PascalCase (BpkCardV2)
  - [ ] Styles use `.module.scss`
  - [ ] Test files will use `*-test.tsx` naming
  - [ ] TypeScript strict mode enabled

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Build Two-Column Split Layout (Priority: P1) 🎯 MVP

**Goal**: Developers can create 70/30 split layout cards that stack vertically on mobile without custom CSS

**Independent Test**: Render `<BpkCardV2.Body split splitRatio={70}><BpkCardV2.Primary>{content}</BpkCardV2.Primary><BpkCardV2.Secondary>{sidebar}</BpkCardV2.Secondary></BpkCardV2.Body>` on desktop/mobile viewports and verify layout

### Tests for User Story 1 (MANDATORY - Write Tests FIRST)

- [ ] T010 [P] [US1] Create unit test file `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2-test.tsx`:
  - Test rendering Body with split=true and Primary/Secondary children
  - Test default splitRatio (70/30)
  - Test custom splitRatio (60/40, 50/50)
  - Test rendering without split
  - Test snapshot for split layout
  - Verify CSS classes applied correctly
  - **Constitution Check**: Jest + Testing Library, 70% branches, 75% functions/lines

- [ ] T011 [P] [US1] Create accessibility test `packages/bpk-component-card-v2/src/BpkCardV2/accessibility-test.tsx`:
  - Test with jest-axe for zero violations
  - Test keyboard Tab navigation through Primary and Secondary
  - Test focus management in split layout
  - Test semantic HTML structure
  - **Constitution Check**: jest-axe mandatory, WCAG 2.1 Level AA

### Implementation for User Story 1

- [ ] T012 [US1] Implement Body component split layout logic in `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents/Body.tsx`:
  - Accept split prop (boolean, default false)
  - Accept splitRatio prop (0-100, default 70)
  - Render as flex container with flex-direction: row on desktop, column on mobile
  - Calculate width percentages from splitRatio (Primary: splitRatio%, Secondary: 100-splitRatio%)
  - Apply responsive breakpoint at 768px
  - Support RTL via logical properties

- [ ] T013 [US1] Implement divider rendering in Body when split=true:
  - Render 1px vertical divider on desktop (hidden on mobile)
  - Apply 4px inset padding (top/bottom)
  - Use design token for border color
  - Position between Primary and Secondary

- [ ] T014 [P] [US1] Implement Primary and Secondary components:
  - Primary: `flex: 1 1 calc(splitRatio% - offset)`
  - Secondary: `flex: 0 0 (100-splitRatio)%`
  - Both: Support className prop for consumer customization
  - Both: Support children prop for content

- [ ] T015 [US1] Test split layout responsiveness:
  - Verify stacking on mobile (<= 767px)
  - Verify side-by-side on desktop (>= 768px)
  - Verify divider hidden on mobile
  - Verify ratio applied correctly on desktop
  - Run tests: `npm test -- BpkCardV2-test.tsx`
  - Run accessibility tests: `npm test -- accessibility-test.tsx`

**Checkpoint**: Split layout fully functional and tested

---

## Phase 4: User Story 2 - Multi-Section Explicit Composition (Priority: P1)

**Goal**: Designers can compose Header/Body/Footer explicitly without implicit child ordering confusion

**Independent Test**: Render Header/Body/Footer in any order and verify correct position (Header top, Body middle, Footer bottom)

### Tests for User Story 2

- [ ] T016 [P] [US2] Update unit tests for Header/Body/Footer composition:
  - Test rendering with all three sections
  - Test rendering sections in different order (Footer first, Header last)
  - Test rendering Body only (Header/Footer optional)
  - Test rendering Header and Footer without Body (edge case)
  - Test snapshots for each combination

- [ ] T017 [P] [US2] Update accessibility tests for semantic HTML:
  - Test `<header>` element for Header
  - Test `<footer>` element for Footer
  - Test `<div>` for Body
  - Test heading hierarchy within sections
  - Test focus order (top to bottom regardless of composition order)

### Implementation for User Story 2

- [ ] T018 [US2] Implement Header subcomponent `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents/Header.tsx`:
  - Render semantic `<header>` element
  - Apply class `bpk-card-v2__header`
  - Support children and className props
  - Positioned at top via render order in root component

- [ ] T019 [US2] Implement Footer subcomponent `packages/bpk-component-card-v2/src/BpkCardV2/subcomponents/Footer.tsx`:
  - Render semantic `<footer>` element
  - Apply class `bpk-card-v2__footer`
  - Support children and className props
  - Positioned at bottom via render order in root component

- [ ] T020 [US2] Update root component to manage section order:
  - Use React.Children.map or array filtering to reorder subcomponents
  - Always render in correct order: Header → Body → Footer
  - Regardless of composition order in JSX
  - Support optional sections (any can be omitted)

- [ ] T021 [US2] Add composition tests:
  - Verify Header/Body/Footer render in correct positions
  - Verify composition order doesn't affect output
  - Run tests: `npm test -- BpkCardV2-test.tsx`

**Checkpoint**: Multi-section composition working with explicit subcomponents

---

## Phase 5: User Story 3 - Visual Variants & Surface Colors (Priority: P1)

**Goal**: Support "default" and "outlined" variants with 8 surface color tokens

**Independent Test**: Render all variants and all 8 bgColor combinations and verify correct styling via design tokens

### Tests for User Story 3

- [ ] T022 [P] [US3] Update unit tests for variants and surface colors:
  - Test variant="default" and variant="outlined"
  - Test all 8 bgColor tokens (surfaceDefault, surfaceElevated, surfaceTint, etc.)
  - Test snapshot for each variant × surface color combination
  - Test invalid variant falls back to default

- [ ] T023 [P] [US3] Update Storybook story `examples/bpk-component-card-v2/stories.tsx`:
  - Default story with variant="default", bgColor="surfaceDefault"
  - Story for each variant (default, outlined)
  - Story for each bgColor surface token
  - Story showing all combinations (16 total: 2 variants × 8 colors)
  - Add controls for interactive prop editing

### Implementation for User Story 3

- [ ] T024 [US3] Implement variant styling in CSS Modules:
  - `.bpk-card-v2--default`: shadow (small on default, large on hover), white/surface background
  - `.bpk-card-v2--outlined`: 1px border, no shadow
  - Add hover state: large shadow for emphasis

- [ ] T025 [US3] Implement surface color support:
  - Accept bgColor prop with 8 token values
  - Map to CSS custom properties: `--bpk-surface-default`, `--bpk-surface-elevated`, etc.
  - Use `[data-bg-color]` attribute or CSS variable to apply color
  - Default: surfaceDefault (white)

- [ ] T026 [US3] Add surface color CSS classes:
  - Generate 8 CSS classes (one per surface token)
  - Apply via `data-bg-color` attribute on root element
  - Use CSS custom properties from `@skyscanner/bpk-foundations-web`

- [ ] T027 [US3] Verify variant + surface color combinations:
  - Test all 16 combinations (2 variants × 8 colors)
  - Verify correct styling applied
  - Run visual regression tests via Percy (if configured)
  - Run tests: `npm test -- BpkCardV2-test.tsx`

**Checkpoint**: Visual variants and surface colors fully implemented

---

## Phase 6: User Story 4 - Mobile-First Responsive Design (Priority: P2)

**Goal**: Automatic layout adaptation across breakpoints without manual media query management

**Independent Test**: Resize viewport and verify split layout transitions correctly (vertical on mobile, horizontal on desktop)

### Tests for User Story 4

- [ ] T028 [P] [US4] Add responsive design tests:
  - Test layout at 320px (small mobile)
  - Test layout at 768px (breakpoint)
  - Test layout at 1024px (desktop)
  - Verify smooth transition without remount
  - Test all content regions reflow correctly

### Implementation for User Story 4

- [ ] T029 [US4] Verify responsive CSS in `BpkCardV2.module.scss`:
  - Mobile-first: default to column layout (stacking)
  - Desktop: apply row layout via media query (>= 768px)
  - Divider visibility: hidden on mobile, visible on desktop
  - All sections: 100% width on mobile, ratio-based on desktop
  - Test at multiple viewports

- [ ] T030 [US4] Test responsive behavior:
  - Desktop view: split layout with divider visible
  - Mobile view: stacked layout, divider hidden
  - Primary first in both layouts
  - No layout shift or content reflow issues
  - Run tests: `npm test -- BpkCardV2-test.tsx`

**Checkpoint**: Responsive design working across all breakpoints

---

## Phase 7: User Story 5 - Accessibility (Priority: P1)

**Goal**: WCAG 2.1 Level AA compliance across all layouts and states

**Independent Test**: Run jest-axe on all variants/layouts, test keyboard navigation Tab/Enter/Space, test with screen reader

### Tests for User Story 5

- [ ] T031 [US5] Complete accessibility test suite in `packages/bpk-component-card-v2/src/BpkCardV2/accessibility-test.tsx`:
  - jest-axe: zero violations on all variants and layouts
  - Keyboard nav: Tab through Header → Body Primary → Body Secondary → Footer
  - Focus visible: visible focus indicator on all interactive areas
  - ARIA: proper roles, labels, and attributes
  - Screen reader: semantic HTML enables proper announcements
  - Test mobile view and desktop view
  - Test RTL support

- [ ] T032 [US5] Verify semantic HTML:
  - `<header>` for Header component
  - `<footer>` for Footer component
  - Proper heading hierarchy within sections
  - No duplicate role attributes

- [ ] T033 [US5] RTL support verification:
  - Test with lang="ar" or dir="rtl"
  - Verify flex direction reversal
  - Verify no left/right properties (logical properties used)
  - Verify Primary is still first (logical order preserved)

- [ ] T034 [US5] Run full accessibility audit:
  - Run jest-axe: `npm test -- accessibility-test.tsx`
  - Manual keyboard testing: Tab, Shift+Tab, Enter, Space
  - Manual screen reader testing (VoiceOver, NVDA, or JAWS)
  - Zoom test: 200% and 400% magnification
  - All sections must remain functional and readable

**Checkpoint**: Full WCAG 2.1 Level AA compliance achieved

---

## Phase 8: Polish & Documentation

**Purpose**: Complete documentation, finalize testing, prepare for release

- [ ] T035 [P] Complete README.md:
  - Component description (<100 words, British English)
  - Installation: `npm install @skyscanner/backpack-web`
  - Usage examples: basic card, split layout, variants, all surface colors
  - Props reference table with types and defaults
  - Browser support: Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+
  - Accessibility notes: semantic HTML, keyboard navigation, RTL support
  - Link to Storybook

- [ ] T036 [P] Complete Storybook stories `examples/bpk-component-card-v2/stories.tsx`:
  - Default story: basic Header/Body/Footer
  - Variant stories: default, outlined
  - Surface color stories: one for each of 8 tokens
  - Split layout stories: different ratios (50/50, 60/40, 70/30)
  - Responsive stories: mobile view, desktop view
  - Accessibility story: keyboard navigation demo
  - All stories with a11y addon enabled

- [ ] T037 [P] Complete JSDoc comments:
  - Component description with usage example
  - All props documented (type, default, description)
  - All subcomponents documented
  - Subcomponent prop documentation
  - Examples in JSDoc where helpful

- [ ] T038 [P] Create Figma Code Connect `packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2.figma.tsx`:
  - Map variant prop to Figma component variants
  - Map bgColor prop to Figma surface color tokens
  - Map split prop and splitRatio to layout options
  - Provide usage examples

- [ ] T039 Verify test coverage:
  - Run: `npm test -- BpkCardV2 --coverage`
  - Verify 70% branches coverage
  - Verify 75% functions/lines/statements coverage
  - If below threshold: add tests to fill gaps

- [ ] T040 Run linting and type checks:
  - ESLint: `npm run lint`
  - Stylelint: `npm run stylelint`
  - TypeScript: `npm run type-check` or `npx tsc --noEmit`
  - All must pass with zero warnings

- [ ] T041 Visual regression testing:
  - Update Storybook: `npm run storybook`
  - Run Percy visual tests (if configured)
  - Verify no unexpected visual changes
  - Approve visual baselines

- [ ] T042 Final verification checklist:
  - [ ] All tests pass: `npm test`
  - [ ] All accessibility tests pass: jest-axe
  - [ ] TypeScript compiles without errors
  - [ ] Linting passes (ESLint + Stylelint)
  - [ ] Test coverage meets thresholds
  - [ ] Visual regression tests pass (Percy)
  - [ ] README complete and accurate
  - [ ] Storybook stories comprehensive
  - [ ] JSDoc comments complete
  - [ ] Figma Code Connect working
  - [ ] All 8 bgColor tokens supported
  - [ ] Both variants (default, outlined) working
  - [ ] Split layout functional (70/30 default, configurable)
  - [ ] Responsive at 768px breakpoint
  - [ ] RTL support verified
  - [ ] Keyboard navigation working
  - [ ] Zero accessibility violations

**Checkpoint**: Component ready for release

---

## Task Dependencies & Execution Order

### Critical Path (Must Complete in Order)
1. Phase 1: Setup
2. Phase 2: Foundational
3. Phases 3-7: User Stories (can run in parallel after Phase 2)
4. Phase 8: Polish

### Parallelization Opportunities
- **After Phase 2**: Phases 3-7 can all run in parallel (separate user stories)
- **Within each Phase**: Tasks marked with [P] can run in parallel
- **Test-First**: Tests in each story phase can be written/run before implementation

### Example Parallel Execution
```
Phase 1: Setup (sequential)
Phase 2: Foundational (sequential - blocking all stories)
  ├─ Phase 3: Story 1 (parallel) - T010-T015
  ├─ Phase 4: Story 2 (parallel) - T016-T021
  ├─ Phase 5: Story 3 (parallel) - T022-T027
  ├─ Phase 6: Story 4 (parallel) - T028-T030
  └─ Phase 7: Story 5 (parallel) - T031-T034
Phase 8: Polish (sequential - after all stories complete)
```

---

## MVP Scope Recommendation

**Minimal Viable Product**: Phases 1-5 (T001-T027)
- Setup + Foundational + Stories 1-3
- Delivers split layout, multi-section composition, and variant styling
- Sufficient for initial launch and user feedback

**Full Release**: Phases 1-8 (T001-T042)
- Includes mobile-first responsive, accessibility, documentation
- Ready for production use across all Skyscanner products

---

## Implementation Strategy

### Mobile-First Approach
1. Start with Phase 1-2 (foundation)
2. Implement Story 1 (split layout) - handles mobile stacking + desktop layout
3. Add Story 2 (multi-section) - semantic structure
4. Add Story 3 (variants) - visual differentiation
5. Add Story 4 (responsive) - breakpoint refinement (builds on Story 1)
6. Add Story 5 (accessibility) - audit + fixes
7. Polish & documentation

### Testing Strategy
- Write tests first (TDD) for each story before implementation
- Run tests continuously during implementation
- Use jest-axe on all stories
- Use Percy for visual regression (if configured)

---

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Implementation Plan**: `./plan.md`
- **Component Specification**: `./spec.md`
- **Architecture Decisions**: `decisions/` directory
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Similar Components**: Review `packages/bpk-component-card/`, `packages/bpk-component-accordion/`
