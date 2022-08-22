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

import React from 'react';
import PropTypes from 'prop-types';

import { SORT_DIRECTION_TYPES } from './sort-types';
import { type BpkDataTableColumnProps } from './common-types';

// BpkDataTableColumn is just a props wrapper
// to maintain backwards compatibility with the old API of BpkDataTable which takes columns as children
// The `react-table` library however expects columns as an array of objects

const BpkDataTableColumn = (props: BpkDataTableColumnProps) => (
  <div {...props} />
);

BpkDataTableColumn.propTypes = {
  dataKey: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  disableSort: PropTypes.bool,
  defaultSortDirection: PropTypes.oneOf(Object.keys(SORT_DIRECTION_TYPES)),
  flexGrow: PropTypes.number,
  label: PropTypes.string,
  headerRenderer: PropTypes.func,
  headerClassName: PropTypes.string,
  headerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  cellRenderer: PropTypes.func,
  cellDataGetter: PropTypes.func,
};
BpkDataTableColumn.defaultProps = {
  className: null,
  disableSort: false,
  defaultSortDirection: SORT_DIRECTION_TYPES.ASC,
  flexGrow: 0,
  label: null,
  headerRenderer: null,
  headerClassName: null,
  headerStyle: null,
  cellRenderer: null,
  cellDataGetter: null,
};

export default BpkDataTableColumn;
