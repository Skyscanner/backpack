# bpk-component-table

> Backpack table component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React from 'react';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from '@skyscanner/backpack-web/bpk-component-table';

export default () => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>Heading 1</BpkTableHeadCell>
        <BpkTableHeadCell>Heading 2</BpkTableHeadCell>
        <BpkTableHeadCell>Heading 3</BpkTableHeadCell>
        <BpkTableHeadCell>Heading 4</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Row 1, Data 1</BpkTableCell>
        <BpkTableCell>Row 1, Data 2</BpkTableCell>
        <BpkTableCell>Row 1, Data 3</BpkTableCell>
        <BpkTableCell>Row 1, Data 4</BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Row 2, Data 1</BpkTableCell>
        <BpkTableCell>Row 2, Data 2</BpkTableCell>
        <BpkTableCell>Row 2, Data 3</BpkTableCell>
        <BpkTableCell>Row 2, Data 4</BpkTableCell>
      </BpkTableRow>
    </BpkTableBody>
  </BpkTable>
);
```

## Props

> For `BpkTableHead`, `BpkTableBody`, `BpkTableRow` & `BpkTableCell` .

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | node     | true     | -             |

> For `BpkTable` & `BpkTableHeadCell`.

| Property               | PropType | Required | Default Value |
| ---------------------- | -------- | -------- | ------------- |
| children               | node     | true     | -             |
| alternate (deprecated) | bool     | false    | false         |

