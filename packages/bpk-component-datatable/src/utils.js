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

const ROOT_FONT_SIZE_PX = 16;

/**
 * 
 * @param {String|Number} value width or height of data table or its columns, or rows
 * @returns {String} the value in rem
 */
export const pxToRem = (value: string | number) => {
  let parsed = value;

  if (typeof value === 'number' || (typeof value === 'string' && value.includes('px'))) {
    console.warn("Height in px is deprecated. Please pass the equivalent value in rem."); 
    parsed = `${value / ROOT_FONT_SIZE_PX}rem`;
  }
  return parsed;
}

/**
 * TODO: Remove this function once BpkDataTableColumns is removed
 * This function takes the children of BpkDataTableColumns and converts them to an array of objects
 * to temporarily maintain backwards compatibility with the old API of BpkDataTable
 * 
 * @param {Array} columns the BpkDataTableColumns children
 * @returns {Array} An array of column objects that can be passed to the react-table library
 */ 
export const getColumns = (columns) => {
  console.warn('BpkDataTableColumns is deprecated. Please pass an array of objects to the columns prop instead.');

  let columnsArray = [];
  if (!columns) return columnsArray;

  columnsArray = columns.map((column) => {
    const { cellDataGetter, cellRenderer, headerRenderer } = column.props;

    /**
     * TODO: Remove this function once BpkDataTableColumns is removed
     * This function takes the react-table column and row data and returns the cell data
     * to temporarily maintain backwards compatibility with the old API of BpkDataTable
     * and create an interface so that the function signature doesn't depend on the underlying library
     * 
     * @param {Object} Object containing the react-table column and row data 
     * @returns {Node} JSX to render in the cell
     */
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

    /**
     * TODO: Remove this function once BpkDataTableColumns is removed
     * This function takes the react-table column and row data and returns the cell data
     * to temporarily maintain backwards compatibility with the old API of BpkDataTable
     * and create an interface so that the function signature doesn't depend on the underlying library
     * 
     * @param {Object} Object containing the react-table column and row data 
     * @returns {Node} JSX to render in the cell
     */
    const columnCellDataGetter = ({
      column: { id: dataKey },
      row: { values: rowData },
    }) => cellDataGetter({ dataKey, rowData });

    /**
     * TODO: Remove this function once BpkDataTableColumns is removed
     * This function takes the react-table column data and returns the header data
     * to temporarily maintain backwards compatibility with the old API of BpkDataTable
     * and create an interface so that the function signature doesn't depend on the underlying library
     * 
     * @param {Object} Object containing the react-table column data 
     * @returns {Node} JSX to render in the header
     */
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
      minWidth: pxToRem(minWidth),
      style,
      width: pxToRem(width),
    };
  });

  return columnsArray;
}

/**
 * 
 * @param {Array} columns Array of column objects
 * @returns {Array} An array of column objects that can be passed to the react-table library
 * This function abstract the Cell and Header of the react-table API 
 */
export const createColumnsSchema = (columns) => {
  let columnsArray = [];

  if (!columns) return columnsArray;

  columnsArray = columns.map((column) => {
    const Cell = (
      {
        column: { id: accessor},
        columns: columnsData,
        row: { id: rowID, values: rowData },
        sortedRows,
        value: cellData,
      }
      ) => column.Cell({
        rowData,
        rowIndex: sortedRows.map((row) => row.id).indexOf(rowID),
        accessor,
        columnIndex: columnsData.map((col) => col.id).indexOf(accessor),
        cellData
      })
    
    const Header = (
      {
        column: { disableSortBy: disableSort, id: accessor, label },
      }
      ) => column.Header({
        label,
        disableSort,
        accessor
      })

    return ({
      ...column,
      ...(column.Cell && {
        Cell
      }),
      Header: column.Header && typeof column.Header === 'function' ? Header : column.label
    })
  });

  return columnsArray;
}
