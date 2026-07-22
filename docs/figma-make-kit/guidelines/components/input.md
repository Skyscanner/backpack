# BpkInput

`BpkInput` — a styled single-line text input, wrapping the native `<input>`.

## When to use

Use `BpkInput` for single-line text entry (search boxes, form fields, docked search bars). Always pair it with a `BpkLabel` (or wrap it in `BpkFieldset` for automatic label + validation wiring) — `BpkInput` has no built-in label.

## Variants

| Variant (`INPUT_TYPES`) | Use for |
| --- | --- |
| `text` (default) | General text |
| `email` | Email address |
| `number` | Numeric entry |
| `password` | Password entry |
| `tel` | Phone number |

`clearButtonMode`: `never` (default) / `whileEditing` / `always` — shows a clear (×) button.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | Pair with `BpkLabel htmlFor` |
| `name` | `string` | required | |
| `value` | `string \| number` | required | |
| `type` | `INPUT_TYPES` | `text` | |
| `valid` | `boolean \| null` | `null` | `false` → invalid style + `aria-invalid`; `null`/undefined → neutral |
| `large` | `boolean` | `false` | Larger size |
| `docked` / `dockedFirst` / `dockedMiddle` / `dockedLast` | `boolean` | `false` | Joins adjacent inputs into one visual bar (e.g. From/To fields) |
| `clearButtonMode` | `'never'\|'whileEditing'\|'always'` | `'never'` | When not `'never'`, `clearButtonLabel` and `onClear` become required |
| `clearButtonLabel` | `string \| null` | `null` | Required if `clearButtonMode` ≠ `'never'` |
| `onClear` | `() => void \| null` | `null` | Required if `clearButtonMode` ≠ `'never'` |
| `disabled` | `boolean` | `false` | |

## Examples

```tsx
import BpkInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-input';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';

{/* CORRECT — paired with BpkLabel */}
<BpkLabel htmlFor="destination">Destination</BpkLabel>
<BpkInput id="destination" name="destination" value={value} onChange={onChange} />
```

```tsx
{/* WRONG — no label, and clearButtonMode set without the required onClear/clearButtonLabel */}
<BpkInput id="destination" name="destination" value={value} clearButtonMode="always" />
```

## Rules

- Always pair with `BpkLabel` (manually) or wrap in `BpkFieldset` (automatic label + validation) — never render `BpkInput` without an associated label.
- When `clearButtonMode` is `'always'`, validity icons will not appear — don't combine them expecting both to show.
- Never guess at a `type` value outside `INPUT_TYPES` — no `url`, `date`, etc. exist on this component.
