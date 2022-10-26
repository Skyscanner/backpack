# bpk-component-checkbox

> Backpack checkbox component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
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

## Props

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| name          | string   | true     | -             |
| label         | node     | true     | -             |
| checked       | bool     | false    | false         |
| disabled      | bool     | false    | false         |
| indeterminate | bool     | false    | false         |
| required      | bool     | false    | false         |
| smallLabel    | bool     | false    | false         |
| valid         | bool     | false    | null          |
| white         | bool     | false    | false         |

## `indeterminate` prop

The indeterminate prop is only a visual clue, it does not affect the checked state of the checkbox. If `indeterminate` is flagged then the checkbox will be displayed with a minus sign in the box.  This is used when there is a checkbox group and the parent displays this state when not all child checkboxes are selected.

## Theme Props

+ `checkboxCheckedColor`
