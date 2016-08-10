# bpk-component-table

> Backpack table component.

### Installation

```sh
npm install bpk-component-table --save
```

### Usage

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
        <BpkTableHeadCell>Heading</BpkTableHeadCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Tabular data</BpkTableCell>
      </BpkTableRow>
    </BpkTableHead>
  </BpkTable>
)
```
