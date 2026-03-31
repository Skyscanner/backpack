# BpkModalV3 (experimental)

A composable modal dialog built on [Ark UI](https://ark-ui.com/react/docs/components/dialog). Exposes a namespace of slot components so you can compose header, body, and image layouts without extra props.

No custom CSS should be used when composing a modal. `bpk-component-layout` components (`BpkBox`, `BpkFlex`, etc) should be used for any inner content layout. It is required to wrap the Root container in a `BpkProvider` for these layout components to work.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import { BpkModalV3 as BpkModal } from '@skyscanner/backpack-web/bpk-component-modal';
```

### Trigger

A Trigger can be used to open the modal without the consumer needing to set up any state management.

```tsx
<BpkModal.Root>
  <BpkModal.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModal.Trigger>
  /* content */
</BpkModal.Root>
```

Alternatively, explicit `open` and `onOpenChange` props can be used on the Root. This may be useful if you want to open the modal on a route change, on an API response.

```tsx
const [open, setOpen] = useState(true);

<BpkModal.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  /* content */
</BpkModal.Root>
```

### Portal

Portal renders `Scrim` and `Content` into `document.body`, escaping any parent stacking contexts (`transform`, `filter`, `will-change`, `overflow: hidden`) or z-index conflicts. It is optional but recommended.

```tsx
<BpkModal.Root>
  <BpkModal.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModal.Trigger>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>...</BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

### Default modal

```tsx
<BpkModal.Root>
  <BpkModal.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModal.Trigger>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>
      <BpkModal.Header>
        <BpkModal.Title>My modal</BpkModal.Title>
        <BpkModal.CloseTrigger label="Close" />
      </BpkModal.Header>
      <BpkModal.Body>
        <BpkText>Modal content goes here.</BpkText>
      </BpkModal.Body>
    </BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

### Sheet

```tsx
<BpkModal.Root type={MODAL_V3_TYPES.sheet}>
  <BpkModal.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModal.Trigger>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>
      <BpkModal.Header>
        <BpkModal.Title>Sheet title</BpkModal.Title>
        <BpkModal.CloseTrigger label="Close" />
      </BpkModal.Header>
      <BpkModal.Body>
        <BpkText>Sheet content goes here.</BpkText>
      </BpkModal.Body>
    </BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

### Full screen

```tsx
<BpkModal.Root type={MODAL_V3_TYPES.full}>
  <BpkModal.Trigger asChild>
    <BpkButton>Open modal</BpkButton>
  </BpkModal.Trigger>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>
      <BpkModal.Header>
        <BpkModal.Title>Full screen title</BpkModal.Title>
        <BpkModal.CloseTrigger label="Close" />
      </BpkModal.Header>
      <BpkModal.Body>
        <BpkText>Full screen content goes here.</BpkText>
      </BpkModal.Body>
    </BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

### Chatbot

A full-viewport panel that slides in from the right (left in RTL). Intended for chatbot and conversational UI surfaces. Use alongside `BpkChatbotInput` for the input area.

When open, this variant automatically locks body scroll (using `position: fixed`) to prevent background page scroll and iOS Safari bounce effects. Body styles are restored when the modal closes.

```tsx
<BpkModal.Root type={MODAL_V3_TYPES.chatbot}>
  <BpkModal.Trigger asChild>
    <BpkButton>Open chatbot</BpkButton>
  </BpkModal.Trigger>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>
      <BpkModal.Header>
        <BpkModal.Title>Chatbot</BpkModal.Title>
        <BpkModal.CloseTrigger label="Close" />
      </BpkModal.Header>
      <BpkModal.Body>
        <BpkText>Conversation content goes here.</BpkText>
      </BpkModal.Body>
    </BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

### Default: With hero image

```tsx
<BpkProvider>
  <BpkModal.Root>
    <BpkModal.Trigger asChild>
      <BpkButton>Open modal</BpkButton>
    </BpkModal.Trigger>
    <BpkModal.Portal>
      <BpkModal.Scrim />
      <BpkModal.Content>
        <BpkModal.Title>
          <BpkVisuallyHidden>Image modal</BpkVisuallyHidden>
        </BpkModal.Title>

        <BpkFlex
          direction={{
            base: 'column-reverse',
            [BpkBreakpoint.SmallTablet]: 'row',
          }}
          minHeight={{
            base: '100%',
            [BpkBreakpoint.SmallTablet]: '20rem',
          }}
        >
          <BpkModal.Body>
            <BpkText>Content to the side of the image on large viewports, beneath the image on small viewports.</BpkText>
          </BpkModal.Body>
          <BpkModal.HeroImage src="/image.jpg" alt="">
            <BpkModal.CloseTrigger label="Close" onImage />
          </BpkModal.HeroImage>
        </BpkFlex>
      </BpkModal.Content>
    </BpkModal.Portal>
  </BpkModal.Root>
</BpkProvider>
```

### Sheet: With hero image

```tsx
<BpkProvider>
  <BpkModal.Root type={MODAL_V3_TYPES.sheet}>
    <BpkModal.Trigger asChild>
      <BpkButton>Open modal</BpkButton>
    </BpkModal.Trigger>
    <BpkModal.Portal>
      <BpkModal.Scrim />
      <BpkModal.Content>
        <BpkModal.Title>
          <BpkVisuallyHidden>Image modal</BpkVisuallyHidden>
        </BpkModal.Title>

        <BpkModal.HeroImage src={'/image.jpg'} alt="" height="12rem">
          <BpkModal.CloseTrigger label="Close" onImage />
        </BpkModal.HeroImage>
        <BpkModal.Body>
          <BpkVStack gap={BpkSpacing.SM} padding={BpkSpacing.LG}>
            <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
              Content below the image.
            </BpkText>
          </BpkVStack>
        </BpkModal.Body>
      </BpkModal.Content>
    </BpkModal.Portal>
  </BpkModal.Root>
</BpkProvider>
```

### No visible title

When no visible title is needed, wrap the title text in `BpkVisuallyHidden` to provide an accessible dialog name for screen readers. The `Header` still provides layout spacing for the close button.

```tsx
<BpkModal.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  <BpkModal.Portal>
    <BpkModal.Scrim />
    <BpkModal.Content>
      <BpkModal.Header>
        <BpkModal.Title>
          <BpkVisuallyHidden>Accessible dialog name</BpkVisuallyHidden>
        </BpkModal.Title>
        <BpkModal.CloseTrigger label="Close" />
      </BpkModal.Header>
      <BpkModal.Body>
        <BpkText>This modal has no visible title.</BpkText>
      </BpkModal.Body>
    </BpkModal.Content>
  </BpkModal.Portal>
</BpkModal.Root>
```

## Types

| Type | Values |
|---|---|
| `BpkModalV3Type` | `'default'` \| `'sheet'` \| `'full'` \| `'chatbot'` |

The `MODAL_V3_TYPES` constant is exported as a convenience reference for all valid type values:

```tsx
import { MODAL_V3_TYPES } from '@skyscanner/backpack-web/bpk-component-modal';

<BpkModal.Root type={MODAL_V3_TYPES.chatbot}>
  ...
</BpkModal.Root>
```

## Slots

| Slot | Renders as | Required | Description |
|---|---|---|---|
| `Root` | `<div>` + Ark `Dialog.Root` | ✓ | Wrapper; accepts optional `open`, `onOpenChange` (for controlled usage), and `type` |
| `Trigger` | Ark `Dialog.Trigger` | — | Optional trigger element; supports `asChild` |
| `Portal` | Ark `Portal` | — | Optional; renders children into `document.body` to escape stacking context and z-index issues |
| `Scrim` | Ark `Dialog.Backdrop` | ✓ | Semi-transparent overlay; clicking closes the modal |
| `Content` | Ark `Dialog.Positioner` + `Dialog.Content` | ✓ | Positioned content container with focus management |
| `Header` | `<div>` | — | Flex layout container for Title and CloseTrigger |
| `Title` | Ark `Dialog.Title` (`<h2>`) | ✓ | Accessible dialog title; required even if visually hidden |
| `Description` | Ark `Dialog.Description` (`<div>`) | — | Supplementary description for screen readers |
| `Body` | `<div>` | — | Scrollable main content area |
| `HeroImage` | `<div>` + `<img>` | — | Full-width image; accepts `src`, `alt`, optional `height`; can contain `CloseTrigger` as child |
| `CloseTrigger` | Ark `Dialog.CloseTrigger` (`<button>`) | ✓ | Close button with icon; accepts `label` (aria-label) and optional `onImage` for image overlay styling |
