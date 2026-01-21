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

# Component Specification: BpkCheckbox (Ark UI Rebase)

**Package Branch**: `001-checkbox-ark-ui`
**Created**: 2026-01-21
**Status**: Draft
**Input**: User description: "BpkCheckbox needs to be rebuilt on top of the Ark UI Checkbox primitive to align with our strategy of adopting Ark UI as the foundation for all new and modernised Backpack components. This rebase will make the component fully composable, improve accessibility and consistency, and enable future extensibility. In addition, the component must support runtime theming, following the same approach used by BpkButton, where background and foreground colours are supplied via BpkThemeProvider."

## Clarifications

### Session 2026-01-21

- Q: How should we structure the component exports to maintain backward compatibility while adding composable API? → A: Single component with optional composition - `<BpkCheckbox>` accepts both old props (label, onChange) and children (composable sub-components), automatically adapting behavior
- Q: What existing BpkCheckbox props must be preserved for backward compatibility? → A: Must preserve all current props exactly: name (required), label, required, disabled, white, className, smallLabel, valid, indeterminate, and all native input props
- Q: How should theming work with BpkThemeProvider? → A: Follow existing BpkThemeProvider pattern (do not modify BpkThemeProvider code) - use themeAttributes array defining CSS custom property names, BpkThemeProvider converts theme object to --bpk-* CSS variables
- Q: Should theming include hover/active states or stay minimal? → A: Progressive enhancement - start with minimal (preserve existing checkboxCheckedColor only), document as extensible for future MINOR version additions

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component will be in `packages/bpk-component-checkbox/`
- [x] **Naming Conventions**: Component name follows PascalCase (BpkCheckbox)
- [x] **License Headers**: All source files (.ts, .tsx, .js, .jsx, .scss, .css) will include Apache 2.0 license header
- [x] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Will include `accessibility-test.tsx`
- [x] **TypeScript**: Will be written in TypeScript with proper types
- [x] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [x] **Versioning**: MINOR version bump (backward-compatible - adds composable API while preserving existing API)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Checkbox Selection (Priority: P1)

Developers need to render a simple checkbox with a label that users can check/uncheck. This is the most fundamental use case for any checkbox implementation.

**Why this priority**: This is the minimum viable checkbox - without this, the component cannot function. Every other feature depends on this core functionality.

**Independent Test**: Can be fully tested by rendering the component with minimal props (checked state and onChange handler) and verifying that clicking toggles the state and triggers the callback.

**Acceptance Scenarios**:

1. **Given** a checkbox is rendered in an unchecked state, **When** a user clicks the checkbox, **Then** the checkbox becomes visually checked and the onChange callback is invoked with checked=true
2. **Given** a checkbox is rendered in a checked state, **When** a user clicks the checkbox, **Then** the checkbox becomes visually unchecked and the onChange callback is invoked with checked=false
3. **Given** a checkbox with a label is rendered, **When** a user clicks the label text, **Then** the checkbox state toggles and the onChange callback is invoked
4. **Given** a checkbox is rendered, **When** a user presses the Space key while focused, **Then** the checkbox state toggles

---

### User Story 2 - Composable Layout Support (Priority: P2)

Developers need to customize checkbox layouts beyond simple label placement. They may want to add descriptions, helper text, icons, or arrange elements in different configurations for different product contexts.

**Why this priority**: This is the key differentiator of the Ark UI rebase. Composability enables teams to build custom layouts without forking the component or using hacky workarounds.

**Independent Test**: Can be tested independently by rendering different compositions (e.g., Root + Control + Label, Root + Control + custom description element) and verifying all elements render and are properly associated via ARIA attributes.

**Acceptance Scenarios**:

1. **Given** a developer uses composable API (Root, Control, Label, HiddenInput), **When** they render these sub-components, **Then** all elements render with proper ARIA associations and IDs
2. **Given** a developer adds custom elements (description, icons) inside Root, **When** the checkbox is rendered, **Then** custom elements appear in the layout without breaking checkbox functionality
3. **Given** a developer uses only Root and Control (no Label), **When** the checkbox is rendered, **Then** the checkbox still functions correctly and maintains accessibility via aria-label
4. **Given** a developer nests complex content within Label, **When** the label is clicked, **Then** the checkbox state toggles correctly

---

### User Story 3 - Runtime Theming Support (Priority: P2)

Product teams need to style checkboxes dynamically across different brands, themes, and contexts without recompiling styles. Theming must follow the same pattern as BpkButton using BpkThemeProvider.

**Why this priority**: Runtime theming is a strategic requirement for Backpack components to support multiple brands and dynamic theme switching. This enables consistent theming patterns across all Backpack components.

**Independent Test**: Can be tested by wrapping the checkbox in BpkThemeProvider with different theme values and verifying the checkbox applies the provided colors to its background and foreground elements.

**Acceptance Scenarios**:

1. **Given** a checkbox is wrapped in BpkThemeProvider with custom colors, **When** the checkbox is rendered, **Then** it displays with the provided theme colors (background, foreground, border)
2. **Given** a checkbox is rendered without BpkThemeProvider, **When** the checkbox is rendered, **Then** it displays with default Backpack design tokens
3. **Given** multiple checkboxes are wrapped in different BpkThemeProvider instances, **When** all are rendered, **Then** each checkbox displays with its respective theme colors
4. **Given** theme colors change dynamically (light/dark mode switch), **When** the theme provider updates, **Then** the checkbox updates its colors without remounting

---

### User Story 4 - Disabled and Indeterminate States (Priority: P2)

Developers need to render checkboxes in disabled state (user cannot interact) and indeterminate state (partial selection, common in tree views with nested checkboxes).

**Why this priority**: These are standard checkbox states required for complete form control functionality. Disabled state is essential for form validation, and indeterminate is critical for hierarchical selection patterns.

**Independent Test**: Can be tested by rendering checkboxes with disabled and indeterminate props and verifying visual states, ARIA attributes, and interaction blocking.

**Acceptance Scenarios**:

1. **Given** a checkbox with disabled=true is rendered, **When** a user attempts to click, **Then** no state change occurs and the checkbox displays disabled styling
2. **Given** a disabled checkbox is rendered, **When** keyboard focus reaches it, **Then** the checkbox is not focusable via keyboard navigation
3. **Given** a checkbox with indeterminate=true is rendered, **When** the checkbox is displayed, **Then** it shows an indeterminate visual indicator (typically a dash/minus symbol)
4. **Given** an indeterminate checkbox is clicked, **When** the click occurs, **Then** the checkbox transitions to checked state (not unchecked)

---

### User Story 5 - Validation and Error States (Priority: P3)

Developers need to display validation feedback (error messages, invalid state styling) when checkbox selection fails validation rules (e.g., "You must accept terms and conditions").

**Why this priority**: While important for forms, validation can be implemented after core functionality is stable. Many validation scenarios can be handled at the form level rather than the checkbox level.

**Independent Test**: Can be tested by rendering checkboxes with invalid prop and error message, and verifying ARIA error associations and visual error styling.

**Acceptance Scenarios**:

1. **Given** a checkbox with invalid=true is rendered, **When** displayed, **Then** the checkbox shows error styling and has aria-invalid="true"
2. **Given** a checkbox with an error message is rendered, **When** displayed, **Then** the error message is associated via aria-describedby
3. **Given** an invalid checkbox is corrected by the user, **When** the checkbox state changes to valid, **Then** error styling and ARIA attributes are removed

---

### User Story 6 - RTL and Internationalization (Priority: P2)

Developers need checkboxes to render correctly in right-to-left (RTL) languages and support all Skyscanner locales without layout issues.

**Why this priority**: RTL support is a constitutional requirement for all Backpack components. Skyscanner operates globally and must support RTL languages like Arabic and Hebrew.

**Independent Test**: Can be tested by rendering checkboxes in an RTL context (dir="rtl") and verifying label/control positioning, focus indicators, and visual states mirror correctly.

**Acceptance Scenarios**:

1. **Given** a checkbox is rendered in an RTL context (dir="rtl"), **When** displayed, **Then** the checkbox control appears on the right side and label on the left
2. **Given** a checkbox in RTL context receives focus, **When** the focus ring appears, **Then** it displays in the correct position relative to the mirrored layout
3. **Given** custom composed elements are added in RTL context, **When** rendered, **Then** all elements flow correctly in RTL direction

---

### Edge Cases

- What happens when checked prop is not provided (uncontrolled mode)?
- How does the component handle rapidly repeated clicks (debouncing/throttling)?
- What happens when onChange handler is not provided?
- How does the component behave when label text is extremely long (200+ characters)?
- What happens when the checkbox is rendered inside a flexbox/grid with constrained dimensions?
- How does the component handle nested interactive elements inside the label (links, buttons)?
- What happens when BpkThemeProvider provides invalid color values (null, undefined, malformed CSS)?
- How does the component behave when multiple BpkThemeProviders are nested?
- What happens on touch devices with minimum 44px touch target requirements?
- How does the component handle accessibility attributes conflicts (developer-provided aria-label vs. Label component)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST use Ark UI Checkbox primitive as the foundation (Root, Control, Label, HiddenInput)
- **FR-002**: Component MUST support both legacy props API (label, onChange) and composable children API, automatically detecting which mode to use based on provided props
- **FR-021**: Component MUST maintain 100% backward compatibility with existing BpkCheckbox usage (same props, same behavior, same visual output)
- **FR-022**: Component MUST accept a `label` prop (string) for simple use cases, rendering it internally without requiring composable children
- **FR-003**: Component MUST support controlled mode (checked prop with onChange handler)
- **FR-004**: Component MUST support uncontrolled mode (defaultChecked prop without checked)
- **FR-005**: Component MUST trigger onChange callback with current checked state when toggled
- **FR-006**: Component MUST support disabled state that prevents all interactions
- **FR-007**: Component MUST support indeterminate state with visual indicator
- **FR-008**: Component MUST support validation state (invalid prop) with appropriate ARIA attributes
- **FR-009**: Component MUST integrate with BpkThemeProvider using themeAttributes array pattern (not modify BpkThemeProvider)
- **FR-010**: Component MUST apply theme colors via CSS custom properties generated by BpkThemeProvider
- **FR-011**: Component MUST preserve existing checkboxCheckedColor theme attribute for backward compatibility
- **FR-023**: Component MAY support additional theme attributes in future MINOR versions (hover, active, border colors) without breaking existing themes
- **FR-012**: Component MUST maintain visual consistency with current BpkCheckbox when no theme is applied
- **FR-013**: Component MUST support keyboard navigation (Tab to focus, Space to toggle)
- **FR-014**: Component MUST support clicking label text to toggle checkbox state
- **FR-015**: Component MUST generate unique IDs for proper label-input association
- **FR-016**: Component MUST allow developers to provide custom IDs if needed
- **FR-017**: Component MUST support RTL languages with mirrored layout
- **FR-018**: Component MUST expose all relevant Ark UI checkbox props (name, value, required, form, etc.)
- **FR-019**: Component MUST support ref forwarding to the underlying input element
- **FR-020**: Component MUST work with form submission (native HTML form behavior)

### Component API *(include props/types)*

**BpkCheckbox Props (Backward-Compatible API)**:

**Required Props**:
- **`name`** (string, required): Form input name attribute
- **`label`** (ReactNode, required when not using composable children): Label text or content for simple usage

**Optional Props (Existing API)**:
- **`checked`** (boolean, optional): Controlled checked state
- **`defaultChecked`** (boolean, optional): Initial checked state for uncontrolled mode
- **`required`** (boolean, optional, default: false): Whether checkbox is required (shows asterisk when true)
- **`disabled`** (boolean, optional, default: false): Whether checkbox is disabled
- **`white`** (boolean, optional, default: false): Whether to render white variant (for dark backgrounds)
- **`className`** (string | null, optional): Additional CSS class for the root element
- **`smallLabel`** (boolean, optional, default: false): Whether to render label with small text style
- **`valid`** (boolean | null, optional): Validation state - false shows invalid styling, null is neutral, true is valid
- **`indeterminate`** (boolean, optional, default: false): Whether checkbox shows indeterminate state (visual only, does not affect checked state)
- **`...rest`** (InputHTMLAttributes<HTMLInputElement>): All native HTML input attributes (onChange, onBlur, onFocus, value, id, etc.) except `type` and `className`

**New Composable Props**:
- **`children`** (ReactNode, optional): Composable child elements (Control, Label, Indicator, HiddenInput, and custom elements) - when provided, `label` prop is not used
- **`onCheckedChange`** (function, optional): Alternative callback signature `(details: { checked: boolean }) => void` - can be used alongside or instead of onChange

**BpkCheckbox.Root Props (Explicit Composable API)**:

- Same as BpkCheckbox props above (BpkCheckbox.Root is the explicit composable entry point)
- When using BpkCheckbox.Root, `children` are required and `label` prop should not be used

**BpkCheckbox.Control Props**:

- **`className`** (string, optional): Additional CSS class for the control element
- **`children`** (ReactNode, optional): Custom content to render inside the control (e.g., custom checkmark icon)

**BpkCheckbox.Label Props**:

- **`className`** (string, optional): Additional CSS class for the label element
- **`children`** (ReactNode, required): Label text or content

**BpkCheckbox.HiddenInput Props**:

- Inherits standard HTML input attributes
- Typically used for form integration and accessibility

**BpkCheckbox.Indicator Props**:

- **`className`** (string, optional): Additional CSS class for the indicator element
- Renders the checkmark icon when checked or indeterminate dash when indeterminate

**Example TypeScript Types**:
```typescript
// Current BpkCheckbox API (must match exactly)
type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

type BpkCheckboxSimpleProps = Omit<NativeInputProps, 'type' | 'className'> & {
  name: string;
  label: ReactNode;
  required?: boolean;
  disabled?: boolean;
  white?: boolean;
  className?: string | null;
  smallLabel?: boolean;
  valid?: boolean | null;
  indeterminate?: boolean;
};

// New composable extension
type BpkCheckboxComposableProps = Omit<NativeInputProps, 'type' | 'className'> & {
  name: string;
  required?: boolean;
  disabled?: boolean;
  white?: boolean;
  className?: string | null;
  smallLabel?: boolean;
  valid?: boolean | null;
  indeterminate?: boolean;
  children: ReactNode;
  onCheckedChange?: (details: { checked: boolean }) => void;
};

type BpkCheckboxProps = BpkCheckboxSimpleProps | BpkCheckboxComposableProps;

type BpkCheckboxControlProps = {
  className?: string;
  children?: ReactNode;
};

type BpkCheckboxLabelProps = {
  className?: string;
  children: ReactNode;
};

type BpkCheckboxIndicatorProps = {
  className?: string;
};
```

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (Tab to focus, Space to toggle, Shift+Tab to reverse)
- **NFR-002**: Component MUST work with screen readers with proper ARIA attributes (role, aria-checked, aria-disabled, aria-invalid, aria-describedby)
- **NFR-003**: Component MUST support RTL languages with mirrored layout
- **NFR-004**: Component MUST meet WCAG 2.2 AA standards for accessibility
- **NFR-005**: Component MUST render correctly in all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- **NFR-006**: Component MUST use `rem` units for all sizing (not `px` or `em`)
- **NFR-007**: Component MUST have minimum 44x44 pixel touch target on mobile devices
- **NFR-008**: Component MUST maintain 4.5:1 color contrast ratio for text and 3:1 for UI components (WCAG AA)
- **NFR-009**: Component MUST render correctly at 200% text zoom and 400% page zoom
- **NFR-010**: Component MUST not have performance regressions compared to current BpkCheckbox
- **NFR-011**: Component MUST pass all linting checks with zero warnings or errors at build/lint stage

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules
- **STY-004**: All spacing MUST use design tokens (e.g., `tokens.bpk-spacing-md()`)
- **STY-005**: All colors MUST use design tokens (e.g., `tokens.$bpk-color-white`)
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-checkbox--disabled`)
- **STY-007**: Component MUST support theming via existing `bpk-theming` package and BpkThemeProvider
- **STY-008**: Component MUST export themeAttributes array listing CSS custom property names (following BpkButton pattern)
- **STY-009**: Component MUST consume theme via CSS custom properties (`var(--bpk-checkbox-checked-color)` pattern)
- **STY-010**: Theme attributes MUST follow naming convention: camelCase in themeAttributes array, converts to --bpk-kebab-case CSS variables
- **STY-011**: Checkbox control MUST have visible focus indicator (outline) meeting 3:1 contrast ratio
- **STY-012**: Disabled state MUST use visual indicators (opacity, cursor) without relying solely on color
- **STY-013**: Indeterminate state MUST have distinct visual indicator (dash/minus symbol)
- **STY-014**: All interactive states (hover, focus, active) MUST have clear visual feedback

**Example theming structure**:
```typescript
// themeAttributes.ts - exported for consumers
export default [
  'checkboxCheckedColor',  // Existing attribute - must preserve for backward compatibility
  // Future extensibility (can be added in MINOR versions):
  // 'checkboxHoverColor',
  // 'checkboxActiveColor',
  // 'checkboxBackgroundColor',
  // 'checkboxBorderColor',
];

// Usage in SCSS with CSS custom properties
.bpk-checkbox__input:checked {
  background-color: var(--bpk-checkbox-checked-color, tokens.$bpk-color-core-accent);
}

// Future: Interactive states can use default tokens initially
.bpk-checkbox__input:hover {
  // Uses default Backpack hover tokens
  // Future MINOR version could add: var(--bpk-checkbox-hover-color, fallback)
}
```

**BpkThemeProvider Integration Pattern**:
```tsx
// Consumer usage
import BpkThemeProvider from 'bpk-theming';
import BpkCheckbox, { themeAttributes } from 'bpk-component-checkbox';

const myTheme = {
  checkboxCheckedColor: '#ff0000',
};

<BpkThemeProvider theme={myTheme} themeAttributes={themeAttributes}>
  <BpkCheckbox name="terms" label="Accept terms" />
</BpkThemeProvider>
```

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop combinations in all supported browsers
- **SC-002**: All accessibility tests pass with jest-axe (no violations)
- **SC-003**: Component meets WCAG 2.2 Level AA standards verified by manual testing
- **SC-004**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-005**: TypeScript compiles without errors or warnings
- **SC-006**: Storybook stories demonstrate all variants, states, and compositions
- **SC-007**: README documentation is complete with composable API usage examples
- **SC-008**: Component works with keyboard-only navigation (no mouse required)
- **SC-009**: Component works with screen readers (VoiceOver, NVDA, JAWS)
- **SC-010**: Component supports RTL languages without visual or functional issues
- **SC-011**: Component applies theme colors correctly when wrapped in BpkThemeProvider
- **SC-012**: Component falls back to default tokens when no theme is provided
- **SC-013**: Component maintains visual consistency with current BpkCheckbox for default styling
- **SC-014**: All visual states (default, hover, focus, active, disabled, checked, unchecked, indeterminate, invalid) render correctly
- **SC-015**: Component works correctly in forms (native form submission, validation)
- **SC-016**: Touch targets meet 44x44 pixel minimum on mobile devices
- **SC-017**: All code passes linting checks with zero warnings or errors
- **SC-018**: Existing BpkCheckbox usage patterns continue to work without code changes (100% backward compatibility verified by existing test suites)

## Design & Visual Specifications

**Figma**: [To be linked - existing BpkCheckbox designs]

**Visual States to implement**:
- Default/Rest state (unchecked)
- Checked state (with checkmark icon)
- Indeterminate state (with dash/minus icon)
- Hover state (unchecked and checked)
- Focus state (keyboard navigation focus ring)
- Active/Pressed state (during click)
- Disabled state (unchecked and checked)
- Invalid/Error state (unchecked and checked)

**Interaction States**:
- Keyboard focus (visible outline, 3:1 contrast)
- Mouse hover (subtle background change)
- Click/Touch (active state feedback)
- Space key press (toggle animation)

**Responsive behavior**:
- Mobile (<= 768px): Minimum 44x44px touch target, larger tap area
- Tablet (769px - 1023px): Standard checkbox size (20x20px control), comfortable spacing
- Desktop (>= 1024px): Standard checkbox size, hover states enabled

**Color Theming**:
- Default: Use Backpack design tokens (bpk-color-core-accent, bpk-color-white, etc.)
- Themed: Apply colors from BpkThemeProvider (checkboxCheckedBackgroundColor, checkboxCheckedColor, etc.)
- States must respect theme colors while maintaining accessibility contrast ratios

## Dependencies & Related Components

**Internal Dependencies** (other Backpack components):
- Uses `@skyscanner/bpk-foundations-web` for design tokens
- Uses `bpk-mixins` for Sass utilities (tokens, typography, shadows)
- Uses `bpk-theming` package for runtime theme support
- Follows patterns established by `bpk-component-button` for theming

**External Dependencies** (npm packages):
- `@ark-ui/react` - Ark UI primitives for checkbox functionality
- React 18.3.1 (peer dependency)

**Design Token Dependencies**:
- Color tokens: `bpk-color-core-accent`, `bpk-color-white`, `bpk-color-text-disabled`, `bpk-color-status-danger-fill`
- Spacing tokens: `bpk-spacing-xs`, `bpk-spacing-sm`, `bpk-spacing-md`
- Border radius tokens: `bpk-border-radius-sm`
- Shadow tokens: `bpk-box-shadow-sm` (for focus)

## Testing Strategy

### Unit Tests (`BpkCheckbox-test.tsx`)
- Test all prop combinations (checked, disabled, indeterminate, invalid, required)
- Test controlled mode (checked + onCheckedChange)
- Test uncontrolled mode (defaultChecked)
- Test event handlers (onCheckedChange called with correct arguments)
- Test keyboard interactions (Space toggles, Tab focuses)
- Test label click toggles checkbox
- Test disabled state prevents interactions
- Test indeterminate state visual and behavior
- Test form integration (name, value attributes)
- Test ref forwarding to input element
- Test ID generation and custom IDs
- Test edge cases (missing props, null values, extremely long labels)
- Snapshot tests for each visual state

### Accessibility Tests (`accessibility-test.tsx`)
- Use jest-axe for automated WCAG checks
- Test keyboard navigation (Tab, Space, Shift+Tab)
- Test screen reader support (aria-checked, aria-disabled, aria-invalid, aria-describedby)
- Test ARIA attributes in all states
- Test focus management (visible focus, focus order)
- Test label association (for/id or aria-labelledby)
- Test required field indication (aria-required)
- Test error message association (aria-describedby with error ID)
- Test minimum touch target size (44x44px)

### Theming Tests (`themeAttributes-test.ts`)
- Test theme attributes are applied correctly
- Test default values when no theme provided
- Test theme color CSS custom properties are set
- Test theme changes trigger style updates

### Visual Regression Tests (Percy via Storybook)
- Test all visual variants (unchecked, checked, indeterminate)
- Test all interactive states (default, hover, focus, active, disabled, invalid)
- Test RTL layout
- Test themed vs. default styling
- Test responsive breakpoints
- Test long label text wrapping
- Test compositions (with descriptions, icons, custom elements)

## Documentation Requirements

### README.md
- Component description (<100 words, British English prose)
- Usage examples showing both APIs:
  - Simple API (legacy): `<BpkCheckbox label="..." checked={...} onChange={...} />`
  - Composable API: Using children with Control, Label, Indicator sub-components
  - Checkbox with description/helper text (composable only)
  - Checkbox with icon (composable only)
  - Themed checkbox
  - Indeterminate checkbox
  - Form integration example
- Props table with descriptions for main component and all sub-components
- Note explaining automatic API detection based on props
- Theming guide with BpkThemeProvider example
- Browser support information
- Link to Storybook

### Storybook (`examples/bpk-component-checkbox/stories.tsx`)
- Default story showing simple API usage (with label prop)
- Story demonstrating composable API usage (with children)
- Story for checked state
- Story for unchecked state
- Story for indeterminate state
- Story for disabled state (checked and unchecked)
- Story for invalid/error state
- Story for required field
- Story for long label text
- Story for RTL layout
- Story for themed checkbox (with BpkThemeProvider)
- Story for composable layouts (with descriptions, icons, custom elements)
- Story for form integration
- Story comparing simple vs composable API side-by-side
- Add a11y addon for accessibility checks

### JSDoc/TSDoc Comments
- Component description for each sub-component (Root, Control, Label, HiddenInput, Indicator)
- All props documented with type and description
- Examples in JSDoc showing composable usage patterns
- `@deprecated` tags for any props migrating from old API

### Figma Code Connect (`.figma.tsx`)
- Connect BpkCheckbox to Figma checkbox designs
- Map props to Figma properties (checked, disabled, indeterminate)
- Provide usage examples matching Figma variants

## Migration & Versioning

**Version Type**: MINOR

**Rationale**: This is a backward-compatible enhancement according to `decisions/versioning-rules.md`. The component adds new functionality (composable API, runtime theming) while maintaining 100% compatibility with existing usage patterns. All current BpkCheckbox implementations will continue to work without modification.

**New Features (Non-Breaking)**:
- Added composable API using children (Control, Label, Indicator sub-components)
- Added runtime theming support via BpkThemeProvider
- Added support for both `onChange` (legacy) and `onCheckedChange` (new) callbacks
- Internal implementation migrated to Ark UI primitives (implementation detail, not breaking)

**Backward Compatibility**:
- Existing prop API unchanged (`label`, `checked`, `onChange`, `disabled`, etc.)
- Existing visual styling unchanged (default tokens produce identical output)
- Existing behavior unchanged (same event handling, same accessibility, same form integration)
- No migration required for consumers

**Usage Patterns**:

**Pattern 1: Existing/Legacy API (still fully supported)**:
```tsx
<BpkCheckbox
  id="terms"
  name="terms"
  label="I accept the terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

**Pattern 2: New Composable API (opt-in for advanced use cases)**:
```tsx
<BpkCheckbox
  id="terms"
  name="terms"
  checked={accepted}
  onCheckedChange={({ checked }) => setAccepted(checked)}
>
  <BpkCheckbox.Control>
    <BpkCheckbox.Indicator />
  </BpkCheckbox.Control>
  <BpkCheckbox.Label>I accept the terms and conditions</BpkCheckbox.Label>
  <BpkCheckbox.HiddenInput />
</BpkCheckbox>
```

**Deprecations**:
- None - both APIs are fully supported

**Future API**:
- New composable API is recommended for advanced layouts but optional
- Component can continue to evolve with new sub-components in future MINOR versions
- No breaking changes planned

## Implementation Notes

**File Structure** (per constitution):
```
packages/bpk-component-checkbox/
├── README.md
├── index.ts                                    # exports default from src/
├── docs/                                       # screenshots, design assets
└── src/
    ├── BpkCheckbox/
    │   ├── BpkCheckbox.tsx                     # Main component with sub-components
    │   ├── BpkCheckboxRoot.tsx                 # Root wrapper component
    │   ├── BpkCheckboxControl.tsx              # Control/box component
    │   ├── BpkCheckboxLabel.tsx                # Label component
    │   ├── BpkCheckboxIndicator.tsx            # Checkmark/dash indicator
    │   ├── BpkCheckboxHiddenInput.tsx          # Hidden input for forms
    │   ├── BpkCheckbox.module.scss             # Styles for all sub-components
    │   ├── BpkCheckbox-test.tsx                # Unit tests
    │   ├── accessibility-test.tsx              # Accessibility tests
    │   ├── BpkCheckbox.figma.tsx               # Figma Code Connect
    │   ├── common-types.ts                     # Shared TypeScript types
    │   └── __snapshots__/                      # Jest snapshots
    └── themeAttributes.ts                      # Theme attribute definitions
```

**Key Implementation Principles**:
1. Use Ark UI Checkbox primitive as foundation (@ark-ui/react)
2. Maintain 100% backward compatibility with existing BpkCheckbox API
3. Support dual API mode: simple (label prop) and composable (children)
4. Follow BpkButton theming pattern for consistency
5. Ensure identical visual output for legacy usage (no style regressions)
6. All styling via CSS Modules with modern Sass (`@use`)
7. Comprehensive accessibility testing with jest-axe
8. Meet constitutional test coverage requirements
9. Support RTL via CSS logical properties where possible
10. Use rem units for all sizing values
11. Maintain form compatibility (native HTML form behavior)

## Open Questions

*All questions resolved during clarification session on 2026-01-21.*

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Ark UI Documentation**: https://ark-ui.com/react/docs/components/checkbox
- **Current BpkCheckbox**: `packages/bpk-component-checkbox/`
- **BpkButton Theming Reference**: `packages/bpk-component-button/src/themeAttributes.ts`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
