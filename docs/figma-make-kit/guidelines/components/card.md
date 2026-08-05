# BpkCardV2

`BpkCardV2` — a composable container for grouping related content, with explicit `Header`/`Body`/`Footer`/`Section`/`Divider` slots and responsive multi-column layout.

## When to use

Use `BpkCardV2` for any card/tile surface. It's the current, preferred card API — prefer it over the older `BpkCard` for new composition work. `BpkCard` (v1) remains a simple button/link/div wrapper with no Header/Body/Footer composition; only reach for it if you specifically need its plain clickable-container behavior and not the composed layout.

## Variants

| Variant (`CARD_V2_VARIANTS`) | Use for |
| --- | --- |
| `default` | Standard interactive card — drop shadow, lifts on hover |
| `outlined` | Border instead of shadow, no hover elevation |
| `noElevation` | Flat, no shadow/border |
| `carsPrompt` | Bespoke fixed-background variant for cars prompts — `bgColor` cannot be set with this variant |

`CARD_V2_SURFACE_COLORS` (the `bgColor` prop, default `surfaceDefault`): `surfaceDefault`, `surfaceElevated`, `surfaceTint`, `surfaceSubtle`, `surfaceHero`, `surfaceContrast`, `surfaceLowContrast`, `surfaceHighlight`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `BpkCardV2Variant` | `default` | See table above |
| `bgColor` | `BpkCardV2SurfaceColor` | `surfaceDefault` | Invalid when `variant="carsPrompt"` |
| `children` | `ReactNode` | required | Use `.Header`/`.Body`/`.Footer` subcomponents |

`BpkCardV2.Body` accepts `templateColumns` (a `BpkGrid` prop) for multi-column layout; pair each `Section` with a `Divider`.

## Examples

```tsx
import BpkCardV2, { CARD_V2_VARIANTS, CARD_V2_SURFACE_COLORS } from '@skyscanner/backpack-web/bpk-component-card';

{/* CORRECT */}
<BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined} bgColor={CARD_V2_SURFACE_COLORS.surfaceElevated}>
  <BpkCardV2.Header>Amsterdam Hostel</BpkCardV2.Header>
  <BpkCardV2.Body>Content</BpkCardV2.Body>
  <BpkCardV2.Footer>From $42/night</BpkCardV2.Footer>
</BpkCardV2.Root>
```

```tsx
{/* WRONG — bgColor cannot be combined with the carsPrompt variant */}
<BpkCardV2.Root variant={CARD_V2_VARIANTS.carsPrompt} bgColor={CARD_V2_SURFACE_COLORS.surfaceTint}>
  ...
</BpkCardV2.Root>
```

## Rules

- Always compose via `BpkCardV2.Root` / `.Header` / `.Body` / `.Footer` — don't nest raw `<div>`s inside a card instead of the provided slots.
- `bgColor` is not settable when `variant="carsPrompt"`.
- Prefer surface color and the `variant` prop over any custom shadow/border styling.
