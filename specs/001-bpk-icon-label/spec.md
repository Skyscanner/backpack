# Component Specification: BpkIconLabel

**Package Branch**: `001-bpk-icon-label`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "I need to create a new Backpack component based on this Figma https://www.figma.com/design/yN0hFyZlKL0Jwbpi0rEKYT/Backpack-Beta?node-id=21640-6807&t=iyI0AiqLVcStpq9L-0. The component is called BpkIconLabel, used to display an icon with text label and optional link. The component has 6 variants: 2 states (Default, On dark) × 3 types (Body, Label 1, Footnote). React design follows Ark UI/Chakra UI composition pattern, CSS uses Backpack tokens and mixins."

## Clarifications

### Session 2026-01-28

- Q: Should BpkIconLabel support runtime theming via BpkThemeProvider (similar to BpkButton)? → A: Yes, support full BpkThemeProvider theming with background and foreground color customization
- Q: How should composability be implemented? → A: Use Compound Components pattern with subcomponents like BpkIconLabel.Root, BpkIconLabel.Icon, BpkIconLabel.Text
- Q: Which color attributes should be themeable? → A: Full theme support including background color, foreground colors (text/icon), link color, and border color
- Q: Beyond link tab navigation, what other keyboard interactions are needed? → A: Only link focusable
- Q: How should focus and hover states be visualized? → A: Minimal visual feedback - only link text color changes on hover/focus, no additional indicators

### Session 2026-01-29

- Q: How should icon and text colors be coordinated in theming? → A: Icon color should always inherit from text color CSS property (no separate theme attribute)
- Q: How should icon alignment with multi-line text be implemented? → A: Use align-items: flex-start and apply withAlignment HOC to the icon component
- Q: Should link color be unified with text color or remain independently themeable? → A: Link color remains independently themeable but controlled through BpkLink's own theme attributes (linkColor, linkHoverColor, etc.), NOT through iconLabelLinkColor
- Q: How should theme attributes be structured given icon inherits from text? → A: Remove iconColor from theme attributes, remove iconLabelLinkColor (use BpkLink theme instead), keep only textColor, backgroundColor, borderColor
- Q: Should default and on-dark variants share theme attributes or have separate sets? → A: Separate required theme attributes for default and on-dark variants (6 total attributes)
- Q: Requirements confirmation - text default color, theme support, icon color inheritance, and alignment implementation → A: Confirmed: text default color is $bpk-text-primary-day with theme color support; icon always inherits text color; icon uses withAlignment HOC for vertical center alignment with first line of text

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component will be in `packages/bpk-component-icon-label/`
- [x] **Naming Conventions**: Component name follows PascalCase (BpkIconLabel)
- [x] **License Headers**: All source files (.ts, .tsx, .js, .jsx, .scss, .css) will include Apache 2.0 license header
- [x] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Will include `accessibility-test.tsx`
- [x] **TypeScript**: Will be written in TypeScript with proper types
- [x] **Test Coverage**: Will meet 80% branches, 80% functions/lines/statements
- [x] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [x] **Versioning**: Follows SemVer rules (MINOR - new component)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Icon with Text Label (Priority: P1)

Developers need to display an informational icon alongside text content to provide visual context and supplementary information in their applications. This is the core use case for product descriptions, help text, and informational notices.

**Why this priority**: This is the foundation of the component - displaying an icon with text is the primary use case that all other features build upon.

**Independent Test**: Can be fully tested by rendering the component with minimal props (icon and text) and verifying the icon and text appear correctly positioned.

**Acceptance Scenarios**:

1. **Given** a BpkIconLabel component with text and icon props, **When** rendered on the page, **Then** the icon appears to the left of the text with 8px spacing
2. **Given** a BpkIconLabel with type="body", **When** rendered, **Then** text displays at 16px size with regular weight
3. **Given** a BpkIconLabel with type="label-1", **When** rendered, **Then** text displays at 16px size with bold weight
4. **Given** a BpkIconLabel with type="footnote", **When** rendered, **Then** text displays at 14px size with regular weight
5. **Given** a themed BpkIconLabel with custom text color, **When** rendered, **Then** icon color matches text color automatically

---

### User Story 2 - Icon with Text and Link (Priority: P2)

Developers need to add an actionable link after the text label to allow users to navigate to related content or documentation, combining informational text with a call-to-action.

**Why this priority**: Adding link support makes the component more versatile for common UI patterns like "Learn more" or "See details" links.

**Independent Test**: Can be tested by rendering component with link prop and verifying the link renders, is clickable, and has proper styling (underline, correct color).

**Acceptance Scenarios**:

1. **Given** a BpkIconLabel with link prop provided, **When** rendered, **Then** a clickable link appears after the text with underline styling
2. **Given** a BpkIconLabel with link text, **When** user hovers over link, **Then** appropriate hover styles are applied
3. **Given** a BpkIconLabel with link, **When** user clicks the link, **Then** the onClick handler is triggered

---

### User Story 3 - Dark Background Support (Priority: P2)

Developers need to use the component on dark backgrounds, requiring adjusted colors for text and icons to maintain readability and meet accessibility contrast requirements.

**Why this priority**: Supporting dark mode/backgrounds is essential for modern UI design and ensures the component works across all design contexts.

**Independent Test**: Can be tested by rendering component with onDark={true} prop and verifying text/icon colors are light (white) instead of dark.

**Acceptance Scenarios**:

1. **Given** a BpkIconLabel with onDark={true}, **When** rendered, **Then** text color is white
2. **Given** a BpkIconLabel with onDark={true}, **When** rendered, **Then** icon color matches text color (white)
3. **Given** a BpkIconLabel with onDark={true} and link, **When** rendered, **Then** link maintains proper contrast on dark background

---

### User Story 4 - Optional Icon Display (Priority: P3)

Developers may want to display just the text and link without an icon for certain contexts where the icon is not needed or adds visual clutter.

**Why this priority**: Provides flexibility but is not critical to core functionality - developers can achieve similar results with other text components if needed.

**Independent Test**: Can be tested by rendering component with showIcon={false} and verifying no icon is rendered while text/link remain.

**Acceptance Scenarios**:

1. **Given** a BpkIconLabel with showIcon=false, **When** rendered, **Then** only text and link are displayed without icon
2. **Given** a BpkIconLabel with showIcon=false, **When** rendered, **Then** spacing adjusts appropriately without icon gap

---

### Edge Cases

- What happens when text prop is not provided? Component should render empty or show a console warning
- How does component handle extremely long text content? Text should wrap naturally and maintain spacing with icon
- What happens when icon size doesn't match text size? Icon should be 16x16px regardless of text size type
- How does component behave when parent container is too small? Component should wrap text while keeping icon aligned to first line
- What happens on different screen sizes/breakpoints? Component maintains consistent sizing and spacing across all breakpoints
- How does the component handle RTL (right-to-left) languages? Icon position should flip to the right side of text in RTL mode
- What happens if link text is very long? Link text should wrap naturally like normal text

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Component MUST render an icon, text label, and optional link in a horizontal layout
- **FR-002**: Component MUST support three type variants: "body" (16px regular), "label1" (16px bold), "footnote" (14px regular)
- **FR-003**: Component MUST support two color schemes via onDark prop: default (dark text on light background) and on-dark (white text on dark background)
- **FR-004**: Component MUST accept a custom icon prop to display different icons
- **FR-005**: Component MUST render text content passed via children or text prop
- **FR-006**: Component MUST render an optional link after the text with configurable text and onClick handler
- **FR-007**: Component MUST maintain 8px spacing between icon and text, and 4px spacing between text and link
- **FR-008**: Component MUST support RTL languages by flipping icon position
- **FR-009**: Component MUST allow hiding the icon via a showIcon boolean prop
- **FR-010**: Component MUST accept additional className for custom styling
- **FR-011**: Component MUST use Compound Components pattern with subcomponents (Root, Icon, Text) for flexible composition
- **FR-012**: Component MUST support runtime theming via BpkThemeProvider for background and text colors
- **FR-013**: Component MUST allow dynamic styling across brands, themes, and product contexts through theme tokens
- **FR-014**: Subcomponents MUST share context internally while exposing clean external API
- **FR-015**: Component MUST support both compound component usage and simplified single-component usage for convenience
- **FR-016**: Icon color MUST inherit from text color using CSS color inheritance (no separate icon color theme attribute)
- **FR-017**: Icon MUST be wrapped with withAlignment HOC for proper vertical centering with first line of text
- **FR-018**: Text default color MUST be $bpk-text-primary-day with full theming support via BpkThemeProvider
- **FR-019**: Icon MUST maintain same color as text in all contexts (themed and non-themed) through CSS color inheritance

### Component API *(include props/types)*

**Compound Component Structure**:

The component exposes the following subcomponents:
- **BpkIconLabel.Root**: Container component that provides context
- **BpkIconLabel.Icon**: Icon display component
- **BpkIconLabel.Text**: Text label component (can include inline links as children)

**Root Component Props**:
- **`type`** (string, optional, default: "body"): Typography variant - "body", "label1", or "footnote"
- **`onDark`** (boolean, optional, default: false): Whether to use on-dark color scheme for dark backgrounds
- **`className`** (string, optional): Additional CSS class names for the container
- **`children`** (ReactNode, required): Subcomponents (Icon, Text)

**Icon Component Props**:
- **`asChild`** (boolean, optional): Whether to use child as icon element (Ark UI pattern)
- **`children`** (ReactElement, optional): Custom icon element
- **`className`** (string, optional): Additional CSS class names

**Text Component Props**:
- **`children`** (ReactNode, required): Text content to display (can include link elements as children)
- **`className`** (string, optional): Additional CSS class names

**Type Example**:
```typescript
type BpkIconLabelType = 'body' | 'label1' | 'footnote';

type RootProps = {
  type?: BpkIconLabelType;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

type IconProps = {
  asChild?: boolean;
  children?: ReactElement;
  className?: string;
};

type TextProps = {
  children: ReactNode;
  className?: string;
};
```

**Convenience API** (Simplified single-component usage - not implemented in initial version):
```typescript
type BpkIconLabelProps = {
  type?: BpkIconLabelType;
  onDark?: boolean;
  text: string;
  icon?: ReactElement;
  showIcon?: boolean;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
};
```

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (tab navigation to link if present)
- **NFR-002**: Component MUST work with screen readers with proper semantic HTML
- **NFR-003**: Component MUST support RTL languages with automatic icon repositioning
- **NFR-004**: Component MUST meet WCAG 2.2 Level AA color contrast standards for both default and on-dark styles
- **NFR-005**: Component MUST render correctly on all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- **NFR-006**: Component MUST use `rem` units for all sizing (not `px` or `em`)
- **NFR-007**: Icon size MUST be fixed at 16x16px (1rem x 1rem) regardless of type variant
- **NFR-008**: Link hover and focus states MUST only change text color (no additional visual indicators like underline changes or focus rings)
- **NFR-009**: Icon MUST remain vertically centered with first line of text when text wraps to multiple lines (using withAlignment HOC)

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules (tokens, typography, utils)
- **STY-004**: All spacing MUST use design tokens (e.g., `tokens.bpk-spacing-md()` for 8px, `tokens.bpk-spacing-sm()` for 4px)
- **STY-005**: All colors MUST use design tokens (e.g., `tokens.$bpk-text-primary-day`, `tokens.$bpk-text-on-dark`)
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-icon-label`, `bpk-icon-label--on-dark`, `bpk-icon-label__text`)
- **STY-007**: Typography styles MUST use mixins from `bpk-mixins/typography` (e.g., `@include typography.bpk-body-default()`)
- **STY-008**: Component MUST support theming via `bpk-theming` package for dynamic color customization
- **STY-009**: Themeable attributes MUST include: background color, text color, and border color (icon color NOT included as separate attribute - inherits from text color via CSS; link color controlled through BpkLink's own theme attributes)
- **STY-010**: Theme colors MUST be accessed via BpkThemeProvider and applied through CSS custom properties
- **STY-011**: Default theme values MUST fallback to design tokens when no theme is provided
- **STY-012**: Icon MUST use `color: inherit` to automatically match text color, ensuring unified color theming

**Expected SCSS class structure**:
```scss
.bpk-icon-label {
  // Container with flexbox layout

  &--on-dark {
    // Dark background variant colors
  }

  &__icon {
    // Icon wrapper with fixed size
    // Icon uses color: inherit to match text
  }

  &__content {
    // Text and link wrapper
  }

  &__text {
    // Text label styles

    &--body { }
    &--label-1 { }
    &--footnote { }
  }

  &__link {
    // Link styles
  }
}
```

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Component renders correctly with all 6 variant combinations (3 types × 2 styles)
- **SC-002**: All accessibility tests pass with jest-axe (no violations)
- **SC-003**: Visual regression tests pass in Percy for all variants
- **SC-004**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-005**: TypeScript compiles without errors or type warnings
- **SC-006**: Storybook stories demonstrate all 6 variants plus edge cases (no icon, long text, etc.)
- **SC-007**: README documentation is complete with usage examples for all variants
- **SC-008**: Component works in all supported browsers without visual or functional issues
- **SC-009**: Component supports RTL languages with correct icon positioning
- **SC-010**: Color contrast ratios meet WCAG 2.2 AA standards (4.5:1 for normal text, 3:1 for large text)
- **SC-011**: Component correctly applies theme colors from BpkThemeProvider when wrapped in themed context
- **SC-012**: Component maintains consistent appearance with other Ark UI-based Backpack components
- **SC-013**: Icon color automatically matches text color in all themed and non-themed contexts

## Design & Visual Specifications

**Figma**: https://www.figma.com/design/yN0hFyZlKL0Jwbpi0rEKYT/Backpack-Beta?node-id=21640-6807

**Visual States to implement**:

Six primary variants (3 types × 2 styles):

1. **Type: Body, Style: Default**
   - Text: 16px regular (Skyscanner Relative Book)
   - Color: #161616 (text-primary)
   - Line height: 1.5
   - Icon: 16x16px, left-aligned, inherits text color

2. **Type: Body, Style: On Dark**
   - Text: 16px regular
   - Color: white (text-on-dark)
   - Line height: 1.5
   - Icon: 16x16px white (inherits text color), right-aligned

3. **Type: Label 1, Style: Default**
   - Text: 16px bold (Skyscanner Relative Bold)
   - Color: #161616
   - Line height: 1.5
   - Icon: 16x16px, right-aligned, inherits text color

4. **Type: Label 1, Style: On Dark**
   - Text: 16px bold
   - Color: white
   - Line height: 1.5
   - Icon: 16x16px white (inherits text color), right-aligned

5. **Type: Footnote, Style: Default**
   - Text: 14px regular
   - Color: #161616
   - Line height: 1.428
   - Icon: 16x16px, left-aligned, inherits text color
   - Link: 14px with underline

6. **Type: Footnote, Style: On Dark**
   - Text: 14px regular
   - Color: white
   - Line height: 1.428
   - Icon: 16x16px white (inherits text color), right-aligned

**Layout specifications**:
- Container: Flexbox row with align-items: flex-start for proper first-line alignment
- Icon: Wrapped with withAlignment HOC to vertically center with first line of text
- Icon-to-text spacing: 8px (md spacing token)
- Text-to-link spacing: 4px (sm spacing token)
- Icon size: Fixed 16x16px for all variants
- Default icon: information-circle

**Responsive behavior**:
- Component maintains consistent sizing across all screen sizes
- Text wraps naturally if container is too narrow
- Icon remains aligned to first line of text when wrapping occurs

## Dependencies & Related Components

**Internal Dependencies** (other Backpack components):
- Uses `bpk-component-icon` (or SVG icons) for the icon element
- Uses `withAlignment` HOC from `bpk-component-icon` for first-line vertical centering
- Uses `bpk-component-link` styling patterns for the link element
- May compose with `BpkText` component patterns for text styling
- Uses `bpk-theming` for runtime theme support via BpkThemeProvider

**External Dependencies** (npm packages):
- None - component uses only React built-ins

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` for color and spacing tokens
- `bpk-mixins` for typography mixins and utility functions

## Testing Strategy

### Unit Tests (`BpkIconLabel-test.tsx`)
- Test rendering with all 6 variant combinations (type × style)
- Test with and without icon (showIcon prop)
- Test with and without link (linkText, linkHref, onLinkClick)
- Test custom icon rendering
- Test className prop application
- Test link click handler is called
- Test RTL support with dir="rtl"
- Test that icon color matches text color in themed context
- Snapshot tests for each variant

### Accessibility Tests (`accessibility-test.tsx`)
- Use jest-axe for automated WCAG checks on all variants
- Test keyboard navigation to link element (if present)
- Test screen reader compatibility (semantic HTML structure)
- Test color contrast for both default and on-dark styles
- Test that icon has appropriate aria-hidden attribute

### Visual Regression Tests (Percy via Storybook)
- Test all 6 primary variants
- Test with no icon variant
- Test with long text wrapping
- Test link hover state
- Test RTL layout
- ⚠️ Note: Component does not use images, so Percy tests are safe to run

## Documentation Requirements

### README.md
- Component description: "A flexible component for displaying an icon alongside text with an optional link, supporting multiple typography styles and color schemes." (<100 words, British English)
- Installation instructions
- Basic usage examples for each type variant
- Advanced usage with custom icons
- Props table with all properties documented
- Browser support information
- RTL support notes
- Link to Storybook

### Storybook (`examples/bpk-component-icon-label/stories.tsx`)
- Default story (Body + Default)
- Story for each of the 6 primary variants
- Story showing no icon variant
- Story showing long text wrapping behavior
- Story demonstrating custom icon usage
- Story showing interactive link functionality
- Story for RTL layout
- Add a11y addon for accessibility validation

### JSDoc/TSDoc Comments
- Component description explaining purpose and use cases
- All props documented with types, descriptions, and default values
- Usage examples in JSDoc
- Notes about Figma design reference

### Figma Code Connect (`.figma.tsx`)
- Connect to Figma node ID 21640-6807
- Map props to Figma component properties (type, style, icon, link)
- Provide code examples showing prop usage

## Migration & Versioning

**Version Type**: MINOR

**Rationale**: This is a brand new component being added to Backpack. According to SemVer and Backpack's versioning rules, new components constitute a MINOR version bump (new functionality, backward compatible).

**Breaking Changes**: None (new component)

**Deprecations**: None

## Implementation Notes

**File Structure** (per constitution):
```
packages/bpk-component-icon-label/
├── README.md
├── index.ts                                    # exports from src/
├── package.json
├── docs/                                       # Figma screenshots
└── src/
    ├── BpkIconLabel/
    │   ├── BpkIconLabel.tsx
    │   ├── BpkIconLabel.module.scss
    │   ├── BpkIconLabel-test.tsx
    │   ├── accessibility-test.tsx
    │   ├── BpkIconLabel.figma.tsx
    │   ├── common-types.ts                     # shared type definitions
    │   └── __snapshots__/
    ├── themeAttributes.ts                      # 6 themeable attributes: iconLabelBackgroundColor, iconLabelTextColor, iconLabelBorderColor + iconLabelOnDarkBackgroundColor, iconLabelOnDarkTextColor, iconLabelOnDarkBorderColor (NO iconColor or linkColor attributes - icon inherits from text, links use BpkLink theme)
    └── index.ts                                # re-export from BpkIconLabel/
```

**Key Implementation Principles**:
1. Follow composition pattern inspired by Ark UI/Chakra UI (flexible sub-component structure)
2. Use Backpack design tokens and mixins for all styling
3. Ensure accessibility with proper semantic HTML and ARIA attributes
4. Support RTL languages with automatic layout flipping
5. Use TypeScript for all code with strict type checking
6. Follow BEM naming convention with `bpk-` prefix for CSS classes
7. Use `rem` units exclusively for sizing
8. Write tests achieving 70%+ branch coverage and 75%+ function/line/statement coverage
9. Implement icon color inheritance via CSS `color: inherit` to maintain unified theming

## Open Questions

None - all requirements are clear from Figma design and user description.

## References

- **Figma Design**: https://www.figma.com/design/yN0hFyZlKL0Jwbpi0rEKYT/Backpack-Beta?node-id=21640-6807
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Component Examples**: `packages/bpk-component-link/`, `packages/bpk-component-icon/`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Ark UI Reference**: https://ark-ui.com (for composition pattern inspiration)
- **Chakra UI Reference**: https://chakra-ui.com (for composition pattern inspiration)
