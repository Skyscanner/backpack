# BpkSpinner

`BpkSpinner` — an inline loading indicator, shown while content or an action result is pending. Size is chosen by which named export you import, not a `size` prop.

## When to use

Use a spinner for any pending/loading state (page load, waiting on an async action). Inside `BpkButton`, prefer the button's own `loading` prop instead of manually placing a spinner.

## Variants

Three size components — pick by import, not a prop:

| Component | Size |
| --- | --- |
| `BpkSpinner` | Default/small inline size |
| `BpkLargeSpinner` | Larger, for standalone use |
| `BpkExtraLargeSpinner` | Largest, for full-page/section loading states |

`SPINNER_TYPES` (color, applies to all three): `primary` (brand accent), `light` (for dark/color backgrounds), `dark` (default).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'primary'\|'light'\|'dark'` | `'dark'` | Color variant |
| `alignToButton` | `boolean` | `false` | Adjusts sizing/margin to drop into a button in place of its label — not available on `BpkExtraLargeSpinner` |
| `className` | `string \| null` | `null` | |

## Examples

```tsx
import BpkSpinner, { SPINNER_TYPES } from '@skyscanner/backpack-web/bpk-component-spinner';

{/* CORRECT */}
<BpkSpinner type={SPINNER_TYPES.primary} />
```

```tsx
{/* WRONG — there is no `size` prop; import BpkLargeSpinner instead */}
<BpkSpinner size="large" />
```

## Rules

- Size is chosen by which component you import (`BpkSpinner`/`BpkLargeSpinner`/`BpkExtraLargeSpinner`) — there is no `size` prop.
- Inside `BpkButton`, use the button's own `loading` prop rather than manually composing a spinner as a child.
