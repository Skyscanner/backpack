# bpk-component-page-indicator

> Backpack page indicator component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/page-indicator/web-4FOtKGmR#section-props-c2).
