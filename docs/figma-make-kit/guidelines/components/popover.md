# BpkPopover

`BpkPopover` — a click-triggered (optionally hoverable) floating panel with interactive/richer content, a label, and an optional close button.

## When to use

Use `BpkPopover` when the floating content needs its own interactive elements (buttons, links) or more than a short line of text. For a brief, non-interactive hint, use `BpkTooltip` instead.

## Variants

No semantic type enum. Behavior flags: `hoverable` (boolean, opens on hover in addition to click), `labelAsTitle` (boolean, renders `label` as a heading instead of a plain caption).

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | |
| `target` | `ReactElement` | required | Trigger element |
| `label` | `string` | required | Used as the popover's accessible name |
| `onClose` | `(event, { source }) => void` | required | `source` is `CLOSE_BUTTON`\|`CLOSE_LINK`\|`CLOSE_OUTSIDE` |
| `children` | `ReactNode` | required | Body content |
| `isOpen` | `boolean` | `false` | Controlled |
| `closeButtonIcon` | `boolean` | `true` | Show icon close button |
| `closeButtonLabel` | `string` | — | aria-label for the icon close button |
| `hoverable` | `boolean` | `false` | Also open on hover |
| `placement` | Floating-UI `Placement` | `'bottom'` | |
| `actionText` / `onAction` | `string` / `function` | — | Optional footer action link |

## Examples

```tsx
import BpkPopover from '@skyscanner/backpack-web/bpk-component-popover';

{/* CORRECT */}
<BpkPopover
  id="filters-popover"
  target={target}
  onClose={closePopover}
  isOpen={isOpen}
  label="Filter options"
  closeButtonLabel="Close"
>
  <BpkText>Filter content</BpkText>
</BpkPopover>
```

```tsx
{/* WRONG — closeButtonText is deprecated; use closeButtonIcon + closeButtonLabel */}
<BpkPopover id="p" target={target} onClose={onClose} label="Filter options" closeButtonText="Close">
  ...
</BpkPopover>
```

## Rules

- `label` is required and is used for the popover's accessible name — never omit it.
- Use `closeButtonIcon`/`closeButtonLabel`, not the deprecated `closeButtonText`.
- Focus is trapped while the popover is open — don't add a redundant custom focus trap.
