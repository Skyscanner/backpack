# BpkSelect

`BpkSelect` — a styled native `<select>` dropdown; children are plain `<option>` elements.

## When to use

Use `BpkSelect` for selecting one value from a small, known set of options (e.g. passenger count, cabin class). Always pair it with a `BpkLabel` or `BpkFieldset` — it has no built-in label.

## Variants

No semantic type enum. Size/style variants: `large` (boolean), `docked`/`dockedFirst`/`dockedMiddle`/`dockedLast` (boolean, joins adjacent selects into one bar), `image` (a `ReactElement`, e.g. a country flag, rendered before the select).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | |
| `name` | `string` | required | |
| `value` | `string` | — | Controlled value; use `defaultValue` for uncontrolled |
| `valid` | `boolean \| null` | `null` | `false` → invalid style |
| `large` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | |
| `docked` / `dockedFirst` / `dockedMiddle` / `dockedLast` | `boolean` | `false` | Joins adjacent selects |
| `image` | `ReactElement \| null` | `null` | Icon rendered before the select |
| `onChange` | `(e) => void` | — | |
| `children` | `<option>` elements | required | |

## Examples

```tsx
import BpkSelect from '@skyscanner/backpack-web/bpk-component-select';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';

{/* CORRECT */}
<BpkLabel htmlFor="cabin-class">Cabin class</BpkLabel>
<BpkSelect id="cabin-class" name="cabin-class" value={value} onChange={onChange}>
  <option value="economy">Economy</option>
  <option value="business">Business</option>
</BpkSelect>
```

## Rules

- Always pair with `BpkLabel` or `BpkFieldset` — never render without a label.
- Disable individual options via native `<option disabled>` — there is no separate disabled-option prop.
- Use `BpkSelect` only for a small, enumerable option set; for a searchable/large list use `BpkAutosuggest` instead (not covered in this catalog — search the component list if needed).
