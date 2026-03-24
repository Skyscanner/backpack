# bpk-component-prompts

> Backpack prompt component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

`BpkPrompts` follows the [Ark UI](https://ark-ui.com/) compound-component pattern. `BpkPrompts.Root` is the outermost container and each `BpkPrompts.Item` is an individual prompt card.

```tsx
import BpkPrompts from '@skyscanner/backpack-web/bpk-component-prompts';

const prompts = [
  { id: 'first', text: 'I need a small automatic car for 2 people with unlimited mileage' },
  { id: 'second', text: 'What insurance do I need?' },
  { id: 'third', text: 'Do I need to pay a deposit?' },
];

export const PromptsExample = () => (
  <BpkPrompts.Root ariaLabel="Suggestions" onPromptClick={(id, text) => console.log(id, text)}>
    {prompts.map((p) => (
      <BpkPrompts.Item key={p.id} id={p.id} text={p.text} />
    ))}
  </BpkPrompts.Root>
);
```
