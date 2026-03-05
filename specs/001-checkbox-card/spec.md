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

# Component Specification: Checkbox Card

**Package Branch**: `001-checkbox-card`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "New Backpack checkbox card component for selectable options with price information"

## Clarifications

### Session 2026-01-27

- Q: What is the intended selection model for this component? → A: Component supports both single and multi-selection patterns depending on how consumers manage state (flexible)
- Q: How should the component handle text overflow for long labels? → A: Truncate with ellipsis after specific line count (defined in Figma design)
- Q: What is the maximum acceptable response time for selection state changes? → A: Under 100ms (imperceptible to users, industry standard for instant feel)

### Session 2026-01-29 - Architecture Refinement

- Q: Should the component follow Ark UI patterns for better composability? → A: Yes, adopt Compound Component pattern similar to Ark UI for maximum flexibility
- Q: How should theming be supported? → A: Support BpkThemeProvider with light/dark/brand themes using design tokens
- Q: What accessibility level is required? → A: WCAG 2.2 AA compliance (upgraded from 2.1 AA)
- Q: Should the API be slot-based? → A: Yes, provide explicit icon/image/text slots for clearer composition

## Constitution Check

*GATE: Must pass before implementation begins.*

- [ ] **Component-First Architecture**: Component will be in `packages/bpk-component-checkbox-card/`
- [ ] **Naming Conventions**: Component name follows PascalCase (BpkCheckboxCard)
- [ ] **License Headers**: All source files (.ts, .tsx, .js, .jsx, .scss, .css) will include Apache 2.0 license header
- [ ] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [ ] **Accessibility-First**: Will include `accessibility-test.tsx`
- [ ] **TypeScript**: Will be written in TypeScript with proper types
- [ ] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [ ] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [ ] **Versioning**: MINOR (new component addition to Backpack)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select Option and Trigger Search (Priority: P1)

A developer consuming Backpack needs to present selectable options with price information where user selection triggers a new search request. This is the core use case across Hotels, Flights, and Car Hire verticals.

**Why this priority**: This is the fundamental capability gap that the component addresses. All three documented use cases require this behavior.

**Independent Test**: Can be fully tested by rendering the component with minimal props (label, price, onChange handler) and verifying selection state changes and callback invocation.

**Acceptance Scenarios**:

1. **Given** a checkbox card in unselected state, **When** user clicks anywhere on the card, **Then** the card enters selected state and onChange callback is invoked
2. **Given** a checkbox card in selected state, **When** user clicks the card again, **Then** the card returns to unselected state and onChange callback is invoked
3. **Given** a checkbox card with price information, **When** rendered, **Then** the price is displayed using consistent Backpack price formatting
4. **Given** multiple checkbox cards managed by parent component state, **When** user selects cards, **Then** the parent component controls whether single or multi-selection behavior is enforced (component itself is stateless and flexible)

---

### User Story 2 - Display Rich Content (Priority: P2)

Developers need to display various content types within checkbox cards including icons, images, text labels, and optional indicators to match different vertical requirements (Hotels show location types, Flights show dates, Car Hire shows vehicle images).

**Why this priority**: Content flexibility is essential for cross-vertical adoption, but the core selection behavior (P1) must work first.

**Independent Test**: Can be tested independently by rendering cards with different content combinations (icon only, image only, text with icon, etc.) and verifying correct visual presentation.

**Acceptance Scenarios**:

1. **Given** a checkbox card with an icon prop, **When** rendered, **Then** the icon is displayed prominently within the card
2. **Given** a checkbox card with an image prop, **When** rendered, **Then** the image is displayed with appropriate sizing and aspect ratio
3. **Given** a checkbox card with text labels, **When** rendered, **Then** the labels are readable and properly positioned
4. **Given** a checkbox card with BpkPrice integration, **When** rendered, **Then** the price is displayed using BpkPrice component styling and formatting

---

### User Story 3 - Keyboard and Assistive Technology Support (Priority: P2)

Users who rely on keyboard navigation or assistive technologies need to interact with checkbox cards effectively. Developers need the component to provide accessible interaction patterns out of the box.

**Why this priority**: Accessibility is critical for Backpack adoption, but depends on the basic selection mechanism (P1) being in place.

**Independent Test**: Can be tested independently using keyboard navigation simulation (Tab, Enter, Space) and screen reader testing without requiring other features.

**Acceptance Scenarios**:

1. **Given** a checkbox card, **When** user navigates with Tab key, **Then** the card receives keyboard focus with visible focus indicator
2. **Given** a focused checkbox card, **When** user presses Space or Enter key, **Then** the card toggles selection state
3. **Given** a checkbox card, **When** rendered, **Then** proper ARIA attributes are present for screen readers (role, aria-checked, aria-label)
4. **Given** multiple checkbox cards, **When** user navigates with Tab key, **Then** focus moves sequentially through all cards
5. **Given** a disabled checkbox card, **When** user tries to focus it with keyboard, **Then** the card is skipped in tab order

---

### User Story 4 - Visual Variants and States (Priority: P3)

Developers need visual flexibility to match different design contexts across verticals while maintaining Backpack consistency. This includes variants for background treatment and clear visual distinction of selection states.

**Why this priority**: Visual variants enhance flexibility but are not essential for initial adoption. Core functionality (P1) and content display (P2) are more critical.

**Independent Test**: Can be tested independently by rendering cards with different variant props and verifying visual differences through snapshot tests and Percy.

**Acceptance Scenarios**:

1. **Given** a checkbox card with variant="with-background", **When** rendered, **Then** the card displays with a visible background color
2. **Given** a checkbox card with variant="no-background", **When** rendered, **Then** the card displays without background, using borders or other visual separation
3. **Given** a checkbox card in different states (default, hover, focus, selected, disabled), **When** rendered, **Then** each state has distinct and clear visual treatment
4. **Given** a selected checkbox card, **When** rendered, **Then** the selected state is visually obvious through background color, border, or indicator
5. **Given** a disabled checkbox card, **When** rendered, **Then** the card appears visually disabled with reduced opacity or grayed-out appearance

---

### User Story 5 - RTL Language Support (Priority: P3)

Skyscanner serves global markets including RTL languages. The checkbox card component must render correctly in right-to-left layouts without visual issues.

**Why this priority**: RTL support is a Backpack requirement but can be validated after core functionality is complete.

**Independent Test**: Can be tested independently by rendering the component in RTL mode and verifying proper layout mirroring.

**Acceptance Scenarios**:

1. **Given** a checkbox card in RTL mode, **When** rendered with an icon, **Then** the icon position is mirrored appropriately
2. **Given** a checkbox card in RTL mode, **When** rendered with text and price, **Then** content flows right-to-left correctly

---

### Edge Cases

- What happens when price prop is not provided? (Component should still render with other content)
- What happens when both icon and image props are provided? (Follow design specification for precedence or render both)
- What happens with extremely long text labels? (Label and description text truncate with ellipsis after maximum line count specified in Figma design to prevent layout breaking)
- What happens when parent container is too small? (Component should maintain minimum touch target size of 44x44px and gracefully handle overflow)
- What happens when checkbox card is in a responsive layout? (Component should adapt to different breakpoints while maintaining usability)
- What happens when no content props are provided? (Component should render with minimal layout structure)
- What happens when disabled and selected props are both true? (Disabled state should take precedence, card should appear selected but not interactive)
- What happens when custom className or style props are provided? (Component should restrict these to maintain design consistency per Constitution XI)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST render as a selectable card element with clear visual distinction between selected and unselected states
- **FR-002**: Component MUST support a checked/selected prop to control selection state
- **FR-003**: Component MUST invoke an onChange callback when selection state changes via user interaction
- **FR-004**: Component MUST support displaying an icon via an icon prop that accepts Backpack icon components
- **FR-005**: Component MUST support displaying an image via an image prop with appropriate sizing
- **FR-006**: Component MUST support displaying text labels via label and description props
- **FR-007**: Component MUST integrate with BpkPrice component for price display or provide a price slot/prop for compositional pattern
- **FR-008**: Component MUST support a disabled state that prevents interaction and shows appropriate visual treatment
- **FR-010**: Component MUST provide three visual variants based on background context: onCanvasDefault (for default/white backgrounds), onCanvasContrast (for contrast/colored backgrounds), and onSurfaceContrast (for dark contrast surfaces)
- **FR-011**: Component MUST handle click events on the entire card area (not just the checkbox indicator)
- **FR-012**: Component MUST support keyboard interaction (Space and Enter keys to toggle selection)
- **FR-013**: Component MUST provide proper ARIA attributes (role="checkbox", aria-checked, aria-disabled, aria-label or aria-labelledby)
- **FR-014**: Component MUST display visible focus indicator when focused via keyboard navigation
- **FR-015**: Component MUST support RTL language layouts with proper content mirroring
- **FR-016**: Component MUST use CSS Modules for style isolation
- **FR-017**: Component MUST NOT expose className or style props to prevent design system breaking (per Constitution XI)
- **FR-018**: Component MUST provide accessible labels via ariaLabel prop or derived from content
- **FR-019**: Component MUST be stateless, delegating selection management to parent components to support both single-selection and multi-selection patterns
- **FR-020**: Component MUST truncate label and description text with ellipsis when exceeding maximum line count specified in Figma design to prevent layout breaking
- **FR-021**: Component MUST support customizable width and height to accommodate different use cases and container sizes
- **FR-022**: Component MUST support flexible internal layout arrangement using Stack layout primitive for composable vertical content organization
- **FR-023**: Component MUST implement slot-based layout pattern to allow consumers to freely arrange internal elements while maintaining design system consistency
- **FR-024**: Component MUST follow Ark UI-style Compound Component pattern for composability (Root, Control, Content, slot sub-components)
- **FR-025**: Component MUST support BpkThemeProvider integration with light/dark/brand theme variants
- **FR-026**: Component MUST use only Backpack design tokens for all styling (colors, spacing, typography, borders)
- **FR-027**: Component MUST provide explicit slot components (Icon, Image, Label, Description, Price) for clearer composition
- **FR-028**: Component MUST maintain WCAG 2.2 Level AA compliance (upgraded from WCAG 2.1 AA)
- **FR-029**: Component MUST maintain consistent API patterns with other Ark UI-based Backpack components
- **FR-030**: Component MUST support theme token overrides via CSS custom properties for advanced theming

### Component API *(include props/types)*

**Props**:

- **`checked`** (boolean, required): Whether the checkbox card is selected
- **`onChange`** (function, required): Callback invoked when selection state changes `(checked: boolean, event: ChangeEvent) => void`
- **`label`** (string, optional): Primary text label displayed on the card
- **`description`** (string, optional): Secondary descriptive text displayed below the label
- **`icon`** (ReactElement, optional): Backpack icon component to display
- **`image`** (string or ReactElement, optional): Image URL or React image element to display
- **`price`** (ReactElement or string, optional): Price information, accepts BpkPrice component or formatted string
- **`disabled`** (boolean, optional, default: false): Whether the card is disabled and non-interactive
- **`variant`** (string, optional, default: "onCanvasDefault"): Visual variant based on background context - "onCanvasDefault" | "onCanvasContrast" | "onSurfaceContrast"
- **`radius`** (string, optional, default: "rounded"): Border radius style - "square" | "rounded"
- **`ariaLabel`** (string, optional): Accessible label for screen readers (required if no label prop provided)
- **`name`** (string, optional): Name attribute for grouping checkbox cards in forms
- **`value`** (string, optional): Value attribute for form submission
- **`children`** (ReactNode, optional): Children for composable API - when provided, takes precedence over props-based API (label, image, price, etc.)
- **`width`** (string | number, optional): Custom width for the card - accepts CSS values (e.g., "200px", "100%", "auto") or numeric pixel values
- **`height`** (string | number, optional): Custom height for the card - accepts CSS values (e.g., "150px", "auto") or numeric pixel values
- **`layout`** (string, optional, default: "vertical"): Internal content layout orientation - "vertical" | "horizontal" | "custom"

### Composable API Sub-Components

The component supports a composable API pattern using sub-components attached to the main component. When using children, the sub-components provide finer control over layout and content:

- **`BpkCheckboxCard.Image`**: Displays an image within the card
  - **`src`** (string, required): Image URL
  - **`alt`** (string, optional, default: ""): Alt text for accessibility

- **`BpkCheckboxCard.Label`**: Displays primary label text
  - **`children`** (string, required): Label text content

- **`BpkCheckboxCard.Description`**: Displays secondary descriptive text
  - **`children`** (ReactNode, required): Description content

- **`BpkCheckboxCard.Text`**: Container for label and description
  - **`children`** (ReactNode, required): Text content (typically Label and/or Description components)

- **`BpkCheckboxCard.Price`**: Displays price information
  - **`children`** (ReactNode, required): Price content

- **`BpkCheckboxCard.Icon`**: Displays an icon
  - **`children`** (ReactElement, required): Backpack icon component

- **`BpkCheckboxCard.Stack`**: Layout primitive for vertical stacking of content
  - **`children`** (ReactNode, required): Content to stack vertically
  - **`gap`** (string, optional): Spacing between items - "xs" | "sm" | "md" | "lg" | "xl"
  - **`align`** (string, optional): Horizontal alignment - "start" | "center" | "end"

**Props-Based API Example**:
```typescript
type BpkCheckboxCardProps = {
  checked: boolean;
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  description?: string;
  icon?: ReactElement;
  image?: string | ReactElement;
  price?: ReactElement | string;
  indicator?: ReactElement;
  disabled?: boolean;
  variant?: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  radius?: 'square' | 'rounded';
  ariaLabel?: string;
  name?: string;
  value?: string;
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  layout?: 'vertical' | 'horizontal' | 'custom';
};
```

**Composable API Example**:
```jsx
// Vertical layout with Stack (default)
<BpkCheckboxCard
  checked={selected}
  onChange={(checked) => setSelected(checked)}
  variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
>
  <BpkCheckboxCard.Stack space="md" alignItems="center">
    <BpkCheckboxCard.Image src="https://example.com/car.png" />
    <BpkCheckboxCard.Text>
      <BpkCheckboxCard.Label>Car type</BpkCheckboxCard.Label>
    </BpkCheckboxCard.Text>
    <BpkCheckboxCard.Price>from £74</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Stack>
</BpkCheckboxCard>

// Horizontal layout with Inline
<BpkCheckboxCard
  checked={selected}
  onChange={(checked) => setSelected(checked)}
  variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
  width="auto"
  height="auto"
  layout="horizontal"
>
  <BpkCheckboxCard.Inline space="md" alignItems="center">
    <BpkCheckboxCard.Icon>
      <LandmarkIcon />
    </BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Text>
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    </BpkCheckboxCard.Text>
    <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Inline>
</BpkCheckboxCard>

// Custom flexible layout with mixed primitives
<BpkCheckboxCard
  checked={selected}
  onChange={(checked) => setSelected(checked)}
  width="200px"
  layout="custom"
>
  <BpkCheckboxCard.Inline space="sm" alignItems="flex-start">
    <BpkCheckboxCard.Icon>
      <LandmarkIcon />
    </BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Stack space="sm" alignItems="flex-start">
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
      <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
      <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
    </BpkCheckboxCard.Stack>
  </BpkCheckboxCard.Inline>
</BpkCheckboxCard>
```

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (Tab to focus, Space/Enter to toggle)
- **NFR-002**: Component MUST work with screen readers with proper ARIA attributes
- **NFR-003**: Component MUST support RTL languages with mirrored layout
- **NFR-004**: Component MUST meet WCAG 2.1 Level AA standards for color contrast and accessibility
- **NFR-005**: Component MUST render correctly on all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- **NFR-006**: Component MUST use `rem` units for all sizing (not `px` or `em`)
- **NFR-007**: Component MUST maintain minimum touch target size of 44x44 pixels on mobile
- **NFR-008**: Component MUST support zoom up to 400% without losing content or functionality
- **NFR-009**: Component MUST respond to selection state changes in under 100ms to feel instantaneous to users

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules (e.g., `@use '../bpk-mixins/tokens'`)
- **STY-004**: All spacing MUST use design tokens (e.g., `tokens.bpk-spacing-md()`)
- **STY-005**: All colors MUST use design tokens (e.g., `tokens.$bpk-color-white`)
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-checkbox-card`, `bpk-checkbox-card--selected`, `bpk-checkbox-card--disabled`)
- **STY-007**: Component SHOULD support theming via `bpk-theming` if design requires themeable colors
- **STY-008**: Selected state MUST have visually distinct styling using design tokens for background and borders
- **STY-009**: Hover state MUST provide visual feedback without conflicting with selected state
- **STY-010**: Focus state MUST show clear keyboard focus indicator meeting WCAG contrast requirements

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop combinations in all supported browsers
- **SC-002**: Component meets WCAG 2.1 Level AA accessibility standards
- **SC-003**: Component works with keyboard navigation (Tab, Enter, Space keys)
- **SC-004**: Component supports RTL languages without visual issues
- **SC-005**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-006**: All accessibility tests pass with jest-axe (zero violations)
- **SC-007**: Storybook stories demonstrate all variants, states, and content combinations
- **SC-008**: Component integrates successfully with BpkPrice without styling conflicts
- **SC-009**: Visual regression tests pass in Percy for all states and variants
- **SC-010**: Component maintains minimum 44x44px touch target on mobile viewports
- **SC-011**: Component functions correctly at 400% zoom level
- **SC-012**: Component adopts existing design tokens for colors, spacing, and typography without introducing new magic numbers
- **SC-013**: All three documented use cases (Hotels, Flights, Car Hire) can be implemented using the component without custom styling
- **SC-014**: Component reduces code duplication across verticals by providing a shared solution

## Design & Visual Specifications

**Figma**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev

**Design Reference**: Chakra UI Checkbox Card - https://chakra-ui.com/docs/components/checkbox-card#examples

**Visual States to implement**:
- Default/Rest state (unselected, no interaction)
- Hover state (mouse over unselected card)
- Focus state (keyboard navigation focus indicator)
- Selected state (card is checked)
- Selected + Hover state (mouse over selected card)
- Active/Pressed state (during click interaction)
- Disabled state (unselected, non-interactive)
- Disabled + Selected state (selected but non-interactive)

**Content Layout Patterns** (based on use cases):
- **Vertical (default)**: Icon + Label + Price stacked vertically (Hotels day view pattern)
- **Vertical with Image**: Image + Label + Price stacked vertically (Car Hire day view pattern)
- **Horizontal**: Icon/Image + Label + Price arranged horizontally (Compact inline pattern)
- **Custom**: Free-form arrangement using Stack and Inline primitives for complex layouts

**API Mode Selection**:
- **Props-based API**: Use for simple, standard layouts (label + price, icon + label + price) with default vertical orientation
- **Composable API with layout="vertical"**: Use when you need vertical stacking but want control over spacing and alignment
- **Composable API with layout="horizontal"**: Use for horizontal inline arrangements
- **Composable API with layout="custom"**: Use for complex nested layouts requiring both Stack and Inline primitives

**Layout Primitive Usage**:
The component provides two layout primitives that follow Backpack's design system:
- **Stack**: Vertical layout primitive using flexbox column direction with configurable gap spacing
- **Inline**: Horizontal layout primitive using flexbox row direction with configurable gap spacing

These primitives ensure consistent spacing using Backpack design tokens and allow flexible content arrangement while maintaining design system constraints.

**Responsive behavior**:
- Mobile (<= 768px): Cards stack vertically or use horizontal scrolling; maintain 44x44px minimum touch target; default to vertical layout
- Tablet (769px - 1023px): Cards may display in grid layout with appropriate spacing; support both vertical and horizontal orientations
- Desktop (>= 1024px): Cards display in flexible grid or horizontal layout as designed; full layout flexibility with custom arrangements

**Size Flexibility**:
- **Default sizing**: Fixed dimensions (100px width × 110px height) for vertical layout consistency
- **Custom sizing**: Consumers can override width/height using CSS values ("200px", "100%", "auto") or numeric pixel values
- **Auto sizing**: When layout="horizontal" or layout="custom", default to auto width/height to accommodate content
- **Minimum constraints**: Maintain minimum 44x44px touch target for accessibility regardless of custom sizing

**Selection Indicator**: Component shows clear selected state through background color change using design tokens. Figma specifies the following selected state colors:
- **onCanvasDefault/onCanvasContrast selected**: Deep blue `$bpk-surface-contrast-day` (#05203C)
- **onSurfaceContrast selected**: Accent blue `$bpk-core-accent-day` (#0062E3)

**Visual Variants Design Token Mapping**:

| Variant | State | Background Token | Color Value | Border | Shadow | Usage Context |
|---------|-------|-----------------|-------------|--------|--------|---------------|
| onCanvasDefault | Default | `$bpk-canvas-day` | #FFFFFF | 1px solid `$bpk-line-day` (#C1C7CF) | None | White/default backgrounds |
| onCanvasDefault | Hover | `$bpk-surface-low-contrast-day` | #F5F7FA | 1px solid `$bpk-line-day` (#C1C7CF) | None | White/default backgrounds |
| onCanvasDefault | Selected | `$bpk-surface-contrast-day` | #05203C | None | None | White/default backgrounds |
| onCanvasContrast | Default | `$bpk-canvas-contrast-day` | #EFF3F8 | None | None | Colored/contrast backgrounds |
| onCanvasContrast | Hover | `$bpk-canvas-contrast-day` | #EFF3F8 | 1px solid `$bpk-line-day` (#C1C7CF) | None | Colored/contrast backgrounds |
| onCanvasContrast | Selected | `$bpk-surface-contrast-day` | #05203C | None | None | Colored/contrast backgrounds |
| onSurfaceContrast | Default | `$bpk-surface-tint-day` | rgba(255,255,255,0.1) | None | None | **Dark backgrounds only** |
| onSurfaceContrast | Hover | `$bpk-private-button-secondary-on-dark-pressed-background-day` | #04182D | None | None | **Dark backgrounds only** |
| onSurfaceContrast | Selected | `$bpk-core-accent-day` | #0062E3 | None | None | **Dark backgrounds only** |

**IMPORTANT NOTES**:
1. The `onSurfaceContrast` variant uses semi-transparent white (`rgba(255,255,255,0.1)`) in default state and is designed exclusively for use on dark backgrounds. When showcasing in Storybook or documentation, this variant MUST be displayed with a dark background container to accurately represent its visual appearance.

2. **Canvas vs Surface tokens** (fixed 2026-01-29):
   - `onCanvasDefault` and `onCanvasContrast` use **Canvas tokens** (`$bpk-canvas-day`, `$bpk-canvas-contrast-day`) for backgrounds
   - **Surface tokens** (`$bpk-surface-low-contrast-day`) are only used for hover state background changes
   - This distinction ensures proper semantic token usage per Figma design system

3. **Border and shadow behavior** (fixed 2026-01-29):
   - `onCanvasDefault`: Has border by default, background changes on hover, no shadow
   - `onCanvasContrast`: No border by default, border appears on hover, no shadow
   - All variants explicitly override `bpk-card` mixin shadows (`box-shadow: none; &::after { display: none; }`)

### Typography Specifications

All text elements MUST use Figma's **Heading 5** style specification per design system:

**Label and Price Text (Heading 5)**:
| Property | Value | Design Token |
|----------|-------|--------------|
| **font-family** | "Skyscanner Relative" | System default |
| **font-size** | `1rem` (16px) | `$bpk-font-size-base` |
| **font-weight** | `700` (bold) | `$bpk-font-weight-bold` |
| **line-height** | `125%` (1.25) | `1.25` (NOT `$bpk-line-height-base`) |
| **letter-spacing** | `0` | `0` |
| **text-align** | `center` | `center` |

**Text Color by Variant and State**:

| Variant | State | Text Color Token | Color Value |
|---------|-------|-----------------|-------------|
| onCanvasDefault | Default/Hover | `$bpk-text-primary-day` | #161616 |
| onCanvasDefault | Selected | `$bpk-text-on-dark-day` | #FFFFFF |
| onCanvasContrast | Default/Hover | `$bpk-text-primary-day` | #161616 |
| onCanvasContrast | Selected | `$bpk-text-on-dark-day` | #FFFFFF |
| **onSurfaceContrast** | **Default** | **`$bpk-text-on-dark-day`** | **#FFFFFF** |
| **onSurfaceContrast** | **Hover** | **`$bpk-text-on-dark-day`** | **#FFFFFF** |
| **onSurfaceContrast** | **Selected** | **`$bpk-text-on-dark-day`** | **#FFFFFF** |

**CRITICAL**: The `onSurfaceContrast` variant requires white text (`$bpk-text-on-dark-day`) in ALL states (Default, Hover, Selected) because it is designed for use on dark backgrounds. Canvas variants only use white text in the Selected state.

**Layout Requirements**:
- Text container (`&__text`) MUST use `display: flex; flex-direction: column; align-items: center` to center text horizontally
- Label and Price elements MUST have `width: 100%` to allow `text-align: center` to take effect
- Text wrapper MUST use `gap: $bpk-spacing-sm()` for spacing between label and price

## Dependencies & Related Components

**Internal Dependencies** (other Backpack components):
- May compose with `bpk-component-price` (BpkPrice) for price display formatting
- Uses Backpack icon components passed via `icon` prop
- Uses design tokens from `@skyscanner/bpk-foundations-web`
- Uses Sass mixins from `bpk-mixins` package

**External Dependencies** (npm packages):
- None expected beyond standard React dependencies

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` for spacing, colors, typography, and shadows
- `bpk-mixins` for Sass utilities and design token accessors

**Related Components**:
- This component fills a gap between existing `bpk-component-checkbox` (form input) and card-style selection patterns
- Distinct from `bpk-component-radio` but may share similar selection semantics
- Not a replacement for `bpk-component-card` (which is for non-selectable content presentation)

## Testing Strategy

### Unit Tests (`BpkCheckboxCard-test.tsx`)
- Test checked and unchecked rendering
- Test onChange callback invocation with correct arguments
- Test disabled state prevents interaction
- Test all prop combinations (icon, image, label, description, price, indicator)
- Test variant prop affects styling
- Test keyboard interaction (Space and Enter key events)
- Test click events on entire card area
- Test edge cases (no props, missing required props, conflicting props)
- Snapshot tests for each variant and state combination

### Accessibility Tests (`accessibility-test.tsx`)
- Use jest-axe for automated WCAG checks
- Test keyboard navigation (Tab, Space, Enter)
- Test screen reader support (verify ARIA attributes present and correct)
- Test focus management and visible focus indicators
- Test that disabled cards are not in tab order
- Test minimum touch target size on mobile
- Test color contrast meets WCAG AA standards
- Test that ariaLabel is used when label prop not provided

### Visual Regression Tests (Percy via Storybook)
- Test all visual variants (with-background, no-background)
- Test all interactive states (default, hover, focus, selected, disabled)
- Test content combinations (icon, image, price, labels)
- Test responsive breakpoints (mobile, tablet, desktop)
- Test RTL layout rendering
- Note: If component uses images, visual testing may be skipped per `decisions/visual-tests.md` to avoid flaky CI tests

## Documentation Requirements

### README.md
- Component description: "Checkbox Card provides selectable cards with rich content and price information, commonly used for search option selection across Skyscanner verticals" (<100 words, British English prose)
- Usage examples showing basic selection pattern
- Usage examples showing different content combinations (icon, image, price)
- Props table with descriptions and default values
- Accessibility guidance for consumers
- Browser support information (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- Link to Storybook for interactive examples

### Storybook (`examples/bpk-component-checkbox-card/stories.tsx`)
- Default story showing all three variants (onCanvasDefault, onCanvasContrast, onSurfaceContrast) without text
- Story showing all variants with square and rounded radius options
- Story showing icon + label + price pattern (Hotels use case)
- Story showing image + label + price pattern (Car Hire use case)
- Story showing simple label + price pattern (Flights use case)
- Story showing "With Context" examples with text for all variants
- Story demonstrating Composable API with sub-components (Image, Icon, Label, Price)
- **Story demonstrating vertical layout using Stack primitive with different spacing options**
- **Story demonstrating horizontal layout using Inline primitive with custom width/height**
- **Story demonstrating custom nested layout mixing Stack and Inline primitives**
- **Story showing size customization examples (fixed, percentage, auto)**
- Story showing all interactive states (hover, focus, selected, disabled)
- Story showing keyboard navigation example with multiple cards
- Story showing RTL layout
- Story showing integration with BpkPrice component
- Story demonstrating single-selection pattern with multiple cards
- Add a11y addon for accessibility validation in Storybook

### JSDoc/TSDoc Comments
- Component description explaining purpose and use cases
- Documentation of dual API support: props-based API (backward compatible) and composable API using sub-components
- All props documented with type, description, and default values
- Examples in JSDoc showing common usage patterns for both API modes
- Note about component filling capability gap across verticals
- Guidance on when to use this component vs standard checkbox or radio components
- Documentation of sub-components (Image, Label, Description, Text, Price, Icon) with their respective props

### Figma Code Connect (`.figma.tsx`)
- Connect BpkCheckboxCard component to Figma designs
- Map props to Figma design properties (variant, checked state, content types)
- Provide usage examples for designers and developers

## Migration & Versioning

**Version Type**: MINOR

**Rationale**: This is a new component addition to Backpack. According to `decisions/versioning-rules.md`, new components are considered new features and warrant a MINOR version bump. No breaking changes since this is a new addition.

**Breaking Changes**: None (new component)

**Deprecations**: None

**Future API**: Not applicable (new component with stable API from launch)

## Implementation Notes

**File Structure** (per constitution):
```
packages/bpk-component-checkbox-card/
├── README.md
├── index.ts                            # exports default from src/
├── docs/                               # screenshots showing use cases
└── src/
    ├── BpkCheckboxCard/
    │   ├── BpkCheckboxCard.tsx
    │   ├── BpkCheckboxCard.module.scss
    │   ├── BpkCheckboxCard-test.tsx
    │   ├── accessibility-test.tsx
    │   ├── BpkCheckboxCard.figma.tsx
    │   ├── common-types.ts             # shared types if needed
    │   └── __snapshots__/
    └── themeAttributes.ts              # if component requires theming
```

**Key Implementation Principles**:
1. Follow Backpack constitution principles (modern Sass, TypeScript, accessibility-first)
2. Use TypeScript for all code with proper prop type definitions
3. Use modern Sass with `@use` syntax and granular imports from `bpk-mixins`
4. Ensure accessibility with jest-axe testing and WCAG 2.1 AA compliance
5. Meet test coverage requirements (70% branches, 75% functions/lines/statements)
6. Document with British English prose, US English code
7. Use `rem` units for all sizing (never `px` or `em`)
8. Support RTL languages with proper layout mirroring
9. Restrict className and style props to maintain design consistency (per Constitution XI)
10. Make accessibility props required when needed to enforce accessible usage
11. Support dual API modes: props-based API (backward compatible) maintains existing functionality while composable API (using children) provides flexibility for complex layouts

**Semantic Distinction**:
This component represents a "selection triggers re-search" interaction pattern, distinct from:
- Standard checkbox: form input for collecting yes/no values
- Radio button: single selection within a group
- Card: non-interactive content container
- Checkbox Card: selectable card that triggers new search/action (this component)

**Cross-Vertical Adoption Strategy**:
The component design should support all three documented use cases (Hotels, Flights, Car Hire) through flexible content props rather than vertical-specific variants. This ensures a single component can reduce duplication across all verticals.

**Dual API Architecture**:
The component implements two complementary API modes:
1. **Props-based API** (backward compatible): Monolithic approach where content is passed via individual props (label, image, price, icon). Suitable for simple layouts with default vertical orientation and fixed sizing. Ensures backward compatibility.
2. **Composable API** (flexible): Children-based approach using sub-components (BpkCheckboxCard.Image, BpkCheckboxCard.Label, etc.) attached to the main component. Provides greater flexibility for complex layouts, custom sizing, and different orientations using layout primitives (Stack, Inline).

The component automatically detects which API mode is being used based on the presence of the `children` prop. When `children` is provided, it takes precedence over props-based API. This dual-mode architecture maintains backward compatibility while enabling advanced use cases without breaking existing implementations.

**Slot-Based Layout Pattern**:
The composable API implements a slot-based architecture where:
- Each sub-component (Image, Label, Icon, etc.) acts as a self-contained slot
- Layout primitives (Stack, Inline) provide structural organization
- Consumers have full control over slot arrangement and composition
- Design system constraints are enforced through primitive spacing tokens
- No arbitrary className or style props to prevent design system breaking (per Constitution XI)

**Backpack Layout Primitive Integration**:
The component leverages Backpack's layout primitive patterns:
- **Stack primitive**: Implements vertical layout with consistent gap spacing using `tokens.bpk-spacing-*`
- **Inline primitive**: Implements horizontal layout with consistent gap spacing using `tokens.bpk-spacing-*`
- **Alignment control**: Both primitives support flexbox alignment (flex-start, center, flex-end)
- **Token-driven spacing**: All spacing values must reference Backpack spacing tokens (sm, md, lg, xl)
- **Composability**: Primitives can be nested for complex multi-dimensional layouts

## Implementation Notes

### Design Token Naming Alignment

**Critical Finding**: There is a naming inconsistency between Figma layer names and Backpack design tokens that can lead to implementation errors:

- **Figma Layer Names**: "On Canvas Default", "On Canvas Contrast", "On Surface Contrast"
- **Figma Design Variables**: `--surface/contrast`, `--core/accent`, `--surface/tint`
- **Backpack Token Names**: `$bpk-surface-contrast-day`, `$bpk-core-accent-day`, `$bpk-surface-tint-day`

**Token Mapping Verification**:
| Figma Variable | Backpack Token | Value | ⚠️ Common Mistake |
|----------------|----------------|-------|-------------------|
| `--surface/contrast` | `$bpk-surface-contrast-day` | #05203C (deep blue) | ❌ NOT `$bpk-canvas-contrast-day` (which is #EFF3F8 light gray) |
| `--core/accent` | `$bpk-core-accent-day` | #0062E3 (accent blue) | ✓ Correct mapping |
| `--surface/tint` | `$bpk-surface-tint-day` | rgba(255,255,255,0.1) | ✓ Correct mapping |

**Recommended Implementation Workflow**:
1. Use Figma MCP tool `get_design_context` to extract actual design tokens from Figma
2. Cross-reference Figma variables with `@skyscanner/bpk-foundations-web/tokens/base.default.scss`
3. Verify color values match before implementation
4. Do NOT assume token names based on Figma layer naming alone

### Typography Implementation Notes

**Line Height Mismatch**: The standard Backpack mixin `bpk-label-1()` uses `$bpk-line-height-base` (1.5rem), which does NOT match Figma's Heading 5 specification (125% = 1.25). Therefore:

- ❌ **Do NOT use** `@include typography.bpk-label-1()` for label and price text
- ✅ **Instead**, declare typography properties explicitly:
  ```scss
  font-size: tokens.$bpk-font-size-base; // 1rem
  line-height: 1.25; // 125% per Figma Heading 5
  font-weight: tokens.$bpk-font-weight-bold; // 700
  ```

**Text Centering Requirements**: Three CSS properties must work together for proper text centering:

1. **Parent container** (`&__text`): `align-items: center` - centers child elements horizontally in flex column
2. **Text elements** (`&__label`, `&__price`): `width: 100%` - provides full width for text-align to work
3. **Text elements**: `text-align: center` - centers text content within the element

Missing any of these three properties will result in left-aligned text.

**onSurfaceContrast Text Color**: Unlike Canvas variants where text color changes only in Selected state, the `onSurfaceContrast` variant MUST apply `color: $bpk-text-on-dark-day` to text in ALL states (Default, Hover, Selected) because it is designed for dark backgrounds. This should be declared at the variant level:

```scss
&--on-surface-contrast {
  .bpk-checkbox-card__label,
  .bpk-checkbox-card__price {
    color: tokens.$bpk-text-on-dark-day; // White text for all states
  }
}
```

### Layout Primitive Implementation

**Stack Primitive** (vertical layout):
```scss
.bpk-checkbox-card__stack {
  display: flex;
  flex-direction: column;

  &--space-sm {
    gap: tokens.bpk-spacing-sm();
  }

  &--space-md {
    gap: tokens.bpk-spacing-md();
  }

  &--space-lg {
    gap: tokens.bpk-spacing-lg();
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }
}
```

**Inline Primitive** (horizontal layout):
```scss
.bpk-checkbox-card__inline {
  display: flex;
  flex-direction: row;

  &--space-sm {
    gap: tokens.bpk-spacing-sm();
  }

  &--space-md {
    gap: tokens.bpk-spacing-md();
  }

  &--space-lg {
    gap: tokens.bpk-spacing-lg();
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }
}
```

**Custom Sizing**:
Width and height props should support multiple value types:
- String CSS values: "200px", "100%", "auto", "fit-content"
- Numeric values: interpreted as pixels (e.g., 200 → "200px")
- Applied via inline styles for maximum flexibility

```scss
// Default fixed sizing for vertical layout
&--layout-vertical {
  width: calc(tokens.$bpk-one-pixel-rem * 100);
  height: calc(tokens.$bpk-one-pixel-rem * 110);
}

// Auto sizing for horizontal/custom layouts
&--layout-horizontal,
&--layout-custom {
  width: auto;
  height: auto;
}
```

## Bug Fixes & Improvements

### Text Overflow Fix (2026-01-29)

**Issue**: WithDescription and LongText examples showed text content overflowing outside the card container.

**Root Cause**:
- `&__text` wrapper had `flex-shrink: 0`, preventing it from shrinking to fit the container
- `&__description` lacked `width: 100%` and `text-align: center` properties

**Fix Applied** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

```scss
// Text wrapper - Allow shrinking and full width
&__text {
  flex-shrink: 1;        // Changed from 0 to 1
  min-width: 0;
  width: 100%;           // Added - ensures full width
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: tokens.bpk-spacing-sm();
  margin-top: tokens.bpk-spacing-md();
}

// Description text - Center alignment and full width
&__description {
  @include typography.bpk-text();

  color: tokens.$bpk-text-secondary-day;
  text-align: center;    // Added - centers text
  width: 100%;           // Added - ensures full width
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Result**:
- ✅ Label text correctly truncates to 2 lines with ellipsis
- ✅ Description text correctly truncates to 3 lines with ellipsis
- ✅ All text content properly contained within card boundaries
- ✅ Text remains center-aligned as per Figma design

### Storybook Examples Cleanup (2026-01-29)

**Change**: Removed WithContextExample story as it was redundant with existing variant examples.

**Files Modified**:
- [stories.tsx](../../examples/bpk-component-checkbox-card/stories.tsx) - Removed import and export
- [examples.tsx](../../examples/bpk-component-checkbox-card/examples.tsx) - Removed entire example function (~60 lines)

**Reason**: The WithContext example duplicated functionality already demonstrated by OnCanvasDefault, OnCanvasContrast, and OnSurfaceContrast stories.

### Variant Border and Hover State Correction (2026-01-29)

**Issue**: Initial implementation had reversed border behavior between onCanvasDefault and onCanvasContrast variants.

**Root Cause**: Misunderstanding of variant semantics during initial implementation.

**Fix Applied** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

```scss
// onCanvasDefault - For white/default backgrounds
&--on-canvas-default {
  border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // ✅ Has border by default
  background-color: tokens.$bpk-canvas-day;

  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // Border stays
      background-color: tokens.$bpk-surface-low-contrast-day; // ✅ Background changes to light grey
    }
  }
}

// onCanvasContrast - For colored/contrast backgrounds
&--on-canvas-contrast {
  border: none; // ✅ No border by default
  background-color: tokens.$bpk-canvas-contrast-day;

  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // ✅ Border appears on hover
      background-color: tokens.$bpk-canvas-contrast-day; // Background stays same
    }
  }
}
```

**Result**:
- ✅ onCanvasDefault: Default has border, hover changes background to light grey
- ✅ onCanvasContrast: Default has no border, hover adds border
- ✅ Correct visual distinction between variants
- ✅ Matches Figma design specification

### Shadow Removal from Hover States (2026-01-29)

**Issue**: All hover states displayed shadows inherited from the `bpk-card` mixin, but checkbox cards should not have shadows.

**Root Cause**: The `bpk-card` mixin includes default shadow (`bpk-box-shadow-sm`) and animated hover shadow via `::after` pseudo-element (`bpk-box-shadow-lg`).

**Fix Applied** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

```scss
.bpk-checkbox-card {
  // Override bpk-card mixin shadows - checkbox cards should not have shadows
  box-shadow: none;
  cursor: pointer;
  box-sizing: border-box;

  // Base card styling
  @include cards.bpk-card;

  // Override the pseudo-element shadow that bpk-card mixin adds for hover effect
  &::after {
    display: none; // Completely hide the shadow pseudo-element
  }
}
```

**Result**:
- ✅ All hover states have no shadow
- ✅ Clean visual appearance matching Figma design
- ✅ Overrides inherited mixin defaults correctly

### Example Function Naming Correction (2026-01-29)

**Issue**: Example function names did not match the actual variant names being demonstrated:
- `WithBackgroundVariant` displayed `onCanvasDefault` variant
- `NoBackgroundVariant` displayed `onCanvasContrast` variant

**Fix Applied**:
- [examples.tsx](../../examples/bpk-component-checkbox-card/examples.tsx) - Renamed functions:
  - `WithBackgroundVariant` → `OnCanvasDefaultVariant`
  - `NoBackgroundVariant` → `OnCanvasContrastVariant`
- [stories.tsx](../../examples/bpk-component-checkbox-card/stories.tsx) - Updated imports and exports to use new names

**Result**:
- ✅ Function names match variant names for clarity
- ✅ No confusion between descriptive names and actual variant values
- ✅ Storybook story names remain unchanged (OnCanvasDefault, OnCanvasContrast)

### Background Color Token Correction (2026-01-29)

**Issue**: Both onCanvasDefault and onCanvasContrast variants incorrectly used `$bpk-surface-default-day` token.

**Root Cause**: Used Surface tokens instead of Canvas tokens. While both resolve to white (#FFFFFF) for onCanvasDefault, they have different semantic meanings and onCanvasContrast requires a distinct color.

**Fix Applied** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

```scss
// onCanvasDefault - Use Canvas/Default token
&--on-canvas-default {
  background-color: tokens.$bpk-canvas-day; // #FFFFFF
  // Previously: tokens.$bpk-surface-default-day
}

// onCanvasContrast - Use Canvas/Contrast token
&--on-canvas-contrast {
  background-color: tokens.$bpk-canvas-contrast-day; // #EFF3F8 (light grey)
  // Previously: tokens.$bpk-surface-default-day
}
```

**Token Distinction**:
- **Canvas tokens** (`$bpk-canvas-day`, `$bpk-canvas-contrast-day`): Used for page/canvas backgrounds
- **Surface tokens** (`$bpk-surface-default-day`, `$bpk-surface-low-contrast-day`): Used for elevated surfaces

**Result**:
- ✅ onCanvasDefault uses correct Canvas/Default token (#FFFFFF)
- ✅ onCanvasContrast uses correct Canvas/Contrast token (#EFF3F8)
- ✅ Clear visual distinction between variants
- ✅ Matches Figma design specification token naming

## Open Questions

All questions have been resolved through implementation and Figma analysis:

- ✅ Content precedence (icon vs image): Both can coexist, rendered side by side
- ✅ Theming requirement: Uses standard design tokens, no custom theming needed
- ✅ Price composition pattern: Supports both BpkPrice component and formatted strings
- ✅ Selection indicator: Uses background color change per Figma specification
- ✅ Visual variants: Three variants confirmed (onCanvasDefault, onCanvasContrast, onSurfaceContrast)
- ✅ Border radius: Two options confirmed (square: 0px, rounded: 8px)

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory (versioning-rules.md, modern-sass-api.md, accessibility-tests.md)
- **Component Examples**: `bpk-component-checkbox`, `bpk-component-radio`, `bpk-component-card`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Figma Design**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev
- **Chakra UI Reference**: https://chakra-ui.com/docs/components/checkbox-card
