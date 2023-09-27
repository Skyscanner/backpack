# bpk-component-checkbox

> Backpack checkbox component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkCheckbox from '@skyscanner/backpack-web/bpk-component-checkbox';

export default () => (
  <BpkCheckbox
    name="prefer-directs"
    onChange={() => console.log('prefer directs changed!')}
    label="Prefer directs"
    checked
  />
);
```