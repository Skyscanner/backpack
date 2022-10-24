# bpk-component-panel

> Backpack panel component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkPanel from '@skyscanner/backpack-web/bpk-component-panel';

export default () => (
  <BpkPanel>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  </BpkPanel>
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | -        | true     | -             |
| padded    | bool     | false    | true          |
| fullWidth | bool     | false    | false         |
| className | string   | false    | null          |
