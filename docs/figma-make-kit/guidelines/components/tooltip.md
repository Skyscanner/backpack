# BpkTooltip

`BpkTooltip` — a short, hover/focus-triggered supplementary text bubble for a target element.

## When to use

Use `BpkTooltip` for brief, non-interactive supplementary text (e.g. explaining an abbreviation or icon). If the floating content needs its own buttons/links, use `BpkPopover` instead — tooltips are hover-dismissible and not focus-manageable.

## Variants

| Type (`TOOLTIP_TYPES`) | Use for |
| --- | --- |
| `light` (default) | Standard surfaces |
| `dark` | Emphasis / dark styling |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | required | Sets `aria-label` on `target` |
| `target` | `ReactElement` | required | The element the tooltip attaches to |
| `id` | `string` | required | |
| `children` | `ReactNode \| string` | required | Tooltip content |
| `type` | `'light'\|'dark'` | `'light'` | |
| `placement` | Floating-UI `Placement` | `'bottom'` | |
| `isOpen` | `boolean` | `false` | Controlled visibility |
| `hideOnTouchDevices` | `boolean` | `true` | |

## Examples

```tsx
import BpkTooltip from '@skyscanner/backpack-web/bpk-component-tooltip';

{/* CORRECT — non-interactive content */}
<BpkTooltip ariaLabel="Montréal-Trudeau International Airport" id="airport-code-tooltip" target={<span>YUL</span>}>
  Montréal-Trudeau International Airport
</BpkTooltip>
```

```tsx
{/* WRONG — interactive content inside a tooltip; use BpkPopover instead */}
<BpkTooltip ariaLabel="Actions" id="actions-tooltip" target={<span>⋯</span>}>
  <BpkButton onClick={handleAction}>Do something</BpkButton>
</BpkTooltip>
```

## Rules

- `ariaLabel` is required — tooltips are otherwise invisible to assistive technology.
- Never put interactive controls (buttons/links) inside tooltip content — use `BpkPopover` for that.
