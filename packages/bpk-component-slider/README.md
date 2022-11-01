# bpk-component-slider

> Backpack slider component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkSlider from '@skyscanner/backpack-web/bpk-component-slider';

const Slider = () => (
  <BpkSlider
    min={0}
    max={100}
    value={[20, 80]}
    step={10}
    className={'my-class-name'}
    onChange={(value) => alert('Actual value: ' + value)}
  />
);

```

## Props

[Please refer to react-slider's documentation for a full list of props](https://zillow.github.io/react-slider/).

> Note: When you're representing non-integer values (eg time, dates) please ensure you use `ariaLabel` and `ariaValuetext` to ensure that assistive technologies will be able to understand the value better.

| Property                 | PropType                      | Required | Default Value |
| ------------------------ | ----------------------------- | -------- | ------------- |
| className                | string                        | false    | null          |
| large                    | bool                          | false    | false         |

## Theme Props

* `sliderBarColor`
