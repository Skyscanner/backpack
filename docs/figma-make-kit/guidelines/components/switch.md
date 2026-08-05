# BpkSwitch

`BpkSwitch` — a self-labeling toggle switch; renders as a `<label>` wrapping a visually-hidden checkbox input and a track/thumb visual.

## When to use

Use `BpkSwitch` for a standalone boolean on/off control (e.g. a settings toggle). For a boolean choice inside a form field list with a visible label row, `BpkCheckbox` is also common — prefer `BpkSwitch` when the action takes effect immediately (no separate "save"/"submit" step).

## Variants

| Variant (`SWITCH_VARIANTS`) | Use for |
| --- | --- |
| `default` | Standard surfaces |
| `onContrast` | Dark/contrast surfaces |

`small` (boolean) — compact size.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | required | No visible `label` prop exists — this is the only accessible name |
| `small` | `boolean` | `false` | |
| `variant` | `'default'\|'onContrast'` | `'default'` | |
| `checked` | `boolean` | — | |
| `onChange` | `(e) => void` | — | |
| `disabled` | `boolean` | — | |

## Examples

```tsx
import BpkSwitch from '@skyscanner/backpack-web/bpk-component-switch';

{/* CORRECT */}
<BpkSwitch ariaLabel="Enable notifications" checked={checked} onChange={onChange} />
```

```tsx
{/* WRONG — there is no `label` prop on BpkSwitch, only `ariaLabel` */}
<BpkSwitch label="Enable notifications" checked={checked} onChange={onChange} />
```

## Rules

- `ariaLabel` is required — there is no visible-label prop, so pair it with adjacent visible text (e.g. a `BpkText` label to the switch's left) if a visible label is needed, and still set `ariaLabel` to match.
- There is no `valid`/invalid state on `BpkSwitch`, unlike `BpkCheckbox`/`BpkRadio`/`BpkInput`.
