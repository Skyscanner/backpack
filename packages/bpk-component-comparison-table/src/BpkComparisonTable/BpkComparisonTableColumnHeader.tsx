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

import BpkBadge, { BADGE_TYPES } from '../../../bpk-component-badge';
import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';

import type { BpkCompareColumn } from './common-types';

import STYLES from './BpkComparisonTable.module.scss';

type BpkComparisonTableColumnHeaderProps = Pick<
  BpkCompareColumn,
  'imageSrc' | 'imageAlt' | 'headerContent' | 'itemId' | 'bestTag' | 'removeA11yLabel'
> & {
  removeLabel: string;
  bestTagLabel: string;
  onRemove: (itemId: string) => void;
};

const getClassName = cssModules(STYLES);

const BpkComparisonTableColumnHeader = ({
  bestTag = false,
  bestTagLabel,
  headerContent,
  imageAlt = '',
  imageSrc,
  itemId,
  onRemove,
  removeA11yLabel,
  removeLabel,
}: BpkComparisonTableColumnHeaderProps) => (
  <div
    className={getClassName('bpk-comparison-table__header-content')}
  >
    <div className={getClassName('bpk-comparison-table__header-image-wrapper')}>
      <div
        className={getClassName('bpk-comparison-table__header-image-area')}
      >
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
      </div>
      {bestTag && (
        <span className={getClassName('bpk-comparison-table__best-tag')}>
          <BpkBadge type={BADGE_TYPES.brand}>{bestTagLabel}</BpkBadge>
        </span>
      )}
    </div>

    <div className={getClassName('bpk-comparison-table__header-id-section')}>
      {headerContent}
    </div>

    <div className={getClassName('bpk-comparison-table__remove-button')}>
      <BpkButton
        type={BUTTON_TYPES.link}
        size={SIZE_TYPES.small}
        onClick={() => onRemove(itemId)}
        aria-label={removeA11yLabel}
      >
        {removeLabel}
      </BpkButton>
    </div>
  </div>
);

export default BpkComparisonTableColumnHeader;
