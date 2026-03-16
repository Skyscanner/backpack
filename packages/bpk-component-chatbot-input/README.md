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
    inputPlaceholder="Ask away"
    onInputChange={(value) => console.log(value)}
    onInputFocus={() => {}}
    onInputBlur={() => {}}
    onSubmit={() => {}}
  />
);
```

## Props

| Property         | PropType                           | Required | Default Value                    |
| ---------------- | ---------------------------------- | -------- | -------------------------------- |
| inputValue       | string                             | true     | -                                |
| loadingAriaLabel | string                             | true     | -                                |
| sendAriaLabel    | string                             | true     | -                                |
| onInputChange    | func                               | true     | -                                |
| onInputFocus     | func                               | true     | -                                |
| onInputBlur      | func                               | true     | -                                |
| onSubmit         | func                               | true     | -                                |
| inputPlaceholder | string                             | false    | ''                               |
| isSending        | bool                               | false    | false                            |
| isPolling        | bool                               | false    | false                            |
| inputType        | oneOf(CHATBOT_INPUT_TYPES)         | false    | CHATBOT_INPUT_TYPES.DEFAULT      |
| maxCharacters    | number                             | false    | 500                              |
| onInputClick     | func                               | false    | () => {}                         |
| onKeyDown        | func                               | false    | () => {}                         |
