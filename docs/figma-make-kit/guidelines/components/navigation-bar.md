# BpkNavigationBar

`BpkNavigationBar` — a top app bar with optional leading/trailing action slots and a title; commonly used atop modals or full-screen views.

## When to use

Use `BpkNavigationBar` for a screen-level title bar with back/close/action buttons.

## Variants

| Style (`BAR_STYLES`) | Use for |
| --- | --- |
| `default` | Standard surfaces |
| `onDark` | Dark/contrast backgrounds — must also pass `barStyle` to the leading/trailing buttons |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | Used to build the title's `aria-labelledby` target |
| `title` | `ReactNode` | required | String titles truncate with ellipsis by default; ReactNode titles never truncate |
| `titleTextStyle` | `TextStyle` | `heading5` | Only applies when `title` is a string |
| `wrapTitle` | `boolean` | `false` | Only applies when `title` is a string |
| `leadingButton` / `trailingButton` | `ReactElement \| null` | — | e.g. back/close button |
| `sticky` | `boolean` | `false` | Sticks the bar to the top on scroll |
| `barStyle` | `'default'\|'on-dark'` | `'default'` | |

`BpkNavigationBarIconButton` props: `icon` (required), `label` (required, a11y), `onClick` (required), `barStyle`.

## Examples

```tsx
import BpkNavigationBar, { BpkNavigationBarIconButton } from '@skyscanner/backpack-web/bpk-component-navigation-bar';
import BpkLargeArrowLeftIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/arrow-left';
import BpkLargeCloseIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/close';

{/* CORRECT */}
<BpkNavigationBar
  id="booking-nav"
  title="Confirm booking"
  leadingButton={<BpkNavigationBarIconButton onClick={goBack} icon={BpkLargeArrowLeftIcon} label="Back" />}
  trailingButton={<BpkNavigationBarIconButton onClick={close} icon={BpkLargeCloseIcon} label="Close" />}
/>
```

## Rules

- When `barStyle="on-dark"` is set on the bar, also pass `barStyle` to its leading/trailing buttons — otherwise they stay default-colored and become low-contrast.
- `BpkNavigationBarIconButton`'s `label` is a required accessibility label — never omit it.
