# Tasks: BpkCheckboxCard

**Input**: Design documents from `specs/002-checkbox-card/`
**Component Package**: `packages/bpk-component-checkbox-card/`
**Storybook Examples**: `examples/bpk-component-checkbox-card/`

## Phase 1: Setup & Dependencies

- [ ] T001 Add @ark-ui/react as peer dependency in root package.json with latest stable version
- [ ] T002 Create package structure: `packages/bpk-component-checkbox-card/` with README.md, index.ts, src/BpkCheckboxCard/, docs/ directories
- [ ] T003 Create tsconfig.json and package.json for bpk-component-checkbox-card package
- [ ] T004 Setup Storybook example directory: `examples/bpk-component-checkbox-card/` with stories.tsx and examples.tsx

## Phase 2: Foundational - Types & Utilities

- [ ] T005 [P] Create common-types.ts with TypeScript interfaces for all subcomponents (Root, Control, Content, Label, Description, Indicator, Addon, HiddenInput)
- [ ] T006 [P] Create CheckboxCardContext.ts with context provider for state management and style calculations
- [ ] T007 [P] Create useCheckboxCardContext hook in BpkCheckboxCard.tsx for subcomponent access to context

## Phase 3: User Story 1 - Basic Checkbox Card with Label (P1)

**Goal**: Render a checkbox card with a label that toggles on click

- [ ] T008 [US1] Create BpkCheckboxCard.tsx with Root component wrapping Ark UI Checkbox.Root
- [ ] T009 [US1] Create Control subcomponent (flex container for checkbox and content)
- [ ] T010 [US1] Create HiddenInput subcomponent (wraps native checkbox input)
- [ ] T011 [US1] Create Label subcomponent (BpkText-based with dynamic color based on checked state)
- [ ] T012 [US1] Create Indicator subcomponent (visual checkbox box with checkmark)
- [ ] T013 [US1] Implement onCheckedChange callback forwarding in Root component
- [ ] T014 [US1] Create basic unit tests in BpkCheckboxCard-test.tsx: rendering with label, toggle on click, onChange callback
- [ ] T015 [US1] Create basic Storybook story demonstrating label rendering and toggle

**Verification**: Component renders label, toggles state on click, fires onChange

## Phase 4: User Story 2 - Composable Subcomponents (P1)

**Goal**: Support flexible content composition with Label, Description, and Icon

- [ ] T016 [US2] Create Content subcomponent (wrapper for label, description, and custom content)
- [ ] T017 [US2] Create Description subcomponent (BpkText-based with secondary color)
- [ ] T018 [US2] Implement dynamic text color changes: text-primary-day/text-secondary-day (default) → text-on-dark-day (checked)
- [ ] T019 [US2] Add asChild prop support to all subcomponents for custom composition
- [ ] T020 [US2] Create Addon subcomponent (renders outside control area for badge/supporting content)
- [ ] T021 [US2] Unit tests: compose Label+Description+Addon, verify text colors on state change, asChild flexibility
- [ ] T022 [US2] Storybook stories: with description, with addon, combined composition, asChild usage examples

**Verification**: Subcomponents compose without conflicts, text colors change appropriately on checked state

## Phase 5: User Story 3 - Visual Variants (P2)

**Goal**: Support three visual variants with design token colors

- [ ] T023 [US3] [P] Create BpkCheckboxCard.module.scss with base styles
- [ ] T024 [US3] [P] Implement .bpk-checkbox-card--variant-default styling (surface/default background)
- [ ] T025 [US3] [P] Implement .bpk-checkbox-card--variant-contrast styling (white with border)
- [ ] T026 [US3] [P] Implement .bpk-checkbox-card--variant-surface-contrast styling (surface/tint background)
- [ ] T027 [US3] [P] Add variant prop to Root component with CSS class application
- [ ] T028 [US3] [P] Implement checked state colors: surface/contrast (default/contrast) and core/accent (surface-contrast)
- [ ] T029 [US3] [P] Implement hover states per variant with design tokens (surface/low-contrast + border)
- [ ] T030 [US3] Unit tests: verify each variant renders correct colors, checked states apply correct backgrounds
- [ ] T031 [US3] Storybook stories: each variant in default/hover/checked states

**Verification**: All three variants render with correct colors, hover and checked states apply proper styling

## Phase 6: User Story 4 - Border Radius Control (P2)

**Goal**: Support square and rounded corner options

- [ ] T032 [US4] Add radius prop to Root component (square | rounded)
- [ ] T033 [US4] Implement .bpk-checkbox-card--radius-square (border-radius: 0)
- [ ] T034 [US4] Implement .bpk-checkbox-card--radius-rounded (border-radius: 8px via token)
- [ ] T035 [US4] Apply radius CSS classes based on radius prop
- [ ] T036 [US4] Unit tests: verify border-radius applied correctly for both options
- [ ] T037 [US4] Storybook stories: both radius options with multiple variants

**Verification**: Square and rounded radius render correctly with all variants

## Phase 7: User Story 5 - Indicator Placement (P2)

**Goal**: Support start and end indicator placement with RTL support

- [ ] T038 [US5] Add indicatorPlacement prop to Root (start | end, default: end)
- [ ] T039 [US5] Implement flex-direction: row-reverse for end placement
- [ ] T040 [US5] Apply indicatorPlacement CSS class modifiers
- [ ] T041 [US5] Test RTL behavior: indicator placement flips in RTL context
- [ ] T042 [US5] Unit tests: verify indicator order for start/end, RTL handling
- [ ] T043 [US5] Storybook stories: start vs end placement, RTL example

**Verification**: Indicator placement works correctly in LTR and RTL contexts

## Phase 8: User Story 6 - Checkbox States (P2)

**Goal**: Support disabled, invalid, and readonly states

- [ ] T044 [US6] Implement disabled state: .bpk-checkbox-card--disabled with component/chip/colour/disabled token
- [ ] T045 [US6] Add pointer-events: none and opacity reduction for disabled state
- [ ] T046 [US6] Implement readonly state: prevents state changes via onCheckedChange logic
- [ ] T047 [US6] Implement invalid state: aria-invalid="true" attribute (ARIA-only, no visual styling)
- [ ] T048 [US6] Add maxW and maxH props to Root for size constraints via inline styles
- [ ] T049 [US6] Unit tests: disabled prevents toggle, readonly prevents toggle, invalid sets ARIA, maxW/maxH respected
- [ ] T050 [US6] Storybook stories: disabled, invalid, readonly, with maxW/maxH constraints

**Verification**: All states render correctly, disabled and readonly prevent interaction

## Phase 9: Accessibility & Focus

- [ ] T051 [P] Create accessibility-test.tsx with jest-axe tests
- [ ] T052 [P] Test no axe violations, keyboard navigation (Tab, Space), ARIA attributes
- [ ] T053 [P] Implement Backpack focus ring utility on Root (distinct focus state)
- [ ] T054 [P] Test focus ring visibility and keyboard focus management
- [ ] T055 [P] Test screen reader announcements for state changes

**Verification**: All jest-axe tests pass, keyboard navigation works, screen readers properly announce states

## Phase 10: Testing Complete Coverage

- [ ] T056 [P] Create snapshot tests for all variant/radius/state combinations in BpkCheckboxCard-test.tsx
- [ ] T057 [P] Add visual regression tests via Storybook/Percy for all variants
- [ ] T058 [P] Verify test coverage meets thresholds: 70% branches, 75% functions/lines/statements
- [ ] T059 [P] Run full test suite: `npm test packages/bpk-component-checkbox-card/`

**Verification**: All tests pass, coverage thresholds met, no warnings

## Phase 11: Documentation & Figma Integration

- [ ] T060 [P] Create README.md (<100 words, British English, usage examples, props table)
- [ ] T061 [P] Add comprehensive JSDoc comments to all exports in BpkCheckboxCard.tsx
- [ ] T062 [P] Create BpkCheckboxCard.figma.tsx with Code Connect mappings to Figma design
- [ ] T063 [P] Add Storybook a11y addon to story configuration

**Verification**: README complete, JSDoc comments present, Figma Connect configured, stories display a11y checks

## Phase 12: Polish & Release Prep

- [ ] T064 [P] Run ESLint on all source files: `npm run lint packages/bpk-component-checkbox-card/`
- [ ] T065 [P] Run Stylelint on all SCSS: `npm run lint:css packages/bpk-component-checkbox-card/`
- [ ] T066 [P] Run TypeScript type check: `npm run typecheck packages/bpk-component-checkbox-card/`
- [ ] T067 Export all subcomponents from index.ts (Root, Control, Content, Label, Description, Indicator, Addon, HiddenInput)
- [ ] T068 Verify package exports work: `import BpkCheckboxCard from '@skyscanner/backpack-web/bpk-component-checkbox-card'`
- [ ] T069 Add Apache 2.0 license header to all source files (.tsx, .scss files)
- [ ] T070 Create git commit with all implementation

**Verification**: All linting passes, types compile, exports work, license headers present

## Dependency Order

- **Phase 1** (Setup) → Required before all other phases
- **Phase 2** (Foundational types) → Required before Phase 3+
- **Phase 3** (US1: Basic) → Foundation, enables Phase 4
- **Phase 4** (US2: Composable) → Builds on US1, enables Phase 5-8
- **Phase 5-8** (US3-6: Variants, Radius, Placement, States) → Can run in parallel after Phase 4
- **Phase 9** (Accessibility) → Can run parallel with Phase 5-8
- **Phase 10** (Testing) → After all implementation phases
- **Phase 11** (Documentation) → After testing passes
- **Phase 12** (Polish) → Final phase before release

## Parallel Execution Example

After Phase 4, teams can work on:
- **Track 1**: Phase 5 (Variants) + Phase 6 (Radius) + Phase 7 (Placement) → Phase 10 (Testing)
- **Track 2**: Phase 8 (States) + Phase 9 (Accessibility) → Phase 10 (Testing)
- **Track 3**: Phase 11 (Documentation)

## MVP Scope (Recommended for First Release)

Minimum viable product = Phases 1-4 + Phase 10 (testing):
- Basic checkbox card rendering with label ✓
- Composable subcomponents ✓
- Unit & accessibility tests ✓
- Storybook stories ✓

Optional enhancements for follow-up release:
- Variants (Phase 5)
- Radius options (Phase 6)
- Indicator placement (Phase 7)
- Advanced states (Phase 8)

## Constitution Compliance Per Phase

- **Phase 1**: Dependency management per Backpack standards
- **Phase 2**: TypeScript types, interfaces defined
- **Phase 3-8**: CSS Modules, BEM naming, design tokens, rem units, modern Sass @use
- **Phase 9**: jest-axe accessibility tests, Backpack focus ring utility
- **Phase 10**: Test coverage thresholds (70% branches, 75% functions/lines/statements)
- **Phase 11**: JSDoc comments, British English prose, README, Figma Code Connect
- **Phase 12**: Apache 2.0 license headers, ESLint/Stylelint/TypeScript checks

## Verification Checkpoints

- [ ] After Phase 2: TypeScript compiles, no type errors
- [ ] After Phase 4: Basic story renders in Storybook, toggles work
- [ ] After Phase 9: All jest-axe tests pass, keyboard navigation works
- [ ] After Phase 10: Test coverage meets thresholds, all tests pass
- [ ] After Phase 11: README complete, JSDoc present, Storybook updated
- [ ] After Phase 12: All linting passes, git commit ready
