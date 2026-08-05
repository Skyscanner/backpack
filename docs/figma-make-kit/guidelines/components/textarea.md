# BpkTextarea

`BpkTextarea` — a styled multi-line text input, wrapping the native `<textarea>`.

## When to use

Use `BpkTextarea` for multi-line free text entry (comments, notes, messages). Always pair it with a `BpkLabel` — it has no built-in label. For single-line entry use `BpkInput` instead.

## Variants

No semantic type enum. `valid` (boolean, `false` → invalid style), `large` (boolean, bigger size).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | |
| `name` | `string` | required | |
| `value` | `string` | required | |
| `valid` | `boolean` | `undefined` | Only `false` triggers invalid style |
| `large` | `boolean` | `false` | |
| `onChange` | `(e) => void` | — | |
| `className` | `string` | — | |

## Examples

```tsx
import BpkTextarea from '@skyscanner/backpack-web/bpk-component-textarea';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';

{/* CORRECT */}
<BpkLabel htmlFor="notes">Notes</BpkLabel>
<BpkTextarea id="notes" name="notes" value={value} onChange={onChange} />
```

## Rules

- Always pair with `BpkLabel` — never render without one.
- No clear-button or docking support (unlike `BpkInput`) — don't invent those props here.
