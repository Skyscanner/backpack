# bpk-component-chatbot-input

> Backpack chatbot input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

> **RTL support:** `BpkChatbotInput` uses [`BpkFlex`](https://www.skyscanner.design/latest/components/layout/web) internally and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application (or the relevant subtree) with `<BpkProvider>`.

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
