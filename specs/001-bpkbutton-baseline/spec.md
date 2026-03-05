# Component Specification: BpkButton (Baseline)

**Package Branch**: `001-bpkbutton-baseline`
**Created**: 2026-03-05
**Status**: Baseline — Documents current as-built behaviour only
**Purpose**: Authoritative current-state reference. No changes, refactors, improvements, or new APIs are proposed.

---

## Constitution Check

*Status reflects the current implementation.*

- [x] **Component-First Architecture**: Component lives in `packages/bpk-component-button/`
- [x] **Naming Conventions**: Component name follows PascalCase (`BpkButton`, internally `BpkButtonV2`)
- [x] **License Headers**: All source files include the Apache 2.0 licence header
- [x] **Modern Sass**: Uses `@use` syntax with granular imports from `bpk-mixins`
- [x] **Accessibility-First**: `accessibility-test.tsx` is present
- [x] **TypeScript**: Written in TypeScript with explicit prop types
- [x] **Test Coverage**: Meets coverage thresholds
- [x] **Documentation**: README.md, Storybook stories, and JSDoc comments are present
- [x] **Versioning**: Package follows SemVer

---

## 1. Public API (Current)

### Component Name

`BpkButton` — default export from `packages/bpk-component-button/index.ts`.
Internally the component is `BpkButtonV2`, defined in `packages/bpk-component-button/src/BpkButtonV2/BpkButton.tsx`.

### Button Types (`BUTTON_TYPES`)

| Value | CSS Modifier Applied | Description |
|---|---|---|
| `primary` | `bpk-button--primary` | Default. Primary action on standard backgrounds. |
| `primaryOnDark` | `bpk-button--primaryOnDark` | Primary action on dark backgrounds. |
| `primaryOnLight` | `bpk-button--primaryOnLight` | Primary action on light/white backgrounds. |
| `secondary` | `bpk-button--secondary` | Secondary or supporting action. |
| `secondaryOnDark` | `bpk-button--secondaryOnDark` | Secondary action on dark backgrounds. |
| `destructive` | `bpk-button--destructive` | Warning or irreversible actions (e.g. delete, remove). |
| `featured` | `bpk-button--featured` | Highest-prominence call-to-action. |
| `link` | `bpk-button--link` | Inline link-style, no background. |
| `linkOnDark` | `bpk-button--linkOnDark` | Inline link-style for dark backgrounds. |

### Size Types (`SIZE_TYPES`)

| Value | CSS Modifier Applied | Description |
|---|---|---|
| `small` | *(none — default)* | Default. Smaller height and padding. |
| `large` | `bpk-button--large` | Larger height and padding. |

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `string | ReactNode` | *(required)* | Button label or inner content. |
| `type` | `ButtonType` | `'primary'` | Visual variant. One of `BUTTON_TYPES`. |
| `size` | `SizeType` | `'small'` | Size variant. One of `SIZE_TYPES`. |
| `disabled` | `boolean` | `false` | Disables the button. When `true` with `href` present, renders as `<button disabled>` instead of `<a>`. |
| `fullWidth` | `boolean` | `false` | Renders the button as a full-width block element. |
| `iconOnly` | `boolean` | `false` | Adjusts horizontal padding for a square icon-only layout. Also suppresses the link underline wrapper for link types. |
| `implicit` | `boolean` | `false` | For `link` and `linkOnDark` types only: adjusts the underline-span modifier class. Has no visible effect on other types. |
| `href` | `string \| null` | `null` | When provided and `disabled` is `false`, the component renders as an `<a>` element navigating to this URL. |
| `blank` | `boolean` | `false` | Opens the link in a new tab (`target="_blank"`). Only meaningful when `href` is provided. |
| `rel` | `string \| undefined` | `undefined` | `rel` attribute on the anchor. When `blank` is `true`, defaults to `'noopener noreferrer'` if not set. |
| `submit` | `boolean` | `false` | Sets `type="submit"` on the underlying `<button>`. Has no effect when rendering as `<a>`. |
| `onClick` | `(event: MouseEvent) => void` | `() => {}` | Click event handler. Receives the native mouse event. |
| `className` | `string \| null` | `null` | Additional CSS class name(s) appended after the built-in BEM classes. |
| `...rest` | `any` | — | All additional props are spread onto the root element unchanged. |

---

## 2. Rendered Structure (High-Level)

### Root Element

The component renders one of two root elements depending on the `href` and `disabled` combination:

- **`<a href={href}>`** — when `href` is a non-null string and `disabled` is `false`
- **`<button type="button">`** — in all other cases
- **`<button type="submit">`** — when `submit` is `true`

Both elements receive:
- A set of BEM CSS classes: `bpk-button` as the base, plus zero or more modifier classes (type, size, fullWidth, iconOnly)
- A `data-*` attribute added by `getDataComponentAttribute('Button')` for analytics identification
- All props passed via `...rest`

### Inner Content Wrapping

The underline wrapper is applied when `shouldUnderline` is true.
`shouldUnderline` is computed as: (`type` is `link` or `linkOnDark`) && (`iconOnly` is `false`) && (`disabled` is `false`). When `shouldUnderline` is true, the `children` are wrapped in an inner `<span>` that carries the link-underline modifier classes:

- Base: `bpk-button--link-underlined`
- With `implicit` and no `alternate`: `bpk-button--link-underlined--implicit`
- With `alternate` (`linkOnDark`) and no `implicit`: `bpk-button--link-underlined--alternate`
- With both `implicit` and `alternate`: `bpk-button--link-underlined--implicit--alternate`

In all other cases, `children` are rendered directly with no wrapper.

### BEM Class Summary

| Condition | Class Applied |
|---|---|
| Always | `bpk-button` |
| `size === 'large'` | `bpk-button--large` |
| `iconOnly === true` | `bpk-button--icon-only` |
| `iconOnly === true && size === 'large'` | `bpk-button--large-icon-only` |
| Always (per `type` value) | `bpk-button--{type}` |
| `fullWidth === true` | `bpk-button--full-width` |
| `isLinkType && iconOnly` | `bpk-button--link--icon-only` |
| `isLinkType && implicit` | `bpk-button--link--implicit` |

---

## 3. Theming Model (Current)

### Mechanism

BpkButton exposes colour values as CSS custom properties (CSS variables) using the `bpk-themeable-property` Sass mixin from `packages/bpk-mixins/_utils.scss`. Each themeable property is declared twice in the compiled CSS:

1. A direct design-token value (acts as a fallback)
2. A `var(--bpk-button-..., fallback)` override

This allows runtime theming: setting a CSS variable on a parent element overrides the token default without recompiling styles. The `bpk-theming` package maps human-readable theme attribute names (defined in `packages/bpk-component-button/src/themeAttributes.ts`) to the corresponding CSS variable names.

**Definition (engineering):** In this specification, “themeable” means a visual value is exposed via the CSS-variable mechanism generated by `utils.bpk-themeable-property` (token fallback + `var(--...)` override), so it can be overridden at runtime by setting CSS custom properties (typically via `bpk-theming`). Coverage may vary by button type and state.

### Themeable Properties

The table below lists properties and states that currently use the CSS-variable theming mechanism in the codebase. It is not an assertion that all visual properties or all states are themeable for every type.

| CSS Property | State | CSS Variable | Applies To |
|---|---|---|---|
| `color` | Normal | `--bpk-button-{type}-text-color` | All solid-background types |
| `color` | Hover | `--bpk-button-{type}-hover-text-color` | All solid-background types |
| `color` | Active | `--bpk-button-{type}-active-text-color` | All solid-background types |
| `background-color` | Normal | `--bpk-button-{type}-background-color` | All solid-background types |
| `background-color` | Hover | `--bpk-button-{type}-hover-background-color` | All solid-background types |
| `background-color` | Active | `--bpk-button-{type}-active-background-color` | All solid-background types |
| `color` | Normal | `--bpk-button-link-on-dark-text-color` | `linkOnDark` only |
| `color` | Hover | `--bpk-button-link-on-dark-hover-text-color` | `linkOnDark` only |
| `color` | Active | `--bpk-button-link-on-dark-active-text-color` | `linkOnDark` only |
| `color` | Disabled | `--bpk-button-link-on-dark-disabled-color` | `linkOnDark` only |
| `font-size` | All | via `buttonFontSize` theme attribute | All types |

Where `{type}` is one of: `primary`, `primary-on-dark`, `primary-on-light`, `secondary`, `secondary-on-dark`, `destructive`, `featured`.

**Note on gradient theme attributes**: `buttonPrimaryGradientStartColor` and `buttonPrimaryGradientEndColor` are declared in `themeAttributes.ts` but no gradient is applied in the current CSS implementation. These attributes have no observable effect today.

### Where This Logic Is Defined

- Mixin declarations and CSS variable assignments: `packages/bpk-mixins/_buttons.scss`
- `bpk-themeable-property` utility mixin: `packages/bpk-mixins/_utils.scss`
- Theme attribute name constants: `packages/bpk-component-button/src/themeAttributes.ts`
- SCSS module applying the mixins: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`

---

## 4. Corner Radius (Current Behaviour)

### Source

Corner radius comes from the design token `$bpk-button-border-radius`, imported via `packages/bpk-mixins/tokens` (which forwards from `@skyscanner/bpk-foundations-web`).

### Application

The token is applied directly via `border-radius: tokens.$bpk-button-border-radius` in the base `bpk-button` Sass mixin (`packages/bpk-mixins/_buttons.scss`). The same token is also re-applied explicitly inside the `bpk-button--icon-only` and `bpk-button--large-icon-only` mixins.

### Behaviour Summary

| Dimension | Behaviour |
|---|---|
| Varies by `type` variant | No — the same token value is used for all nine types |
| Varies by `size` | No — both `small` and `large` use the same token |
| Themeable at runtime | No — the property uses a direct token with no CSS variable wrapping |
| Static or dynamic | Static — fixed at compile time from the token value |

---

## 5. States (Current)

### Hover

**Trigger**: Pointer hover. Applied via the `@include utils.bpk-hover` Sass mixin, which scopes styles inside `.bpk-no-touch-support` to prevent unintended hover states on touch devices.

**Behaviour by type**:

- **Solid-background types** (`primary`, `primaryOnDark`, `primaryOnLight`, `secondary`, `secondaryOnDark`, `destructive`, `featured`): `background-color` and `color` change to their hover/pressed-state variants, via CSS variables with token fallbacks.
- **`link` type**: Background remains `none`. Text colour changes to `$bpk-private-button-link-pressed-foreground-day` (static token, not themeable). `text-decoration` is set to `none`.
- **`linkOnDark` type**: Same structure as `link` hover, but text colour is themeable via `--bpk-button-link-on-dark-hover-text-color`.

### Active / Pressed

**Trigger**: `:active` CSS pseudo-class.

**Behaviour by type**:

- **Solid-background types**: `background-color` and `color` change to their active-state variants. Token values are the same as hover (pressed state). Applied via CSS variables with fallbacks.
- **`link` type**: Background remains `none`. Text colour changes to `$bpk-private-button-link-pressed-foreground-day` (static). `text-decoration: none`.
- **`linkOnDark` type**: Text colour is themeable via `--bpk-button-link-on-dark-active-text-color`.

### Focus / Focus-Visible

No `:focus` or `:focus-visible` rules are defined in `packages/bpk-mixins/_buttons.scss`. The button component does not implement a custom focus ring. Focus appearance is inherited from global stylesheet rules or browser defaults.

### Disabled

**Trigger**: `disabled` prop set to `true`.

When `disabled` is `true`, the component always renders as `<button disabled>` regardless of whether `href` is provided. The native `disabled` attribute prevents keyboard activation and click events.

`cursor: not-allowed` is applied via CSS for all types.

Colour values for the disabled state are set with **static design tokens** (not CSS variables) for most types:

| Type | Disabled Background | Disabled Text Colour | Themeable? |
|---|---|---|---|
| `primary` | `$bpk-private-button-disabled-background-day` | `$bpk-text-disabled-day` | No |
| `primaryOnDark` | `$bpk-private-button-primary-on-dark-disabled-background-day` | `$bpk-private-button-primary-on-dark-disabled-foreground-day` | No |
| `primaryOnLight` | `$bpk-private-button-primary-on-light-disabled-background-day` | `$bpk-private-button-primary-on-light-disabled-foreground-day` | No |
| `secondary` | `$bpk-private-button-disabled-background-day` | `$bpk-text-disabled-day` | No |
| `secondaryOnDark` | `$bpk-private-button-secondary-on-dark-disabled-background-day` | `$bpk-private-button-secondary-on-dark-disabled-foreground-day` | No |
| `destructive` | `$bpk-private-button-disabled-background-day` | `$bpk-text-disabled-day` | No |
| `featured` | `$bpk-private-button-disabled-background-day` | `$bpk-text-disabled-day` | No |
| `link` | `none` | `$bpk-text-disabled-day` | No |
| `linkOnDark` | `none` | via `--bpk-button-link-on-dark-disabled-color` | Yes |

---

## 6. Known Limitations (Non-normative)

*This section is descriptive only. It lists factual limitations of the current implementation and does not propose solutions.*

1. **Disabled state colours are not themeable for most types.** Disabled background and text colours are set with static design tokens for all types except `linkOnDark`. They cannot be overridden via the CSS variable theming model.

2. **Corner radius is not themeable.** `border-radius` is applied from a static design token with no CSS variable wrapper. It cannot be overridden at runtime via a theme.

3. **`link` type colours are entirely static.** The `link` type uses static private tokens for all states (normal, hover, active, disabled). No CSS variables are exposed for this type. Only `linkOnDark` supports theming.

4. **Link underline styling can apply beneath non-text content.** For `type="link"` and `type="linkOnDark"`, underline styling is applied via an inner wrapper span and may extend under non-text elements (e.g. icons) when present.

5. **Focus styling is not defined by the component.** No `:focus` or `:focus-visible` rules exist in the button Sass. Focus ring appearance depends on global stylesheets or browser defaults and may vary across rendering contexts.

6. **The `implicit` prop has no effect on non-link types.** The prop is accepted on all button variants but only produces a CSS class change for `link` and `linkOnDark`. This is not enforced at the TypeScript level.

7. **The `blank` prop has no effect when `href` is absent.** When the component renders as a `<button>` (no `href`), the `blank` prop is silently ignored. This is not enforced at the TypeScript level.

8. **Loading behaviour is provided via a separate component.** `BpkLoadingButton` implements loading-state behaviour separately from `BpkButton`, resulting in duplicated button behaviour and a split API surface.

9. **Gradient theme attributes are declared but unused.** `buttonPrimaryGradientStartColor` and `buttonPrimaryGradientEndColor` exist as entries in `themeAttributes.ts` but no gradient styling is applied in the current CSS. Setting these theme attributes has no visual effect.

10. **Dark mode is not natively supported.** All design tokens use `-day` suffix variants. There is no automatic colour switching for dark-mode rendering contexts.

11. **SVG display is controlled by internal CSS variables.** SVG elements inside link-type buttons are governed by `--bpk-button-svg-display` and `--bpk-button-svg-vertical-align` CSS variables set within the SCSS module. This is an internal implementation detail and not part of the public prop API.

---

## User Scenarios & Testing

### User Story 1 — Primary Action Button (Priority: P1)

A developer needs to trigger a primary action (confirming a choice, submitting a form, or performing a key navigation step). They render `BpkButton` with default props.

**Why this priority**: The primary button is the most commonly used variant and the default rendering path. All other stories build upon this foundation.

**Independent Test**: Can be fully tested by rendering the component with only `children` provided and verifying it displays with primary styling and fires the click handler.

**Acceptance Scenarios**:

1. **Given** a `BpkButton` with only `children` provided, **When** it renders, **Then** it displays with `primary` type styling and `small` size.
2. **Given** a `BpkButton` with `disabled` set to `true`, **When** the user clicks or activates it, **Then** no `onClick` handler fires and the disabled styling is applied.
3. **Given** a `BpkButton` with `submit` set to `true` inside a form, **When** the user activates it, **Then** the form submits.

---

### User Story 2 — Link Navigation (Priority: P2)

A developer needs a button that navigates the user to a URL, rendered as an accessible anchor element.

**Why this priority**: The `href`-based rendering path (as `<a>`) is a distinct code branch with different accessibility semantics from the `<button>` path.

**Independent Test**: Can be fully tested by rendering the component with `href` and verifying it renders as `<a>` with correct attributes.

**Acceptance Scenarios**:

1. **Given** a `BpkButton` with `href` provided and `disabled` false, **When** rendered, **Then** the root element is an `<a>` with the correct `href`.
2. **Given** a `BpkButton` with `href` and `blank` set to `true`, **When** rendered, **Then** the anchor has `target="_blank"` and `rel="noopener noreferrer"`.
3. **Given** a `BpkButton` with `href` and `disabled` set to `true`, **When** rendered, **Then** the component renders as `<button disabled>`, not `<a>`.

---

### User Story 3 — Themed Button (Priority: P3)

A developer integrates the component within a themed surface (e.g. a partner white-label page) and overrides button colours at runtime using the `bpk-theming` package.

**Why this priority**: Theming is a secondary capability layered on top of the core rendering behaviour.

**Independent Test**: Can be tested by applying theme attributes for a solid-background type and verifying that CSS variables override the token default colours.

**Acceptance Scenarios**:

1. **Given** a theme is applied that sets `buttonPrimaryBackgroundColor`, **When** a `primary` button renders, **Then** its background colour reflects the theme value rather than the default token.
2. **Given** a theme is applied for `linkOnDark` disabled colour, **When** a `linkOnDark` button renders in the disabled state, **Then** the disabled text colour reflects the theme value.

---

### Edge Cases

- When `children` is an empty string, the button renders with correct dimensions and no visible label.
- When `className` is provided, the extra classes are appended after the built-in BEM classes without overriding them.
- When `implicit` is `true` on a non-link type, the prop is silently ignored and styling is unchanged.
- When `blank` is `true` but `href` is not provided, the component renders as a standard `<button>` and `blank` has no effect.
- When `fullWidth` is `true`, the button fills its containing block regardless of type or size.

---

## Requirements (Current Behaviour)

### Functional Requirements

- **FR-001**: Component MUST render as `<button type="button">` by default.
- **FR-002**: Component MUST render as `<button type="submit">` when `submit` is `true`.
- **FR-003**: Component MUST render as `<a>` when `href` is a non-null string and `disabled` is `false`.
- **FR-004**: Component MUST render as `<button disabled>` when `href` is provided but `disabled` is `true`.
- **FR-005**: Component MUST apply the BEM modifier class `bpk-button--{type}` based on the `type` prop.
- **FR-006**: Component MUST apply `bpk-button--large` when `size` is `'large'`.
- **FR-007**: Component MUST apply `bpk-button--full-width` when `fullWidth` is `true`.
- **FR-008**: Component MUST apply icon-only padding modifier classes when `iconOnly` is `true`.
- **FR-009**: Component MUST wrap `children` in an underline `<span>` when `type` is `link` or `linkOnDark`, `iconOnly` is `false`, and `disabled` is `false`.
- **FR-010**: Component MUST set `target="_blank"` and default `rel="noopener noreferrer"` when `blank` is `true` and rendering as `<a>`.
- **FR-011**: Component MUST attach a `data-*` analytics attribute via `getDataComponentAttribute('Button')`.
- **FR-012**: Component MUST spread `...rest` props onto the root element.

### Component API

See **Section 1 (Public API)** for the complete props list with types and defaults.

### Non-Functional Requirements

- **NFR-001**: Component is keyboard accessible (Tab to focus, Enter/Space to activate).
- **NFR-002**: Component works with screen readers via semantic HTML elements (`<button>` or `<a>`).
- **NFR-003**: Component supports RTL languages.
- **NFR-004**: Component meets WCAG 2.1 Level AA colour contrast standards for all variants.
- **NFR-005**: Component renders correctly on all supported browsers (Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+).


---

## Success Criteria (Current Baseline)

### Measurable Outcomes

- **SC-001**: All button type and size combinations render without visual regressions across supported browsers.
- **SC-002**: Accessibility tests pass for all variants in all interactive states.
- **SC-003**: Theme attribute overrides correctly change CSS variable colours at runtime for all themeable types.
- **SC-004**: Disabled buttons cannot be activated by keyboard or pointer interaction.
- **SC-005**: Link buttons (`href` provided, not disabled) render as `<a>` and navigate correctly.
- **SC-006**: Disabled link buttons render as `<button disabled>` and do not navigate.
- **SC-007**: `blank` links open in a new tab with correct `rel` attribute values.
- **SC-008**: Icon-only buttons maintain square proportions at both `small` and `large` sizes.

---

## Dependencies & Related Components

**Internal Dependencies**:
- `bpk-mixins` — Sass mixins and design tokens (`_buttons.scss`, `_utils.scss`, `_typography.scss`, `_tokens.scss`)
- `bpk-react-utils` — `cssModules` (CSS Modules class resolver) and `getDataComponentAttribute` (analytics data attribute helper)

**Theming**:
- `bpk-theming` — consumes the CSS variable names declared in `themeAttributes.ts` to apply runtime colour overrides

**Design Token Dependencies**:
- `@skyscanner/bpk-foundations-web` — source of all design tokens consumed via `bpk-mixins/tokens`

---

## References

- **Component Source**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.tsx`
- **Type Definitions**: `packages/bpk-component-button/src/BpkButtonV2/common-types.tsx`
- **SCSS Module**: `packages/bpk-component-button/src/BpkButtonV2/BpkButton.module.scss`
- **Button Sass Mixins**: `packages/bpk-mixins/_buttons.scss`
- **Theming Utility Mixin**: `packages/bpk-mixins/_utils.scss`
- **Theme Attributes**: `packages/bpk-component-button/src/themeAttributes.ts`
- **Package Entry Point**: `packages/bpk-component-button/index.ts`
- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` directory

---

## Theming Coverage Review (Informational Only)

*This section is informational only. It audits theming coverage against the current implementation. It does not define required changes, modify acceptance criteria, or redefine scope.*

### Currently Themeable

| CSS Property | States Covered | Applies To |
|---|---|---|
| Text colour | Normal, Hover, Active | All solid-background types (`primary`, `primaryOnDark`, `primaryOnLight`, `secondary`, `secondaryOnDark`, `destructive`, `featured`) |
| Background colour | Normal, Hover, Active | All solid-background types |
| Text colour | Normal, Hover, Active, Disabled | `linkOnDark` only |
| Font size | All | All types (via `buttonFontSize` theme attribute) |

### Currently Not Themeable (Static Values)

| CSS Property | Current Implementation | Note |
|---|---|---|
| `border-radius` | `tokens.$bpk-button-border-radius` | Same token value for all types and sizes; no CSS variable wrapping |
| Disabled background colour | Static tokens per type | Varies by type; hardcoded at compile time |
| Disabled text colour | Static tokens per type | Varies by type; hardcoded at compile time (except `linkOnDark`) |
| `link` type text colour (all states) | `$bpk-private-button-link-*-foreground-day` (static) | No CSS variable exposed for the `link` type |
| `padding` | Static tokens per size | `6px / 1rem` (small), `12px / 1rem` (large) |
| `min-height` | `$bpk-button-height` / `$bpk-button-large-height` | Per size; static tokens |
| Focus ring / outline | Not defined in component styles | Inherited from global or browser defaults |
| Typography (`font-weight`, `line-height`) | Set via `bpk-label-1` mixin | Not individually exposed as CSS variables |

### Properties That Share the Same Static Pattern as Corner Radius

The following properties use the same implementation approach as `border-radius` — they are set directly from a design token with no `bpk-themeable-property` wrapper:

- `padding` (all size and type variants)
- `min-height` (small and large sizes)
- Disabled state colours for all types except `linkOnDark`
- All colour values for the `link` type

These properties are identifiable in `packages/bpk-mixins/_buttons.scss` by the absence of `@include utils.bpk-themeable-property(...)` wrapping.
