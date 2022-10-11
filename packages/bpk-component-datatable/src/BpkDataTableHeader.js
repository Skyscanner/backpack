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

import { cssModules } from '../../bpk-react-utils';
import BpkSmallArrowDownIcon from '../../bpk-component-icon/sm/arrow-down';
import BpkSmallArrowUpIcon from '../../bpk-component-icon/sm/arrow-up';
import { withRtlSupport } from '../../bpk-component-icon';

import { SORT_DIRECTION_TYPES } from './sort-types';
import STYLES from './BpkDataTableHeader.module.scss';
import { type ColumnType } from './common-types';

const DownIcon = withRtlSupport(BpkSmallArrowDownIcon);
const UpIcon = withRtlSupport(BpkSmallArrowUpIcon);

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const BpkDataTableHeader = ({ column }: { column: ColumnType }) => {
  const {
    defaultSortDirection,
    disableSortBy,
    flexGrow,
    headerClassName,
    headerStyle,
    isSorted,
    isSortedDesc,
    label,
    minWidth,
    sortDirection,
    width,
  } = column;

  const onHeaderClick = () => {
    if (disableSortBy === true) {
      return;
    }
    let isDescending;

    if (isSorted) {
      isDescending = isSortedDesc === false;
    } else if (sortDirection) {
      isDescending = sortDirection === SORT_DIRECTION_TYPES.DESC;
    } else if (defaultSortDirection) {
      isDescending = defaultSortDirection === SORT_DIRECTION_TYPES.DESC;
    } else {
      isDescending = false;
    }

    column.toggleSortBy(isDescending);
  };

  const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.keyCode === KEYCODES.ENTER ||
      event.keyCode === KEYCODES.SPACEBAR
    ) {
      event.preventDefault();
      onHeaderClick();
    }
  };

  const headerClassNames = getClassName(
    'bpk-data-table-column__header',
    headerClassName,
  );
  const upIconClassNames = getClassName(
    'bpk-data-table-column__sort-icon--up',
    'bpk-data-table-column__sort-icon',
    isSorted && !isSortedDesc && 'bpk-data-table-column__sort-icon--selected',
  );

  const downIconClassNames = getClassName(
    'bpk-data-table-column__sort-icon--down',
    'bpk-data-table-column__sort-icon',
    isSorted && isSortedDesc && 'bpk-data-table-column__sort-icon--selected',
  );

  return (
    <div
      {...column.getHeaderProps({
        style: {
          width,
          minWidth,
          flexGrow,
          ...headerStyle,
        },
        className: headerClassNames,
      })}
    >
      <span
        onClick={onHeaderClick}
        onKeyDown={handleKeyboardEvent}
        aria-label={label}
        aria-pressed={isSorted}
        role="button"
        tabIndex={0}
      >
        {column.render('Header')}
      </span>
      {!disableSortBy && (
        <div
          className={getClassName('bpk-data-table-column__sort-icons')}
          key="sort"
          aria-hidden
        >
          <UpIcon
            onClick={() => column.toggleSortBy(false)}
            className={upIconClassNames}
          />
          <DownIcon
            onClick={() => column.toggleSortBy(true)}
            className={downIconClassNames}
          />
        </div>
      )}
    </div>
  );
};

export default BpkDataTableHeader;
