# bpk-component-table

> Backpack table component.

## Installation

```sh
npm install bpk-component-table --save
```

## Usage

```js
import React from 'react'
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell
} from 'bpk-component-table'

export default MyComponent = () => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>Column 1</BpkTableHeadCell>
        <BpkTableHeadCell>Column 2</BpkTableHeadCell>
        <BpkTableHeadCell>Column 3</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Entry 1</BpkTableCell>
        <BpkTableCell>Entry 2</BpkTableCell>
        <BpkTableCell>Entry 3</BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Entry 4</BpkTableCell>
        <BpkTableCell>Entry 5</BpkTableCell>
        <BpkTableCell>Entry 6</BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Entry 7</BpkTableCell>
        <BpkTableCell>Entry 8</BpkTableCell>
        <BpkTableCell>Entry 9</BpkTableCell>
      </BpkTableRow>
    </BpkTableBody>
  </BpkTable>
)
```
