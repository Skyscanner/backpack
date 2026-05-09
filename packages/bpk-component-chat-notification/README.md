# bpk-component-chat-notification

> Backpack chat notification component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatNotification from '@skyscanner/backpack-web/bpk-component-chat-notification';
import TickCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/tick-circle';

// With icon
export default () => (
  <BpkChatNotification
    text="Thanks for your feedback!"
    icon={TickCircleIcon}
  />
);

// Without icon
export const ErrorExample = () => (
  <BpkChatNotification text="Something went wrong. Please try again." />
);
```

## Props

| Property | PropType    | Required | Default Value |
| -------- | ----------- | -------- | ------------- |
| text     | string      | true     | -             |
| icon     | FunctionComponent | false    | null          |

