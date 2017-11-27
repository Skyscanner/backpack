# bpk-component-datatable

> Backpack datatable component, which takes up the entire width of the parent.

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

export default () => (
  <BpkDataTable rows={rows} height={200} dir={'rtl'}>
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

| Property   | PropType                | Required | Default Value |  
| ---------- | ----------------------- | -------- | ------------- |  
| rows       | arrayOf(Object)         | yes      | -             |  
| children   | node                    | yes      | -             |  
| height     | number                  | yes      | -             |  
| dir        | string                  | no       | 'ltr'         |  

### BpkColumn

| Property   | PropType                | Required | Default Value |  
| ---------- | ----------------------- | -------- | ------------- |  
| label      | string                  | yes      | -             |  
| dataKey    | string                  | yes      | -             |  
| width      | number                  | yes      | -             |  
| flexGrow   | number                  | no       | 0             |  
