# bpk-component-barchart

> Backpack bar chart component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkBarchart from '@skyscanner/backpack-web/bpk-component-barchart';

const priceData = [
  {
    day: 'mon',
    price: 240,
  },
  // ...
];

export default () => (
  <BpkBarchart
    xAxisLabel="Weekday"
    yAxisLabel="Price (£)"
    xScaleDataKey="day"
    yScaleDataKey="price"
    initialWidth={500}
    initialHeight={300}
    data={priceData}
  />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/bar-chart/web-833oDHBG#section-props-18).
