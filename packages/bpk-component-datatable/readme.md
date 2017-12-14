# bpk-component-datatable

> Backpack datatable component.

## Installation

```sh
npm install bpk-component-datatable --save-dev
```

## Usage

```js
import React from 'react';
import { BpkDataTable, BpkDataTableColumn } from 'bpk-component-datatable';

const rows = [
  { name: 'Jose', description: 'Software Engineer' },
  { name: 'Rolf', description: 'Manager' }
]

const onRowClick = row => alert(JSON.stringify(row));

export default () => (
  <BpkDataTable rows={rows} height={200} onRowClick={onRowClick}>
    <BpkDataTableColumn
      label={'Name'}
      dataKey={'name'}
      width={100}
    />
    <BpkDataTableColumn
      label={'Description'}
      dataKey={'description'}
      width={100}
      flexGrow={1}
    />
  </BpkDataTable>
);
```

## Props

### BpkDataTable

| Property     | PropType                | Required | Default Value        |
| ------------ | ----------------------- | -------- | -------------------- |
| rows         | arrayOf(Object)         | yes      | -                    |
| children     | node                    | yes      | -                    |
| height       | number                  | yes      | -                    |
| onRowClick   | function                | no       | -                    |
| width        | number                  | no       | full width of parent |
| headerHeight | number                  | no       | 60                   |
| rowHeight    | number                  | no       | 60                   |
| className    | number                  | no       | -                    |

### BpkDataTableColumn

Supports all properties defined in [`Column`](https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md) (from `react-virtualized`)
