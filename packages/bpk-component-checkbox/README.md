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

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| name          | string   | true     | -             |
| label         | node     | true     | -             |
| disabled      | bool     | false    | false         |
| indeterminate | bool     | false    | false         |
| required      | bool     | false    | false         |
| smallLabel    | bool     | false    | false         |
| valid         | bool     | false    | null          |
| white         | bool     | false    | false         |

## `indeterminate` prop

This property is used to set the state of the checkbox to `indeterminate` which displays with a minus sign. If a box is both `indeterminate` and `checked`, then `indeterminate` takes higher precedence until the box is clicked to check it. This is used when there is checkbox group and the parent displays this state when not all children checkboxes are selected.

## Theme Props

+ `checkboxCheckedColor`
