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
import { type JSX } from "react";

export const SORT_DIRECTION_TYPES = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type BpkDataTableProps = {
  rows: { [key: string]: any };
  columns: ColumnType[];
  /**
   * Table height. Please provide this value in rem.
   */
  height: number | string;
  /**
   * Table width. Please provide this value in rem.
   * If not provided, the table will expand to fill the available space.
   */
  width?: number | string;
  /**
   * Height of the header row. Please provide this value in rem.
   */
  headerHeight?: number | string;
  headerClassName?: string | null;
  /**
   * Height of a row (except for the header row). Please provide this value in rem.
   */
  rowHeight?: number | string;
  rowStyle?: {};
  rowClassName?: string | ((arg0: any) => string);
  className?: string | null;
  /**
   * The data will be sorted by default based on this column.
   */
  defaultColumnSortIndex?: number;
  /**
   * For custom sorting, pass a sort function - must be memoized. It should return 1 if rowA is larger, and -1 if rowB is larger.
   * You can also pass a string: basic, datetime, alphanumeric. By default, alphanumeric sorting will be applied.
   */
  sort?: string | ((rowA: any, rowB: any, columnId: string, desc: boolean) => number);
  /**
   * Use sortBy to specify which column the custom sorting will be applied to. To specify the column, use the accessor of the column.
   */
  sortBy?: string;
  /**
   * Use sortDirection to set the direction of sorting. By default, it will be ascending.
   */
  sortDirection?: (typeof SORT_DIRECTION_TYPES)[keyof typeof SORT_DIRECTION_TYPES];
  /**
   * Callback function that will be called when a row is clicked. The entire row object (originally passed in the data prop) will be passed to this function.
   */
  onRowClick?: (arg: {}) => void;
  [rest: string]: any;
};

export type ColumnType = {
  accessor: string;
  /**
   * Optional function to format the header data.
   * @returns {string | JSX.Element} The formatted header data.
   */
  Header?: (arg: { disableSortBy: boolean, accessor: string, label: string }) => JSX.Element | string;
  disableSortBy?: boolean;
  /**
   * Width of the column. Please provide this value in rem.
   */
  width?: string | number;
  /**
   * Minimum width of the column. Please provide this value in rem.
   */
  minWidth?: string | number;
  flexGrow?: number;
  className?: string | null;
  headerClassName?: string | null;
  headerStyle?: {};
  /**
   * Optional function to format the cell data.
   * @returns {string | JSX.Element} The formatted cell data.
   */
  Cell?: (arg: { rowData: any, rowIndex: number, accessor: string, columnIndex: number, cellData: any }) => JSX.Element | string;
  label?: string;
  style?: {};
  defaultSortDirection?: (typeof SORT_DIRECTION_TYPES)[keyof typeof SORT_DIRECTION_TYPES];
}
