**Breaking**

- bpk-component-datatable:
    - Replaced no-longer maintained `react-virtualized` dependency with `react-table` which has a bundle size of approximately 62kb less:
        - `BpkDataTableColumn` changes:
            - `cellRenderer` and `cellDataGetter` are props specific to `react-virtualized` library which you could pass to the `BpkDataTableColumn` component. You can continue to use these as a means to handle more complex data that needs any custom processing, but all styling will be handled by the component. You can use these strictly to render the cell data. The parameters will also be different, for example:
                ```
                cellRenderer={({ cellData, rowData }) => {
                    if (rowData.name === 'Jose') {
                    return <div> Remote </div>
                }
                    return <div> {cellData.office} - {cellData.desk} </div>;
                }}
                ```
                should be changed into
                ```
                cellRenderer={({ value, row: { values } }) => {
                    if (values.name === 'Jose') {
                    return <div> Remote </div>
                }
                    return <div> {value.office} - {value.desk} </div>;
                }}
                ```
            - `headerRenderer` is also a prop specific to `react-virtualized` library. You can continue to use this, but the parameters will be different. All styling will be handled by the component and you no longer have to add styling or things such as sorting arrows. You can use this strictly to render the header data. For example:
                ```
                headerRenderer={({ label }) => {
                    return <div> This is a {label} </div>;
                }}
                ```
                should be changed into
                ```
                headerRenderer={({ column: { label } }) => {
                    return <div> This is a {label} </div>;
                }}
                ```
        - `BpkDataTable` changes:
            - `rowRenderer` prop has been removed. For more complex use cases of handling data, use the `cellRenderer` prop (see example above).

            - `sort` prop takes a function `Function(rowA: <Row>, rowB: <Row>, columnId: String, desc: Bool)` that compares 2 rows. It should return `1` if `rowA` is larger, and `-1` if `rowB` is larger. The function will be applied to the column give the column id `sortBy` and will be sorting the data in the direction of `sortDirection`. The function signature has changed. For example:
            ```
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
            ```
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