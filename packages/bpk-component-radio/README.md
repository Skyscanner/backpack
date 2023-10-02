# bpk-component-radio

> Backpack radio button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkRadio from '@skyscanner/backpack-web/bpk-component-radio';

export default () => (
  <BpkRadio
    name="return"
    label="Return"
    onChange={() => console.log('radio changed')}
    checked
  />
);
```

## Progressive enhancement
On Internet Explorer 11, radio buttons have the standard built-in appearance.