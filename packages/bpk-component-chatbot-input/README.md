# bpk-component-chatbot-input

> Backpack chatbot input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkChatbotInput, {
  CHATBOT_INPUT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-chatbot-input';

export default () => (
  <BpkChatbotInput
    inputValue=""
    loadingAriaLabel="Loading"
    sendAriaLabel="Send"
    placeholder="Ask away"
    onInputChange={(value) => console.log(value)}
    onInputFocus={() => {}}
    onInputBlur={() => {}}
    onSubmit={() => {}}
  />
);
```
