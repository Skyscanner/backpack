# bpk-component-chat-bubble

> Backpack chat bubble component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatBubble, {
  CHAT_BUBBLE_TYPE,
} from '@skyscanner/backpack-web/bpk-component-chat-bubble';

export default () => (
  <BpkChatBubble type={CHAT_BUBBLE_TYPE.bot}>
    How can I help you today?
  </BpkChatBubble>
);
```

### Bot bubble with feedback

```tsx
<BpkChatBubble
  type="bot"
  showFeedback
  selectedFeedback="up"
  onFeedbackClick={(thumbType) => console.log(thumbType)}
>
  Here is some information for you.
</BpkChatBubble>
```

### Retry bubble

```tsx
<BpkChatBubble
  type="retry"
  retryLabel="Try again"
  onRetry={() => console.log('retry')}
>
  Something went wrong.
</BpkChatBubble>
```

### Button bubble (suggestion)

```tsx
<BpkChatBubble
  type="button"
  onSuggestionClick={() => console.log('clicked')}
>
  Show me options
</BpkChatBubble>
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/).
