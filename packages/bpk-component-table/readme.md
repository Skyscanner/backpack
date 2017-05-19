# bpk-component-table

> Backpack table component.

## Installation

```sh
npm install bpk-component-table --save-dev
```

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
} from 'bpk-component-table';

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

> For `BpkTable`, `BpkTableHead`, `BpkTableBody`, `BpkTableRow`, `BpkTableCell` & `BpkTableHeadCell`.

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| children | -        | true     | -             |
