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

import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { useTable, useSortBy } from 'react-table';

import { cssModules } from '../../bpk-react-utils';

import BpkDataTableHeader from './BpkDataTableHeader';
import { type BpkDataTableProps, SORT_DIRECTION_TYPES } from './common-types';
import { createColumnsSchema } from './utils';

import STYLES from './BpkDataTable.module.scss';

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const BpkDataTable = (props: BpkDataTableProps) => {
  const {
    className = null,
    columns: columnsData,
    defaultColumnSortIndex = 0,
    headerClassName,
    headerHeight = '3.75rem',
    height,
    onRowClick,
    rowClassName,
    rowHeight = '3.75rem',
    rowStyle,
    rows: rowsData,
    sort = null,
    sortBy = null,
    sortDirection = SORT_DIRECTION_TYPES.ASC,
    width,
    ...restOfProps
  } = props;

  const [rowSelected, updateRowSelected] = useState<number | undefined>(undefined);

  const classNames = getClassName('bpk-data-table', className);

  const getRowClassNames = (
    index: number,
    consumerClassName?: string | ((arg: {}) => string),
  ) => {
    const rowClassNames = getClassName(
      'bpk-data-table__row',
      rowSelected === index && 'bpk-data-table__row--selected',
      onRowClick !== undefined && 'bpk-data-table__row--clickable',
      index === -1 && 'bpk-data-table__header-row',
      consumerClassName &&
        (typeof consumerClassName === 'function'
          ? consumerClassName({ index })
          : consumerClassName),
    );
    return rowClassNames;
  };

  const headerClassNames = getClassName(
    'bpk-data-table__row',
    'bpk-data-table__header-row',
    headerClassName,
  );

  /**
   * Call createColumnsSchema to modify the columns data to match the API expected by the hooks of the react-table library.
   */
  const columns = useMemo(() => createColumnsSchema(columnsData), [columnsData]);

  const data = useMemo(() => rowsData, [rowsData]);

  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: useMemo(
            () => [
              ...(sort
                ? []
                : [
                    {
                      id: columns[defaultColumnSortIndex].accessor,
                      desc:
                        columns[defaultColumnSortIndex].defaultSortDirection ===
                          'DESC' || false,
                    },
                  ]),
            ],
            [defaultColumnSortIndex, columns, sort],
          ),
        },
      },
      useSortBy,
    );

  const onRowClicked = (index: number) => {
    if (onRowClick !== undefined) {
      if (rowSelected === index) {
        updateRowSelected(undefined);
      } else {
        updateRowSelected(index);
      }
      onRowClick(rows[index].original);
    }
  };

  const handleRowKeyboardEvent = (
    event: KeyboardEvent<HTMLElement>,
    i: number,
  ) => {
    if (
      event.keyCode === KEYCODES.ENTER ||
      event.keyCode === KEYCODES.SPACEBAR
    ) {
      event.preventDefault();
      onRowClicked(i);
    }
  };

  return (
    <div
      {...getTableProps({
        style: { width, height },
        className: classNames,
      })}
      {...restOfProps}
    >
      <div>
        {headerGroups.map((headerGroup: any) => (
          <div
            {...headerGroup.getHeaderGroupProps({
              style: { height: headerHeight },
              className: headerClassNames,
            })}
          >
            {headerGroup.headers.map((column: any) => { 
              // if consumer passes a custom sort function for a specific column (using sortBy to specify the column id),
              // we need to pass them to react-table by setting the sortType and sortDirection properties on the column              
              if (sort && sortBy) {
                if (column.id === sortBy) {
                  if (typeof sort === 'function') {
                    // abstract the sort function to be used by react-table as consumers don't need to be aware of more data than the row values.
                    column.sortType = (rowA: {[key: string]: any}, rowB: {[key: string]: any}, columnID: string, desc: boolean) => sort(rowA?.values, rowB?.values, columnID, desc); // eslint-disable-line no-param-reassign
                  } else {
                    column.sortType = sort; // eslint-disable-line no-param-reassign
                  }
                  column.sortDirection = sortDirection; // eslint-disable-line no-param-reassign
                }
              }
              return <BpkDataTableHeader key={column.id} column={column}  data-backpack-ds-component="DataTable"/>;
            })}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map((row: {[key: string]: any}, i: number) => {
          prepareRow(row);
          const cellClassNames = [getClassName('bpk-data-table__cell')];
          return (
            <div
              onClick={() => onRowClicked(i)}
              role="button"
              onKeyDown={(event) => handleRowKeyboardEvent(event, i)}
              tabIndex={0}
              {...row.getRowProps({
                style: {
                  ...rowStyle,
                  height: rowHeight,
                },
                className: getRowClassNames(i, rowClassName),
              })}
            >
              {row.cells.map((cell: {[key: string]: any}) => {                
                if (cell.column.className) {
                  cellClassNames.push(cell.column.className);
                }
                return (
                  <div
                    {...cell.getCellProps({
                      style: {
                        width: cell.column.width,
                        minWidth: cell.column.minWidth,
                        flexGrow: cell.column.flexGrow,
                      },
                      className: cellClassNames.join(' '),
                    })}
                  >
                    {cell.render('Cell')}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BpkDataTable;
