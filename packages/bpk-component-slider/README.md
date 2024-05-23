# bpk-component-slider

> Backpack slider component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkSlider from '@skyscanner/backpack-web/bpk-component-slider';

const Slider = () => (
  <BpkSlider
    min={0}
    max={100}
    value={[20, 80]}
    step={10}
    onChange={(value) => alert('Actual value: ' + value)}
    ariaLabel={['min', 'max']}
  />
);

```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/slider/web-aNXvlY7y#section-props-1e).
