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

# Component Specification: BpkCardV2

**Package Branch**: `001-composable-card`
**Created**: 2026-01-28
**Status**: Draft
**Input**: User description: "BpkCardV2 is a composable, responsive card component for Backpack, designed to support richer layouts than the current card while remaining flexible, accessible, and future-proof. Inspired by Ark UI's explicit composition and Chakra UI's Header/Body/Footer mental model."

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component will be in `packages/bpk-component-card-v2/`
- [x] **Naming Conventions**: Component name follows PascalCase (BpkCardV2)
- [x] **License Headers**: All source files (.ts, .tsx, .js, .jsx, .scss, .css) will include Apache 2.0 license header
- [x] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Will include `accessibility-test.tsx`
- [x] **TypeScript**: Will be written in TypeScript with proper types
- [x] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [x] **Versioning**: Follows SemVer rules (MINOR - introduces new component)

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

### User Story 1 - Build a Two-Column Card Layout Without Custom Wrappers (Priority: P1)

A developer needs to create a card with a two-column layout (70% content on left, 30% sidebar on right) that stacks vertically on mobile. With the current BpkCard, they must write custom CSS or create wrapper components. BpkCardV2 provides explicit subcomponents that make this layout a first-class citizen.

**Why this priority**: This is the primary use case that differentiates BpkCardV2 from BpkCard. It directly solves the "multi-area layouts" problem identified in the feature brief. Enabling this pattern removes friction and reduces custom code across Backpack consumers.

**Independent Test**: Can be fully tested by rendering BpkCardV2.Body with Primary and Secondary subcomponents on desktop and mobile viewports, verifying layout ratio and stacking behavior without additional CSS or props.

**Acceptance Scenarios**:

1. **Given** a developer renders `<BpkCardV2.Body><BpkCardV2.Primary>{content}</BpkCardV2.Primary><BpkCardV2.Secondary>{sidebar}</BpkCardV2.Secondary></BpkCardV2.Body>` on desktop, **When** the component renders, **Then** Primary takes 70% width and Secondary takes 30% width, displayed horizontally with no additional CSS required.
2. **Given** the same layout is rendered on mobile (viewport < 768px), **When** the component renders, **Then** Primary and Secondary stack vertically with Primary appearing first, with full width on each row.
3. **Given** the split ratio is configured as 60/40, **When** the component renders on desktop, **Then** Primary takes 60% width and Secondary takes 40% width.

---

### User Story 2 - Compose Multi-Section Cards with Explicit Structure (Priority: P1)

A designer needs to build card variants with header, main content, and footer sections. The current BpkCard relies on implicit child ordering (first child = header, second = body, etc.), which causes confusion and maintenance issues. BpkCardV2 uses explicit subcomponents (Header, Body, Footer) that are self-documenting.

**Why this priority**: This directly addresses the "encourage explicit composition over implicit child ordering" goal. It provides a clear, predictable mental model for both designers and engineers, eliminating ambiguity about where content should go.

**Independent Test**: Can be fully tested by rendering BpkCardV2 with Header, Body, and Footer subcomponents in any order and verifying that each section renders in the correct position (header at top, footer at bottom) regardless of composition order.

**Acceptance Scenarios**:

1. **Given** a developer renders `<BpkCardV2><BpkCardV2.Header>{header}</BpkCardV2.Header><BpkCardV2.Body>{body}</BpkCardV2.Body><BpkCardV2.Footer>{footer}</BpkCardV2.Footer></BpkCardV2>`, **When** the component renders, **Then** Header appears at top, Body in middle, Footer at bottom regardless of prop order.
2. **Given** a developer renders the components in different order (Footer first, Header last), **When** the component renders, **Then** the visual layout remains correct (Header at top, Footer at bottom).
3. **Given** only Body subcomponent is rendered without Header or Footer, **When** the component renders, **Then** the card displays body content only without spacing issues or console errors.

---

### User Story 3 - Apply Visual Variants and Future-Proof Styling (Priority: P1)

Product teams need to create card designs for different contexts (e.g., white card for light backgrounds, elevated card for emphasis). BpkCardV2 must support multiple visual variants through a `variant` prop while using Backpack design tokens for consistent theming. The component must be flexible enough to accommodate future variants without API changes.

**Why this priority**: Supporting multiple visual variants is essential for the component to be useful across diverse Backpack use cases. Token-driven styling and a flexible variant system ensure the component can evolve without breaking consumer code.

**Independent Test**: Can be fully tested by rendering BpkCardV2 with different `variant` prop values and verifying that each variant applies correct styling (colors, shadows, borders) via Backpack design tokens, with no visual regressions between variants.

**Acceptance Scenarios**:

1. **Given** a developer renders `<BpkCardV2 variant="default">`, **When** the component renders, **Then** it uses default Backpack styling with subtle shadow.
2. **Given** a developer renders `<BpkCardV2 variant="outlined">`, **When** the component renders, **Then** it uses outlined styling (border-based, no shadow).
3. **Given** a developer renders `<BpkCardV2 bgColor="surfaceLowContrast">`, **When** the component renders, **Then** the card background uses the low-contrast surface color while maintaining the selected variant styling.
4. **Given** a developer renders `<BpkCardV2 bgColor="surfaceHero">`, **When** the component renders, **Then** the card renders with hero/prominent surface styling for emphasis.

---

### User Story 4 - Ensure Mobile-First Responsive Design (Priority: P2)

Engineers building for mobile-first development need the card to automatically adapt layout across breakpoints without manual media query management. BpkCardV2 must handle responsive split layout behavior (stacking on mobile, side-by-side on desktop) via built-in breakpoint logic.

**Why this priority**: Mobile-first design is a Backpack core principle. Building responsive behavior into the component ensures consistent mobile experience across Skyscanner products without requiring custom breakpoint logic in consumer code.

**Independent Test**: Can be fully tested by rendering BpkCardV2 with a split layout at different viewport widths and verifying that layout transitions (stacking/side-by-side) occur at correct breakpoints with correct content ordering (Primary first on stack).

**Acceptance Scenarios**:

1. **Given** a card with split layout on a mobile viewport (<= 768px), **When** the component renders, **Then** Primary and Secondary sections stack vertically with Primary appearing first.
2. **Given** the same card on a desktop viewport (> 768px), **When** the component renders, **Then** Primary and Secondary render horizontally with Primary taking 70% and Secondary taking 30%.
3. **Given** a viewport is resized from mobile to desktop, **When** the layout transitions, **Then** the split layout smoothly adjusts from vertical to horizontal stacking without component remount or layout thrashing.

---

### User Story 5 - Maintain Accessibility Across All Layouts and States (Priority: P1)

Accessibility auditors and developers need BpkCardV2 to maintain WCAG 2.1 Level AA compliance across all layout variations (mobile, desktop, split, full-width). Semantic HTML and proper ARIA usage must be preserved even as layout changes responsively.

**Why this priority**: Accessibility is a constitutional requirement for all Backpack components. It must be built-in, not retrofitted. The component's value is diminished if consumers must add custom ARIA or semantic fixes.

**Independent Test**: Can be fully tested using jest-axe automated accessibility checks across all component variants, layouts, and viewport sizes, verifying zero accessibility violations and proper keyboard navigation through all content regions.

**Acceptance Scenarios**:

1. **Given** BpkCardV2 renders with Header, Body, and Footer subcomponents, **When** jest-axe accessibility audit runs, **Then** zero accessibility violations are detected and semantic HTML is preserved (header/footer tags, proper heading hierarchy).
2. **Given** a keyboard user navigates the card with Tab key, **When** tabbing through content, **Then** focus moves through all interactive elements in logical order without skipping or getting trapped.
3. **Given** a screen reader user interacts with the card, **When** screen reader announces content, **Then** card structure is clear (header, main, footer regions are distinguishable) and all content is accessible.

---

### Edge Cases

- What happens when Header or Footer are not provided? → Component renders without error, Body takes full width
- How does component handle extremely long text content in Primary or Secondary sections? → Text wraps naturally; no overflow by default, overflow container behavior can be configured by consumer
- What happens when split layout is used on an extremely narrow viewport (< 320px)? → Component gracefully stacks with appropriate min-width constraints
- How does component behave when Primary or Secondary sections contain interactive elements? → Interactive elements remain keyboard accessible and maintain focus management
- What happens if variant prop is invalid or not recognized? → Component uses sensible default variant, logs warning in development mode
- How does component handle RTL languages? → Layout mirrors correctly (Primary takes right 70% on RTL), no additional consumer configuration needed

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: BpkCardV2 MUST be a composable component with explicit subcomponents (Root, Header, Body, Footer)
- **FR-002**: BpkCardV2.Body MUST support split layout via Primary and Secondary subcomponents
- **FR-003**: Split layout in Body MUST use configurable ratio (default 70/30)
- **FR-004**: On mobile (viewport <= 768px), split layout sections MUST stack vertically with Primary appearing first
- **FR-005**: On desktop (viewport > 768px), split layout sections MUST render horizontally with ratio applied
- **FR-006**: Component MUST render Header at top, Body in middle, Footer at bottom regardless of composition order
- **FR-007**: Component MUST support visual variants via `variant` prop: "default", "outlined"
- **FR-007b**: Component MUST support surface color customization via `bgColor` prop accepting all 8 Backpack surface token names (surfaceDefault, surfaceElevated, surfaceTint, surfaceSubtle, surfaceHero, surfaceContrast, surfaceLowContrast, surfaceHighlight)
- **FR-008**: Variants MUST be token-driven using Backpack design tokens (colors, shadows, spacing)
- **FR-009**: Header and Footer sections MUST be optional (component works with Body only)
- **FR-010**: Primary and Secondary sections within Body MUST be optional (Body can render without split)
- **FR-011**: Component MUST support all Backpack-standard props (className, children, data attributes)
- **FR-012**: Component MUST support right-to-left (RTL) languages with automatic layout mirroring

### Component API *(include props/types)*

**Props**:

**BpkCardV2** (Root component):
- **`variant`** (string, optional, default: "default"): Visual treatment/styling variant - one of: "default", "outlined"
- **`bgColor`** (string, optional, default: "surfaceDefault"): Backpack surface color token name for background - one of: "surfaceDefault", "surfaceElevated", "surfaceTint", "surfaceSubtle", "surfaceHero", "surfaceContrast", "surfaceLowContrast", "surfaceHighlight"
- **`children`** (ReactNode, required): Must contain at least one of Header, Body, or Footer subcomponents
- **`className`** (string, optional): Additional CSS class names
- **`ariaLabel`** (string, optional): Accessible label describing the card's purpose
- **`ariaLabelledBy`** (string, optional): ID of element that labels the card

**BpkCardV2.Header**:
- **`children`** (ReactNode, required): Header content
- **`className`** (string, optional): Additional CSS class names

**BpkCardV2.Body**:
- **`children`** (ReactNode, required): Body content (can be text, elements, or Primary/Secondary subcomponents)
- **`className`** (string, optional): Additional CSS class names
- **`split`** (boolean, optional, default: false): Enable two-column layout with Primary/Secondary split
- **`splitRatio`** (number, optional, default: 70): Percentage width for Primary section on desktop when split is enabled
  - Valid range: 0-100, represents Primary section percentage (e.g., 70 = Primary takes 70%, Secondary takes 30%)

**BpkCardV2.Primary** (when used within Body with split=true):
- **`children`** (ReactNode, required): Primary content (typically main content area)
- **`className`** (string, optional): Additional CSS class names

**BpkCardV2.Secondary** (when used within Body with split=true):
- **`children`** (ReactNode, required): Secondary content (typically sidebar/auxiliary content)
- **`className`** (string, optional): Additional CSS class names

**BpkCardV2.Footer**:
- **`children`** (ReactNode, required): Footer content
- **`className`** (string, optional): Additional CSS class names

**Example usage pattern**:
```typescript
type BpkCardV2Props = {
  variant?: 'default' | 'outlined';
  bgColor?: 'surfaceDefault' | 'surfaceElevated' | 'surfaceTint' | 'surfaceSubtle' | 'surfaceHero' | 'surfaceContrast' | 'surfaceLowContrast' | 'surfaceHighlight';
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

type BpkCardV2BodyProps = {
  children: ReactNode;
  className?: string;
  split?: boolean;
  splitRatio?: number; // 0-100, default 70
};
```

### Non-Functional Requirements

- **NFR-001**: Component MUST be keyboard accessible (Tab, Enter, Space navigation through all interactive content)
- **NFR-002**: Component MUST work with screen readers (proper semantic HTML, ARIA where needed)
- **NFR-003**: Component MUST support RTL languages without consumer configuration changes
- **NFR-004**: Component MUST meet WCAG 2.1 Level AA accessibility standards
- **NFR-005**: Component MUST render correctly on all supported Backpack browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+)
- **NFR-006**: Component MUST use `rem` units for all sizing (not `px` or `em`)
- **NFR-007**: Component MUST support responsive design across all breakpoints (mobile-first, tablet, desktop)
- **NFR-008**: Component MUST work with Backpack theming system when applicable

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`)
- **STY-002**: Styles MUST use modern Sass API with `@use` syntax
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules
- **STY-004**: All spacing MUST use design tokens (e.g., `tokens.bpk-spacing-md()`)
- **STY-005**: All colors MUST use design tokens (e.g., `tokens.$bpk-color-white`)
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `bpk-card-v2`, `bpk-card-v2__header`)
- **STY-007**: Component MUST support theming via `bpk-theming` if variants require theme customization
- **STY-008**: Responsive breakpoints MUST use Backpack breakpoint values (mobile breakpoint: 768px)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop combinations (variants, split configurations, optional sections)
- **SC-002**: All accessibility tests pass with jest-axe (zero violations across all variants and viewports)
- **SC-003**: Split layout renders at correct ratio (70/30 default) on desktop with verified measurements; divider is visible (1px line)
- **SC-004**: Split layout stacks vertically on mobile (viewport <= 768px) with Primary appearing first; divider is hidden
- **SC-005**: Responsive layout transitions smoothly without layout thrashing or component remounts
- **SC-005b**: Surface color (bgColor prop) correctly applies Backpack color tokens without affecting variant styling
- **SC-006**: Test coverage meets thresholds (70% branches, 75% functions/lines/statements)
- **SC-007**: TypeScript compiles without errors and all props are properly typed
- **SC-008**: Storybook stories demonstrate all variants, split configurations, and responsive breakpoints
- **SC-009**: README documentation is complete with usage examples for basic and split layouts
- **SC-010**: Component works in all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+)
- **SC-011**: RTL support verified with RTL language variants rendering correctly without consumer configuration
- **SC-012**: Visual regression tests pass in Percy across all variants and breakpoints

## Design & Visual Specifications

**Figma**: [https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=365-1783&m=dev](https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=365-1783&m=dev)

**Visual States to implement**:
- Default state (subtle shadow, neutral styling)
- Outlined state (border-based styling, alternative to filled)
- Hover-press state (elevated shadow for emphasis/interactivity)
- Disabled state (reduced opacity if applicable)

**Surface Colors** (controlled via `bgColor` prop):
- Supports 8 Backpack surface color tokens via `bgColor` prop (prop values mapped to design system tokens):
  - "surfaceDefault" → `tokens.$bpk-surface-default-day` (white, default)
  - "surfaceElevated" → `tokens.$bpk-surface-elevated-day` (elevated/emphasis surface)
  - "surfaceTint" → `tokens.$bpk-surface-tint-day` (tinted surface)
  - "surfaceSubtle" → `tokens.$bpk-surface-subtle-day` (subtle/subdued surface)
  - "surfaceHero" → `tokens.$bpk-surface-hero-day` (hero/prominent surface)
  - "surfaceContrast" → `tokens.$bpk-surface-contrast-day` (high contrast surface)
  - "surfaceLowContrast" → `tokens.$bpk-surface-low-contrast-day` (low contrast surface, e.g., light gray)
  - "surfaceHighlight" → `tokens.$bpk-surface-highlight-day` (highlighted surface)
- Each token uses Backpack's `-day` suffix for theme support (night theme automatically applied via Backpack theming system)
- Tokens imported via `@use '../../bpk-mixins/tokens'` per Backpack standards
- Default surface is "surfaceDefault" (maps to `tokens.$bpk-surface-default-day`)

**Responsive behavior**:
- Mobile (<= 768px): Split sections stack vertically, full width
- Desktop (> 768px): Split sections render horizontally with configurable ratio (default 70/30)

**Visual divider between Primary and Secondary**:
- When split layout is active on desktop, a thin vertical divider (1px line with 4px inset padding) separates Primary and Secondary sections
- Divider uses design tokens for consistency (subtle border color from Backpack palette)
- Divider is always rendered when split is active; no configuration prop needed (divider is part of component contract)
- On mobile, divider is not rendered (sections stack vertically with standard spacing)

## Dependencies & Related Components

**Internal Dependencies** (other Backpack components):
- Uses design tokens from `@skyscanner/bpk-foundations-web`
- Inherits Backpack spacing and color conventions
- May use `bpk-theming` if variants require theme support
- Complements existing BpkCard but is not a direct replacement

**External Dependencies** (npm packages):
- None beyond existing Backpack dependencies

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` for colors, shadows, spacing
- `bpk-mixins` for responsive breakpoint utilities

## Testing Strategy

### Unit Tests
- Test all prop combinations (variants, split/non-split, with/without Header/Footer)
- Test responsive layout behavior at different viewport widths
- Test split ratio configuration
- Test conditional rendering of subcomponents
- Test edge cases (no children, invalid props, extremely long content)
- Snapshot tests for each variant and layout configuration

### Accessibility Tests
- Use jest-axe for automated checks on all variants and viewports
- Test keyboard navigation (Tab order through interactive content)
- Test screen reader support (semantic HTML, ARIA attributes)
- Test focus management across layout changes
- Test RTL layout and focus order

### Visual Regression Tests (Percy via Storybook)
- Test all visual variants
- Test split layout at different ratios
- Test responsive breakpoints (mobile, tablet, desktop)
- Test all interactive states if applicable

## Documentation Requirements

### README.md
- Component description (<100 words, British English prose)
- Usage examples: basic card, multi-section card, split layout card
- Props reference table
- Responsive behavior explanation
- Browser support information
- Link to Storybook

### Storybook
- Default story with Header, Body, Footer
- Story for each variant (default, outlined)
- Story for each bgColor surface token (all 8 combinations)
- Story for split layout with Primary/Secondary
- Story for split layout at different ratios (50/50, 60/40, 70/30)
- Story for split layout responsive behavior (mobile vs desktop)
- Story for Body-only card (no Header/Footer)
- Story for extreme content (very long text, many interactive elements)
- Add a11y addon for accessibility checks on all stories

### JSDoc/TSDoc Comments
- Component description and typical use cases
- All subcomponents documented
- All props documented with type, default, and examples
- Accessibility notes where relevant

### Figma Code Connect
- Connect component variants to Figma designs
- Map props to Figma component properties
- Provide usage examples for common patterns

## Migration & Versioning

**Version Type**: MINOR

**Rationale**: This introduces a new component (BpkCardV2) that coexists with the existing BpkCard. Consumers must explicitly adopt the new component; existing code continues to work with BpkCard.

**Future API** (if applicable):
- BpkCardV2 is the "V2" - existing BpkCard remains available for backwards compatibility
- No deprecation of BpkCard planned at this time
- Future phases may add size variants (small, medium, large)

## Implementation Notes

**File Structure** (per constitution):
```
packages/bpk-component-card-v2/
├── README.md
├── index.ts                            # exports default from src/
├── docs/                               # screenshots, design assets
└── src/
    ├── BpkCardV2/
    │   ├── BpkCardV2.tsx               # Root component
    │   ├── BpkCardV2.module.scss       # Main styles
    │   ├── BpkCardV2-test.tsx
    │   ├── accessibility-test.tsx
    │   ├── BpkCardV2.figma.tsx
    │   ├── subcomponents/
    │   │   ├── Header.tsx
    │   │   ├── Body.tsx
    │   │   ├── Primary.tsx
    │   │   ├── Secondary.tsx
    │   │   └── Footer.tsx
    │   └── __snapshots__/
    └── common-types.ts                 # shared types
```

**Key Implementation Principles**:
1. Explicit composition (named subcomponents, no implicit child ordering)
2. Mobile-first responsive design (mobile stacking default, desktop layout opt-in)
3. Semantic HTML (header/footer tags, proper nesting)
4. Accessibility-first (jest-axe checks, keyboard navigation, screen reader support)
5. Token-driven styling (all colors, spacing from design tokens)
6. Future-proof API (variant system allows new variants without breaking changes)

## Clarifications

### Session 2026-01-28 (Figma Design Review & Surface Tokens)

- Q1: Layout type control → A: Keep `split` prop on Body; no separate "type" prop
- Q2: Banner sections support → A: Banners are Figma implementation detail; Header/Footer subcomponents sufficient for V1
- Q3: Divider and sizing specs → A: Design specs as constraints (1px divider with 4px inset); right slot respects `splitRatio` prop (not fixed 250px)
- Q4: Surface styling variants → B: Remove "elevated" variant; support all Backpack surface colours via separate mechanism
- Q4b: Surface color control → B: Use standard Backpack approach with `bgColor` prop accepting surface token names
- Q5: Surface token specifications → 8 surface color concepts (user-friendly prop values) mapped to Backpack design system tokens with `-day` suffix
- Q6: Token naming structure → Confirmed: Use `tokens.$bpk-surface-*-day` pattern per Backpack standards (imported via `@use '../../bpk-mixins/tokens'`)

**Impact on spec**:
- Variants updated: "default", "outlined" (removed "elevated")
- New prop: `bgColor` on Root component for surface color control (8 token options)
- Divider specifications clarified: 1px line with 4px inset padding, always rendered in split layouts on desktop
- Surface colors decoupled from variants: `variant` controls visual treatment, `bgColor` controls background
- `bgColor` values now explicitly mapped to Backpack design system surface tokens

---

## Previous Clarifications

### Session 2026-01-28 (Initial Specification)

- [x] **Variants**: "default", "elevated", and "outlined" will launch in V1 (chosen: adds outlined variant for comprehensive coverage) *[Updated after Figma review]*
- [x] **Split Ratio**: Configurable via `splitRatio` prop on Body component (chosen: cleaner API, treats layout as Body responsibility)
- [x] **Visual Divider**: Always rendered when split is active (chosen: opinionated design, consistent UX across all split layouts)

## Assumptions

- **Breakpoint assumptions**: Mobile breakpoint is 768px (matches Backpack convention)
- **Default split ratio**: 70/30 matches the example in feature brief
- **Semantic HTML**: Header → `<header>`, Body → `<div>`, Footer → `<footer>` (or `<aside>` if needed)
- **No mandatory interactivity**: Component is compositional by default; consumers add interactivity if needed
- **Design tokens available**: Assumes design tokens for card styling (background, shadow, spacing) already exist in `@skyscanner/bpk-foundations-web`
- **RTL support**: Built-in via flexbox direction and logical properties (margin-inline, etc.)

## References

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **Similar Components**: Ark UI Card (composition pattern), Chakra UI Card (structure model)
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Existing BpkCard**: Reference for current card patterns and limitations
