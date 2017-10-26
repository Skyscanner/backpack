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

| Property                 | PropType                      | Required | Default Value |
| ------------------------ | ----------------------------- | -------- | ------------- |
| min                      | number                        | true     | -             |
| max                      | number                        | true     | -             |
| value                    | number or array of numbers    | true     | -             |
| step                     | number                        | true     | -             |
| minDistance              | number                        | false    | 1             |
| className                | string                        | false    | null          |
| large                    | bool                          | false    | false         |
| onChange                 | func                          | false    | null          |
| onAfterChange            | func                          | false    | null          |
