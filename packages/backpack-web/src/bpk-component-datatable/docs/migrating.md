### BpkDataTable - migrating to @skyscanner/backpack v32.

There are 2 breaking changes as part of the latest release:

#### `BpkDataTableColumn` is removed.
**NEW PROP:** `columns` to replace `BpkDataTableColumn` children.
Pass `columns` prop as an array of objects instead of passing the columns as children.

```js
export default () => (
  <BpkDataTable rows={rows} height={"12.5rem"} onRowClick={onRowClick}>
    <BpkDataTableColumn
      label={'Name'}
      dataKey={'name'}
      width={{"6.25rem"}}
      disableSort
    />
    <BpkDataTableColumn
      label={'Description'}
      dataKey={'description'}
      width={{"6.25rem"}}
      flexGrow={1}
    />
  </BpkDataTable>
);
```

to

```js
export default () => (
  <BpkDataTable
    rows={rows}
    height={"12.5rem"}
    onRowClick={onRowClick}
    columns={[
      {
        label: 'name',
        accessor: 'name',
        width: '6.25rem',
        disableSortBy: true
      },
      ...
    ]}
    />
);
```

`columns` is an array of Objects with the following schema:
```
{
  Header: function({disableSortBy, accessor, label}),
  accessor: string,
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
The schema differs from the old `BpkDataTableColumn` as follows:
- `disableSort` renamed to `disableSortBy`
- `dataKey` renamed to `accessor`
- `headerRenderer` is removed. Use the `Header` prop instead to pass a function that formats the header value. If you pass a function, it will receive the `disableSortBy`, `accessor`, and `label` props of the column. Must return valid JSX.
- `cellRenderer` and `cellDataGetter` are removed. Use the `Cell` prop instead to pass a function that formats the column value. It will receive the `rowData` and `rowIndex` of the cell's row, `accessor` and `columnIndex` of the cell's column, `cellData` props. Must return valid JSX.

#### All heights and widths should  be passed in rem
All height and width properties should be using `rem` values.