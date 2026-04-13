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
  <BpkChatbotInput.Root>
    <BpkChatbotInput.Input
      inputValue=""
      loadingAriaLabel="Loading"
      sendAriaLabel="Send"
      placeholder="Ask away"
      onInputChange={(value) => console.log(value)}
      onInputFocus={() => {}}
      onInputBlur={() => {}}
      onSubmit={() => {}}
    />
  </BpkChatbotInput.Root>
);
```

### With toolbar

```tsx
import BpkChatbotInput from '@skyscanner/backpack-web/bpk-component-chatbot-input';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import SmallPlusIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/plus';
import SmallFilterIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/filter';
import BpkVisuallyHidden from '@skyscanner/backpack-web/bpk-component-visually-hidden';

export default () => (
  <BpkChatbotInput.Root>
    <BpkChatbotInput.Input
      inputValue=""
      loadingAriaLabel="Loading"
      sendAriaLabel="Send"
      placeholder="Ask away"
      onInputChange={(value) => console.log(value)}
      onInputFocus={() => {}}
      onInputBlur={() => {}}
      onSubmit={() => {}}
    />
    <BpkChatbotInput.Toolbar>
      <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={() => {}}>
        <SmallPlusIcon />
        <BpkVisuallyHidden>Add</BpkVisuallyHidden>
      </BpkButton>
      <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={() => {}}>
        <SmallFilterIcon />
        <BpkVisuallyHidden>Filter</BpkVisuallyHidden>
      </BpkButton>
    </BpkChatbotInput.Toolbar>
  </BpkChatbotInput.Root>
);
```

### Cars type

```tsx
import BpkChatbotInput, {
  CHATBOT_INPUT_TYPES,
} from '@skyscanner/backpack-web/bpk-component-chatbot-input';

export default () => (
  <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.CARS}>
    <BpkChatbotInput.Input
      inputValue=""
      loadingAriaLabel="Loading"
      sendAriaLabel="Send"
      placeholder="Ask away"
      onInputChange={(value) => console.log(value)}
      onInputFocus={() => {}}
      onInputBlur={() => {}}
      onSubmit={() => {}}
    />
  </BpkChatbotInput.Root>
);
```
