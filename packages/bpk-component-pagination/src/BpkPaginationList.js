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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkPaginationPage from './BpkPaginationPage';
import BpkPaginationBreak from './BpkPaginationBreak';
import STYLES from './bpk-pagination-list.css';

const getClassName = cssModules(STYLES);

const BpkPaginationList = props => {
  const {
    selectedPageIndex,
    pageCount,
    onPageChange,
    visibleRange,
    pageLabel,
  } = props;

  const shoulderRange = Math.ceil(visibleRange / 2);
  const isFirstPageSelected = selectedPageIndex === 0;
  const isLastPageSelected = selectedPageIndex === pageCount - 1;
  const displayRange =
    isFirstPageSelected || isLastPageSelected
      ? shoulderRange + 1
      : shoulderRange;

  const children = new Array(pageCount)
    .fill(undefined)
    .map((_, i) => {
      const isFirstPage = i === 0;
      const isLastPage = i === pageCount - 1;
      const isFirstPageInRange =
        i === selectedPageIndex - displayRange && !isFirstPage;
      const isLastPageInRange =
        i === selectedPageIndex + displayRange && !isLastPage;
      const isPageOutOfRange =
        i < selectedPageIndex - displayRange ||
        i > selectedPageIndex + displayRange;

      let pageView = null;
      if (isFirstPageInRange || isLastPageInRange) {
        pageView = <BpkPaginationBreak />;
      } else if (!isPageOutOfRange || isFirstPage || isLastPage) {
        pageView = (
          <BpkPaginationPage
            page={i + 1}
            onSelect={() => onPageChange(i)}
            isSelected={selectedPageIndex === i}
            pageLabel={pageLabel}
          />
        );
      }

      if (pageView !== null) {
        return (
          <li
            key={i} // eslint-disable-line react/no-array-index-key
            className={getClassName('bpk-pagination-page-list__item')}
          >
            {pageView}
          </li>
        );
      }
      return null;
    })
    .filter(page => !!page);

  return (
    <ul className={getClassName('bpk-pagination-page-list')}>{children}</ul>
  );
};

BpkPaginationList.propTypes = {
  selectedPageIndex: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  visibleRange: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageLabel: PropTypes.func.isRequired,
};

export default BpkPaginationList;
