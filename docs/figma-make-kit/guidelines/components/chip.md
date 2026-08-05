# BpkChip / BpkChipGroup

Four related chip components (`BpkSelectableChip`, `BpkDismissibleChip`, `BpkDropdownChip`, `BpkIconChip`) plus a grouping component (`BpkMultiSelectChipGroup` / `BpkSingleSelectChipGroup`) for filterable, toggleable tag-style choices.

## When to use

Use a chip for a filter or selectable tag (e.g. "Direct flights", "Free cancellation"). Always use these from `@skyscanner/backpack-web/bpk-component-chip` and `bpk-component-chip-group`, never a raw styled button/pill.

## Variants

| Component | Behavior |
| --- | --- |
| `BpkSelectableChip` (default export) | Base toggle chip; `role="checkbox"` by default, sets `aria-checked` |
| `BpkDismissibleChip` | Selected, non-disableable chip with a built-in trailing close icon — for "remove this filter" chips |
| `BpkDropdownChip` | Chip with a built-in trailing chevron-down icon — opens a menu |
| `BpkIconChip` | Icon-only chip — no text children, requires `leadingAccessoryView` |

`CHIP_TYPES` (color theme, not "kind"): `default`, `onDark`, `onImage`.

IMPORTANT: `BpkIconChip` structurally forbids `children` and `trailingAccessoryView` — passing them is a type error, not a valid variant.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `accessibilityLabel` | `string` | required | Every chip needs one — no default |
| `onClick` | `(e) => void` | required | |
| `disabled` | `boolean` | `false` | Not settable on `BpkDismissibleChip` (always enabled) |
| `selected` | `boolean` | `false` | Not settable on `BpkDismissibleChip` (always selected) |
| `leadingAccessoryView` / `trailingAccessoryView` | `ReactNode` | `null` | Icon slots; `BpkIconChip` exposes only `leadingAccessoryView` (required) |
| `type` | `CHIP_TYPES` value | `default` | Color theme |
| `children` | `ReactNode \| string` | — | Chip label (omit for `BpkIconChip`) |

`BpkMultiSelectChipGroup` props: `type` (`CHIP_GROUP_TYPES.rail`\|`wrap`), `chips: ChipItem[]`, `label?`, `ariaLabel?`, `chipStyle?` (a `CHIP_TYPES` value), `ariaMultiselectable?` (default `true`). `BpkSingleSelectChipGroup` forces `ariaMultiselectable={false}` and adds `onItemClick?`/`selectedIndex?`.

## Examples

```tsx
import BpkSelectableChip from '@skyscanner/backpack-web/bpk-component-chip';

{/* CORRECT */}
<BpkSelectableChip
  accessibilityLabel="Toggle direct flights filter"
  selected={selected}
  onClick={() => setSelected(!selected)}
>
  Direct flights
</BpkSelectableChip>
```

```tsx
{/* WRONG — BpkIconChip's type forbids children/trailingAccessoryView */}
<BpkIconChip accessibilityLabel="Filter" leadingAccessoryView={<FilterIcon />} trailingAccessoryView={<ChevronIcon />}>
  Filter
</BpkIconChip>
```

## Rules

- `accessibilityLabel` is required on every chip — never omit it.
- When composing chips manually (not via `BpkChipGroup`), wrap them in a flex container so they align with each other.
- Prefer `BpkChipGroup` (`BpkMultiSelectChipGroup`/`BpkSingleSelectChipGroup`) over manually composing individual chips when building a filter row — it manages mutual exclusivity and ARIA roles for you.
