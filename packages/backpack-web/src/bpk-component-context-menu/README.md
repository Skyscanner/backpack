# bpk-component-context-menu

> Backpack context menu component. A compound Menu built on Ark UI's `Menu` primitive that provides accessible keyboard navigation, focus management, ARIA `role="menu"` semantics, and floating positioning out of the box.

## Installation

Check the main [Readme](https://github.com/Skyscanner/backpack#usage) for a complete installation guide.

## Usage

The context menu is opened from a consumer-owned trigger. Pass the trigger element to `BpkContextMenu.Trigger`. By default a wrapper `<button>` is rendered; pass `asChild` to merge the menu trigger props onto your own element instead.

```jsx
import BpkContextMenu, {
  CONTEXT_MENU_ITEM_VARIANTS,
} from '@skyscanner/backpack-web/bpk-component-context-menu';

<BpkContextMenu.Root
  onSelect={({ value }) => {
    // handle selection
  }}
>
  <BpkContextMenu.Trigger>
    <MyHeartButton />
  </BpkContextMenu.Trigger>

  <BpkContextMenu.Content>
    <BpkContextMenu.Item value="sightseeing">Sightseeing</BpkContextMenu.Item>
    <BpkContextMenu.Item value="christmas-shopping">
      Christmas shopping
    </BpkContextMenu.Item>
    <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>

    <BpkContextMenu.Separator />

    <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
      Plan a new trip
    </BpkContextMenu.Item>
    <BpkContextMenu.Item value="quick-save" endIcon={<BookmarkIcon />}>
      Quick save
    </BpkContextMenu.Item>
  </BpkContextMenu.Content>
</BpkContextMenu.Root>;
```

## Parts

| Part | Wraps | Purpose |
|------|-------|---------|
| `BpkContextMenu.Root` | `Menu.Root` | State container. Handles open state, keyboard navigation, and selection dispatch. |
| `BpkContextMenu.Trigger` | `Menu.Trigger` | Wraps the consumer's trigger element. Pass `asChild` to merge trigger props onto your own element rather than rendering a wrapper button. |
| `BpkContextMenu.Content` | `Menu.Positioner` + `Menu.Content` | The floating menu surface. Portalled so it escapes overflow-hidden ancestors. |
| `BpkContextMenu.Item` | `Menu.Item` | Selectable menu row. Supports `endIcon` and `destructive` variant. |
| `BpkContextMenu.Separator` | `Menu.Separator` | Visual divider between logical groups of items. |
| `BpkContextMenu.ItemGroup` | `<div>` | Groups a set of related items under a shared container. Use to visually cluster items that belong together (e.g. a set of saved trips). |
| `BpkContextMenu.TriggerItem` | `Menu.TriggerItem` | A menu row that opens a nested sub-menu on hover/arrow-right. Accepts an optional `endIcon` (typically a chevron) to signal the sub-menu. |

## Item variants

| Variant | Use for |
|---------|---------|
| `default` | Standard menu item |
| `destructive` | Destructive actions rendered in the status-danger colour (e.g. Remove). |

## Accessibility notes

- Arrow keys navigate between items, Enter activates the highlighted item, Escape closes the menu.
- The content receives `role="menu"` and each item receives `role="menuitem"` automatically via Ark UI.
- The consumer's trigger element receives `aria-haspopup` and `aria-expanded` via `asChild` slot composition.
- The menu is rendered in a portal, so it will not be clipped by an ancestor with `overflow: hidden`.

## Do not

- Do not pass `className` or `style` from consumer code. Backpack owns the surface, focus, animation, and accessibility of this component. Wrap the trigger in a layout component if positioning is required.
