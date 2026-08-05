# BpkCheckbox

`BpkCheckbox` — a self-labeling checkbox; renders as a `<label>` wrapping a checkbox input plus a visual box.

## When to use

Use `BpkCheckbox` for an independent boolean choice inside a form (e.g. "I accept the terms"). Unlike `BpkInput`/`BpkSelect`, it is self-labeling — do not wrap it in a separate `BpkLabel`.

## Variants

No semantic type enum. States: `valid` (boolean, `false` → invalid style), `white` (for dark/contrast backgrounds), `indeterminate` (visual-only, doesn't affect `checked`), `smallLabel`, `required` (shows an asterisk, hidden when disabled).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | required | |
| `label` | `ReactNode` | required | Visible label text (and `aria-label` if a string) |
| `checked` | `boolean` | `false` | |
| `required` | `boolean` | `false` | Shows `*`, hidden when disabled |
| `disabled` | `boolean` | `false` | |
| `white` | `boolean` | `false` | For dark backgrounds |
| `indeterminate` | `boolean` | `false` | Visual minus-sign state only |
| `valid` | `boolean \| null` | `null` | |
| `onChange` | `(e) => void` | — | |

## Examples

```tsx
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

{/* CORRECT — label is a prop, not a separate BpkLabel */}
<BpkCheckbox name="terms" label="I accept the terms" checked={checked} onChange={onChange} />
```

```tsx
{/* WRONG — unnecessary; BpkCheckbox is already the <label> */}
<BpkLabel htmlFor="terms">I accept the terms</BpkLabel>
<BpkCheckbox name="terms" label="I accept the terms" checked={checked} onChange={onChange} />
```

## Rules

- Never wrap `BpkCheckbox` in a separate `BpkLabel` — it self-labels via its own `label` prop.
- `indeterminate` is visual only — it does not change the underlying `checked` value; manage that separately if needed.
