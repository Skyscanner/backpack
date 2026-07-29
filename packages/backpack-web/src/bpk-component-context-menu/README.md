# bpk-component-context-menu

> Backpack context menu component. A compound Menu built on Ark UI's `Menu` primitive that provides accessible keyboard navigation, focus management, ARIA `role="menu"` semantics, and floating positioning out of the box.

## Installation

Check the main [Readme](https://github.com/Skyscanner/backpack#usage) for a complete installation guide.

## Usage

### With SaveTrigger (save-to-list pattern)

Use `BpkContextMenu.SaveTrigger` when the trigger should look like a heart-icon save button. It renders a pre-styled circular button owned by Backpack — no extra styling needed from the consumer.

```jsx
import BpkContextMenu from '@skyscanner/backpack-web/bpk-component-context-menu';

<BpkContextMenu.Root onSelect={({ value }) => { /* handle selection */ }}>
  <BpkContextMenu.SaveTrigger aria-label="Save to trip" />

  <BpkContextMenu.Content>
    <BpkContextMenu.ItemGroup>
      <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
      <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
    </BpkContextMenu.ItemGroup>

    <BpkContextMenu.Separator />

    <BpkContextMenu.ItemGroup>
      <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
        Plan a new trip
      </BpkContextMenu.Item>
    </BpkContextMenu.ItemGroup>
  </BpkContextMenu.Content>
</BpkContextMenu.Root>
```

### With a custom trigger

Use `BpkContextMenu.Trigger` when you need a different trigger element. By default it renders a plain `<button>`; pass `asChild` to merge the trigger props onto your own element instead.

```jsx
import BpkContextMenu from '@skyscanner/backpack-web/bpk-component-context-menu';

<BpkContextMenu.Root onSelect={({ value }) => { /* handle selection */ }}>
  <BpkContextMenu.Trigger aria-label="Open options">
    <SettingsIcon />
  </BpkContextMenu.Trigger>

  <BpkContextMenu.Content>
    <BpkContextMenu.Item value="edit">Edit</BpkContextMenu.Item>
    <BpkContextMenu.Item value="delete" variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}>
      Delete
    </BpkContextMenu.Item>
  </BpkContextMenu.Content>
</BpkContextMenu.Root>
```

## Parts

| Part | Wraps | Purpose |
|------|-------|---------|
| `BpkContextMenu.Root` | `Menu.Root` | State container. Handles open state, keyboard navigation, and selection dispatch. |
| `BpkContextMenu.Trigger` | `Menu.Trigger` | Generic trigger. Renders a plain `<button>` by default; pass `asChild` to merge trigger props onto a custom element. When using `asChild` the child must be a native DOM element or a `React.forwardRef` component that spreads `...rest` — plain function components will silently drop the merged props. |
| `BpkContextMenu.SaveTrigger` | `Menu.Trigger` | Pre-styled circular heart-icon trigger for the save-to-list pattern. Accepts `aria-label` only — no consumer styling required. |
| `BpkContextMenu.Content` | `Menu.Positioner` + `Menu.Content` | The floating menu surface. Portalled so it escapes overflow-hidden ancestors. |
| `BpkContextMenu.Item` | `Menu.Item` | Selectable menu row. Supports `endIcon`, `destructive` variant, and an optional `onSelect` for item-specific handlers (fires for both pointer and keyboard activation). |
| `BpkContextMenu.Separator` | `Menu.Separator` | Visual divider between logical groups of items. |
| `BpkContextMenu.ItemGroup` | `<div>` | Groups related items under a shared container. Use to visually cluster items that belong together (e.g. a set of saved trips). |
| `BpkContextMenu.TriggerItem` | `Menu.TriggerItem` | A menu row that opens a nested sub-menu on hover/arrow-right. Accepts an optional `endIcon` (typically a chevron) to signal the sub-menu. |

## Item variants

| Variant | Use for |
|---------|---------|
| `default` | Standard menu item |
| `destructive` | Destructive actions rendered in the status-danger colour (e.g. Remove). |

## Accessibility notes

- Arrow keys navigate between items, Enter activates the highlighted item, Escape closes the menu.
- The content receives `role="menu"` and each item receives `role="menuitem"` automatically via Ark UI.
- The trigger button receives `aria-haspopup` and `aria-expanded` automatically via Ark UI.
- The menu is rendered in a portal, so it will not be clipped by an ancestor with `overflow: hidden`.

## Do not

- Do not pass `className` or `style` from consumer code. Backpack owns the surface, focus, animation, and accessibility of this component. Wrap the trigger in a layout component if positioning is required.
