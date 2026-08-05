# BpkHorizontalNav

`BpkHorizontalNav` — an underline-style tab bar (`role="tablist"`) with horizontal scroll on narrow viewports. Fully uncontrolled — compose `BpkHorizontalNavItem` children and manage `selected` state yourself.

## When to use

Use `BpkHorizontalNav` for a simple tab bar you compose from static children. For a data-driven tab list (array of tab objects, with icons/badges), use `BpkNavigationTabGroup` instead — the two components are not interchangeable.

## Variants

| Type (`HORIZONTAL_NAV_TYPES`) | Use for |
| --- | --- |
| `default` | Standard surfaces |
| `light` | Dark/contrast backgrounds |

## Props

**`BpkHorizontalNav`**: `children` (required), `ariaLabel`, `autoScrollToSelected` (boolean, default `false`), `showUnderline` (boolean, default `true` — the bar's own bottom border, not the per-item underline), `type`.

**`BpkHorizontalNavItem`**:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Label |
| `selected` | `boolean` | `false` | Mutually exclusive with `disabled` |
| `disabled` | `boolean` | `false` | Mutually exclusive with `selected` |
| `href` | `string \| null` | `null` | If set, renders `<a role="tab">`; otherwise `<button role="tab">` |
| `spaceAround` | `boolean` | `false` | Distributes items with equal spacing |

## Examples

```tsx
import BpkHorizontalNav, { BpkHorizontalNavItem } from '@skyscanner/backpack-web/bpk-component-horizontal-nav';

{/* CORRECT */}
<BpkHorizontalNav>
  <BpkHorizontalNavItem selected={selected === 'flights'} onClick={() => setSelected('flights')}>
    Flights
  </BpkHorizontalNavItem>
  <BpkHorizontalNavItem selected={selected === 'hotels'} onClick={() => setSelected('hotels')}>
    Hotels
  </BpkHorizontalNavItem>
</BpkHorizontalNav>
```

```tsx
{/* WRONG — selected and disabled must not both be true on the same item */}
<BpkHorizontalNavItem selected disabled>Hotels</BpkHorizontalNavItem>
```

## Rules

- `selected` and `disabled` must never both be `true` on the same item.
- This component is uncontrolled by design — you own the selection state; it does not track selection internally.
- For a data-driven tab list with icons or "new" badges, use `BpkNavigationTabGroup` instead.
