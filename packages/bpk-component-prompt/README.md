# bpk-component-prompt

> Backpack prompt component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

`BpkPrompt` follows the [Ark UI](https://ark-ui.com/) compound-component pattern.  Each part of the component is a named sub-component accessed via the namespace.

### Compound API (recommended)

```tsx
import BpkPrompt from '@skyscanner/backpack-web/bpk-component-prompt';

const prompts = [
  { id: 'first', text: 'I need a small automatic car for 2 people with unlimited mileage' },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

// List of prompts
export const PromptsExample = () => (
  <BpkPrompt.List onPromptClick={(id, text) => console.log(id, text)}>
    {prompts.map((p) => (
      <BpkPrompt.Item key={p.id} id={p.id} text={p.text} />
    ))}
  </BpkPrompt.List>
);

// Single prompt card
export const SinglePrompt = () => (
  <BpkPrompt.Root
    promptText="What insurance do I need?"
    onClick={(text) => console.log(text)}
  />
);
```

### Convenience API

`BpkPrompts` wraps the compound API and accepts a flat `prompts` array for simpler use cases.

```tsx
import { BpkPrompts } from '@skyscanner/backpack-web/bpk-component-prompt';

export const PromptsExample = () => (
  <BpkPrompts
    prompts={prompts}
    onPromptClick={(id, text) => console.log(id, text)}
  />
);
```

## Props

### BpkPrompt.Root

| Property   | PropType                         | Required | Default Value |
| ---------- | -------------------------------- | -------- | ------------- |
| promptText | string                           | true     | -             |
| onClick    | (promptText: string) => void     | false    | -             |

### BpkPrompt.List

| Property             | PropType                                      | Required | Default Value |
| -------------------- | --------------------------------------------- | -------- | ------------- |
| children             | ReactNode                                     | true     | -             |
| onPromptClick        | (id: string, promptText: string) => void      | false    | -             |
| showVisibleScrollbar | boolean                                       | false    | false         |

### BpkPrompt.Item

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| id       | string   | true     | -             |
| text     | string   | true     | -             |

### BpkPrompts (convenience wrapper)

| Property             | PropType                                      | Required | Default Value |
| -------------------- | --------------------------------------------- | -------- | ------------- |
| prompts              | Array<{ id: string; text: string }>           | true     | -             |
| onPromptClick        | (id: string, promptText: string) => void      | false    | -             |
| showVisibleScrollbar | boolean                                       | false    | false         |
