# bpk-component-price

> Backpack example component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkPrice, {
  SIZES,
  ALIGNS,
} from '@skyscanner/backpack-web/bpk-component-price';

export default () => (
  <BpkPrice
    size={SIZES.large}
    align={ALIGNS.left}
    price="£1,209"
    previousPrice="£1,830"
    leadingText="App only deal"
    trailingText="a night"
  />
);
```

## Props

| Property      | PropType      | Required | Default Value |
| ------------- | ------------- | -------- | ------------- |
| price         | string        | true     | -             |
| size          | oneOf(SIZES)  | false    | SIZES.small   |
| align         | oneOf(ALIGNS) | false    | ALIGNS.left   |
| leadingText   | string        | false    | null          |
| leadingClassName (experimental)  | string        | false    | null          |
| trailingText  | string        | false    | null          |
| previousPrice | string        | false    | null          |
| className     | string        | false    | null          |
