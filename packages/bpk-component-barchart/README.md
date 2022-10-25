# bpk-component-barchart

> Backpack bar chart component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
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

### Props

| Property                                | PropType                              | Required | Default Value           |
| --------------------------------------- | ------------------------------------- | -------- | ----------------------- |
| [data](#data)                           | custom(validates usage of scale keys) | true     | -                       |
| [xScaleDataKey](#xscaledatakey)         | string                                | true     | -                       |
| [yScaleDataKey](#yscaledatakey)         | string                                | true     | -                       |
| xAxisLabel                              | string                                | true     | -                       |
| yAxisLabel                              | string                                | true     | -                       |
| initialWidth                            | number                                | true     | -                       |
| initialHeight                           | number                                | true     | -                       |
| className                               | string                                | false    | null                    |
| leadingScrollIndicatorClassName         | string                                | false    | null                    |
| trailingScrollIndicatorClassName        | string                                | false    | null                    |
| [outlierPercentage](#outlierpercentage) | number                                | false    | null                    |
| showGridlines                           | bool                                  | false    | false                   |
| xAxisMargin                             | number                                | false    | 3                       |
| xAxisTickValue                          | func                                  | false    | identity                |
| xAxisTickOffset                         | number                                | false    | 0                       |
| xAxisTickEvery                          | number                                | false    | 1                       |
| yAxisMargin                             | number                                | false    | 2.625                   |
| yAxisTickValue                          | func                                  | false    | identity                |
| yAxisNumTicks                           | number                                | false    | null                    |
| yAxisDomain                             | array                                 | false    | Calculated by component |
| [onBarClick](#onbarclick)               | func                                  | false    | null                    |
| [onBarHover](#onbarhover)               | func                                  | false    | null                    |
| [onBarFocus](#onbarfocus)               | func                                  | false    | null                    |
| [getBarLabel](#getbarlabel)             | func                                  | false    | See prop details        |
| [getBarSelection](#getbarselection)     | func                                  | false    | See prop details        |
| BarComponent                            | elementType                                  | false    | BpkBarchartBar          |
| disableDataTable                        | bool                                  | false    | false                   |

### Theme Props

* `barchartBarBackgroundColor`
* `barchartBarHoverBackgroundColor`
* `barchartBarActiveBackgroundColor`
* `barchartBarSelectedBackgroundColor`

### Prop Details

#### data

An array of data points with a value for the x axis and y axis respectively. The keys for the x axis and y axis can be anything you choose. Specify the keys with the props `xScaleDataKey` and `yScaleDataKey`. For this data the `xScaleDataKey` would be `day` and the `yScaleDataKey` `price`.

```json
[
  {
    "day": "mon",
    "price": 240
  },
  {
    "day": "tus",
    "price": 340
  },
  {
    "day": "wen",
    "price": 300
  },
  {
    "day": "thu",
    "price": 340
  },
  {
    "day": "fri",
    "price": 353
  },
  {
    "day": "sat",
    "price": 290
  },
  {
    "day": "sun",
    "price": 380
  }
]
```



#### xScaleDataKey

The key in each data point that holds the value for the x axis of that data point.

#### yScaleDataKey

The key in each data point that holds the value for the y axis of that data point.

#### yAxisDomain

Override the default y axis domain.  This is an array with two elements, the lower then upper domain.  If either value is set to `null` the default value is used instead.

```javascript
<BpkBarchart
  ...
  yAxisDomain={[null, 100]} // The y axis will go from 0 (the default) to 100.
/>
```

#### `outlierPercentage`

Values that are `outlierPercentage` percent above the mean of the whole dataset are considered outliers and rendered cut off instead of at their full height.

#### `onBarClick`

```javascript
const onBarClick = (event, {
  point: <Object>, // The `data` array object from the bar clicked
}) => {
  ...
}
```

#### `onBarHover`

```javascript
const onBarHover = (event, {
  point: <Object>, // The `data` array object from the bar hovered
}) => {
  ...
}
```

#### `onBarFocus`

```javascript
const onBarFocus = (event, {
  point: <Object>, // The `data` array object from the bar focused
}) => {
  ...
}
```

#### `getBarLabel`

By default the following function is used:

```javascript
(point, xScaleDataKey, yScaleDataKey) => {
  return `${point[xScaleDataKey]} - ${point[yScaleDataKey]}`;
}
```

#### `getBarSelection`

Must be a function which returns true based on the `point` argument:

```javascript
const getBarSelection = (point) => {
  return point.myKnownProperty === 'foo';
}
```
