# bpk-component-radio

> Backpack radio button component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
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

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| name      | string   | true     | -             |
| label     | node     | true     | -             |
| ariaLabel | string   | false    | props.label   |
| disabled  | bool     | false    | false         |
| white     | bool     | false    | false         |
| valid     | bool     | false    | null          |

## Theme Props

+ `radioCheckedColor`

## Progressive enhancement
On Internet Explorer 11, radio buttons have the standard built-in appearance.