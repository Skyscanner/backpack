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
==============================================================================
-->

# Component Specification: BpkSegmentedControlV2

**Package Branch**: `001-composable-segmented-control`
**Created**: 2026-03-02
**Status**: Draft

## Clarifications

### Session 2026-03-03

- Q: Should V2 use Ark-UI's `radiogroup`/`radio` ARIA pattern, or preserve V1's `tablist`/`tab` pattern, or support both via a mode prop? → A: Option A — `radiogroup`/`radio` (Ark-UI default); panel-linking is an explicit non-goal for V2.
- Q: Should `BpkSegmentedControlV2.Indicator` (animated sliding highlight) be in scope for V2 or deferred? → A: Option B — non-animated (static) selected-item highlight only in V2; animated sliding indicator is deferred to a follow-up.
- Q: How should `@ark-ui/react` be declared as a package dependency? → A: Option A — direct dependency (in `dependencies`); consumers get it automatically with no extra install step.
- Q: What happens at runtime when two `Item` elements share the same `value`? → A: Option A was initially chosen (dev-mode console warning). Subsequently removed — the `value` uniqueness contract is documented in JSDoc/props table only; no runtime warning is emitted.

## Constitution Check

*GATE: Must pass before implementation begins.*

- [x] **Component-First Architecture**: Component will be in `packages/bpk-component-segmented-control/` alongside existing V1
- [x] **Naming Conventions**: Component name follows PascalCase — `BpkSegmentedControlV2` with sub-components following `BpkSegmentedControl.*` dot-notation
- [x] **License Headers**: All source files (.ts, .tsx, .js, .jsx, .scss, .css) will include Apache 2.0 license header
- [x] **Modern Sass**: Will use `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: Will include `accessibility-test.tsx`
- [x] **TypeScript**: Will be written in TypeScript with proper types
- [x] **Test Coverage**: Will meet 70% branches, 75% functions/lines/statements
- [x] **Documentation**: Will include README.md, Storybook story, JSDoc comments
- [x] **Versioning**: MAJOR — composable API is a breaking change from V1; V2 ships alongside V1 per constitution guidelines

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Basic Composable Segment Group (Priority: P1)

A developer building a filter UI wants to render a segmented control with two or three labelled options. They use the composable API to declare each segment as its own element, controlling the selected state and responding to changes.

**Why this priority**: This is the core use case. Without a working composable root + item structure there is no component.

**Independent Test**: Can be fully tested by rendering `BpkSegmentedControlV2.Root` with two `BpkSegmentedControlV2.Item` children, verifying that the correct item shows as selected and that the `onChange` callback fires when a different item is clicked.

**Acceptance Scenarios**:

1. **Given** a segmented control is rendered with three items and the second item set as the default value, **When** the page loads, **Then** the second item appears visually selected and its selection state is announced to screen readers.
2. **Given** a user clicks an unselected item, **When** the click event fires, **Then** the `onChange` callback receives the value of the clicked item and the visual selection moves to that item.
3. **Given** a segmented control is rendered with no default value provided, **When** the page loads, **Then** no item appears selected and the component renders without errors.

---

### User Story 2 — Keyboard Navigation (Priority: P1)

A keyboard-only user navigating a search results filter page moves focus into the segmented control and selects a different option using arrow keys.

**Why this priority**: Keyboard navigation is a core accessibility requirement and must be verified independently from the composable structure itself.

**Independent Test**: Can be fully tested by rendering a segmented control, focusing the first item, and asserting that pressing ArrowRight moves focus and selection to the next item (in LTR layouts), with ArrowLeft doing the reverse.

**Acceptance Scenarios**:

1. **Given** focus is on the first item in a segmented control, **When** the user presses ArrowRight, **Then** focus and selection move to the second item.
2. **Given** focus is on the last item, **When** the user presses ArrowRight, **Then** focus and selection wrap to the first item.
3. **Given** the component is rendered in an RTL locale, **When** the user presses ArrowRight, **Then** focus and selection move to the previous item (mirrored behaviour).
4. **Given** focus is anywhere within the control, **When** the user presses Home, **Then** focus and selection move to the first item; pressing End moves them to the last item.

---

### User Story 3 — CSS Variable Theming (Priority: P2)

A product team adopting VDL 2.0 wants to apply new colours and corner radii to the segmented control without forking the component or overriding internals. They override the published CSS custom properties on a wrapper element and the component reflects the new visual style automatically.

**Why this priority**: Theming is the primary enabler for VDL 2.0 support. It must be independently verifiable before the migration story is attempted.

**Independent Test**: Can be fully tested by rendering the component inside a wrapper that sets `--bpk-segmented-control-bg` and `--bpk-segmented-control-indicator-bg` to non-default values, then asserting that computed styles on the relevant elements reflect those values.

**Acceptance Scenarios**:

1. **Given** a consumer sets `--bpk-segmented-control-bg` on a wrapper element, **When** the component renders, **Then** the group background uses the overridden colour.
2. **Given** a consumer sets `--bpk-segmented-control-indicator-bg`, **When** an item is selected, **Then** the selection indicator uses the overridden colour.
3. **Given** no CSS variables are overridden, **When** the component renders, **Then** it uses the default Backpack design tokens — visually indistinguishable from the V1 component for the same `type` setting.
4. **Given** a VDL 2.0 theme stylesheet overrides all published CSS variables, **When** the component renders inside that stylesheet's scope, **Then** the component adopts VDL 2.0 colours and shapes without any code changes to consumers.

---

### User Story 4 — Style Variants (Priority: P2)

A developer placing a segmented control on a canvas-contrast background needs it to look correct on that surface. They pass a `type` prop and the component applies the appropriate default token set for that surface.

**Why this priority**: Surface variants existed in V1 and must be preserved. They are lower priority than core composability and theming because they can ship with the same underlying CSS variable mechanism.

**Independent Test**: Can be fully tested by rendering the component with each `type` value and asserting that the background colour token applied to the group matches the expected token for that surface.

**Acceptance Scenarios**:

1. **Given** `type` is `canvas-default`, **When** the component renders, **Then** the group background uses the canvas-default surface token.
2. **Given** `type` is `surface-contrast`, **When** the component renders, **Then** the group and indicator backgrounds use the surface-contrast token pair.
3. **Given** `type` is not provided, **When** the component renders, **Then** it defaults to `canvas-default` behaviour.

---

### User Story 5 — Composable Custom Content Per Segment (Priority: P2)

A developer wants to place an icon alongside a label inside a segment item, without being limited to a plain string. They nest their own markup inside a segment item and it renders correctly.

**Why this priority**: A composable API's value is directly proportional to the content it can hold. Custom content (icons, badges) is a common design system need.

**Independent Test**: Can be fully tested by rendering a segment item with an SVG icon and a text node as children, asserting that both render inside the item button and that the item still responds to selection correctly.

**Acceptance Scenarios**:

1. **Given** a segment item contains an icon component and a text string as children, **When** the component renders, **Then** both the icon and label are visible within the segment button.
2. **Given** a segment item contains only an icon with no visible text, **When** a screen reader announces the item, **Then** a meaningful label is announced — achieved by including a `BpkVisuallyHidden` text node alongside the icon inside the item's children.

---

### User Story 6 — Migration from V1 (Priority: P3)

A developer using the existing `BpkSegmentedControl` component runs the provided migration script on their codebase. The script transforms the V1 `buttonContents` array API into the new composable structure automatically, with minimal manual follow-up.

**Why this priority**: Migration tooling reduces adoption friction but does not block VDL 2.0 or any feature work. It ships alongside or shortly after V2.

**Independent Test**: Can be fully tested by running the migration script against a set of fixture files containing known V1 usages and asserting that the output matches expected V2 patterns.

**Acceptance Scenarios**:

1. **Given** a source file uses `<BpkSegmentedControl buttonContents={['A', 'B']} ... />`, **When** the migration script is run, **Then** the output uses `<BpkSegmentedControlV2.Root ...><BpkSegmentedControlV2.Item value="0">A</BpkSegmentedControlV2.Item>...</BpkSegmentedControlV2.Root>`.
2. **Given** the migration script encounters a usage it cannot safely transform (e.g., `buttonContents` passed as a variable, not a literal array), **When** the script runs, **Then** it leaves that usage unchanged and emits a warning message identifying the file and line number.
3. **Given** the migration script has been run, **When** the transformed code is compiled, **Then** there are no TypeScript or linting errors.

---

### Edge Cases

- What happens when a `BpkSegmentedControlV2.Root` is rendered with no `BpkSegmentedControlV2.Item` children? The component must render without crashing and produce no interactive elements.
- How does the component handle an `Item` `value` that matches no item in the control? The component renders with no item visually selected.
- What happens with an extremely long label inside a segment item? Text truncates with an ellipsis rather than breaking the grid layout or overflowing the container.
- How does the component behave when the parent container is narrower than the total width of all items? The group must not overflow; items shrink proportionally within the available space.
- What happens when only one item is present? The component renders a single full-width segment, still meeting accessibility requirements.
- What happens when `disabled` is set on an individual item? That item is not focusable, not clickable, and its state is announced to assistive technology as disabled.
- What happens when `disabled` is set on the root? All items are disabled simultaneously.
- What happens when two `Item` elements share the same `value`? The first item with that value is treated as selected; the duplicate renders but cannot be selected. No runtime warning is emitted — the uniqueness contract is documented in the props table.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `BpkSegmentedControlV2.Root` MUST accept a controlled `value` prop and an `onChange` callback, delegating selection state entirely to the consumer.
- **FR-002**: `BpkSegmentedControlV2.Root` MUST support an uncontrolled `defaultValue` prop for consumers who do not need to manage state externally.
- **FR-003**: `BpkSegmentedControlV2.Item` MUST accept a `value` prop that uniquely identifies the segment within the group. Item values MUST be unique within a group; the uniqueness contract is enforced by documentation and TypeScript types, not by a runtime warning.
- **FR-004**: `BpkSegmentedControlV2.Item` MUST accept arbitrary `children` so that consumers can nest icons, text, or any combination of inline content.
- **FR-005**: `BpkSegmentedControlV2.Item` MUST accept a `disabled` prop that prevents interaction and announces the item as disabled to assistive technology.
- **FR-006**: `BpkSegmentedControlV2.Root` MUST accept a `disabled` prop that disables all child items simultaneously.
- **FR-007**: `BpkSegmentedControlV2.Root` MUST accept a `type` prop equivalent to the existing V1 `type` values (`canvas-default`, `canvas-contrast`, `surface-default`, `surface-contrast`) as a convenience for applying pre-defined Backpack surface themes without manual CSS variable overrides.
- **FR-008**: `BpkSegmentedControlV2.Root` MUST accept a `shadow` prop that applies a box shadow to the group container.
- **FR-009**: `BpkSegmentedControlV2.Root` MUST accept an `activationMode` prop of `'automatic'` or `'manual'`, controlling whether keyboard focus automatically selects an item or requires an explicit Enter/Space press.
- **FR-010**: `BpkSegmentedControlV2.Root` MUST accept a `label` prop for an accessible group label when no visible label is present in the surrounding layout.
- **FR-011**: The component MUST expose a named set of CSS custom properties (see Theming section) that consumers can override to customise colours, corner radius, spacing, and indicator appearance.
- **FR-012**: The component MUST ship a default theme that maps the published CSS custom properties to existing Backpack design tokens, producing a visual appearance identical to V1 for the same `type` setting.
- **FR-013**: Icon-only segment items MUST have an accessible label provided by the consumer via a `BpkVisuallyHidden` text node placed alongside the icon within the item's children. The component derives the accessible name automatically from text content in children; no dedicated prop is required or provided.
- **FR-014**: The component MUST support right-to-left (RTL) text direction, mirroring arrow-key navigation and visual layout accordingly.
- **FR-015**: The V1 component (`BpkSegmentedControl`) MUST remain functional and undeprecated at the time of V2 release, with deprecation beginning no earlier than 3 months after V2 reaches stable status.
- **FR-016**: A codemod migration script MUST be provided that transforms V1 usage patterns to V2 composable patterns, emitting warnings for patterns it cannot safely transform.

### Component API

The component exposes a set of composable sub-components accessed via dot notation on the main export.

**BpkSegmentedControlV2.Root**:

- **`value`** (string, optional): The value of the currently selected item. When provided, the component is controlled and `onChange` must also be provided.
- **`defaultValue`** (string, optional): The value of the initially selected item for uncontrolled usage.
- **`onChange`** (function, optional): Called when the selected item changes. Receives the new value as a string: `(value: string) => void`.
- **`type`** (string, optional, default: `'canvas-default'`): Pre-defined surface theme. One of: `'canvas-default'`, `'canvas-contrast'`, `'surface-default'`, `'surface-contrast'`.
- **`shadow`** (boolean, optional, default: `false`): Applies a box shadow to the group container.
- **`activationMode`** (string, optional, default: `'automatic'`): Keyboard selection mode. One of: `'automatic'`, `'manual'`.
- **`label`** (string, required): Accessible label for the group, satisfying WCAG 4.1.2 (the `role="radiogroup"` element must have an accessible name).
- **`disabled`** (boolean, optional, default: `false`): Disables all items in the group.
- **`children`** (ReactNode, required): Must contain one or more `BpkSegmentedControlV2.Item` elements.

**BpkSegmentedControlV2.Item**:

- **`value`** (string, required): Unique identifier for this segment within the group.
- **`disabled`** (boolean, optional, default: `false`): Disables this individual item.
- **`children`** (ReactNode, required): Visible content of the segment — text, icons, or a combination. For icon-only items, include a `BpkVisuallyHidden` text node to provide an accessible label.

### CSS Custom Properties (Theming)

The following CSS custom properties are part of the component's public theming API. They cascade from the Root element and can be overridden at any level in the DOM hierarchy.

| Property | Controls |
|---|---|
| `--bpk-segmented-control-bg` | Background colour of the unselected group track |
| `--bpk-segmented-control-item-color` | Text/icon colour of unselected items |
| `--bpk-segmented-control-item-disabled-color` | Text/icon colour of disabled items |
| `--bpk-segmented-control-indicator-bg` | Background colour of the selected item indicator |
| `--bpk-segmented-control-indicator-color` | Text/icon colour of selected items |
| `--bpk-segmented-control-border-radius` | Corner radius of the group container and indicator |
| `--bpk-segmented-control-padding-x` | Horizontal padding inside each segment item |
| `--bpk-segmented-control-padding-y` | Vertical padding inside each segment item |
| `--bpk-segmented-control-divider-color` | Colour of the divider line between unselected items |
| `--bpk-segmented-control-shadow` | `box-shadow` value applied when `shadow={true}`; defaults to an inset shadow |

### Non-Functional Requirements

- **NFR-001**: The component MUST fully comply with WCAG 2.2 Level AA.
- **NFR-002**: The component MUST use the `radiogroup`/`radio` ARIA role model. Arrow-key navigation MUST follow WAI-ARIA Authoring Practices for radio groups (roving tabindex). Panel-linking (`tablist`/`tab` pattern) is an explicit non-goal for V2.
- **NFR-003**: Focus must be visible on keyboard navigation, meeting WCAG 2.2 Focus Appearance criteria (3:1 contrast ratio for the focus indicator, minimum area).
- **NFR-004**: Selection state MUST be announced by screen readers when an item is focused or when selection changes.
- **NFR-005**: The component MUST render correctly in all supported browsers: Chrome ≥ 109, Edge ≥ 142, Firefox ≥ 145, Safari ≥ 16, Samsung ≥ 29.
- **NFR-006**: The component MUST support RTL text direction without layout or navigation regressions.
- **NFR-007**: All sizing values MUST use `rem` units.
- **NFR-008**: The component MUST not introduce more than a 5 kB (gzipped) increase to the package's total bundle size compared to V1, including the Ark-UI segmentGroup dependency, evaluated at time of PR.
- **NFR-009**: The component MUST render without crashing and without React warnings in React 18.3.1.

### Styling Requirements

- **STY-001**: All styles MUST use CSS Modules (`.module.scss`).
- **STY-002**: Styles MUST use the modern Sass `@use` API; `@import` is forbidden.
- **STY-003**: Imports MUST be granular from `bpk-mixins` submodules (e.g., `@use '../../bpk-mixins/tokens'`).
- **STY-004**: All spacing MUST use design token functions (e.g., `tokens.bpk-spacing-md()`).
- **STY-005**: All hardcoded colour values are forbidden; colours MUST use design tokens or the component's own CSS custom properties.
- **STY-006**: Class names MUST follow BEM with `bpk-` prefix (e.g., `.bpk-segmented-control-v2`, `.bpk-segmented-control-v2__item--selected`).
- **STY-007**: The default theme MUST set all CSS custom properties via design tokens in the Root class, ensuring the component is self-contained without requiring external theme injection.
- **STY-008**: RTL layout MUST be handled using logical CSS properties (`padding-inline`, `border-inline-start`, `border-start-start-radius`, etc.) wherever possible, falling back to the `bpk-rtl` mixin only where logical properties are insufficient.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Component renders correctly with all prop and type combinations across all supported browsers, verified by visual regression tests.
- **SC-002**: All automated accessibility tests pass and zero axe violations are reported for any rendered variant.
- **SC-003**: Manual accessibility testing confirms correct keyboard navigation, screen reader announcements, and focus visibility using VoiceOver (macOS/iOS), NVDA (Windows), and JAWS (Windows).
- **SC-004**: Test coverage meets or exceeds the thresholds: 70% branches, 75% functions, 75% lines, 75% statements.
- **SC-005**: TypeScript compiles without errors and without `// @ts-ignore` suppressions.
- **SC-006**: Storybook stories demonstrate all `type` variants, all interactive states (default, hover, focus, active, disabled — at item and root level), RTL layout, icon-only items, and the CSS variable theming API.
- **SC-007**: README documentation is complete with composable usage examples, the full CSS custom properties table, and a migration guide from V1.
- **SC-008**: Component bundle size increase is within 5 kB gzipped compared to V1.
- **SC-009**: The migration script successfully transforms 100% of straightforward V1 usages in the Skyscanner monorepo, and emits actionable warnings for all patterns it cannot transform automatically.
- **SC-010**: VDL 2.0 styling can be applied by overriding CSS custom properties alone, with zero changes to consumer JSX.
- **SC-011**: V1 component continues to pass all its existing tests after V2 ships; no regressions.
- **SC-012**: No ESLint or Stylelint warnings are introduced.

## Design & Visual Specifications

**Figma**: [Link to VDL 2.0 segmented control Figma file — to be provided by design team]

**Visual States to implement for each Item**:

- Default (unselected, rest)
- Hover (unselected)
- Focus (keyboard — visible focus indicator)
- Selected (rest)
- Selected + Hover
- Selected + Focus
- Disabled (unselected)
- Disabled (selected — if this state is reached programmatically)

**Group-level Visual States**:

- Default with shadow
- Default without shadow

**Responsive behaviour**:
- The group expands to fill the width of its container at all breakpoints.
- Items share the available width equally (equal-width columns).
- On narrow containers (below approx. 320px), text within items truncates with an ellipsis rather than wrapping or overflowing.
- No breakpoint-specific layout changes are required; the component is a single-row horizontal control at all sizes.

## Dependencies & Related Components

**Internal Dependencies**:

- `bpk-react-utils` — for `cssModules`, `isRTL`, `getDataComponentAttribute` utilities (already used by V1)

**External Dependencies**:

- `@ark-ui/react` — **direct dependency** (declared in `dependencies`; consumers receive it automatically). Provides the `SegmentGroup` primitive. Specifically: `SegmentGroup.Root`, `SegmentGroup.Item`, `SegmentGroup.ItemText`, `SegmentGroup.ItemControl`. `SegmentGroup.Indicator` (animated sliding highlight) is intentionally excluded from V2 scope. Version pinning to be determined at implementation time.

**Design Token Dependencies**:

- `@skyscanner/bpk-foundations-web` for design tokens
- `bpk-mixins` for Sass utilities (tokens, typography, radii, shadows, borders, utils)

**Related Components**:

- `bpk-component-segmented-control` (V1) — V2 lives alongside V1 in the same package; V1 must not be broken
- `bpk-component-button` — reference implementation for CSS variable theming approach

## Testing Strategy

### Unit Tests

- Test controlled usage: providing `value` and `onChange`; assert callback receives correct value on interaction.
- Test uncontrolled usage: providing `defaultValue`; assert correct initial selection.
- Test `disabled` on Root: assert all items are non-interactive.
- Test `disabled` on individual Item: assert only that item is non-interactive.
- Test `activationMode="manual"`: assert that arrow-key focus does not change selection until Enter/Space is pressed.
- Test keyboard navigation: ArrowRight, ArrowLeft, Home, End, wrap-around behaviour.
- Test RTL: ArrowRight moves to previous item in RTL.
- Test rendering without children: no crash.
- Test each `type` value produces distinct class names.
- Snapshot tests for each `type` and disabled state.

### Accessibility Tests

- Use jest-axe to assert zero violations for each `type` variant.
- Assert that selected items have the correct accessible state.
- Assert that disabled items are announced as disabled.
- Assert that the group has an accessible name when `label` is provided.
- Assert that icon-only items with a `BpkVisuallyHidden` text node are correctly announced.
- Assert keyboard navigation compliance (roving tabindex pattern).
- Test focus management: only one item in the tab sequence at a time.

### Visual Regression Tests (Percy via Storybook)

- All `type` variants (canvas-default, canvas-contrast, surface-default, surface-contrast).
- Shadow and no-shadow variants.
- Disabled root and disabled individual item.
- Icon-only items.
- Very long label text (overflow/truncation).
- CSS variable theming example (demonstrating VDL 2.0 override).
- RTL layout.
- ⚠️ Do NOT test stories that include raster images (per `decisions/visual-tests.md`).

### Migration Script Tests

- Unit tests against fixture files: known V1 patterns should produce expected V2 output.
- Fixture files covering: plain string array, ReactNode array, all V1 props, dynamic `buttonContents` variable (should emit warning and leave unchanged).

## Documentation Requirements

### README.md

- Brief description of the component and why it is composable (<100 words, British English prose).
- Composable usage example showing Root + Item structure.
- Table of all CSS custom properties with default token values.
- Migration guide from V1 with a before/after code comparison.
- Props table for Root and Item.
- Link to Storybook.

### Storybook (`examples/bpk-component-segmented-control-v2/`)

- Default story: three items, controlled, `canvas-default`.
- Story for each `type` variant.
- Story demonstrating icon + text content inside items.
- Story for icon-only items using `BpkVisuallyHidden` for the accessible label.
- Story for disabled root.
- Story for individually disabled items.
- Story demonstrating CSS variable override (VDL 2.0 preview theme).
- Story for RTL layout.
- a11y Storybook addon enabled for all stories.

### JSDoc/TSDoc Comments

- Root and Item components: purpose and usage notes.
- All props documented with type, default, and plain-language description.
- `@experimental` annotation on V2 until it reaches stable status.

### Figma Code Connect (`.figma.tsx`)

- Connect V2 to the corresponding Figma component.
- Map `type`, `disabled`, `shadow` props to Figma properties.
- Provide composable usage example.

## Migration & Versioning

**Version Type**: MAJOR

**Rationale**: The composable API replaces the `buttonContents` array prop with a structural children model. This is a significant structural alteration requiring consumer code changes, meeting the MAJOR threshold per `decisions/versioning-rules.md`. Per the constitution's V2 guidelines, the new component ships as `BpkSegmentedControlV2` alongside V1, and V1 deprecation begins no earlier than 3 months after V2 reaches stable status.

**Breaking Changes**:

- The `buttonContents: string[] | ReactNode[]` prop is removed in favour of composable `Item` children.
- The `onItemClick: (id: number) => void` callback is replaced by `onChange: (value: string) => void`, using string values instead of numeric indices.
- The top-level import shape changes: consumers import `BpkSegmentedControlV2` (or a re-export from the existing package) rather than the default `BpkSegmentedControl`.

**Deprecations** (following MAJOR release, minimum 3-month window):

- `BpkSegmentedControl` (V1) — deprecated in favour of `BpkSegmentedControlV2`.
- The `buttonContents` and `onItemClick` props — deprecated; provide console warnings in V1 pointing to the migration guide.
- `useSegmentedControlPanels` hook — this hook exists solely to wire tab-panel relationships, which is not supported in V2 (radiogroup model, panel-linking is a non-goal). Deprecated alongside V1 with no V2 equivalent; consumers needing tab-panel linking should use `bpk-component-horizontal-nav`.

**Future API**:

- `BpkSegmentedControlV2` is introduced as an experimental export from `bpk-component-segmented-control`.
- After the deprecation window, V2 will be promoted to the default export and V1 removed in the next MAJOR release cycle.

## Open Questions

- [x] Q1: **Resolved** — `radiogroup`/`radio` (Ark-UI default) adopted. Panel-linking is an explicit non-goal for V2. Consumers requiring tab-panel semantics should use `bpk-component-horizontal-nav`.
- [x] Q2: **Resolved** — Non-animated (static) selected-item highlight only in V2. `BpkSegmentedControlV2.Indicator` (animated sliding highlight) is deferred to a follow-up feature.

## References

- **Ark-UI SegmentGroup**: https://ark-ui.com/docs/components/segment-group
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory
- **V1 Component**: `packages/bpk-component-segmented-control/src/BpkSegmentedControl.tsx`
- **Button V2 CSS Variable Theming Reference**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
