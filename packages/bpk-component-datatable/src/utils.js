/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow strict */

// TODO: Remove these functions once we want to change the API to match the react-table library API
// To maintain backwards compatibility with the old API of BpkDataTable which takes columns as children
// The `react-table` library however expects columns as an array of objects
// eslint-disable-next-line import/prefer-default-export
export const getColumns = (columns) =>
  columns.map((column) => {
    const { cellDataGetter, cellRenderer, headerRenderer } = column.props;
    // To maintain backwards compatibility with the old API of BpkDataTable we rename the parameters
    // And create an interface so that the function signature doesn't depend on the underlying library
    const columnCellRenderer = ({
      column: { id: dataKey },
      columns: columnsData,
      row: { id: rowID, values: rowData },
      sortedRows,
      value: cellData,
    }) => {
      const columnIndex = columnsData.map((col) => col.id).indexOf(dataKey);
      const rowIndex = sortedRows.map((row) => row.id).indexOf(rowID);

      return cellRenderer({
        cellData,
        columnIndex,
        dataKey,
        rowData,
        rowIndex,
      });
    };

    const columnCellDataGetter = ({
      column: { id: dataKey },
      row: { values: rowData },
    }) => cellDataGetter({ dataKey, rowData });

    const columnHeaderRenderer = ({
      column: { disableSortBy: disableSort, id: dataKey, label },
    }) => headerRenderer({ dataKey, label, disableSort });

    const {
      className,
      dataKey,
      defaultSortDirection,
      disableSort,
      flexGrow,
      headerClassName,
      headerStyle,
      label,
      minWidth,
      style,
      width,
    } = column.props;
    return {
      Header: headerRenderer ? columnHeaderRenderer : label,
      accessor: dataKey,
      ...((cellRenderer || cellDataGetter) && {
        Cell: columnCellRenderer || columnCellDataGetter,
      }),
      className,
      disableSortBy: disableSort,
      defaultSortDirection,
      flexGrow,
      headerClassName,
      headerStyle,
      label,
      minWidth,
      style,
      width,
    };
  });
