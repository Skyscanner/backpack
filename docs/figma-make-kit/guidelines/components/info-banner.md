# BpkInfoBanner

`BpkInfoBanner` — a persistent in-page alert/status message. This is the current component; **`BpkBannerAlert` is deprecated** — never use it in new work even if a prompt says "banner alert."

## When to use

Use `BpkInfoBanner` for a persistent, page-level status message (e.g. "Your booking is confirmed", "This fare is no longer available"). For a transient, auto-dismissing message, use `BpkFloatingNotification` instead.

## Variants

| Type (`ALERT_TYPES`) | Use for |
| --- | --- |
| `success` | Positive confirmation |
| `warning` | Cautionary message |
| `error` | Recoverable problem |
| `critical` | Severe/urgent problem |
| `info` (default) | Neutral information |

`STYLE_TYPES` (`style` prop): `default`, `onContrast` (for dark/contrast surfaces).

Two composed variants exist as separate exports:

| Component | Adds |
| --- | --- |
| `BpkInfoBannerDismissable` | `dismissButtonLabel` (required), `onDismiss` |
| `BpkInfoBannerExpandable` | `children` (collapsible body, required), `expanded`, `toggleButtonLabel` (required), `onExpandToggle`, `action` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `AlertTypeValue` | `info` | Drives icon + color |
| `message` | `ReactNode \| string` | required | Header message |
| `style` | `'default'\|'onContrast'` | `'default'` | |
| `show` | `boolean` | `true` | |
| `icon` | `FunctionComponent` | — | Custom icon override |

## Examples

```tsx
import { BpkInfoBannerDismissable, ALERT_TYPES } from '@skyscanner/backpack-web/bpk-component-info-banner';

{/* CORRECT */}
<BpkInfoBannerDismissable
  type={ALERT_TYPES.success}
  message="Booking confirmed"
  dismissButtonLabel="Dismiss"
  onDismiss={handleDismiss}
/>
```

```tsx
{/* WRONG — BpkBannerAlert is deprecated, always use BpkInfoBanner */}
import BpkBannerAlert from '@skyscanner/backpack-web/bpk-component-banner-alert';
<BpkBannerAlert type="success" message="Booking confirmed" />
```

## Rules

- Never import `BpkBannerAlert` — always route to `BpkInfoBanner` (or its `Dismissable`/`Expandable` variants).
- Choose `type` by the actual status being communicated — don't default to `info` for a success/error message.
- `BpkInfoBannerDismissable`'s `dismissButtonLabel` and `BpkInfoBannerExpandable`'s `toggleButtonLabel` are required accessibility labels — never omit them.
