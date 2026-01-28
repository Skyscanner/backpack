# bpk-component-price-range

> Backpack price range component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkPriceRange from '@skyscanner/backpack-web/bpk-component-price-range';

export default () => (
  <BpkPriceRange
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

### Boundary price visibility

The visibility of boundary prices (low and high segment prices) is automatically determined by the marker type:

| Marker Type                   | Boundary Prices          |
|-------------------------------|--------------------------|
| `MARKER_DISPLAY_TYPES.BUBBLE` | Shown below the bar      |
| `MARKER_DISPLAY_TYPES.DOT`    | Hidden (compact display) |
| No marker                     | Shown below the bar      |

### Marker type

The `marker` prop is optional. When provided, the `type` field determines how the marker is displayed. If `type` is omitted, it defaults to `MARKER_DISPLAY_TYPES.BUBBLE`. Use the exported `MARKER_DISPLAY_TYPES` constant:

- `MARKER_DISPLAY_TYPES.BUBBLE`: Displays the marker as a price bubble above the bar
- `MARKER_DISPLAY_TYPES.DOT`: Displays the marker as a coloured dot on the bar (no price label shown)

The marker's colour indicates which price segment it falls into:
- **Low** (green): When the marker percentage is below the low segment threshold
- **Medium** (yellow): When the marker percentage is between low and high segment thresholds
- **High** (red): When the marker percentage is above the high segment threshold

### Without marker

When the `marker` prop is omitted, only the three-tier price range bars (low/medium/high segments) are displayed with boundary prices shown:

```tsx
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

## Use cases

_You can import `MARKER_DISPLAY_TYPES` from the package to use the constants `DOT` and `BUBBLE`._

### Use case 1: Dot marker (boundaries hidden)

```tsx
<BpkPriceRange
  marker={{ price: '£150', percentage: 50, type: MARKER_DISPLAY_TYPES.DOT }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 2: Bubble marker (boundaries shown)

```tsx
// With explicit type
<BpkPriceRange
  marker={{ price: '£150', percentage: 50, type: MARKER_DISPLAY_TYPES.BUBBLE }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>

// With default type (type can be omitted)
<BpkPriceRange
  marker={{ price: '£150', percentage: 50 }}
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

### Use case 3: No marker (boundaries shown)

```tsx
<BpkPriceRange
  segments={{ low: { price: '£100', percentage: 20 }, high: { price: '£200', percentage: 80 } }}
/>
```

## Deprecated props

⚠️ **Warning: The following props are deprecated and will be removed in the next major release.**

### `showPriceIndicator`

The `showPriceIndicator` prop has been deprecated in favour of the more explicit `marker.type` API.

**If you're not using this prop, no action is needed.** This deprecation only affects code that explicitly uses `showPriceIndicator`.

**Quick migration:**

```tsx
// Before (only if you're using showPriceIndicator={true})
<BpkPriceRange
  showPriceIndicator={true}
  marker={{ price: '£150', percentage: 50 }}
  segments={{ ... }}
/>

// After - simply remove the prop
<BpkPriceRange
  marker={{ price: '£150', percentage: 50 }}
  segments={{ ... }}
/>
```

```tsx
// Before (only if you're using showPriceIndicator={false})
<BpkPriceRange
  showPriceIndicator={false}
  marker={{ price: '£150', percentage: 50 }}
  segments={{ ... }}
/>

// After - use type: MARKER_DISPLAY_TYPES.DOT
<BpkPriceRange
  marker={{
    price: '£150',
    percentage: 50,
    type: MARKER_DISPLAY_TYPES.DOT
  }}
  segments={{ ... }}
/>
```

For a complete migration guide, see [migrating-from-showPriceIndicator.md](./docs/migrating-from-showPriceIndicator.md).

## Props

| Property           | PropType                                                | Required | Default Value | Notes                                                                                                              |
|--------------------|---------------------------------------------------------|----------|---------------|--------------------------------------------------------------------------------------------------------------------|
| segments           | `{ low: PriceRangePosition, high: PriceRangePosition }` | true     | -             |                                                                                                                    |
| marker             | `MarkerPriceRangePosition`                              | false    | -             |                                                                                                                    |
| min                | `number`                                                | false    | 0             |                                                                                                                    |
| max                | `number`                                                | false    | 100           |                                                                                                                    |
| showPriceIndicator | `boolean`                                               | false    | true          | ⚠️ **Deprecated** - Use `marker.type` instead. See [migration guide](./docs/migrating-from-showPriceIndicator.md). |

### Types

```ts
type PriceRangePosition = {
  price: string;
  percentage: number;
};

type MarkerPriceRangePosition = PriceRangePosition & {
  type?: MarkerDisplayType; // Defaults to BUBBLE
};
```

### Constants

```ts
const MARKER_DISPLAY_TYPES = {
  BUBBLE: 'bubble',
  DOT: 'dot',
} as const;
```
