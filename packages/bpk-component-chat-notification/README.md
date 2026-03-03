# bpk-component-chat-notification

> Backpack chat notification component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatNotification from '@skyscanner/backpack-web/bpk-component-chat-notification';

export default () => (
  <BpkChatNotification
    label="Thanks for your feedback!"
    errorLabel="Something went wrong. Please try again."
  />
);
```

## Props

| Property   | PropType | Required | Default Value |
| ---------- | -------- | -------- | ------------- |
| label      | string   | true     | -             |
| errorLabel | string   | true     | -             |
| hasIssue   | boolean  | false    | false         |

## Accessibility

The component uses the semantic `<output>` element with `aria-atomic="true"`, which creates a live region that announces content changes to screen readers. This ensures users with assistive technologies are notified when the notification appears.

The tick icon in the success state is decorative and hidden from screen readers via `aria-hidden="true"`.
