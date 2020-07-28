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
  <BpkChip
    closeLabel="Close"
    onClose={event => console.log('Chip closing!', event)}
  >
    This is a chip!
  </BpkChip>
);
```

## Props

| Property    | PropType                | Required | Default Value |
| ----------- | ----------------------- | -------- | ------------- |
| children    | node                    | true     | -             |
| onClose     | func                    | true     | -             |
| closeLabel  | oneOfType(string, func) | true     | -             |
| className   | string                  | false    | null          |
| disabled    | bool                    | false    | false         |
| dismissible | bool                    | false    | true          |
| type        | oneOf(`CHIP_TYPES.light`, `CHIP_TYPES.neutral`, `CHIP_TYPES.primary`, `CHIP_TYPES.success`) | false    | `CHIP_TYPES.neutral`|
