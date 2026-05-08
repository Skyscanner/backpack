# bpk-component-layout

> Backpack layout components and tokens.

## Overview

`bpk-component-layout` provides **layout-only** primitives and layout tokens for Backpack:

- `BpkProvider` – wraps your app or stories to provide the Backpack layout system.
- `BpkBox` – a low‑level layout container for spacing, sizing and structural composition.
- `BpkVessel` – a migration hatch layout primitive that allows `className` and `style` for gradual migration.
- `BpkFlex` – a flexbox layout primitive with an ergonomic, responsive API.
- `BpkGrid` / `BpkGridItem` – grid layout primitives for container + item placement.
- `BpkStack` / `BpkHStack` / `BpkVStack` – stack layout primitives with tokenised gaps.
- Typed layout tokens – spacing and size.

Under the hood, this package is implemented as a **facade over a layout system** and generates **CSS at runtime**, but the public API is Backpack‑flavoured and token‑driven. Consumers should only interact with the Backpack components and tokens described here, not with the underlying system.

## Usage

### BpkProvider

`BpkProvider` must wrap any layout components so that they can resolve Backpack tokens correctly:

```tsx
import { BpkProvider } from '@skyscanner/backpack-web/bpk-component-layout';

export default function App({ children }) {
  return <BpkProvider>{children}</BpkProvider>;
}
```

### BpkBox

`BpkBox` is a layout container that exposes a **restricted, tokenised** prop API. It supports spacing, sizing, structural layout, and Backpack color tokens.

```tsx
import {
  BACKGROUND_COLORS,
  BpkBox,
  BpkProvider,
  BpkSpacing,
} from '@skyscanner/backpack-web/bpk-component-layout';
import { TEXT_COLORS } from '@skyscanner/backpack-web/bpk-component-text';

export default function Example() {
  return (
    <BpkProvider>
      <BpkBox
        padding={BpkSpacing.MD}
        margin={BpkSpacing.MD}
        width="50%"
        minHeight="6rem"
        color={TEXT_COLORS.textPrimary}
        backgroundColor={BACKGROUND_COLORS.surfaceDefault}
        data-testid="layout-box"
      >
        Layout content
      </BpkBox>
    </BpkProvider>
  );
}
```

### BpkVessel

`BpkVessel` is a **migration hatch** layout primitive designed to ease component migration to Backpack. It renders a simple HTML element (default: div) and accepts `className`, `style`, and common HTML attributes needed for migration.

> ⚠️ **Important:** BpkVessel is a **temporary migration tool**, not a permanent solution.

```tsx
import { BpkVessel } from '@skyscanner/backpack-web/bpk-component-layout';

export default function Example() {
  return (
    <BpkVessel
      className="legacy-container"
      style={{ padding: '16px', transition: 'opacity 0.3s' }}
      data-testid="migration-wrapper"
    >
      Migrating content
    </BpkVessel>
  );
}
```

**When to use BpkVessel:**
- During component migration when you need to maintain existing className/style usage
- When you have legacy CSS classes that cannot be immediately refactored
- When you need to pass testing attributes or accessibility props during migration
- As a temporary solution while refactoring components

**Props:**
- `as` - Optional element type (default: 'div'). Accepts: 'div', 'span', 'section', 'article', 'nav', 'main', 'aside', 'header', 'footer'
- All standard HTML attributes: `className`, `style`, `id`, `title`, `dir`, `lang`, `hidden`, etc.
- All ARIA attributes: `aria-label`, `aria-labelledby`, `role`, `tabIndex`, etc.
- All DOM event handlers: `onClick`, `onChange`, `onFocus`, `onBlur`, etc.
- Testing attributes: `data-testid`, `data-cy`, and any `data-*` attributes

BpkVessel accepts **all React.HTMLAttributes** to maximize migration flexibility.

## Layout tokens and props

The layout API is intentionally limited and strongly typed. The main groups are:

- **Spacing** – `padding`, `margin`, logical props (`marginStart`, `marginEnd`, `paddingInline`), `gap`:
  - Values: `BpkSpacing` tokens (`BpkSpacing.XS`, `BpkSpacing.SM`, `BpkSpacing.MD`, …) or percentages (e.g. `'50%'`).
- **Size** – `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`:
  - Values: rem strings (e.g. `'6rem'`), percentages (e.g. `'50%'`) or semantic values (`'auto' | 'full' | 'fit-content'`).
- **Position keyword** – `position`:
  - Values: `'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'`. Supports responsive overrides.
- **Position offsets** – `top`, `right`, `bottom`, `left`:
  - Values: rem strings (e.g. `'1rem'`), percentages (e.g. `'50%'`), or bare `'0'` (no unit required). Supports responsive overrides.
- **Overflow** – `overflow`, `overflowX`, `overflowY`:
  - Values: `'visible' | 'hidden' | 'scroll' | 'auto' | 'clip'`. All three support responsive overrides. Use `overflowX`/`overflowY` for per-axis control (e.g. `overflowX="hidden"` + `overflowY="auto"`).
- **Stacking context** – `zIndex`:
  - Values: any `number` or `'auto'`. Not responsive (z-index is not breakpoint-dependent).
- **Accessibility** – `id`, `role`, `tabIndex`, and all `aria-*` attributes:
  - `id?: string` – for `aria-labelledby`/`aria-describedby` cross-references and anchor navigation.
  - `role?: AriaRole` – ARIA landmark/widget role.
  - `tabIndex?: number` – makes the element focusable.
  - All React `aria-*` props (`aria-label`, `aria-labelledby`, `aria-hidden`, `aria-expanded`, etc.) are supported via `React.AriaAttributes`.
- **Color** – `color`: text color token from `TEXT_COLORS` (same set as `BpkText`).
- **Background color** – `backgroundColor`: background color token from `BACKGROUND_COLORS`.
- **Testing attributes** – `data-testid`, `data-cy` for automation and testing.

In addition, `BpkBox` forwards through a set of **flexbox and grid layout props** from the underlying layout system, for example:

- `display="flex"`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`
- `display="grid"`, `gridTemplateColumns`, `gridTemplateRows`, `gap`

In addition, `BpkBox` re‑introduces a **minimal interaction and accessibility surface**:

- `onClick`, `onFocus`, `onBlur` – event handlers for interactive container patterns.
- `tabIndex`, `role` – make containers focusable and assign ARIA roles (e.g. `role="region"`, `role="button"`).
- `id` – useful for `aria-labelledby`/`aria-describedby` cross-references.
- All `aria-*` props – forwarded directly to the DOM element for full ARIA attribute support.

No other event handlers are exposed on layout components.

## Component roles

- **`BpkProvider`**: Provides the runtime layout system (tokens + breakpoints) for all layout primitives. Wrap your app (or Storybook) with it.
- **`BpkBox`**: The base structural primitive. Use it for spacing/sizing/positioning and for composing simple flex/grid layouts via `display` + related props.
- **`BpkVessel`**: A migration hatch primitive. Use it **temporarily** during migration when you need to maintain className/style props. Plan to migrate to `BpkBox` once legacy styling is removed.
- **`BpkFlex`**: A dedicated flex container primitive. Prefer this when you want a clear, ergonomic flex API (`direction/align/justify/wrap/...`) with Backpack responsive values.
- **`BpkGrid` / `BpkGridItem`**: Dedicated grid primitives. Prefer these for grid layout composition; use `BpkGridItem` when you want explicit spans/placement.
- **`BpkStack` / `BpkHStack` / `BpkVStack`**: Dedicated stack primitives. Prefer these when you want consistent tokenised gaps and the simplest stacking API.

### Color and background color

`BpkBox`, `BpkFlex`, `BpkGrid`, `BpkGridItem`, `BpkStack`, `BpkHStack`, and `BpkVStack` all accept `color` and `backgroundColor` props. Both use CSS classes under the hood (not Chakra inline styles) so they correctly integrate with Backpack's theming system.

> **Note:** `BpkVessel` is a migration hatch that forwards HTML attributes (`className`, `style`) and does **not** support tokenised `color` or `backgroundColor` props.

**`color`** – accepts any value from `TEXT_COLORS` (re-exported from `bpk-component-text`):

```tsx
import { TEXT_COLORS } from '@skyscanner/backpack-web/bpk-component-text';

<BpkBox color={TEXT_COLORS.textPrimary}>...</BpkBox>
<BpkFlex color={TEXT_COLORS.textOnDark}>...</BpkFlex>
```

**`backgroundColor`** – accepts any value from `BACKGROUND_COLORS`, which covers three categories (day mode):

| Category | Tokens |
|---|---|
| Surface | `surfaceDefault`, `surfaceElevated`, `surfaceHero`, `surfaceContrast`, `surfaceHighlight`, `surfaceSubtle`, `surfaceLowContrast`, `surfaceTint` |
| Canvas | `canvas`, `canvasContrast` |
| Status fill | `statusSuccessFill`, `statusDangerFill`, `statusWarningFill` |

```tsx
import {
  BACKGROUND_COLORS,
  BpkBox,
  BpkStack,
} from '@skyscanner/backpack-web/bpk-component-layout';

<BpkBox backgroundColor={BACKGROUND_COLORS.surfaceDefault}>...</BpkBox>
<BpkStack backgroundColor={BACKGROUND_COLORS.statusSuccessFill}>...</BpkStack>
```

### Responsive values

Layout props support **responsive overrides keyed by Backpack breakpoints**.
Instead of Chakra’s default `sm/md/lg` keys or array syntax, use Backpack breakpoint tokens:

- `small-mobile`
- `mobile`
- `small-tablet`
- `tablet`
- `desktop`

Example:

```tsx
<BpkBox
  padding={{
    mobile: BpkSpacing.SM,
    tablet: BpkSpacing.MD,
    desktop: BpkSpacing.LG,
  }}
/>
```

Under the hood these keys are mapped to Chakra’s breakpoint keys (`base`, `sm`, `md`, `lg`, `xl`, `2xl`) before generating CSS.

> **Important:** Responsive values are **mobile-first (min-width)**. A key like `mobile` means “apply from the mobile breakpoint and above” (it is not an “only within mobile” range).

> **Note:** Array-based responsive values (e.g. `padding={[...values]}`) are **not supported**.
> Passing an array will be ignored and will log a warning in non‑production environments.

### Responsive support (high-level)

- **Supported broadly (recommended)**: container-level layout props and spacing tokens (e.g. `padding/margin/gap`, `width/height`, `direction/templateColumns`, etc.)
- **Not automatically universal**: item placement props can be more complex; add responsive support based on real usage (PoC-driven).

In particular:

- **`BpkBox`** supports Backpack responsive values for:
  - **Spacing/size/position** props (tokenised): `padding`, `margin`, `gap`, `width/height`, `top/right/bottom/left`, `position`, `overflow`, `overflowX`, `overflowY`, etc.
  - **Key structural layout props**: `display`, flex container/item props, and grid container props (via Backpack breakpoint keys).
  - **Not responsive**: `zIndex` (stacking context is not breakpoint-dependent), `id`, `aria-*` attributes.
- **`BpkGridItem`** placement props like `colSpan/rowSpan` are currently scalar (non-responsive) and should be extended only when needed.

## Constraints and design principles

To keep layout predictable, performant and consistent with Backpack:

- **No arbitrary class names** – `className` is not supported on layout components; use layout props and tokens instead. **Exception:** `BpkVessel` allows `className` as a migration hatch.
- **No inline styles** – `style` is not supported on layout components to avoid ad‑hoc overrides of the design system. **Exception:** `BpkVessel` allows `style` as a migration hatch.
- **No shorthand props** – Chakra shorthands such as `p`, `m`, `w`, `h`, `bg`, `rounded`, `shadow` are not exposed on Backpack layout components.
- **Tokenised colors only** – `color` and `backgroundColor` are supported but must use Backpack tokens (`TEXT_COLORS` / `BACKGROUND_COLORS`); raw CSS values and Chakra color props (`borderColor`, `borderWidth`, `borderRadius`, `boxShadow`) are not exposed.
- **No composite border shorthands** – props like `border`, `borderX`, `borderInline`, `borderBlock` are not supported.
- **No typography props** – font family/size/line height/etc. should come from dedicated text components, not from layout primitives.
- **No transition/transform props** – layout components are purely structural; animations and transforms should live in higher‑level components.
- **Token‑driven spacing** – spacing props only accept Backpack spacing tokens (or percentages) to keep design consistent and avoid magic numbers.
- **Breakpoint‑driven responsiveness** – responsive overrides must use Backpack breakpoint keys in object form; array syntax is intentionally disabled.

## Storybook and examples

This package includes Storybook examples under `examples/bpk-component-layout` showing:

- Basic spacing
- RTL‑friendly spacing (`marginInline`, `paddingInline`)
- Size props
- Position keyword (`position`) and offset props (`top/right/bottom/left`)
- Overflow props (`overflow`, `overflowX`, `overflowY`)
- Stacking context (`zIndex`)
- Accessibility props (`id`, `aria-label`, `aria-labelledby`)
- Flexbox layout
- Grid layout
- Responsive layout using Backpack breakpoints
- Color (`TEXT_COLORS`)
- Surface, canvas and status fill background colors (`BACKGROUND_COLORS`)

Use these examples as a reference for how to compose layout props and tokens. As new layout components (e.g. `BpkFlex`, `BpkGrid`, `BpkStack`) are added, they should follow the same prop and constraints model.

## Props

Check out the full list of props on [Storybook](https://backpack.github.io/storybook/?path=/docs/bpk-component-layout--documentation).
