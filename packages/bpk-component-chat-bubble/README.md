# bpk-component-chat-bubble

> Backpack chat bubble component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatBubble from '@skyscanner/backpack-web/bpk-component-chat-bubble';

export default () => (
  <BpkChatBubble type="bot">How can I help you today?</BpkChatBubble>
);
```

## Props

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| type               | 'user' \| 'bot' \| 'retry' \| 'button' | true | - |
| children           | ReactNode                             | false    | -             |
| systemPosition     | 'first' \| 'middle' \| 'last'        | false    | -             |
| userPosition       | 'first' \| 'middle' \| 'last'        | false    | -             |
| showFeedback       | boolean                               | false    | false         |
| selectedFeedback   | 'up' \| 'down' \| null               | false    | null          |
| onFeedbackClick    | (type: ThumbsButtonType) => void      | false    | -             |
| onRetry            | () => void                            | false    | -             |
| retryDisabled      | boolean                               | false    | false         |
| retryLabel         | string                                | false    | 'Try again'   |
| onSuggestionClick  | () => void                            | false    | -             |
| suggestionAriaLabel | string                               | false    | 'button'  |
| animationDelay     | number                                | false    | 0             |
