# bpk-component-page-indicator

> Backpack page indicator component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkPageIndicator from '@skyscanner/backpack-web/bpk-component-page-indicator';

export default () =>
  <BpkPageIndicator
    currentIndex={0}
    totalIndicators={7}
    onClick={(e, newIndex, direction) => {
      console.log('Slide to new index:', newIndex);
      console.log('Slide direction:', direction);
    }}
    indicatorLabel='Go to slide'
    prevNavLabel='Previous slide'
    nextNavLabel='Next slide'
  />;
```

## Props

| Property        | PropType       | Required | Default Value   |
|-----------------|----------------|----------|-----------------|
| currentIndex    | number         | true     | -               |
| totalIndicators | number         | true     | -               |
| indicatorLabel  | string         | true     | -               |
| prevNavLabel    | string         | true     | -               |
| nextNavLabel    | string         | true     | -               |
| className       | string         | false    | null            |
| showNav         | bool           | false    | false           |
| variant         | oneOf(VARIANT) | false    | VARIANT.default |
| onClick         | func           | false    | null            |

