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

import { useEffect, useRef, useState, useCallback } from 'react';

import {
  BpkTable,
  BpkTableBody,
  BpkTableCell,
  BpkTableRow,
  TABLE_BODY_TYPES,
} from '../../../bpk-component-table';
import { cssModules } from '../../../bpk-react-utils';

import BpkCompareModalHeaderRow from './BpkCompareModalHeaderRow';

import type { BpkCompareModalContentProps, BpkCompareColumnData } from './common-types';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

const MAX_COLUMNS = 3;
// Matches the image area height (5.1875rem × 16px). Opacity goes from 1 → 0
// as the user scrolls 0 → 83 px, giving a parallax fade identical to carhire.
const IMAGE_FADE_THRESHOLD_PX = 83;

function validateColumnAlignment(columns: BpkCompareColumnData[]) {
  // We only need this check on dev env — validateColumnAlignment doesn't fix anything, it only logs an error.
  // If columns are misaligned in production the table will still render (just incorrectly).
  // It's not a runtime safeguard, it's a sanity check for whoever is building with the component.
  // do we want to fail if the columns are not aligned? or just log a warning? I think just logging a warning is fine,
  // as it gives the consumer the information they need to fix the issue without breaking the entire component.
  if (process.env.NODE_ENV === 'production') return;
  if (columns.length < 2) return;

  const firstRowIds = columns[0].rows.map((row) => row.rowId);

  for (let columnIndex = 1; columnIndex < columns.length; columnIndex += 1) {
    const colRowIds = columns[columnIndex].rows.map((row) => row.rowId);
    const isAligned = colRowIds.join(',') === firstRowIds.join(',');

    if (!isAligned) {
      // eslint-disable-next-line no-console
      console.error(
        `BpkCompareModal: column ${columnIndex} row IDs do not match column 0. All columns must have the same row IDs in the same order.`,
      );
      return;
    }
  }
}

function BpkCompareModalContent({
  columns,
  onAddMoreClick,
  onRemove,
  translations,
}: BpkCompareModalContentProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fadedRatio = Math.min(scrollTop / IMAGE_FADE_THRESHOLD_PX, 1);

  if (process.env.NODE_ENV !== 'production' && columns.length > MAX_COLUMNS) {
    // eslint-disable-next-line no-console
    console.error(
      `BpkCompareModal: received ${columns.length} columns but the maximum is 3. Extra columns will be ignored.`,
    );
  }

  // still not sure if we want this validation tbh
  validateColumnAlignment(columns);

  // Pads columns with nulls and slices to MAX_COLUMNS (3), so there are always exactly 3 entries.
  // So if you pass 2 columns: columns = [colA, colB]
  // displayColumns = [colA, colB, null]
  // The null slots are where the "Add more" placeholder renders. The point is that the table always has 3 equal-width columns — real items fill the first places, placeholders fill the rest. Without this, 2 real columns would stretch to fill the full width, which would look wrong.
  const displayColumns = [...columns, null, null, null].slice(0, MAX_COLUMNS);

  // Use row IDs from the first filled column (all must match after validation).
  const rowIds = columns[0]?.rows.map((row) => row.rowId) ?? [];

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
    <div
      ref={scrollContainerRef}
      className={getClassName('bpk-compare-modal__scroll-container')}
    >
      <BpkTable>
        <BpkCompareModalHeaderRow
            displayColumns={displayColumns}
            onRemove={onRemove}
            onAddMoreClick={onAddMoreClick}
            translations={translations}
            fadedRatio={fadedRatio}
        />

        <BpkTableBody type={TABLE_BODY_TYPES.striped}>
          {/* Iterates rowIds (shared across all columns) and renders one BpkTableRow per attribute.
              For each row, maps displayColumns to render either the matching cell from that column's
              row data, or null for placeholder columns. */}
          {rowIds.map((rowId) => (
            <BpkTableRow key={rowId}>
              {displayColumns.map((col, index) => (
                <BpkTableCell
                   
                  key={col ? `${rowId}-${col.itemId}` : `${rowId}-placeholder-${index}`}
                  {...(!col && { className: getClassName('bpk-compare-modal__placeholder-cell') })}
                >
                  {col
                    ? col.rows.find((row) => row.rowId === rowId)?.cell
                    : null}
                </BpkTableCell>
              ))}
            </BpkTableRow>
          ))}
        </BpkTableBody>
      </BpkTable>
    </div>
  );
}

export default BpkCompareModalContent;
