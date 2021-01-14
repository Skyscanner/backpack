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

import React, { type Element } from 'react';
import { Column } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';

import bpkHeaderRenderer from './bpkHeaderRenderer';
import STYLES from './BpkDataTableColumn.scss';
import { type SortDirectionType } from './sort-types';

export type BpkDataTableColumnProps = {
  className: ?string,
  dataKey: string,
  disableSort: boolean,
  defaultSortDirection: SortDirectionType,
};

const getClassName = cssModules(STYLES);

// BpkDataTableColumn is just a props wrapper since Table only accepts Column children
// BpkDataTable uses BpkDataTableColumn.toColumn to convert BpkDataTableColumn to Columns
// eslint-disable-next-line no-unused-vars
const BpkDataTableColumn = (props: BpkDataTableColumnProps) => null;

BpkDataTableColumn.toColumn = (
  bpkDataTableColumn: Element<typeof BpkDataTableColumn>,
  key,
) => {
  const { className, ...rest } = bpkDataTableColumn.props;
  const classNames = [getClassName('bpk-data-table-column')];

  if (className) {
    classNames.push(className);
  }

  // $FlowFixMe[cannot-spread-inexact]
  return <Column className={classNames.join(' ')} key={key} {...rest} />;
};

BpkDataTableColumn.propTypes = { ...Column.propTypes };
BpkDataTableColumn.defaultProps = {
  ...Column.defaultProps,
  headerRenderer: bpkHeaderRenderer,
};

export default BpkDataTableColumn;
