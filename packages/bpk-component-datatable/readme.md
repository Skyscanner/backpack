# bpk-component-datatable

> Backpack datatable component (using react-virtualised).

## Installation

```sh
npm install bpk-component-datatable --save-dev
```

## Usage

```js
import React from 'react';
import BpkDataTable from 'bpk-component-datatable';

const rows = [
  { name: 'Jose', description: 'Software Engineer' },
  { name: 'Rolf', description: 'Manager' }
]

const onRowClick = row => alert(JSON.stringify(row));

export default () => (
  <BpkDataTable rows={rows} height={200} dir={'rtl'} onRowClick={onRowClick}>
    <BpkColumn
      label={'Name'}
      dataKey={'name'}
      width={100}
    />
    <BpkColumn
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

| Property   | PropType                | Required | Default Value        |
| ---------- | ----------------------- | -------- | -------------------- |
| rows       | arrayOf(Object)         | yes      | -                    |
| children   | node                    | yes      | -                    |
| height     | number                  | yes      | -                    |
| onRowClick | function                | no       | -                    |
| width      | number                  | no       | full width of parent |
| dir        | string                  | no       | 'ltr'                |

### BpkColumn

| Property   | PropType                | Required | Default Value |
| ---------- | ----------------------- | -------- | ------------- |
| label      | string                  | yes      | -             |
| dataKey    | string                  | yes      | -             |
| width      | number                  | yes      | -             |
| flexGrow   | number                  | no       | 0             |
