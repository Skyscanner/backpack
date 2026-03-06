# bpk-component-checkbox-v2

> Backpack checkbox V2 component — slot-based, powered by Ark UI.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox-v2';

// Simple label
export default () => (
  <BpkCheckbox.Root>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Send me deals</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

// Title + subtitle
export const WithDescription = () => (
  <BpkCheckbox.Root>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <div>
      <BpkCheckbox.Label>Price alerts</BpkCheckbox.Label>
      <BpkCheckbox.Description>
        We'll email you about price drops. Unsubscribe anytime.
      </BpkCheckbox.Description>
    </div>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);
```

## Props

### BpkCheckbox.Root

| Property         | PropType      | Required | Default Value |
| ---------------- | ------------- | -------- | ------------- |
| children         | node          | true     | -             |
| checked          | CheckedState  | false    | -             |
| defaultChecked   | CheckedState  | false    | -             |
| disabled         | boolean       | false    | false         |
| form             | string        | false    | -             |
| id               | string        | false    | -             |
| invalid          | boolean       | false    | false         |
| name             | string        | false    | -             |
| onCheckedChange  | function      | false    | -             |
| readOnly         | boolean       | false    | false         |
| required         | boolean       | false    | false         |
| value            | string        | false    | -             |

`CheckedState` = `boolean | 'indeterminate'`

### BpkCheckbox.Control

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | node     | true     | -             |

### BpkCheckbox.Label

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | node     | true     | -             |

### BpkCheckbox.Description

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | node     | true     | -             |
