# bpk-component-price

> Backpack example component.

> ## 🧪 Experimental Component: `BpkPriceV2`
>
> ### Why a version 2?
>
> The `BpkPriceV2` provide a new style(change the order between Previous price and Leading text when is right aligned)
>
> ### Help and feedbacks
>
> As an experimental component and in order to improve it, we would like to hear about your issues/feedbacks.
>
> Contact: @tuxiu.luo

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import {
  SIZES,
  ALIGNS,
  BpkPriceV2,
} from '@skyscanner/backpack-web/bpk-component-price';

export default () => (
  <BpkPriceV2
    size={SIZES.large}
    align={ALIGNS.right}
    price="£1,209"
    previousPrice="£1,830"
    leadingText="App only deal"
    trailingText="a night"
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/price/web-5agxi50w#section-props-ea).
