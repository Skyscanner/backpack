# bpk-component-switch

> Backpack switch component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkSwitch from '@skyscanner/backpack-web/bpk-component-switch';

export default () => (
  <div>
    <BpkSwitch label="Switched on" checked />
    <BpkSwitch label="Turned off" />
  </div>
)
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| label     | Node     | true     | -             |
| className | string   | false    | null          |
| small     | boolean  | false    | false         |

This component uses a hidden [`<input type="checkbox" />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), so it supports all the same properties as it (for example `checked`).

## Theme props

* `switchCheckedColor`
