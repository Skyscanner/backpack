# BPK Layout Components Rules

`bpk-component-layout` provides layout primitives: `BpkFlex`, `BpkHStack` / `BpkVStack` / `BpkStack`, `BpkGrid` / `BpkGridItem`, `BpkBox`, `BpkVessel`.

**Before writing `display: flex`, `display: grid`, or a structural `<div>` in TSX, check if one of these covers the use case.**

## When to use

Use for **purely structural containers** — elements that only need spacing / sizing / flex / grid with no visual styling.

```tsx
import { BpkFlex, BpkHStack, BpkSpacing } from '../../bpk-component-layout';

// Horizontal row
<BpkFlex align="center" gap={BpkSpacing.Base} padding={BpkSpacing.Base}>
  {children}
</BpkFlex>

// Horizontal stack of evenly-spaced siblings
<BpkHStack gap={BpkSpacing.MD}>
  <Item />
  <Item />
</BpkHStack>
```

Spacing values must use `BpkSpacing` tokens (`BpkSpacing.None`, `BpkSpacing.SM`, `BpkSpacing.Base`, `BpkSpacing.MD`, `BpkSpacing.LG`, `BpkSpacing.XL`, `BpkSpacing.XXL`).

## When NOT to use

Layout components explicitly block visual props. Do NOT use them when the element also needs:

- `background-color` — `backgroundColor?: never`
- `border` / `border-radius` — `border?: never`, `borderRadius?: never`
- `box-shadow` — `boxShadow?: never`
- `transition` / `animation` — `transition?: never`
- Pseudo-class styling (`:hover`, `:focus-within`) — requires SCSS

When a container needs **both layout and visual styling on the same element**, use SCSS for the whole element.

## Mapping

| Use case | Component |
|----------|-----------|
| Horizontal flex row | `BpkFlex` |
| Vertical flex column | `BpkFlex direction="column"` |
| Evenly-spaced horizontal items | `BpkHStack` |
| Evenly-spaced vertical items | `BpkVStack` |
| CSS grid | `BpkGrid` + `BpkGridItem` |
| Generic structural box | `BpkBox` |
| Legacy migration (needs `className`/`style`) | `BpkVessel` ⚠️ temporary — see "BpkVessel" section in `packages/bpk-component-layout/README.md` |
