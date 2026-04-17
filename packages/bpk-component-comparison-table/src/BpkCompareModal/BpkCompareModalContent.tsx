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

import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import {
  BpkTable,
  BpkTableBody,
  BpkTableCell,
  BpkTableHead,
  BpkTableHeadCell,
  BpkTableRow,
  TABLE_BODY_TYPES,
} from '../../../bpk-component-table';
import { cssModules } from '../../../bpk-react-utils';

import BpkCompareModalColumn from './BpkCompareModalColumn';
import BpkCompareModalColumnHeader, { IMAGE_AREA_HEIGHT_PX } from './BpkCompareModalColumnHeader';
import BpkCompareModalColumnPlaceholder from './BpkCompareModalColumnPlaceholder';
import { CompareModalColumnProvider, CompareModalContentProvider } from './BpkCompareModalContext';
import BpkCompareModalRows from './BpkCompareModalRows';

import type {
  BpkCompareModalColumnHeaderProps,
  BpkCompareModalColumnProps,
  BpkCompareModalContentProps,
  BpkCompareModalRowsProps,
} from './common-types';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

const MAX_COLUMNS = 3;
const IMAGE_FADE_THRESHOLD_PX = IMAGE_AREA_HEIGHT_PX;

type ColumnData = {
  itemId: string;
  onRemove: () => void;
  removeA11yLabel: string;
  headerElement: ReactElement<BpkCompareModalColumnHeaderProps> | null;
  rows: ReactNode[];
};

function BpkCompareModalContent({
  children,
  onAddMoreClick,
  translations,
}: BpkCompareModalContentProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fadedRatio = Math.min(scrollTop / IMAGE_FADE_THRESHOLD_PX, 1);

  // Extract column data only when children change — stable across scroll events.
  const columnData = useMemo((): ColumnData[] => {
    const data: ColumnData[] = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child) || child.type !== BpkCompareModalColumn) return;

      const { children: colChildren, itemId, onRemove, removeA11yLabel } =
        child.props as BpkCompareModalColumnProps;

      let headerElement: ReactElement<BpkCompareModalColumnHeaderProps> | null = null;
      let rows: ReactNode[] = [];

      Children.forEach(colChildren, (grandchild) => {
        if (!isValidElement(grandchild)) return;
        if (grandchild.type === BpkCompareModalColumnHeader) {
          headerElement = grandchild as ReactElement<BpkCompareModalColumnHeaderProps>;
        } else if (grandchild.type === BpkCompareModalRows) {
          rows = (grandchild.props as BpkCompareModalRowsProps).rows;
        }
      });

      data.push({ itemId, onRemove, removeA11yLabel, headerElement, rows });
    });

    return data;
  }, [children]);

  if (process.env.NODE_ENV !== 'production' && columnData.length > MAX_COLUMNS) {
    // eslint-disable-next-line no-console
    console.error(
      `BpkCompareModal: received ${columnData.length} columns but the maximum is 3. Extra columns will be ignored.`,
    );
  }

  const filledData = columnData.slice(0, MAX_COLUMNS);
  const rowCount = filledData[0]?.rows.length ?? 0;

  const handleScroll = useCallback(() => {
    setScrollTop(scrollContainerRef.current?.scrollTop ?? 0);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <CompareModalContentProvider
      value={{
        fadedRatio,
        removeLabel: translations.removeLabel,
        bestTagLabel: translations.bestTagLabel,
      }}
    >
      <div
        ref={scrollContainerRef}
        className={getClassName('bpk-compare-modal__scroll-container')}
      >
        <BpkTable>
          <BpkTableHead>
            <BpkTableRow>
              {filledData.map((col) => (
                <BpkTableHeadCell key={col.itemId}>
                  <CompareModalColumnProvider
                    value={{ onRemove: col.onRemove, removeA11yLabel: col.removeA11yLabel }}
                  >
                    {col.headerElement}
                  </CompareModalColumnProvider>
                </BpkTableHeadCell>
              ))}
              {Array.from({ length: MAX_COLUMNS - filledData.length }, (_, i) => (
                <BpkTableHeadCell key={`placeholder-${i}`}>
                  <BpkCompareModalColumnPlaceholder
                    addMoreDescription={translations.addMoreDescription}
                    addMoreLinkText={translations.addMoreLinkText}
                    onAddMoreClick={onAddMoreClick}
                  />
                </BpkTableHeadCell>
              ))}
            </BpkTableRow>
          </BpkTableHead>

          <BpkTableBody type={TABLE_BODY_TYPES.striped}>
            {Array.from({ length: rowCount }, (_, rowIndex) => (
               
              <BpkTableRow key={rowIndex}>
                {Array.from({ length: MAX_COLUMNS }, (__, colIndex) => {
                  const col = filledData[colIndex];
                  return (
                    <BpkTableCell
                      key={col ? `row-${rowIndex}-${col.itemId}` : `row-${rowIndex}-placeholder-${colIndex}`}
                    >
                      {col ? col.rows[rowIndex] : <div className={getClassName('bpk-compare-modal__placeholder-cell')} />}
                    </BpkTableCell>
                  );
                })}
              </BpkTableRow>
            ))}
          </BpkTableBody>
        </BpkTable>
      </div>
    </CompareModalContentProvider>
  );
}

export default BpkCompareModalContent;
