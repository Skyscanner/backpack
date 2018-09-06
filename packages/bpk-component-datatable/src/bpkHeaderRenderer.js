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
import { SortDirection } from 'react-virtualized';
import { cssModules } from 'bpk-react-utils';
import BpkSmallArrowDownIcon from 'bpk-component-icon/sm/arrow-down';
import BpkSmallArrowUpIcon from 'bpk-component-icon/sm/arrow-up';
import { withRtlSupport } from 'bpk-component-icon';
import { hasClassName } from './utils';

import STYLES from './bpk-data-table-column.css';

const DownIcon = withRtlSupport(BpkSmallArrowDownIcon);
const UpIcon = withRtlSupport(BpkSmallArrowUpIcon);

const getClassName = cssModules(STYLES);
const upIconClassName = getClassName('bpk-data-table-column__sort-icon--up');
const downIconClassName = getClassName(
  'bpk-data-table-column__sort-icon--down',
);

export const getSortIconDirection = element => {
  if (
    hasClassName(element, upIconClassName) ||
    hasClassName(element.parentNode, upIconClassName)
  ) {
    return SortDirection.DESC;
  }
  if (
    hasClassName(element, downIconClassName) ||
    hasClassName(element.parentNode, downIconClassName)
  ) {
    return SortDirection.ASC;
  }
  return null;
};

export default ({ dataKey, label, sortBy, sortDirection, disableSort }) => {
  const children = [
    <span
      className={getClassName('bpk-data-table-column__header')}
      key="label"
      title={label}
    >
      {label}
    </span>,
  ];

  if (!disableSort) {
    const upIconClassNames = [
      getClassName('bpk-data-table-column__sort-icon'),
      upIconClassName,
    ];

    const downIconClassNames = [
      getClassName('bpk-data-table-column__sort-icon'),
      downIconClassName,
    ];

    if (sortBy === dataKey) {
      (sortDirection === SortDirection.DESC
        ? upIconClassNames
        : downIconClassNames
      ).push(getClassName('bpk-data-table-column__sort-icon--selected'));
    }

    children.push(
      <div
        className={getClassName('bpk-data-table-column__sort-icons')}
        key="sort"
      >
        <UpIcon className={upIconClassNames.join(' ')} />
        <DownIcon className={downIconClassNames.join(' ')} />
      </div>,
    );
  }

  return children;
};
