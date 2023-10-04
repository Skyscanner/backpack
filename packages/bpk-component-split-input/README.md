# bpk-component-split-input

> Backpack split-input component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
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

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/split-input/web-dTSkmYDv#section-props-2d).
