# bpk-component-layout

> Backpack layout components and tokens.

## Overview

`bpk-component-layout` provides **layout-only** primitives and layout tokens for Backpack:

- `BpkProvider` – wraps your app or stories to provide the Backpack layout system.
- `BpkBox` – a low‑level layout container for spacing, sizing and structural composition.
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

`BpkBox` is a layout container that exposes a **restricted, tokenised** prop API. It is intended for spacing, sizing and structural layout only – not for typography, colors, borders or complex interaction.

```tsx
import {
  BpkBox,
  BpkProvider,
  BpkSpacing,
} from '@skyscanner/backpack-web/bpk-component-layout';

export default function Example() {
  return (
    <BpkProvider>
      <BpkBox
        padding={BpkSpacing.MD}
        margin={BpkSpacing.MD}
        width="50%"
        minHeight="6rem"
        data-testid="layout-box"
      >
        Layout content
      </BpkBox>
    </BpkProvider>
  );
}
```

## Layout tokens and props

The layout API is intentionally limited and strongly typed. The main groups are:

- **Spacing** – `padding`, `margin`, logical props (`marginStart`, `marginEnd`, `paddingInline`), `gap`:
  - Values: `BpkSpacing` tokens (`BpkSpacing.SM`, `BpkSpacing.MD`, …) or percentages (e.g. `'50%'`).
- **Size** – `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`:
  - Values: rem strings (e.g. `'6rem'`), percentages (e.g. `'50%'`) or semantic values (`'auto' | 'full' | 'fit-content'`).
- **Position** – `top`, `right`, `bottom`, `left`:
  - Values: rem strings (e.g. `'1rem'`) or percentages (e.g. `'50%'`).
- **Testing attributes** – `data-testid`, `data-cy` for automation and testing.

In addition, `BpkBox` forwards through a set of **flexbox and grid layout props** from the underlying layout system, for example:

- `display="flex"`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`
- `display="grid"`, `gridTemplateColumns`, `gridTemplateRows`, `gap`

In addition, `BpkBox` re‑introduces a **minimal interaction surface**:

- `onClick`, `onFocus`, `onBlur`

No other event handlers are exposed on layout components.

## Component roles

- **`BpkProvider`**: Provides the runtime layout system (tokens + breakpoints) for all layout primitives. Wrap your app (or Storybook) with it.
- **`BpkBox`**: The base structural primitive. Use it for spacing/sizing/positioning and for composing simple flex/grid layouts via `display` + related props.
- **`BpkFlex`**: A dedicated flex container primitive. Prefer this when you want a clear, ergonomic flex API (`direction/align/justify/wrap/...`) with Backpack responsive values.
- **`BpkGrid` / `BpkGridItem`**: Dedicated grid primitives. Prefer these for grid layout composition; use `BpkGridItem` when you want explicit spans/placement.
- **`BpkStack` / `BpkHStack` / `BpkVStack`**: Dedicated stack primitives. Prefer these when you want consistent tokenised gaps and the simplest stacking API.

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
  - **Spacing/size/position** props (tokenised): `padding`, `margin`, `gap`, `width/height`, `top/right/bottom/left`, etc.
  - **Key structural layout props**: `display`, flex container/item props, and grid container props (via Backpack breakpoint keys).
- **`BpkGridItem`** placement props like `colSpan/rowSpan` are currently scalar (non-responsive) and should be extended only when needed.

## Constraints and design principles

To keep layout predictable, performant and consistent with Backpack:

- **No arbitrary class names** – `className` is not supported on layout components; use layout props and tokens instead.
- **No inline styles** – `style` is not supported on layout components to avoid ad‑hoc overrides of the design system.
- **No shorthand props** – Chakra shorthands such as `p`, `m`, `w`, `h`, `bg`, `rounded`, `shadow` are not exposed on Backpack layout components.
- **No colors, borders, radii or shadows** – visual props such as `color`, `backgroundColor`, `borderColor`, `borderWidth`, `borderRadius`, `boxShadow` are not part of the layout surface.
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
- Position props
- Flexbox layout
- Grid layout
- Responsive layout using Backpack breakpoints

Use these examples as a reference for how to compose layout props and tokens. As new layout components (e.g. `BpkFlex`, `BpkGrid`, `BpkStack`) are added, they should follow the same prop and constraints model.
