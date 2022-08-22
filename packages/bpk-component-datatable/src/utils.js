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

// To maintain backwards compatibility with the old API of BpkDataTable which takes columns as children
// The `react-table` library however expects columns as an array of objects
// eslint-disable-next-line import/prefer-default-export
export const getColumns = (columns) =>
  columns.map((column) => {
    const {
      cellDataGetter,
      cellRenderer,
      className,
      dataKey,
      defaultSortDirection,
      disableSort,
      flexGrow,
      headerClassName,
      headerRenderer,
      headerStyle,
      label,
      minWidth,
      style,
      width,
    } = column.props;
    return {
      Header: headerRenderer || label,
      accessor: dataKey,
      ...((cellRenderer || cellDataGetter) && {
        Cell: cellRenderer || cellDataGetter,
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
