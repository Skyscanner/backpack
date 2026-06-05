# bpk-component-chat-thought-bubble

> An animated chat thought bubble component that displays bouncing dots alongside a speech bubble with text content, used to indicate that a chatbot or AI assistant is processing a response.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatThoughtBubble from '@skyscanner/backpack-web/bpk-component-chat-thought-bubble';

export default () => (
  <BpkChatThoughtBubble content="AI is thinking" />
);
```

## Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| content  | string   | true     | -             |
