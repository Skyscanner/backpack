# BpkRadio

`BpkRadio` — a self-labeling radio button; renders as a `<label>` wrapping a radio input plus a visual circle.

## When to use

Use `BpkRadio` for a single option within a mutually-exclusive, visible list of choices. There is no separate `BpkRadioGroup` component — build a group by giving multiple `BpkRadio`s the same `name`, different `value`s, and managing `checked` from shared parent state.

## Variants

No semantic type enum. States: `valid` (boolean, `false` → invalid style), `white` (for dark backgrounds), `disabled`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | required | Shared across a group |
| `label` | `ReactNode` | required | |
| `ariaLabel` | `string \| null` | `null` | Overrides `aria-label` (falls back to `label` if it's a string) |
| `disabled` | `boolean` | `false` | |
| `white` | `boolean` | `false` | |
| `valid` | `boolean \| null` | `null` | |
| `value` | `string` | — | Native radio value |
| `checked` | `boolean` | — | |
| `onChange` | `(e) => void` | — | |

## Examples

```tsx
import BpkRadio from '@skyscanner/backpack-web/bpk-component-radio';

{/* CORRECT — group built manually via shared name */}
{cities.map((city) => (
  <BpkRadio
    key={city}
    name="destination-city"
    value={city}
    checked={selected === city}
    onChange={() => setSelected(city)}
    label={city}
  />
))}
```

## Rules

- Grouping is a manual convention (shared `name`, individually managed `checked`) — there is no wrapper component that enforces it, and `BpkFieldset` is not used for radio groups.
- `BpkRadio` self-labels via its `label` prop — never wrap it in a separate `BpkLabel`.
- No `required`/asterisk support (unlike `BpkCheckbox`) and no indeterminate state.
