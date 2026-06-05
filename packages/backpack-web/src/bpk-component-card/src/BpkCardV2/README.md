# BpkCardV2

`BpkCardV2` is a composable card component built from explicit subcomponents: `Header`, `Body`, `Footer`, `Section`, and `Divider`. It supports multiple visual variants, customisable surface colors, and responsive multi-column layouts.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

### Basic usage

```tsx
import { BpkCardV2 } from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardV2.Root>
    <BpkCardV2.Header>Card title</BpkCardV2.Header>
    <BpkCardV2.Body>Card body content.</BpkCardV2.Body>
    <BpkCardV2.Footer>Footer content</BpkCardV2.Footer>
  </BpkCardV2.Root>
);
```

### Variants

Use the `variant` prop to control the card's visual treatment. Available values are exported from `CARD_V2_VARIANTS`.

| Variant | Description |
|---|---|
| `default` | Drop shadow that lifts on hover. Pointer cursor. |
| `outlined` | Border instead of shadow. No hover elevation. |
| `noElevation` | No shadow, no border. Flat appearance. |
| `carsPrompt` | Bespoke variant — see below. |

```tsx
import {
  BpkCardV2,
  CARD_V2_VARIANTS,
} from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined}>
    <BpkCardV2.Body>Outlined card</BpkCardV2.Body>
  </BpkCardV2.Root>
);
```

### Surface colors

Use the `bgColor` prop to set the card's background surface color. Available values are exported from `CARD_V2_SURFACE_COLORS`. Defaults to `surfaceDefault`.

```tsx
import {
  BpkCardV2,
  CARD_V2_SURFACE_COLORS,
} from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardV2.Root bgColor={CARD_V2_SURFACE_COLORS.surfaceElevated}>
    <BpkCardV2.Body>Elevated surface card</BpkCardV2.Body>
  </BpkCardV2.Root>
);
```

### Multi-column layout

Use `templateColumns` on `BpkCardV2.Body` to create responsive multi-column layouts. Add a `BpkCardV2.Divider` between `BpkCardV2.Section` children and include an `auto` column in `templateColumns` to reserve space for it.

```tsx
import { BpkCardV2 } from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  <BpkCardV2.Root>
    <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}>
      <BpkCardV2.Section>Main content</BpkCardV2.Section>
      <BpkCardV2.Divider />
      <BpkCardV2.Section>Sidebar content</BpkCardV2.Section>
    </BpkCardV2.Body>
  </BpkCardV2.Root>
);
```

On mobile the columns stack vertically; the `Divider` renders as a horizontal rule. On tablet and above the columns are laid out side-by-side and the `Divider` renders as a vertical rule.

### `carsPrompt` variant

> **Note:** `carsPrompt` is a bespoke variant with fixed, opinionated styles. It does not support `bgColor` or any other background customisation.

The `carsPrompt` variant renders an interactive card that transitions its background color on hover and active states. The background colors are defined by the design and cannot be overridden.

Passing `bgColor` alongside `variant="carsPrompt"` is a **TypeScript error** — the prop is typed as `never` for this variant.

```tsx
import {
  BpkCardV2,
  CARD_V2_VARIANTS,
} from '@skyscanner/backpack-web/bpk-component-card';

export default () => (
  // bgColor must not be set here — TypeScript will report an error if you try.
  <BpkCardV2.Root variant={CARD_V2_VARIANTS.carsPrompt} onClick={handleClick}>
    <BpkCardV2.Body>Cars prompt content</BpkCardV2.Body>
  </BpkCardV2.Root>
);
```
