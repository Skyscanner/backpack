# bpk-component-price-range

> Backpack price range component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```ts
import BpkPriceRange from '@skyscanner/backpack-web/bpk-component-price-range';

export default () => (
  <BpkPriceRange
    showPriceIndicator
    marker={{ price: '£150', percentage: 50 }}
    segments={{
      low: {
        price: '£100',
        percentage: 20,
      },
      high: {
        price: '£200',
        percentage: 80,
      },
    }}
  />
);
```
