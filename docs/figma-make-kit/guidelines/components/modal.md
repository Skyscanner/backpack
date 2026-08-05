# BpkModalV3

`BpkModalV3` — a composable, Ark UI–based dialog for focused tasks that block background interaction.

## When to use

Use `BpkModalV3` whenever a prompt calls for a dialog, popup, bottom sheet, or full-screen overlay that requires a decision or blocks the page. It is the current recommended API (the older `BpkModal`/`BpkModalV2` remain available but `BpkModalV3` is composable and Ark UI–based).

## Variants

| Type (`MODAL_V3_TYPES`) | Use for |
| --- | --- |
| `default` | Standard centered dialog |
| `sheet` | Bottom sheet |
| `full` | Full-screen panel |
| `chatbot` | Full-viewport panel sliding from the trailing edge, for chat/conversational UI; locks body scroll while open |

## Props / slots

`BpkModalV3` is a namespace of composable slots, not a single component with props:

| Slot | Required | Notes |
| --- | --- | --- |
| `Root` | required | Props: `open?`, `onOpenChange?`, `type?` (`MODAL_V3_TYPES`) |
| `Trigger` | optional | Supports `asChild` |
| `Portal` | recommended | Escapes stacking context |
| `Scrim` | required | Click closes the modal |
| `Content` | required | Manages focus trapping |
| `Header` | optional | Flex layout for `Title` + `CloseTrigger` |
| `Title` | required (even if visually hidden) | The dialog's accessible name |
| `Description` | optional | |
| `Body` | optional | Scrollable content area |
| `CloseTrigger` | required | Props: `label` (aria-label, required), `onImage?` |

## Examples

```tsx
import BpkModalV3, { MODAL_V3_TYPES } from '@skyscanner/backpack-web/bpk-component-modal';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

{/* CORRECT */}
<BpkModalV3.Root type={MODAL_V3_TYPES.sheet}>
  <BpkModalV3.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModalV3.Trigger>
  <BpkModalV3.Portal>
    <BpkModalV3.Scrim />
    <BpkModalV3.Content>
      <BpkModalV3.Header>
        <BpkModalV3.Title>Confirm booking</BpkModalV3.Title>
        <BpkModalV3.CloseTrigger label="Close" />
      </BpkModalV3.Header>
      <BpkModalV3.Body>...</BpkModalV3.Body>
    </BpkModalV3.Content>
  </BpkModalV3.Portal>
</BpkModalV3.Root>
```

```tsx
{/* WRONG — no Title slot; the dialog has no accessible name */}
<BpkModalV3.Content>
  <BpkModalV3.Body>...</BpkModalV3.Body>
</BpkModalV3.Content>
```

## Rules

- Must be used inside `BpkProvider` (from `bpk-component-layout`) for correct RTL behavior.
- `Title` is required even when visually hidden — wrap it in `BpkVisuallyHidden` if there's no visible heading, never omit it.
- Compose inner content with Backpack layout primitives (`BpkBox`/`BpkFlex`) — no custom CSS for the modal's internal layout.
- Only one primary CTA in the modal's footer/body per modal.
