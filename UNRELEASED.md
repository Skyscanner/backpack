**Breaking**

- bpk-component-datatable:
    - Replaced no-longer maintained `react-virtualized` dependency with `react-table` which has a bundle size of approximately 62kb less:
        - `BpkDataTableColumn` changes:
            - `cellRenderer` should now follow the following function signature:
                ```js
                function ({
                  cellData: any,
                  columnIndex: number,
                  dataKey: string,
                  rowData: any,
                  rowIndex: any
                }): node
                ```
                You can use these as a means to handle more complex data that needs any custom processing, but all styling will be handled by the component. You can use these strictly to render the cell data. For example:
                ```js
                cellRenderer={({ cellData, rowData }) => {
                    if (rowData.name === 'Jose') {
                    return <div> Remote </div>
                }
                    return <div> {cellData.office} - {cellData.desk} </div>;
                }}
                ```
            
            - `cellDataGetter` should now follow the following function signature:
                ```js
                function ({
                dataKey: string,
                rowData: any
                }): any
                ```
                You can use these as a means to handle more complex data that needs any custom processing, but all styling will be handled by the component. You can use these strictly to render the cell data. For example:
                ```js
                cellRenderer={({ rowData }) => {
                    if (rowData.name === 'Jose') {
                    return <div> Remote </div>
                }
                    return <div> Office </div>;
                }}
                ```
            
            - `headerRenderer` should now follow the following function signature:
                ```js
                  function ({
                  dataKey: string,
                  disableSort: boolean,
                  label: string
                  }): element
                ```
                All styling will be handled by the component and you no longer have to add styling or things such as sorting arrows. You can use this strictly to render the header data. For example:
                ```js
                headerRenderer={({ label }) => {
                    return <div> This is a {label} </div>;
                }}
                ```
        - `BpkDataTable` changes:
            - `rowRenderer` prop has been removed. For more complex use cases of handling data, use the `cellRenderer` prop (see example above).

            - `sort` prop takes a function `Function(rowA: <Row>, rowB: <Row>, columnId: String, desc: Bool)` that compares 2 rows. It should return `1` if `rowA` is larger, and `-1` if `rowB` is larger. The function will be applied to the column give the column id `sortBy` and will be sorting the data in the direction of `sortDirection`. The function signature has changed. For example:
            ```js
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
            ```
            should be changed to
            ```js
            const sortFunction = (rowA, rowB, id, desc) => {
                const deskA = rowA.values.seat.desk;
                const deskB = rowB.values.seat.desk;

                if (deskA === deskB) {
                    return 0;
                } else {
                    return deskA > deskB ? 1 : -1;
                }
            }
            ```
            Note you no longer need to handle the code for each sorting direction.

**Changed:**

- bpk-component-aria-live
  - Converted to TypeScript. If you were using a stub definition for this package the stub can now be deleted as types are readable directly from the package.
- bpk-component-scrollable-calendar:
  - Migrated from heavy `react-virtualized` library to more lightweight library previously used
  - With this change you will see snapshot (if being used) fail as it will change from rendering as the following to previously fuller rendered components showing week days and numbers

  ```
  <div
      style="overflow: visible; height: 0px; width: 0px;"
    >
      <div
        aria-label="grid"
        aria-readonly="true"
        class="ReactVirtualized__Grid ReactVirtualized__List"
        role="grid"
        style="box-sizing: border-box; direction: ltr; height: 0px; position: relative; width: 0px; will-change: transform; overflow-x: hidden; overflow-y: auto;"
        tabindex="0"
      />
    </div>
    <div
      class="resize-triggers"
    >
      <div
        class="expand-trigger"
      >
        <div
          style="width: 1px; height: 1px;"
        />
      </div>
      <div
        class="contract-trigger"
      />
  </div>
  ```

**Fixed:**

- bpk-component-calendar:
  - Set default values for `minDate` and `maxDate` in `BpkCalendarGrid`

**Breaking:**

- bpk-component-calendar:
  - Removed `cellType` prop and `CELL_TYPES` object which were used to colour the date cell. This is no longer supported.

**Changed:**

- bpk-component-calendar:
  - Changed calendar to semantic colours:
    - Changed navigation icon colours
    - Changed date range selection background colour
