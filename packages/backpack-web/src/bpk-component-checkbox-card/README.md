# bpk-component-checkbox-card

> Backpack checkbox card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

> **RTL support:** `BpkCheckboxCard` is built on Ark UI and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application (or the relevant subtree) with `<BpkProvider>`.

```tsx
import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

export default () => (
  <BpkCheckboxCard.Root
    checked={false}
    onCheckedChange={(checked) => console.log(checked)}
    variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
  >
    <BpkCheckboxCard.HiddenInput />
    <BpkCheckboxCard.Content>
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
      <BpkCheckboxCard.Description>0.5 km from centre</BpkCheckboxCard.Description>
    </BpkCheckboxCard.Content>
  </BpkCheckboxCard.Root>
);
```

### Cars variant

The `cars` variant is intended for the cars product context. It uses the same styling as `onCanvasDefault` but **automatically renders the corner `Indicator`** — there is no need to add `<BpkCheckboxCard.Indicator />` manually.

```tsx
import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

export default () => (
  <BpkCheckboxCard.Root
    checked={false}
    onCheckedChange={(checked) => console.log(checked)}
    variant={CHECKBOX_CARD_VARIANTS.cars}
  >
    <BpkCheckboxCard.HiddenInput />
    <BpkCheckboxCard.Content>
      <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
      <BpkCheckboxCard.Description>0.5 km from centre</BpkCheckboxCard.Description>
    </BpkCheckboxCard.Content>
  </BpkCheckboxCard.Root>
);
```
