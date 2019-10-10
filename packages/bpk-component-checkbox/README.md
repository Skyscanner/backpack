# bpk-component-checkbox

> Backpack checkbox component.

## Installation

```sh
npm install bpk-component-checkbox --save-dev
```

## Usage

```js
import React from 'react';
import BpkCheckbox from 'bpk-component-checkbox';

export default () => (
  <BpkCheckbox
    name="prefer-directs"
    onChange={() => console.log('prefer directs changed!')}
    label="Prefer directs"
    checked
  />
);
```

## Props

| Property   | PropType | Required | Default Value |
| ---------- | -------- | -------- | ------------- |
| name       | string   | true     | -             |
| label      | node     | true     | -             |
| required   | bool     | false    | false         |
| disabled   | bool     | false    | false         |
| white      | bool     | false    | false         |
| smallLabel | bool     | false    | false         |
| valid      | bool     | false    | null          |

## Theme Props

+ `checkboxCheckedColor`
