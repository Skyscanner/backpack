# bpk-component-layout

> ## 🧪 Experimental Component
>
> ### Why experimental?
>
> The `bpk-component-layout` package introduces a new layout system for Backpack,
> providing layout-only primitives (BpkBox, BpkFlex, BpkGrid, BpkStack, BpkVessel, BpkProvider)
> built on modern layout APIs with Backpack design tokens.
>
> This component is in active development and the API may change based on feedback
> and real-world usage. Use with caution in production.
>
> ### Help and feedback
>
> As an experimental component, we want to hear about your experience.
>
> For queries: @design-system-web-gf in #backpack
> 
> For design queries: @backpack-design in #backpack-design-chat
> 
>`Backpack layout components and tokens.

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
- **`BpkVessel`**: A migration hatch primitive. Use it **temporarily** during migration when you need to maintain className/style props. Plan to migrate to `BpkBox` once legacy styling is removed.
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

- **No arbitrary class names** – `className` is not supported on layout components; use layout props and tokens instead. **Exception:** `BpkVessel` allows `className` as a migration hatch.
- **No inline styles** – `style` is not supported on layout components to avoid ad‑hoc overrides of the design system. **Exception:** `BpkVessel` allows `style` as a migration hatch.
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

## Props

> **Note:** As an experimental component, these props are subject to change.

### Common Props (Core)

All layout components share these common props (except `BpkVessel`):

| Name | Type |
|------|------|
| children | `ReactNode` |
| padding | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingTop | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingRight | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingBottom | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingLeft | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingStart | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingEnd | `BpkResponsiveValue<BpkSpacingValue>` |
| paddingInline | `BpkResponsiveValue<BpkSpacingValue>` |
| margin | `BpkResponsiveValue<BpkSpacingValue>` |
| marginTop | `BpkResponsiveValue<BpkSpacingValue>` |
| marginRight | `BpkResponsiveValue<BpkSpacingValue>` |
| marginBottom | `BpkResponsiveValue<BpkSpacingValue>` |
| marginLeft | `BpkResponsiveValue<BpkSpacingValue>` |
| marginStart | `BpkResponsiveValue<BpkSpacingValue>` |
| marginEnd | `BpkResponsiveValue<BpkSpacingValue>` |
| marginInline | `BpkResponsiveValue<BpkSpacingValue>` |
| gap | `BpkResponsiveValue<BpkSpacingValue>` |
| width | `BpkResponsiveValue<BpkSizeValue>` |
| height | `BpkResponsiveValue<BpkSizeValue>` |
| minWidth | `BpkResponsiveValue<BpkSizeValue>` |
| minHeight | `BpkResponsiveValue<BpkSizeValue>` |
| maxWidth | `BpkResponsiveValue<BpkSizeValue>` |
| maxHeight | `BpkResponsiveValue<BpkSizeValue>` |
| top | `BpkResponsiveValue<BpkPositionValue>` |
| right | `BpkResponsiveValue<BpkPositionValue>` |
| bottom | `BpkResponsiveValue<BpkPositionValue>` |
| left | `BpkResponsiveValue<BpkPositionValue>` |
| data-testid | `string` |
| data-cy | `string` |

**Spacing tokens:** `BpkSpacing.SM`, `BpkSpacing.MD`, `BpkSpacing.LG`, etc.
**Responsive values:** `{ mobile: value, tablet: value, desktop: value }`
**Complete type:** See `src/commonProps.ts` for BpkCommonLayoutProps.

### BpkBox

In addition to common props:

#### Display & Layout
| Name | Type |
|------|------|
| display | `BpkResponsiveValue<string>` |

#### Flexbox Props
| Name | Type |
|------|------|
| flexDirection | `BpkResponsiveValue<string>` |
| flexWrap | `BpkResponsiveValue<string>` |
| justifyContent | `BpkResponsiveValue<string>` |
| alignItems | `BpkResponsiveValue<string>` |
| alignContent | `BpkResponsiveValue<string>` |
| flex | `BpkResponsiveValue<string \| number>` |
| flexGrow | `BpkResponsiveValue<number>` |
| flexShrink | `BpkResponsiveValue<number>` |
| flexBasis | `BpkResponsiveValue<string>` |
| order | `BpkResponsiveValue<number>` |
| alignSelf | `BpkResponsiveValue<string>` |
| justifySelf | `BpkResponsiveValue<string>` |

#### Grid Props
| Name | Type |
|------|------|
| gridTemplateColumns | `BpkResponsiveValue<string>` |
| gridTemplateRows | `BpkResponsiveValue<string>` |
| gridTemplateAreas | `BpkResponsiveValue<string>` |
| gridAutoFlow | `BpkResponsiveValue<string>` |
| gridAutoRows | `BpkResponsiveValue<string>` |
| gridAutoColumns | `BpkResponsiveValue<string>` |
| gridColumn | `BpkResponsiveValue<string>` |
| gridRow | `BpkResponsiveValue<string>` |
| rowGap | `BpkResponsiveValue<BpkSpacingValue>` |
| columnGap | `BpkResponsiveValue<BpkSpacingValue>` |

#### Event Handlers
| Name | Type |
|------|------|
| onClick | `(event: React.MouseEvent) => void` |
| onFocus | `(event: React.FocusEvent) => void` |
| onBlur | `(event: React.FocusEvent) => void` |

See `src/types.ts` (BpkBoxProps, BpkFlexGridProps) for complete types.

### BpkFlex

In addition to common props:

| Name | Type |
|------|------|
| direction | `BpkResponsiveValue<'row' \| 'column' \| ...>` |
| justify | `BpkResponsiveValue<string>` |
| align | `BpkResponsiveValue<string>` |
| wrap | `BpkResponsiveValue<string>` |
| grow | `BpkResponsiveValue<number>` |
| shrink | `BpkResponsiveValue<number>` |
| basis | `BpkResponsiveValue<BpkBasisValue>` |
| inline | `boolean` |

See `src/types.ts` (BpkFlexProps) for complete types.

### BpkGrid

In addition to common props:

| Name | Type |
|------|------|
| templateColumns | `BpkResponsiveValue<string>` |
| templateRows | `BpkResponsiveValue<string>` |
| templateAreas | `BpkResponsiveValue<string>` |
| autoFlow | `BpkResponsiveValue<string>` |
| autoRows | `BpkResponsiveValue<string>` |
| autoColumns | `BpkResponsiveValue<string>` |
| justify | `BpkResponsiveValue<string>` |
| align | `BpkResponsiveValue<string>` |
| rowGap | `BpkResponsiveValue<BpkSpacingValue>` |
| columnGap | `BpkResponsiveValue<BpkSpacingValue>` |
| column | `BpkResponsiveValue<string>` |
| row | `BpkResponsiveValue<string>` |
| inline | `boolean` |

See `src/types.ts` (BpkGridProps) for complete types.

### BpkGridItem

In addition to common props:

| Name | Type |
|------|------|
| area | `string` |
| colSpan | `number` |
| rowSpan | `number` |
| colStart | `number \| string` |
| colEnd | `number \| string` |
| rowStart | `number \| string` |
| rowEnd | `number \| string` |

### BpkStack / BpkHStack / BpkVStack

In addition to common props, inherits flex/grid layout props.

- `BpkStack`: Vertical stack (configurable)
- `BpkHStack`: Horizontal stack
- `BpkVStack`: Vertical stack

### BpkVessel

Migration-focused component with different props:

| Name | Type |
|------|------|
| as | `'div' \| 'span' \| 'section' \| ...` |
| children | `ReactNode` |
| className | `string` |
| style | `CSSProperties` |

Accepts all `React.HTMLAttributes` including `aria-*`, `data-*`, event handlers, etc.

### Responsive Values

Props support responsive values using Backpack breakpoint keys:

```tsx
<BpkBox padding={{ mobile: BpkSpacing.SM, desktop: BpkSpacing.LG }} />
```

**Breakpoints:** `small-mobile`, `mobile`, `small-tablet`, `tablet`, `desktop`
