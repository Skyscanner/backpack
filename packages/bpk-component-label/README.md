# bpk-component-label

> Backpack label component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';

export default () => (
  <BpkLabel htmlFor="origin">Origin</BpkLabel>
)
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| children  | node     | true     | -             |
| disabled  | bool     | false    | false         |
| invalid   | bool     | false    | false         |
| required  | bool     | false    | false         |
| white     | bool     | false    | false         |
