# bpk-component-select

> Backpack select component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage (controlled)

```js
import React from 'react';
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
import React from 'react';
import BpkSelect from 'bpk-component-select';

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

## Props

| Property                  | PropType   | Required | Default Value |
| ------------              | --------   | -------- | ------------- |
| id                        | string     | true     | -             |
| name                      | string     | true     | -             |
| value                     | string     | false    | use [defaultValue](https://reactjs.org/docs/dom-elements.html#value)|
| onChange                  | func       | false    | undefined     |
| valid                     | bool       | false    | null          |
| large                     | bool       | false    | false         |
| disabled                  | bool       | false    | false         |
| docked                    | bool       | false    | false         |
| dockedFirst               | bool       | false    | false         |
| dockedMiddle              | bool       | false    | false         |
| dockedLast                | bool       | false    | false         |
| image                     | node       | false    | null          |
| wrapperClassName          | string     | false    | null          |
