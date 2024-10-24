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


## Native Events

Just like a `input` `type="range"` the BpkSlider will fire a change event from the hidden `input` `type="number"` for each thumb. These behave similarly where user can drag the thumb and will fire a change event on `mouseup`/`click`.
As for the keyboard events the change event will fire on `keyup` rather than on every keystroke registered like the `input` `type=range` does.