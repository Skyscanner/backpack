# bpk-component-select

> Backpack select component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage (controlled)

```js
import BpkSelect from '@skyscanner/backpack-web/bpk-component-select';

export default () => (
  <BpkSelect
    id="fruits"
    name="fruits"
    value="oranges"
    onChange={(e) => console.log(`select changed to ${e.target.value}`)}
  >
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="pears">Pears</option>
  </BpkSelect>
);
```

## Usage (uncontrolled)

```js
import BpkSelect from '@skyscanner/backpack-web/bpk-component-select';

export default () => (
  <BpkSelect
    id="fruits"
    name="fruits"
    defaultValue="oranges"
  >
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="pears">Pears</option>
  </BpkSelect>
);
```