# BpkFloatingNotification

`BpkFloatingNotification` — a transient, auto-dismissing toast-style notification.

## When to use

Use `BpkFloatingNotification` for ephemeral system feedback (e.g. "Saved to favorites") that doesn't need to persist on the page. For a persistent status message, use `BpkInfoBanner` instead.

## Variants

| Type (`NOTIFICATION_TYPES`) | Use for |
| --- | --- |
| `default` | Standard feedback |
| `critical` | Urgent feedback — announced with `assertive` ARIA live politeness instead of `polite` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | required | Message |
| `icon` | `FunctionComponent` | — | |
| `ctaText` / `onClick` | `string` / `function` | — | Renders a link-styled CTA |
| `type` | `'default'\|'critical'` | `'default'` | |
| `hideAfter` | `number` (ms) | `4000` | Auto-dismiss delay |
| `animateOnEnter` / `animateOnExit` | `boolean` | `true` | |
| `onExit` | `() => void` | — | Called after exit animation completes |

## Examples

```tsx
import BpkFloatingNotification from '@skyscanner/backpack-web/bpk-component-floating-notification';

{/* CORRECT */}
<BpkFloatingNotification text="Saved to favorites" ctaText="Undo" onClick={handleUndo} />
```

## Rules

- Use for transient feedback only — if the message needs to remain visible until the user dismisses it, use `BpkInfoBanner` instead.
- `type="critical"` changes the ARIA live announcement politeness — reserve it for genuinely urgent messages, not routine confirmations.
