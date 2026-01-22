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

### `showPriceIndicator` prop

The `showPriceIndicator` prop is confusingly named.
It controls the visibility of the price labels for the low, medium, and high segments, as well as the display type
of the marker label (if `marker` prop is provided).

When `showPriceIndicator` is set to `true` (default), the price labels for the low, medium, and high segments are displayed below the price range bar.
If a `marker` prop is provided, it is a label is shown above the price range bar.

When `showPriceIndicator` is set to `false`, the price labels for the low, medium, and high segments are hidden.
If a `marker` prop is provided, it is displayed as a dot on the price range bar without a label.

### Without marker

The `marker` prop is optional. When omitted, only the three-tier price range bars (low/medium/high segments) are displayed:

```ts
import BpkPriceRange from '@skyscanner/backpack-web/bpk-component-price-range';

export default () => (
  <BpkPriceRange
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

## Props

| Property            | PropType                                  | Required | Default Value |
| ------------------- | ----------------------------------------- | -------- | ------------- |
| segments            | `{ low: Marker, high: Marker }`           | true     | -             |
| marker              | `Marker` (see below)                      | false    | -             |
| showPriceIndicator  | `boolean`                                 | false    | true          |
| min                 | `number`                                  | false    | 0             |
| max                 | `number`                                  | false    | 100           |

### Marker Type

```ts
type Marker = {
  price: string;
  percentage: number;
};
```

