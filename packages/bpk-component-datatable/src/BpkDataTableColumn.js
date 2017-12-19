/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { Column, SortDirection } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import BpkSmallArrowDownIcon from 'bpk-component-icon/sm/arrow-down';
import BpkSmallArrowUpIcon from 'bpk-component-icon/sm/arrow-up';
import { withRtlSupport } from 'bpk-component-icon';

import STYLES from './bpk-data-table-column.scss';

const getClassName = cssModules(STYLES);
const DownIcon = withRtlSupport(BpkSmallArrowDownIcon);
const UpIcon = withRtlSupport(BpkSmallArrowUpIcon);

export const bpkHeaderRenderer = ({
  dataKey,
  label,
  sortBy,
  sortDirection,
}) => {
  const showSortIndicator = sortBy === dataKey;
  const children = [
    <span
      className={getClassName('bpk-data-table-column__header')}
      key="label"
      title={label}
    >
      {label}
    </span>,
  ];

  if (showSortIndicator) {
    const Icon = sortDirection === SortDirection.ASC ? DownIcon : UpIcon;
    children.push(
      <Icon
        className={getClassName('bpk-data-table-column__sort-icon')}
        key="sortIcon"
      />,
    );
  }

  return children;
};

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
