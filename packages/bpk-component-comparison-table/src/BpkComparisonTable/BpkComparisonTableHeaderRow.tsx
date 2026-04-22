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

import {
  BpkTableHead,
  BpkTableHeadCell,
  BpkTableRow,
} from '../../../bpk-component-table';

import BpkComparisonTableColumnHeader from './BpkComparisonTableColumnHeader';
import BpkComparisonTableColumnPlaceholder from './BpkComparisonTableColumnPlaceholder';

import type {
  BpkComparisonTableTranslations,
  BpkCompareColumn,
} from './common-types';

type BpkComparisonTableHeaderRowProps = {
  displayColumns: Array<BpkCompareColumn | null>;
  onRemove: (itemId: string) => void;
  onAddMoreClick: () => void;
  translations: BpkComparisonTableTranslations;
};

function BpkComparisonTableHeaderRow({
  displayColumns,
  onAddMoreClick,
  onRemove,
  translations,
}: BpkComparisonTableHeaderRowProps) {
  const { addMoreDescription, addMoreLinkText, bestTagLabel, removeLabel } = translations;

  return (
    <BpkTableHead>
      <BpkTableRow>
        {displayColumns.map((column, index) => (
          <BpkTableHeadCell
            key={column ? column.itemId : `placeholder-${index}`}
          >
            {column ? (
              <BpkComparisonTableColumnHeader
                {...column}
                removeLabel={removeLabel}
                onRemove={onRemove}
                bestTagLabel={bestTagLabel}
              />
            ) : (
              <BpkComparisonTableColumnPlaceholder
                addMoreDescription={addMoreDescription}
                addMoreLinkText={addMoreLinkText}
                onAddMoreClick={onAddMoreClick}
              />
            )}
          </BpkTableHeadCell>
        ))}
      </BpkTableRow>
    </BpkTableHead>
  );
}

export default BpkComparisonTableHeaderRow;
