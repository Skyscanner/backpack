/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import { Column } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import bpkHeaderRenderer from './bpkHeaderRenderer';
import STYLES from './bpk-data-table-column.css';

const getClassName = cssModules(STYLES);

// BpkDataTableColumn is just a props wrapper since Table only accepts Column children
// BpkDataTable uses BpkDataTableColumn.toColumn to convert BpkDataTableColumn to Columns
const BpkDataTableColumn = () => null;

BpkDataTableColumn.toColumn = (bpkDataTableColumn, key) => {
  const { className, ...rest } = bpkDataTableColumn.props;
  const classNames = [getClassName('bpk-data-table-column')];

  if (className) {
    classNames.push(className);
  }

  return <Column className={classNames.join(' ')} key={key} {...rest} />;
};

BpkDataTableColumn.propTypes = { ...Column.propTypes };
BpkDataTableColumn.defaultProps = {
  ...Column.defaultProps,
  headerRenderer: bpkHeaderRenderer,
};

export default BpkDataTableColumn;
