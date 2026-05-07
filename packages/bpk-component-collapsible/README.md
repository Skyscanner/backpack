# bpk-component-collapsible

> Backpack collapsible component — a low-level primitive for expand/collapse content built on [Ark UI](https://ark-ui.com/docs/components/collapsible).

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

> **RTL support:** `BpkCollapsible` is built on Ark UI and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application (or the relevant subtree) with `<BpkProvider>`.

## Anatomy

`BpkCollapsible` is a compound component. Consumers compose the trigger row from the exposed parts:

- `BpkCollapsible.Root` — manages open/closed state.
- `BpkCollapsible.Trigger` — clickable header row (renders a real `<button>`).
- `BpkCollapsible.Indicator` — chevron wrapper that rotates on open.
- `BpkCollapsible.Content` — animated expandable region.

## Usage

```tsx
import BpkCollapsible from '@skyscanner/backpack-web/bpk-component-collapsible';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import ChevronDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-down';
import AirportsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/airports';

const Example = () => (
  <BpkCollapsible.Root defaultOpen={false}>
    <BpkCollapsible.Trigger>
      <AirportsIcon />
      <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
      <BpkText textStyle={TEXT_STYLES.label2}>Label</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronDownIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>Contents go here.</BpkCollapsible.Content>
  </BpkCollapsible.Root>
);
```

> Use raw icons (no `withButtonAlignment`) when composing the trigger row. The
> trigger uses `display: flex` with `align-items: center`, so the HOC's
> inline-text margin offsets the icon visually.

## Props

### `BpkCollapsible.Root`

| Prop             | Type                                          | Default     | Description                                                                |
| ---------------- | --------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `children`       | `ReactNode`                                   | _required_  | Trigger and content parts.                                                 |
| `variant`        | `'default' \| 'onContrast'`                   | `'default'` | Surface variant.                                                           |
| `open`           | `boolean`                                     | —           | Controlled open state.                                                     |
| `defaultOpen`    | `boolean`                                     | `false`     | Initial open state when uncontrolled.                                      |
| `onOpenChange`   | `(details: { open: boolean }) => void`        | —           | Called when the open state changes.                                        |
| `onExitComplete` | `() => void`                                  | —           | Called when the close animation completes.                                 |
| `disabled`       | `boolean`                                     | `false`     | Prevents the trigger from toggling.                                        |
| `lazyMount`      | `boolean`                                     | —           | Defer mounting the content until first opened.                             |
| `unmountOnExit`  | `boolean`                                     | —           | Unmount the content when closed.                                           |
| `collapsedHeight`| `string \| number`                            | —           | Height of the content when collapsed (enables a "show more" pattern).      |
| `ids`            | `Partial<{ root; trigger; content }>`         | —           | Custom element ids.                                                        |

> `BpkCollapsible` does not accept `className` or `style` on any of its parts.
> Backpack manages the surface, spacing, focus, and animation styling itself —
> overriding from outside would break the design system contract. If you need
> a wrapper or surrounding layout, use `BpkBox`/`BpkFlex`/`BpkVStack` around
> `BpkCollapsible.Root`.

### `BpkCollapsible.Trigger`, `Indicator`, `Content`

Each accepts `children`. Refs forward to the underlying DOM nodes.

## Accessibility

- `aria-expanded`, `aria-controls`, and `role="region"` wiring is provided by Ark.
- When the collapsible is fully closed, Ark hides the content with the native `hidden` attribute. When `collapsedHeight` keeps closed content mounted for a "show more" pattern, Ark keeps the section present and manages interactive descendants so they stay out of the tab order while closed.
- The chevron `Indicator` is `aria-hidden`.
- Backpack's focus indicator is applied to the trigger when focused via keyboard.

## Animation

The expand/collapse animation is driven by Ark's `data-state` attribute and the `--height` / `--collapsed-height` CSS variables Ark exposes on `Content`. `open` maps to the expand animation, while `closed` and `closing` are both treated as collapsing states. The indicator rotates `0° → 180°`. Animation is disabled when `prefers-reduced-motion: reduce` is set.
