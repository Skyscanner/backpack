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

import type { HTMLAttributes } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkPaginationList from './BpkPaginationList';
import BpkPaginationNudger from './BpkPaginationNudger';

import STYLES from './BpkPagination.module.scss';

const getClassName = cssModules(STYLES);

type PageLabel = (page: number, isSelected: boolean) => string;

type NativeNavProps = HTMLAttributes<HTMLElement>;

export type Props = Omit<NativeNavProps, 'className'> & {
  selectedPageIndex: number;
  pageCount: number;
  previousLabel: string;
  nextLabel: string;
  paginationLabel: string;
  pageLabel: PageLabel;
  onPageChange?: ((nextPageIndex: number) => void) | null;
  visibleRange?: number;
  className?: string | null;
};

const handlePageChange =
  (onPageChange: Props['onPageChange'], pageCount: number) =>
  (nextPageIndex: number) => {
    if (onPageChange && nextPageIndex < pageCount && nextPageIndex >= 0) {
      onPageChange(nextPageIndex);
    }
  };

const BpkPagination = (props: Props) => {
  const classNames = [getClassName('bpk-pagination')];
  const {
    className = null,
    nextLabel,
    onPageChange = null,
    pageCount,
    pageLabel,
    paginationLabel,
    previousLabel,
    selectedPageIndex,
    visibleRange = 3,
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

export default BpkPagination;
