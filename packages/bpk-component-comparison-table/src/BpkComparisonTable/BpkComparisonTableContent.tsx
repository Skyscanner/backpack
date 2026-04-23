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

import BpkComparisonTableHeaderRow from './BpkComparisonTableHeaderRow';

import type { BpkComparisonTableContentProps } from './common-types';

import STYLES from './BpkComparisonTable.module.scss';

const getClassName = cssModules(STYLES);

const MAX_COLUMNS = 3;

// Matches the image area height (5.1875rem × 16px). Opacity goes from 1 → 0 as the user scrolls 0 → 83 px, giving a smooth parallax fade.
const IMAGE_FADE_THRESHOLD_PX = 83;

function BpkComparisonTableContent({
  columns,
  onAddMoreClick,
  onRemove,
  translations,
}: BpkComparisonTableContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Pad with nulls so the table always renders exactly MAX_COLUMNS slots.
  const displayColumns = [...columns, null, null, null].slice(0, MAX_COLUMNS);

  const rowIds = columns[0]?.rows.map((row) => row.rowId) ?? [];

  // Pre-index cells by itemId → rowId for O(1) lookup during render.
  const cellsByItemAndRow = new Map(
    columns.map((column) => [
      column.itemId,
      new Map(column.rows.map((row) => [row.rowId, row.cell])),
    ])
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const { scrollTop } = container;
      // During the animation phase, push tbody down by the scroll amount so rows appear locked in place.
      // Once the fade-out completes the offset is fixed at the threshold and normal scrolling resumes.
      container.style.setProperty('--bpk-rows-offset', `${Math.min(scrollTop, IMAGE_FADE_THRESHOLD_PX)}px`);
      container.style.setProperty('--bpk-image-opacity', `${1 - Math.min(scrollTop / IMAGE_FADE_THRESHOLD_PX, 1)}`);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className={getClassName('bpk-comparison-table__scroll-container')}
    >
      <BpkTable>
        <BpkComparisonTableHeaderRow
          displayColumns={displayColumns}
          onRemove={onRemove}
          onAddMoreClick={onAddMoreClick}
          translations={translations}
        />

        <BpkTableBody type={TABLE_BODY_TYPES.striped}>
          {rowIds.map((rowId) => (
            <BpkTableRow key={rowId}>
              {displayColumns.map((column, index) => (
                <BpkTableCell
                  key={column ? `${rowId}-${column.itemId}` : `${rowId}-placeholder-${index}`}
                  // Placeholder need a distinct background colour not available via BpkTableCell props
                  // eslint-disable-next-line @skyscanner/rules/forbid-component-props
                  className={column ? undefined : getClassName('bpk-comparison-table__placeholder-cell')}
                >
                  {column
                    ? cellsByItemAndRow.get(column.itemId)?.get(rowId) ?? null
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

export default BpkComparisonTableContent;
