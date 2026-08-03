# bpk-component-drawer-v2

> Experimental Backpack drawer component, built on [Ark UI Drawer](https://ark-ui.com/docs/components/drawer).

`BpkDrawerV2` is a low-level compound component for panels that slide in from the viewport edge. Use it for bottom sheets, side drawers, navigation drawers, and form panels that need Ark's focus management, dismiss handling, dragging, and snap points.

> **RTL support:** `BpkDrawerV2` is built on Ark UI and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application or subtree with `<BpkProvider>`.

## Usage

```tsx
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import { BpkDrawerV2 } from '@skyscanner/backpack-web/bpk-component-drawer';

export default () => (
  <BpkDrawerV2.Root>
    <BpkDrawerV2.Trigger asChild>
      <BpkButton>Open drawer</BpkButton>
    </BpkDrawerV2.Trigger>
    <BpkDrawerV2.Backdrop />
    <BpkDrawerV2.Content>
      <BpkDrawerV2.Grabber />
      <BpkDrawerV2.Header>
        <BpkDrawerV2.Title>Filters</BpkDrawerV2.Title>
        <BpkDrawerV2.CloseTrigger label="Close filters" />
      </BpkDrawerV2.Header>
      <BpkDrawerV2.Body>
        Drawer content
      </BpkDrawerV2.Body>
    </BpkDrawerV2.Content>
  </BpkDrawerV2.Root>
);
```

## Anatomy

| Bpk part | Ark part | Notes |
| --- | --- | --- |
| `Root` | `Drawer.Root` | Owns open state, dismiss behavior, snap points, and swipe direction |
| `RootProvider` | `Drawer.RootProvider` | Accepts a state machine from `useBpkDrawerV2` |
| `Trigger` | `Drawer.Trigger` | Supports `asChild` and optional trigger `value` |
| `SwipeArea` | `Drawer.SwipeArea` | Optional edge swipe opener |
| `Backdrop` | `Drawer.Backdrop` | Scrim |
| `Content` | `Drawer.Positioner` + `Drawer.Content` | Backpack-owned panel surface |
| `Grabber` | `Drawer.Grabber` | Renders `GrabberIndicator` by default |
| `GrabberIndicator` | `Drawer.GrabberIndicator` | Visual drag affordance |
| `Title` | `Drawer.Title` | Accessible dialog title |
| `Description` | `Drawer.Description` | Optional accessible description |
| `CloseTrigger` | `Drawer.CloseTrigger` | Uses `BpkCloseButton` |

## Props

`Root` accepts Ark Drawer root props such as `open`, `defaultOpen`, `onOpenChange`, `swipeDirection`, `snapPoints`, `snapPoint`, `onSnapPointChange`, `modal`, `closeOnEscape`, `closeOnInteractOutside`, `preventScroll`, `trapFocus`, and `role`.

`Content` accepts `draggable` to control whether the drawer content can be dragged. If `draggable` is `false`, the drawer can still be dragged from `Grabber`.

`Trigger` supports `asChild` so you can use a Backpack component such as `BpkButton` as the interactive trigger.

`BpkDrawerV2` does not expose `className` or `style` props. Wrap it in Backpack layout primitives when surrounding layout constraints are needed.
