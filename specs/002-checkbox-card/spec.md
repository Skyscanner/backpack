<!--
==============================================================================
DOCUMENT PURPOSE: Define WHAT needs to be built and WHY (Requirements)
==============================================================================

This specification describes requirements and constraints for non-technical
stakeholders (designers, product managers, business analysts).

FOCUS: WHAT & WHY
- What needs to be built
- Why it's needed
- What success looks like

✅ INCLUDE in spec.md:
- Functional requirements (FR-XXX): "Component MUST support X"
- Component API declarations: Props list with types and plain descriptions
- Success criteria: Measurable outcomes without implementation details
- User scenarios: Given/When/Then acceptance tests
- Non-functional requirements: Performance, accessibility constraints
- Edge cases: Boundary conditions and error scenarios

❌ EXCLUDE from spec.md (belongs in plan.md):
- TypeScript interface code with `export interface`
- React component implementation code
- Sass/CSS implementation patterns
- File structure and directory organization
- Import statements and code examples
- Build tool configuration

❌ EXCLUDE from spec.md (belongs in tasks.md):
- Step-by-step implementation tasks
- Specific file paths and commands
- Task execution order and dependencies

AUTOMATION:
- `/speckit.plan` reads this spec and auto-generates implementation patterns
- `/speckit.tasks` reads spec + plan and auto-generates task list

VALIDATION:
- Spec should be understandable without technical background
- Requirements should be testable and measurable
- No code blocks with TypeScript/React implementation
==============================================================================
-->

# Component Specification: BpkCheckboxCard

**Package Branch**: `002-checkbox-card`
**Created**: 2026-02-06
**Status**: Draft
**Input**: User description: "BpkCheckboxCard - A composable checkbox card component with three variant styles supporting multiple states. The component combines checkbox functionality with card-based UI, allowing flexible content composition including labels, descriptions, and icons. Supports three background variants (default, contrast, surface-contrast) for different contexts, rounded or square corners, and all standard checkbox states (default, hover, selected, disabled). Built on Ark UI checkbox logic with composable subcomponents pattern similar to Chakra UI for maximum flexibility."

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component will be in `packages/bpk-component-checkbox-card/`
- [x] **Naming Conventions**: Component name follows PascalCase (BpkCheckboxCard)
- [x] **License Headers**: All source files will include Apache 2.0 license header
- [x] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Will include `accessibility-test.tsx`
- [x] **TypeScript**: Will be written in TypeScript with proper types
- [x] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [x] **Versioning**: MINOR version (new feature)

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Basic Checkbox Card with Label (Priority: P1)

As a developer building a form or selection interface, I need a simple checkbox card component that displays a label so users can select a single option with visual feedback.

**Why this priority**: Core functionality that demonstrates the basic checkbox card pattern and is the foundation for all other use cases.

**Independent Test**: Can be fully tested by rendering component with just a label prop and verifying the checkbox control appears with proper labeling.

**Acceptance Scenarios**:

1. **Given** a checkbox card is rendered with a label, **When** I view it, **Then** the label is visible and the checkbox indicator is present
2. **Given** a checkbox card is rendered with default props, **When** I click it, **Then** the checked state toggles and onChange handler fires
3. **Given** a checked checkbox card, **When** I view it, **Then** the checked state styling is applied correctly

---

### User Story 2 - Rich Content Composition with Subcomponents (Priority: P1)

As a developer, I need to compose checkbox cards with flexible content (label, description, icon, addon) using subcomponents, giving me full control over layout without hard-coded constraints.

**Why this priority**: Core architectural requirement - composability is a key differentiator. Developers must be able to build custom layouts.

**Independent Test**: Can be fully tested by composing Root, Control, Content, Label, Description, and Indicator subcomponents together and verifying all content renders correctly.

**Acceptance Scenarios**:

1. **Given** I compose a checkbox card with Label and Description subcomponents, **When** I render it unchecked, **Then** both appear in the Control area with default text styling (text-primary-day, text-secondary-day)
2. **Given** I compose a checkbox card with Label and Description subcomponents, **When** I check it, **Then** both text colors change to text-on-dark-day for contrast on the colored background
3. **Given** I compose a checkbox card with custom content using asChild pattern, **When** I render it, **Then** my custom structure is preserved
4. **Given** I compose a checkbox card with icon and label, **When** I render it, **Then** both render without conflict

---

### User Story 3 - Visual Variant Styling (Priority: P2)

As a developer, I need to apply different visual variants (default, contrast, surface-contrast) to checkbox cards so they adapt to different background contexts and design requirements.

**Why this priority**: Critical for design system consistency across different surfaces. Enables proper component reuse in various UI contexts.

**Independent Test**: Can be tested by rendering the same content with different variant props and verifying correct styling is applied for each variant.

**Acceptance Scenarios**:

1. **Given** a checkbox card with variant="default", **When** I view it in default state, **Then** surface/default background is applied
2. **Given** a checkbox card with variant="contrast", **When** I hover it, **Then** the hover state shows surface/low-contrast with border
3. **Given** a checkbox card with variant="surface-contrast", **When** checked, **Then** the core/accent blue color is applied as background

---

### User Story 4 - Border Radius Control (Priority: P2)

As a developer, I need to control the border radius (square or rounded corners) so I can match different design contexts and brand guidelines.

**Why this priority**: Design flexibility - different contexts require different aesthetics. Enables component reuse across varied UI patterns.

**Independent Test**: Can be tested by rendering with radius="square" and radius="rounded" and verifying CSS border-radius is applied or removed correctly.

**Acceptance Scenarios**:

1. **Given** a checkbox card with radius="square", **When** rendered, **Then** no border-radius is applied (0px)
2. **Given** a checkbox card with radius="rounded", **When** rendered, **Then** the component/chip/dimension/radius token is applied (8px)

---

### User Story 5 - Indicator Placement Flexibility (Priority: P2)

As a developer, I need to position the checkbox indicator (start or end) within the card so I can match different layout requirements and RTL support.

**Why this priority**: Supports diverse layout needs and international design patterns. Enables proper RTL support.

**Independent Test**: Can be tested by rendering with indicatorPlacement="start" and indicatorPlacement="end" and verifying visual order.

**Acceptance Scenarios**:

1. **Given** a checkbox card with indicatorPlacement="start", **When** rendered, **Then** the checkbox indicator appears before the label
2. **Given** a checkbox card with indicatorPlacement="end", **When** rendered, **Then** the checkbox indicator appears after the label

---

### User Story 6 - All Standard Checkbox States (Priority: P2)

As a developer, I need the component to support disabled, invalid, and readonly states so form interactions properly reflect the data entry context.

**Why this priority**: Complete component functionality for production forms. Users must understand when they cannot interact with an option.

**Independent Test**: Can be tested by rendering with disabled/invalid/readonly props and verifying correct styling and behavior applied.

**Acceptance Scenarios**:

1. **Given** a checkbox card with disabled=true, **When** rendered, **Then** the disabled color is applied and pointer events are disabled
2. **Given** a checkbox card with invalid=true, **When** rendered, **Then** the `aria-invalid="true"` attribute is set and no visual styling changes are applied
3. **Given** a checkbox card with readOnly=true, **When** I click it, **Then** the checked state does not change

---

### Edge Cases

- What happens when label is very long or contains multiple lines of text?
- How does component handle when no content is provided (empty children)?
- What is the behavior when both indicatorPlacement is used with Content subcomponent?
- How does component scale on small screens or constrained containers?
- What happens when indicator prop is null or undefined?
- How does RTL language affect indicator placement and layout?
- What happens when an addon contains interactive content (button, link)?
- How does component handle rapid click interactions (double-click prevention)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST expose composable subcomponents (Root, Control, Content, Label, Description, Indicator, HiddenInput) for flexible content composition
- **FR-002**: Component MUST support three visual variants: "default", "contrast", "surface-contrast"
- **FR-003**: Component MUST support two border radius options: "square" (0px) and "rounded" (8px)
- **FR-004**: Component MUST support indicator placement: "start" or "end" within the card
- **FR-005**: Component MUST support all checkbox states: checked, unchecked, disabled, invalid (ARIA-only), readonly
- **FR-006**: Component MUST accept label and description content via BpkText-based subcomponents with customizable text properties; Label defaults to `bpk-heading-5` + `text-primary-day` (default) / `text-on-dark-day` (checked); Description defaults to `bpk-footnote` + `text-secondary-day` (default) / `text-on-dark-day` (checked)
- **FR-007**: Component MUST accept addon content that renders outside the control area
- **FR-008**: Component MUST properly associate label with checkbox input for keyboard and screen reader access
- **FR-009**: Component MUST handle onChange event callbacks when checkbox state changes
- **FR-010**: Component MUST support both controlled (checked prop) and uncontrolled (defaultChecked prop) patterns
- **FR-011**: Component MUST support form submission via name and value props
- **FR-012**: Component MUST render with all visual states: default, hover, selected/checked, disabled
- **FR-013**: Component MUST accept `maxW` and `maxH` props to control maximum width and height constraints

### Component API

**Main Component Props**:

- **`checked`** (boolean, optional): Controlled checked state
- **`defaultChecked`** (boolean, optional): Initial checked state for uncontrolled component
- **`onCheckedChange`** (function, optional): Callback when checkbox state changes
- **`disabled`** (boolean, optional, default: false): Disables the checkbox and applies disabled styling
- **`invalid`** (boolean, optional, default: false): Marks checkbox as invalid
- **`readOnly`** (boolean, optional, default: false): Makes checkbox read-only (non-interactive)
- **`name`** (string, optional): Name attribute for form submission
- **`value`** (string, optional): Value attribute for form submission
- **`form`** (string, optional): ID of form the checkbox belongs to
- **`required`** (boolean, optional): Marks checkbox as required
- **`id`** (string, optional): Unique identifier for the checkbox
- **`className`** (string, optional): Additional CSS classes for root element

**Styling Props**:

- **`variant`** (string, optional, default: "default"): Visual variant - "default" | "contrast" | "surface-contrast"
- **`radius`** (string, optional, default: "rounded"): Border radius - "square" | "rounded"

**Layout Props**:

- **`indicatorPlacement`** (string, optional, default: "end"): Position of checkbox indicator - "start" | "end"
- **`align`** (string, optional, default: "start"): Alignment of content - "start" | "center" | "end"
- **`maxW`** (string, optional): Maximum width of the checkbox card (e.g., "240px", "100%", "20rem")
- **`maxH`** (string, optional): Maximum height of the checkbox card (e.g., "200px", "100%", "12rem")

**Content Props**:

- **`children`** (ReactNode, optional): Content to render in control area

**Subcomponent Props**:

All subcomponents support the `asChild` prop for composition flexibility and standard HTML attributes.

- **Root**: Base component wrapping entire checkbox card
- **HiddenInput**: Native checkbox input element (not visually rendered)
- **Control**: Container for visible checkbox control and content
- **Content**: Wrapper for label, description, and other text content
- **Label**: BpkText-based component with default style `bpk-heading-5` and color `text-primary-day` (default) / `text-on-dark-day` (when checked); consumers can override BpkText props
- **Description**: BpkText-based component with default style `bpk-footnote` and color `text-secondary-day` (default) / `text-on-dark-day` (when checked); consumers can override BpkText props
- **Indicator**: Visual checkbox indicator (checkmark box)
- **Addon**: Optional content rendered outside the control area

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (Tab, Space, Enter navigation)
- **NFR-002**: Component MUST work with screen readers (proper ARIA labels and roles)
- **NFR-003**: Component MUST support RTL languages without layout breaking
- **NFR-004**: Component MUST meet WCAG 2.1 Level AA standards
- **NFR-005**: Component MUST render correctly on all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+)
- **NFR-006**: Component MUST use `rem` units for all sizing
- **NFR-007**: Component MUST have consistent hover/focus/active states across all variants (focus uses Backpack focus ring utility)
- **NFR-008**: Component MUST properly handle focus management for keyboard navigation

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: All spacing MUST use design tokens from `bpk-spacing-*()` functions
- **STY-004**: All colors MUST use design tokens from `bpk-tokens`
- **STY-005**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-checkbox-card`, `bpk-checkbox-card--disabled`)
- **STY-006**: Default state background MUST use surface/default token
- **STY-007**: Hover state MUST use surface/low-contrast token on light surfaces
- **STY-008**: Selected/checked state MUST use appropriate token (surface/contrast or core/accent based on variant)
- **STY-009**: Disabled state MUST use component/chip/colour/disabled token
- **STY-010**: Border styling MUST use other/line token

## Success Criteria

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop combinations in all supported browsers
- **SC-002**: All accessibility tests pass with jest-axe (WCAG 2.1 Level AA)
- **SC-003**: Keyboard navigation works correctly (Tab through checkboxes, Space/Enter to toggle)
- **SC-004**: Screen reader announces checkbox state, label, and description properly
- **SC-005**: All visual states (default, hover, checked, disabled) render with correct colors and styling
- **SC-006**: Composable subcomponents work together without conflicts or layout issues; Label and Description render with correct default text styles and colors; text colors change to text-on-dark-day when checkbox is checked
- **SC-007**: Component works correctly in RTL layout without visual breaking
- **SC-008**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-009**: TypeScript compiles without errors or type warnings
- **SC-010**: Storybook stories demonstrate all variants, radius options, indicator placements, and states
- **SC-011**: README documentation includes usage examples for basic and composed patterns
- **SC-012**: Component accepts form submission with name/value props
- **SC-013**: Component respects maxW and maxH props, constraining layout appropriately without overflow

## Design & Visual Specifications

**Figma**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev

**Visual States to implement**:

- Default/Rest state (unchecked)
- Hover state (unchecked and checked variants)
- Checked/Selected state
- Disabled state
- Focus state (keyboard navigation): Uses Backpack focus ring utility with distinct visual indicator

**ARIA-Only States** (no visual change):
- Invalid state: Managed via `aria-invalid` attribute, no visual styling applied

**Variant-Specific Styling**:

**"default" variant** (On Canvas Default):
- Default: white background (surface/default)
- Hover: white background with border
- Checked: dark navy background (surface/contrast)
- Disabled: light gray background (component/chip/colour/disabled)

**"contrast" variant** (On Canvas Contrast):
- Default: white background with border
- Hover: light gray background (surface/low-contrast) with border
- Checked: dark navy background (surface/contrast)
- Disabled: light gray background (component/chip/colour/disabled)

**"surface-contrast" variant** (On Surface Contrast):
- Default: tinted background (surface/tint - 10% white overlay)
- Hover: darker pressed state (component/button/colour/fill-pressed-secondary-on-dark)
- Checked: blue accent background (core/accent)
- Disabled: light gray background (component/chip/colour/disabled)

**Responsive behavior**:
- Mobile (<= 768px): Component scales with touch targets (min 44px height)
- Tablet (769px - 1023px): Standard sizing applies
- Desktop (>= 1024px): Standard sizing applies

## Dependencies & Related Components

**Internal Dependencies**:
- Uses Ark UI checkbox logic (Ark UI Checkbox.Root pattern)
- May compose with other Backpack components (BpkText, BpkIcon, etc.) via children

**External Dependencies**:
- `@ark-ui/react`: Checkbox primitive for accessibility and logic
- No other external dependencies required

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web`: Color tokens, spacing tokens
- `packages/bpk-mixins`: Typography, spacing functions

**Internal Component Dependencies**:
- `BpkText`: Label and Description subcomponents built on BpkText primitive

## Testing Strategy

### Unit Tests (`BpkCheckboxCard-test.tsx`)

- Test all prop combinations (variants, radius, indicator placement, states)
- Test controlled and uncontrolled patterns
- Test onCheckedChange callback fires correctly
- Test disabled, invalid, readonly states prevent interaction
- Test composition with subcomponents
- Test form submission with name/value
- Snapshot tests for each variant/state combination
- Test edge cases (no label, no description, long content)

### Accessibility Tests (`accessibility-test.tsx`)

- Use jest-axe for automated checks
- Test keyboard navigation (Tab through, Space/Enter to toggle)
- Test screen reader support (ARIA labels, roles, states)
- Test focus management and focus indicators
- Test form integration (label association)
- Test RTL language support

### Visual Regression Tests (Percy via Storybook)

- Test all visual variants
- Test all radius options
- Test all indicator placements
- Test all interactive states (default, hover, checked, disabled)
- Test responsive breakpoints

## Documentation Requirements

### README.md

- Component description (<100 words, British English)
- Brief explanation of composable subcomponents pattern
- Usage examples: basic usage and composed patterns
- Props table with descriptions
- Variant showcase (default, contrast, surface-contrast)
- Accessibility features list
- Browser support information
- Link to Storybook

### Storybook Stories

- Basic checkbox card with label
- Checkbox card with description
- Checkbox card with icon
- Checkbox card with addon
- All variants (default, contrast, surface-contrast)
- All radius options (square, rounded)
- All indicator placements (start, end)
- All states (checked, disabled, invalid, readonly)
- Composed patterns (custom layouts)
- RTL example
- Form integration example

### JSDoc Comments

- Component description with example
- All props documented with type and description
- Subcomponent descriptions
- Usage examples in JSDoc

### Figma Code Connect

- Map component to Figma designs
- Document props mapping to Figma properties
- Provide usage examples

## Migration & Versioning

**Version Type**: MINOR

**Rationale**: New feature - component is a new addition to the design system with no breaking changes to existing components.

**Breaking Changes**: None - this is a new component addition.

**Deprecations**: None - this is a new component.

**Future API**: None planned at this time.

## Clarifications

### Session 2026-02-06

- Q1: Invalid state styling → A: ARIA-only (no visual changes, managed via `aria-invalid` attribute)
- Q2: Size variants support → A: Add `maxW` and `maxH` props for max width/height control
- Q3: Focus state styling → A: Distinct focus styling using existing Backpack focus ring utility
- Q4: Label default text style → A: `bpk-heading-5` with `text-primary-day` color
- Q5: Description default text style → A: `bpk-footnote` with `text-secondary-day` color
- Q6 (user-provided): Label/Description text color on checked state → A: Use `text-on-dark-day` color when checkbox is checked for contrast on colored background

## Assumptions

- Border radius defaults to "rounded" (8px) to match modern design trends
- Indicator placement defaults to "end" for LTR, will adjust for RTL via CSS
- Component uses Ark UI Checkbox as the underlying primitive for accessibility and state management
- Color tokens follow Backpack design system (surface/default, core/accent, etc.)
- Component supports form submission as a standard checkbox input
- Visual states are managed through CSS classes and design token values
- Component does not enforce maximum width (allows parent to control sizing)

## Open Questions

- [ ] Should addon content have layout constraints, or is it completely flexible?

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Figma Design**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev
- **Ark UI Checkbox**: https://ark-ui.com/docs/components/checkbox
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Related Components**: BpkCheckbox, BpkRadio, BpkCard
