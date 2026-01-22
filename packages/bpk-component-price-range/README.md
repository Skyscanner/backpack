# bpk-component-price-range

> Backpack price range component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkPriceRange from '@skyscanner/backpack-web/bpk-component-price-range';

export default () => (
  <BpkPriceRange
    showPriceOnBoundaries
    marker={{ price: '£150', percentage: 50, type: 'bubble' }}
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

### `showPriceOnBoundaries` prop

The `showPriceOnBoundaries` prop controls the visibility of the boundary price labels (low and high segment prices).

When `showPriceOnBoundaries` is set to `true`, the price labels for the low and high segments are displayed below the price range bar.

When `showPriceOnBoundaries` is set to `false`, the boundary price labels are hidden.

### Marker type

The `marker` prop is optional. When provided, it must include a `type` field that determines how the marker is displayed:

- `'bubble'`: Displays the marker as a price bubble above the bar
- `'dot'`: Displays the marker as a coloured dot on the bar (no price label shown)

The marker's colour indicates which price segment it falls into:
- **Low** (green): When the marker percentage is below the low segment threshold
- **Medium** (yellow): When the marker percentage is between low and high segment thresholds
- **High** (red): When the marker percentage is above the high segment threshold

### Without marker

When the `marker` prop is omitted, only the three-tier price range bars (low/medium/high segments) are displayed:

```tsx
import BpkPriceRange from '@skyscanner/backpack-web/bpk-component-price-range';

export default () => (
  <BpkPriceRange
    showPriceOnBoundaries
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

## Use Cases

### Use case 1: Dot marker with boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries
  marker={{ price: '£150', percentage: 50, type: 'dot' }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 2: Bubble marker with boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries
  marker={{ price: '£150', percentage: 50, type: 'bubble' }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 3: Dot marker without boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries={false}
  marker={{ price: '£150', percentage: 50, type: 'dot' }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 4: Bubble marker without boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries={false}
  marker={{ price: '£150', percentage: 50, type: 'bubble' }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 5: No marker with boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 6: No marker without boundary prices

```tsx
<BpkPriceRange
  showPriceOnBoundaries={false}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

## Props

| Property             | PropType                              | Required | Default Value |
| -------------------- | ------------------------------------- | -------- | ------------- |
| segments             | `{ low: PriceRangePosition, high: PriceRangePosition }` | true     | -             |
| showPriceOnBoundaries | `boolean`                            | true     | -             |
| marker               | `MarkerPriceRangePosition`            | false    | -             |
| min                  | `number`                              | false    | 0             |
| max                  | `number`                              | false    | 100           |

### Types

```ts
type PriceRangePosition = {
  price: string;
  percentage: number;
};

type MarkerPriceRangePosition = PriceRangePosition & {
  type: 'bubble' | 'dot';
};
```
