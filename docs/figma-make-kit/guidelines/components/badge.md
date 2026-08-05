# BpkBadge

`BpkBadge` — a small inline status/label indicator, typically paired with text, rendered as a `<span>`.

## When to use

Use `BpkBadge` for status labels, counters, and tags next to other content (e.g. "Cheapest", "Sold out", "New"). Always use `BpkBadge` from `@skyscanner/backpack-web/bpk-component-badge`, never a raw styled `<span>`.

## Variants

| Variant (`BADGE_TYPES`) | Use for |
| --- | --- |
| `normal` (default) | Neutral label |
| `success` | Positive status |
| `warning` | Cautionary status |
| `critical` | Negative/urgent status |
| `strong` | High-emphasis neutral label |
| `brand` | Brand-colored label |
| `subtle` | Low-emphasis label |
| `inverse` | For use on dark backgrounds |
| `outline` | For use on dark or image backgrounds |

IMPORTANT: Valid `type` values are exactly the `BADGE_TYPES` above — do NOT invent a variant name.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `BadgeType` | `normal` | See variants table |
| `docked` | `'right'\|'left' \| null` | `null` | Docks the badge to an edge (e.g. overlaying imagery) |
| `centered` | `boolean` | `false` | Vertically aligns the badge to the center of surrounding text |
| `children` | `string \| ReactNode` | required | Text and/or icon content |
| `className` | `string \| null` | `null` | Additional CSS class |

## Examples

```tsx
import BpkBadge, { BADGE_TYPES } from '@skyscanner/backpack-web/bpk-component-badge';
import BpkSmallTickIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/tick';

{/* CORRECT — icon placed as a child, badge has no dedicated icon slot */}
<BpkBadge type={BADGE_TYPES.success}><BpkSmallTickIcon /> Confirmed</BpkBadge>
```

```tsx
{/* WRONG — leadingIcon is not a BpkBadge prop */}
<BpkBadge type={BADGE_TYPES.success} leadingIcon={<BpkSmallTickIcon />}>Confirmed</BpkBadge>
```

## Rules

- There is no `size` prop — badges have one fixed size.
- Icons go directly in `children`, alongside the text — `BpkBadge` has no `leadingIcon`/`trailingIcon` slot (unlike `BpkButton`).
- Choose `type` by the status it represents (`success`/`warning`/`critical`), never by picking a color that "looks right."
