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

### BpkDataTable

| Property               | PropType                    | Required | Default Value        |
| ---------------------- | --------------------------- | -------- | -------------------- |
| rows                   | arrayOf(Object)             | true     | -                    |
| ~~children~~ Replace with `columns` | arrayOf(~~BpkDataTableColumn~~ Object) | true     | -                    |
| columns                | arrayOf(Object)             | false    | undefined            |
| height                 | oneOfType(number, string)   | true     | -                    |
| width                  | oneOfType(number, string)   | false    | full width of parent |
| headerHeight           | oneOfType(number, string)   | false    | '3.75rem'            |
| rowClassName           | string                      | false    | null                 |
| rowHeight              | oneOfType(number, string)   | false    | '3.75rem'            |
| rowStyle               | object                      | false    | {}                   |
| onRowClick             | func                        | false    | null                 |
| className              | string                      | false    | null                 |
| defaultColumnSortIndex | number                      | false    | 0                    |
| sort                   | func                        | false    | null                 |
| sortBy                 | string                      | false    | null                 |
| sortDirection          | oneOf('ASC', 'DESC')        | false    | 'ASC'                |


~~### BpkDataTableColumn~~ Use the `columns` prop instead to pass the columns to the `BpkDataTable` component.

| Property               | PropType                    | Required | Default Value        |
| ---------------------- | --------------------------- | -------- | -------------------- |
| dataKey                | string                      | true     | -                    |
| width                  | oneOfType(number, string)   | true     | -                    |
| minWidth               | oneOfType(number, string)   | false    | undefined            |
| flexGrow               | number                      | false    | 0                    |
| label                  | string                      | false    | null                 |
| headerRenderer         | func                        | false    | null                 |
| headerClassName        | string                      | false    | null                 |
| headerStyle            | object                      | false    | {}                   |
| cellRenderer           | func                        | false    | null                 |
| cellDataGetter         | func                        | false    | null                 |
| disableSort            | bool                        | false    | false                |
| defaultSortDirection   | oneOf('ASC', 'DESC')        | false    | 'ASC'                |
| className              | string                      | false    | null                 |

### Prop Details

#### columns

`columns` is an array of Objects with the following schema:
```
{
  Header: function({disableSortBy, accessor, label}),
  accessor: string, (required)
  Cell: function({rowData, rowIndex, accessor, columnIndex, cellData}),
  className: string,
  disableSortBy: boolean,
  defaultSortDirection: oneOf('ASC', 'DESC'),
  flexGrow: number,
  headerClassName: string,
  headerStyle: Object,
  label: string,
  minWidth: string,
  style: Object,
  width: string,
}
```
##### Header (optional)
Function to formal header data.

##### Cell (optional)
Function to format cell data.

#### width (table), height, headerHeight, rowHeight, width (column), minWidth

Please provide values for these props in `rem` to ensure data table is scalable.

#### sort, sortBy, sortDirection

For custom sorting, pass a `sort` function.
Use `sortBy` to specify which column the custom sorting will be applied to.
Use `sortDirection` to set the direction of sorting. By default, it will be ascending.

#### defaultColumnSortIndex

The data will be sorted by default based on this column.

#### headerRenderer

To handle more complex header data that needs any custom processing, pass a function or component to `headerRenderer` prop. This will only be formatting the header value - all styling will be handled by the component.
It should implement the following signature:

```
  function ({
  dataKey: string, disableSort: boolean, label: string
  }): element
```

#### cellDataGetter

To handle more complex cell data that needs any custom processing, pass a function or component to `cellDataGetter` prop. This will only be formatting the cell value - all styling will be handled by the component.
It should implement the following signature:

```
function ({
  dataKey: string,
  rowData: any
}): any
```

#### cellRenderer

To handle more complex cell data that needs any custom processing, pass a function or component to `cellRenderer` prop. This will only be formatting the cell value - all styling will be handled by the component. To maintain backward compatibility, both `cellRenderer` and `cellDataGetter` will be supported, however, they are interchangeable as they both can only format the cell value.
It should implement the following signature:

```
function ({
  cellData: any,
  columnIndex: number,
  dataKey: string,
  rowData: any,
  rowIndex: any,
}): node
```
