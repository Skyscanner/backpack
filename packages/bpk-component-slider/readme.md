# bpk-component-slider

> Backpack slider component.

## Installation

```sh
npm install bpk-component-slider --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkSlider from 'bpk-component-slider';

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

[Please refer to react-slider's documentation for a full list of props](https://github.com/mpowaga/react-slider#properties).

| Property                 | PropType                      | Required | Default Value |
| ------------------------ | ----------------------------- | -------- | ------------- |
| className                | string                        | false    | null          |
| large                    | bool                          | false    | false         |

## Theme Props

* `sliderBarColor`
