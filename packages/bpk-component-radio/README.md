# bpk-component-radio

> Backpack radio button component.

## Installation

```sh
npm install bpk-component-radio --save-dev
```

## Usage

```js
import React from 'react';
import BpkRadio from 'bpk-component-radio';

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

## Theme Props

+ `radioCheckedColor`
