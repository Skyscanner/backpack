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
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import BpkPaginationList from './BpkPaginationList';
import BpkPaginationNudger from './BpkPaginationNudger';
import STYLES from './bpk-pagination.css';

const getClassName = cssModules(STYLES);

const handlePageChange = (onPageChange, pageCount) => nextPageIndex => {
  if (onPageChange && nextPageIndex < pageCount && nextPageIndex >= 0) {
    onPageChange(nextPageIndex);
  }
};

const BpkPagination = props => {
  const classNames = [getClassName('bpk-pagination')];
  const {
    pageCount,
    previousLabel,
    nextLabel,
    onPageChange,
    selectedPageIndex,
    visibleRange,
    className,
    paginationLabel,
    pageLabel,
    ...rest
  } = props;

  if (className) {
    classNames.push(getClassName(className));
  }

  const pageChanged = handlePageChange(onPageChange, pageCount);

  const hasPreviousPage = selectedPageIndex !== 0;
  const hasNextPage = selectedPageIndex !== pageCount - 1;

  return (
    <nav className={classNames.join('')} aria-label={paginationLabel} {...rest}>
      <BpkPaginationNudger
        label={previousLabel}
        onNudge={() => pageChanged(selectedPageIndex - 1)}
        disabled={!hasPreviousPage}
      />
      <BpkPaginationList
        selectedPageIndex={selectedPageIndex}
        pageCount={pageCount}
        onPageChange={pageChanged}
        visibleRange={visibleRange}
        pageLabel={pageLabel}
      />
      <BpkPaginationNudger
        label={nextLabel}
        onNudge={() => pageChanged(selectedPageIndex + 1)}
        forward
        disabled={!hasNextPage}
      />
    </nav>
  );
};

BpkPagination.propTypes = {
  selectedPageIndex: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  pageCount: PropTypes.number.isRequired,
  previousLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  paginationLabel: PropTypes.string.isRequired,
  pageLabel: PropTypes.func.isRequired,
  visibleRange: PropTypes.number,
  className: PropTypes.string,
};

BpkPagination.defaultProps = {
  onPageChange: null,
  visibleRange: 3,
  className: null,
};

export default BpkPagination;
