/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import type { ChildrenArray, Element } from 'react';

import BpkDataTableColumn from './BpkDataTableColumn';
import type {
  SortDirectionType as _SortDirectionType,
  SortProps as _SortProps,
} from './sort-types';

export type ColumnType = {
  toColumn(column: any, key: string): any,
};

export type DataTableProps = {
  headerClassName: ?string,
  rowClassName: ?string,
};

export type Props<Row> = {
  ...$Exact<DataTableProps>,
  rows: Array<Row>,
  children: ChildrenArray<Element<typeof BpkDataTableColumn> & ColumnType>,
  width: ?number,
  headerHeight: number,
  className: ?string,
  defaultColumnSortIndex: number,
  onRowClick: Row => mixed,
  ...$Exact<_SortProps>,
};

export type SortDirectionType = _SortDirectionType;
export type SortProps = _SortProps;
