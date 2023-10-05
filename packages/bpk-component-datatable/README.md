# bpk-component-datatable

> Backpack datatable component.

If you get the following warning `BpkDataTableColumns is deprecated. Please pass an array of objects to the columns prop instead`, see [migration guide](./docs/migrating.md) for details on how to migrate to the latest version of datatable.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { BpkDataTable, BpkDataTableColumn } from '@skyscanner/backpack-web/bpk-component-datatable';

const rows = [
  { name: 'Jose', description: 'Software Engineer' },
  { name: 'Rolf', description: 'Manager' }
]

const onRowClick = row => alert(JSON.stringify(row));

export default () => (
  <BpkDataTable
    rows={rows}
    height={'12.5rem'}
    onRowClick={onRowClick}
    columns={
    [
      {
        label: 'Name',
        accessor: 'name',
        width: '6.25rem',
      },
      {
        label: 'Description',
        accessor: 'description',
        width: '6.25rem',
        flexGrow: 1,
      }
    ]}
  />
);
```

By default `BpkDataTable` sorts the column using the value of `dataKey`. For use cases where the data might more complex and requires custom sorting you can pass a `sort` function along with `sortBy` and `sortDirection`.

```js
import { Fragment } from 'react';
import { BpkDataTable, BpkDataTableColumn } from '@skyscanner/backpack-web/bpk-component-datatable';

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
const sortFunction = (rowA, rowB, id, desc) => {
  const deskA = rowA.values.seat.desk;
  const deskB = rowB.values.seat.desk;

  if (deskA === deskB) {
      return 0;
  } else {
      return deskA > deskB ? 1 : -1;
  }
}

export default () => (
  <BpkDataTable
    rows={complexRows}
    height={"12.5rem"}
    sort={sortFunction}
    sortBy={sortByValue}
    sortDirection={sortDirectionValue}
    columns={
      [
        {
          label: 'Name',
          accessor: 'name',
          width: '6.25rem',
        },
        {
          label: 'Description',
          accessor: 'description',
          width: '6.25rem',
        },
        {
          label: 'Seat',
          accessor: 'seat',
          width: '6.25rem',
          flexGrow: 1,
          Cell: ({ cellData }) => (
            <Fragment>
              {cellData.office} - {cellData.desk}
            </Fragment>
          )}
      ]}
    />
);
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/data-table/web-S6OeN67N#section-props-8c).
