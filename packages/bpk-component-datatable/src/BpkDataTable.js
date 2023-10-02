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

import PropTypes from 'prop-types';
import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkDataTable.module.scss';
import type { Props } from './common-types';
import { SORT_DIRECTION_TYPES } from './sort-types';
import BpkDataTableHeader from './BpkDataTableHeader';
import { pxToRem, getColumns, createColumnsSchema } from './utils';

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const BpkDataTable = (props: Props) => {
  const {
    children,
    className,
    columns: columnsData,
    defaultColumnSortIndex,
    headerClassName,
    headerHeight,
    height,
    onRowClick,
    rowClassName,
    rowHeight,
    rowStyle,
    rows: rowsData,
    sort,
    sortBy,
    sortDirection,
    width,
    ...restOfProps
  } = props;

  const [rowSelected, updateRowSelected] = useState(undefined);

  const classNames = getClassName('bpk-data-table', className);

  const getRowClassNames = (
    consumerClassName: ?string | ?(({ index: number }) => string),
    index: number,
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

  const columns = useMemo(() => {
    if (columnsData) {
      return createColumnsSchema(columnsData);
    } 
      return getColumns(children);
    
  }, [children, columnsData]);

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
    if (rowSelected === index) {
      updateRowSelected(undefined);
    } else {
      updateRowSelected(index);
    }
    if (onRowClick !== undefined) {
      onRowClick(rows[index].original);
    }
  };

  const handleKeyboardEvent = (
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
        style: { width: pxToRem(width), height: pxToRem(height) },
        className: classNames,
      })}
      {...restOfProps}
    >
      <div>
        {headerGroups.map((headerGroup) => (
          <div
            {...headerGroup.getHeaderGroupProps({
              style: { height: pxToRem(headerHeight) },
              className: headerClassNames,
            })}
          >
            {headerGroup.headers.map((column) => {
              if (sort && sortBy) {
                if (column.id === sortBy) {
                  column.sortType = sort; // eslint-disable-line no-param-reassign
                  column.sortDirection = sortDirection; // eslint-disable-line no-param-reassign
                }
              }
              return <BpkDataTableHeader key={column.id} column={column} />;
            })}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const cellClassNames = [getClassName('bpk-data-table__cell')];
          return (
            <div
              onClick={() => onRowClicked(i)}
              role="button"
              onKeyDown={(event) => handleKeyboardEvent(event, i)}
              tabIndex={0}
              {...row.getRowProps({
                style: {
                  ...rowStyle,
                  height: pxToRem(rowHeight),
                },
                className: getRowClassNames(rowClassName, i),
              })}
            >
              {row.cells.map((cell) => {
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
BpkDataTable.propTypes = {
  rows: PropTypes.arrayOf(Object).isRequired,
  /**
   * @deprecated Use the columns prop instead to pass the columns to the BpkDataTable component.
   */
  children: PropTypes.node,
  /**
   * Array of objects describing the columns of the table.
   * Note: Header and Cell props are functions to format the header and cell data respectively and should implement the following signatures:
   * ```Header: function({disableSortBy, accessor, label})```,
   * ```Cell: function({rowData, rowIndex, accessor, columnIndex, cellData})```
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      Header: PropTypes.func,
      disableSortBy: PropTypes.bool,
      width: PropTypes.string,
      minWidth: PropTypes.string,
      flexGrow: PropTypes.number,
      className: PropTypes.string,
      headerClassName: PropTypes.string,
      headerStyle: {},
      Cell: PropTypes.func,
      label: PropTypes.string,
      style: {},
      defaultSortDirection: PropTypes.oneOf(Object.keys(SORT_DIRECTION_TYPES)),
    }),
  ),
  /**
   * Table height. Please provide this value in rem.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Table width. Please provide this value in rem.
   * If not provided, the table will expand to fill the available space.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Height of the header row. Please provide this value in rem.
   */
  headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Height of each row. Please provide this value in rem.
   */
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  /**
   * The data will be sorted by default based on this column.
   */
  defaultColumnSortIndex: PropTypes.number,
  /**
   * For custom sorting, pass a sort function.
   */
  sort: PropTypes.func,
  /**
   * Use sortBy to specify which column the custom sorting will be applied to.
   */
  sortBy: PropTypes.string,
  /**
   * Use sortDirection to set the direction of sorting. By default, it will be ascending.
   */
  sortDirection: PropTypes.oneOf(Object.keys(SORT_DIRECTION_TYPES)),
};

BpkDataTable.defaultProps = {
  width: null,
  headerHeight: '3.75rem',
  rowHeight: '3.75rem',
  className: null,
  defaultColumnSortIndex: 0,
  sort: null,
  sortBy: null,
  sortDirection: SORT_DIRECTION_TYPES.ASC,
};

export default BpkDataTable;
