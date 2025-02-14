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
    icon={<NewWindowIcon />}
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/price/web-5agxi50w#section-props-ea).
