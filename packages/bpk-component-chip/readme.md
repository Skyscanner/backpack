# bpk-component-chip

> Backpack chip component.

## Installation

```sh
npm install bpk-component-chip --save-dev
```

## Usage

```js
import React from 'react';
import BpkChip from 'bpk-component-chip';

export default () => (
  <BpkChip onClose={event => console.log('Chip closing!', event)} >This is a chip!</BpkChip>
);
```

## Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| onClose   | func     | yes      | -             |
