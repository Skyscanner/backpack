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
import type {
  SortDirectionType as _SortDirectionType,
  SortProps as _SortProps,
} from './sort-types';

type CommonColumnProps = {
  defaultSortDirection: _SortDirectionType,
  flexGrow: number,
  headerClassName: ?string,
  headerStyle: ?{},
  label: ?string,
  minWidth: ?number,
  width: number,
};

export type Props<Row> = {
  rows: Array<Row>,
  children: Node,
  height: number,
  width: ?number,
  headerHeight: number,
  rowHeight: number,
  className: ?string,
  defaultColumnSortIndex: number,
  headerClassName: ?string,
  rowClassName: ?string,
  onRowClick: (Row) => mixed,
  ...$Exact<_SortProps>,
};

export type ColumnType = {
  disableSortBy: boolean,
  getHeaderProps: Function,
  isSorted: boolean,
  isSortedDesc: boolean,
  render: Function,
  sortDirection: _SortDirectionType,
  toggleSortBy: Function,
  ...$Exact<CommonColumnProps>,
};

export type BpkDataTableColumnProps = {
  cellDataGetter: ?Function,
  cellRenderer: ?Function,
  className: ?string,
  dataKey: string,
  disableSort: boolean,
  headerRenderer: ?Function,
  ...$Exact<CommonColumnProps>,
};

export type SortDirectionType = _SortDirectionType;
export type SortProps = _SortProps;
