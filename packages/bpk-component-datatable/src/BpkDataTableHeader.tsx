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

import type { KeyboardEvent } from 'react';

import { withRtlSupport } from '../../bpk-component-icon';
import BpkSmallArrowDownIcon from '../../bpk-component-icon/sm/arrow-down';
import BpkSmallArrowUpIcon from '../../bpk-component-icon/sm/arrow-up';
import { cssModules } from '../../bpk-react-utils';

import { SORT_DIRECTION_TYPES } from './common-types';


import STYLES from './BpkDataTableHeader.module.scss';

const DownIcon = withRtlSupport(BpkSmallArrowDownIcon);
const UpIcon = withRtlSupport(BpkSmallArrowUpIcon);

const getClassName = cssModules(STYLES);

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};


/**
 * Internal component to render the header of a column.
 * @returns {JSX.Element} data table header component
 */
const BpkDataTableHeader = ({ column }: { column: any }) => {
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

  /**
   * Callback for when the header is clicked to sort the column unless disableSortBy is true.
   * @returns {void}
   */
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

  /**
   * Callback for handling keyboard events on the header to sort the column.
   * @param {KeyboardEvent} event keyboard event on the header
   * @returns {void}
   */
  const handleKeyboardEvent = (event: KeyboardEvent<HTMLElement>) => {
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
          <div className={upIconClassNames}>
            <UpIcon
              onClick={() => column.toggleSortBy(false)}
            />
          </div>
          <div className={downIconClassNames}>
            <DownIcon
              onClick={() => column.toggleSortBy(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BpkDataTableHeader;
