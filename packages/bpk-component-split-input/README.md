# bpk-component-split-input

> Backpack split-input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkSplitInput, { INPUT_TYPES } from '@skyscanner/backpack-web/bpk-component-split-input';

export default () => (
  <BpkSplitInput
    type={INPUT_TYPES.number}
    name="otpInput"
    id="otpInput"
    label="otp input"
    onChange={(e) => console.log('On Input Change')}
    onSubmit={(e) => console.log('On Submit')}
  />
);
```

## Props


| Property         | PropType                   | Required            | Default Value            |
| ---------------- | -------------------------- | ------------------- | ------------------------ |
| id               | string                     | true                | -                        |
| name             | string                     | true                | -                        |
| type             | INPUT_TYPES (one of)       | false               | INPUT_TYPES.number       |
| inputLength      | number                     | false               | 4                        |
| placeholder      | string                     | false               | -                        |
| label            | string                     | true                | -                        |
| large            | bool                       | false               | true                     |
| onChange         | bool                       | true                | -                        |
| onSubmit         | bool                       | true                | -                        |
