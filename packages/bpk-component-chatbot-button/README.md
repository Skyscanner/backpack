# bpk-component-chatbot-button

> Backpack chatbot floating action button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatbotButton from '@skyscanner/backpack-web/bpk-component-chatbot-button';

// Controlled
<BpkChatbotButton
  label="Chat with AI"
  expanded={isExpanded}
  onClick={handleClick}
/>

// Auto-animate (uncontrolled)
<BpkChatbotButton
  label="Chat with AI"
  isAnimate={shouldAnimate}
  onClick={handleClick}
/>

// Custom icon
<BpkChatbotButton
  label="Chat with AI"
  icon={<MyCustomIcon fill="white" aria-hidden="true" />}
  onClick={handleClick}
/>
```
