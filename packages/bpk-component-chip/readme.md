# bpk-component-chip

> Backpack chip component.

## Installation

```sh
npm install bpk-component-chip --save-dev
```

## Usage

### BpkChip

```js
import React from 'react';
import BpkChip from 'bpk-component-chip';

export default () => (
  <BpkChip onClose={event => console.log('Chip closing!', event)} >This is a chip!</BpkChip>
);
```

### BpkChipInput

```js
import React from 'react';
import { BpkChipInput } from 'bpk-component-chip';
import { colors } from 'bpk-tokens/tokens/base.es6';

export default () => (
  <BpkChipInput
    values={['Lorem', 'ipsum', 'dolor', 'sit', 'amet']}
    selectedColor={colors.colorBlue300}
    selectedItem="dolor"
    placeholderText="Add a chip..."
    textInputValue=""
    onTextInputChanged={newValue => this.textInputChanged(newValue)}
    onSelectionChanged={newValue => this.selectionChanged(newValue)}
    valueAdded={newValue => this.addValue(newValue)}
    valueRemoved={removedValue => this.removeValue(removedValue)}
  />
);
```

## Props

### BpkChip

| Property   | PropType                | Required | Default Value |
| ---------- | ----------------------- | -------- | ------------- |
| children   | node                    | yes      | -             |
| className  | string                  | no       | -             |
| closeLabel | oneOfType(string, func) | no       | -             |
| onClose    | func                    | yes      | -             |
| selected | bool                      | no       | false         |

### BpkChipInput

| Property           | PropType         | Required | Default Value        |
| ------------------ | ---------------- | -------- | -------------------- |
| closeName          | func             | yes      | -                    |
| onClose            | func             | yes      | -                    |
| onInput            | func             | yes      | -                    |
| placeholderText    | string           | yes      | -                    |
| textInputValue     | string           | yes      | -                    |
| className          | string           | no       | null                 |
| onSelectionChanged | func             | no       | null                 |
| onTextInputChanged | func             | no       | null                 |
| selectedItem       | string           | no       | null                 |
| valueAdded         | func             | no       | null                 |
| valueRemoved       | func             | no       | null                 |
| values             | arrayOf(string)  | no       | []                   |
