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
| required      | bool     | false    | false         |
| disabled      | bool     | false    | false         |
| white         | bool     | false    | false         |
| smallLabel    | bool     | false    | false         |
| valid         | bool     | false    | null          |
| indeterminate | bool     | false    | false         |

## `indeterminate` prop

This property is used to set the state of the checkbox to `indeterminate` which displays with a minus sign. This is used when there is checkbox group and the parent displays this state when not all children checkboxes are selected.

## Theme Props

+ `checkboxCheckedColor`
