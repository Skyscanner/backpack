# bpk-component-chat-notification

> Backpack chat notification component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatNotification from '@skyscanner/backpack-web/bpk-component-chat-notification';

// Default (success) state
export default () => (
  <BpkChatNotification label="Thanks for your feedback!" />
);

// Error state
export const ErrorExample = () => (
  <BpkChatNotification errorLabel="Something went wrong. Please try again." />
);
```

## Props

The component accepts one of two mutually exclusive shapes:

**Success state**:

| Property | PropType | Required |
| -------- | -------- | -------- |
| label    | string   | true     |

**Error state**:

| Property   | PropType | Required |
| ---------- | -------- | -------- |
| errorLabel | string   | true     |

