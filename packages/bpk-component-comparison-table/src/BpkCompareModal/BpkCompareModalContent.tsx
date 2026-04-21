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

import { useEffect, useRef } from 'react';

import {
  BpkTable,
  BpkTableBody,
  BpkTableCell,
  BpkTableRow,
  TABLE_BODY_TYPES,
} from '../../../bpk-component-table';
import { cssModules } from '../../../bpk-react-utils';

import BpkCompareModalHeaderRow from './BpkCompareModalHeaderRow';

import type { BpkCompareModalContentProps } from './common-types';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

const MAX_COLUMNS = 3;
// Matches the image area height (5.1875rem × 16px). Opacity goes from 1 → 0
// as the user scrolls 0 → 83 px, giving a parallax fade identical to carhire.
const IMAGE_FADE_THRESHOLD_PX = 83;

function BpkCompareModalContent({
  columns,
  onAddMoreClick,
  onRemove,
  translations,
}: BpkCompareModalContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (process.env.NODE_ENV !== 'production' && columns.length > MAX_COLUMNS) {
    // eslint-disable-next-line no-console
    console.error(
      `BpkCompareModal: received ${columns.length} columns but the maximum is 3. Extra columns will be ignored.`,
    );
  }

  // Pads columns with nulls and slices to MAX_COLUMNS (3), so there are always exactly 3 entries.
  // So if you pass 2 columns: columns = [colA, colB]
  // displayColumns = [colA, colB, null]
  // The null slots are where the "Add more" placeholder renders. The point is that the table always has 3 equal-width columns — real items fill the first places, placeholders fill the rest. Without this, 2 real columns would stretch to fill the full width, which would look wrong.
  const displayColumns = [...columns, null, null, null].slice(0, MAX_COLUMNS);

  // Use row IDs from the first filled column (all must match after validation).
  const rowIds = columns[0]?.rows.map((row) => row.rowId) ?? [];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const { scrollTop } = container;
      // During the animation phase, push tbody down by the scroll amount so rows
      // appear locked in place. Once the animation completes the offset is capped
      // and normal scrolling resumes from that point.
      container.style.setProperty('--bpk-rows-offset', `${Math.min(scrollTop, IMAGE_FADE_THRESHOLD_PX)}px`);
      container.style.setProperty('--bpk-image-opacity', `${1 - Math.min(scrollTop / IMAGE_FADE_THRESHOLD_PX, 1)}`);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
