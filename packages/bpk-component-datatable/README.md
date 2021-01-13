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

By default `BpkDataTable` sorts the column using the value of `dataKey`. For use cases where the data might more complex and requires custom sorting you can pass a `sort` function along with `sortBy` and `sortDirection` and they will be handled as explained in react-virtualized's [docs] (https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md#prop-types)

```js
import React from 'react';
import { BpkDataTable, BpkDataTableColumn } from 'bpk-component-datatable';
import _sortBy from 'lodash/sortBy';

const complexRows = [
    {
      name: 'Jose',
      description: 'Software Engineer',
      seat: { office: 'London', desk: 10 },
    },
    {
      name: 'Rolf',
      description: 'Manager',
      seat: { office: 'Barcelona', desk: 12 },
    },
    {
      name: 'John',
      description: 'Software Engineer',
      seat: { office: 'Barcelona', desk: 15 },
    },
];

let sortByValue = 'seat';
let sortDirectionValue = 'DESC';
const sortFunction = ({ sortBy, sortDirection }) => {
  if (sortBy === 'seat') {
    complexRows = _sortBy(complexRows, [
      row => row.seat.office,
      row => row.seat.desk,
    ]);
  } else {
    complexRows = _sortBy(complexRows, sortBy);
  }
  if (sortDirection === 'DESC') {
    complexRows.reverse();
  }
  sortByValue = sortBy;
  sortDirectionValue = sortDirection;
};

export default () => (
  <BpkDataTable
    rows={complexRows}
    height={200}
    sort={sortFunction}
    sortBy={sortByValue}
    sortDirection={sortDirectionValue}
  >
    <BpkDataTableColumn
      label="Name"
      dataKey="name"
      width={100}
    />
    <BpkDataTableColumn
      label="Description"
      dataKey="description"
      width={100}
    />
    <BpkDataTableColumn
      label="Seat"
      dataKey="seat"
      width={100}
      flexGrow={1}
      cellRenderer={({ cellData }) => (
        <React.Fragment>
          {cellData.office} - {cellData.desk}
        </React.Fragment>
      )}
    />
  </BpkDataTable>
);
```

## Props

### BpkDataTable

Supports all properties defined in [`Table`](https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md) (from `react-virtualized`),
in addition to the following:


| Property               | PropType                    | Required | Default Value        |
| ---------------------- | --------------------------- | -------- | -------------------- |
| rows                   | arrayOf(Object)             | true     | -                    |
| children               | arrayOf(BpkDataTableColumn) | true     | -                    |
| height                 | number                      | true     | -                    |
| width                  | number                      | false    | full width of parent |
| headerHeight           | number                      | false    | 60                   |
| rowHeight              | number                      | false    | 60                   |
| defaultColumnSortIndex | number                      | false    | 0                    |
| sort                   | func                        | false    | null                 |
| sortBy                 | string                      | false    | null                 |
| sortDirection          | oneOf('ASC', 'DESC')        | false    | null                 |


### BpkDataTableColumn

Supports all properties defined in [`Column`](https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md) (from `react-virtualized`)
