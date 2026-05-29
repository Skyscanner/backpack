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
import { cssModules } from '../../../bpk-react-utils';

import type { BpkCompareColumn } from './common-types';

import STYLES from './BpkComparisonTable.module.scss';

type BpkComparisonTableColumnHeaderProps = Pick<
  BpkCompareColumn,
  'imageSrc' | 'imageAlt' | 'headerContent' | 'bestTag'
> & {
  bestTagLabel: string;
};

const getClassName = cssModules(STYLES);

const BpkComparisonTableColumnHeader = ({
  bestTag = false,
  bestTagLabel,
  headerContent,
  imageAlt = '',
  imageSrc,
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
  </div>
);

export default BpkComparisonTableColumnHeader;
