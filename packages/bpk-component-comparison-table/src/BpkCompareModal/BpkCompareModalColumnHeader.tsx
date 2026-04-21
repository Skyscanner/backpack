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

import type { CSSProperties } from 'react';

import BpkBadge, { BADGE_TYPES } from '../../../bpk-component-badge';
import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';

import type { BpkCompareColumnData } from './common-types';

import STYLES from './BpkCompareModal.module.scss';

type BpkCompareModalColumnHeaderProps = Pick<
  BpkCompareColumnData,
  'imageSrc' | 'imageAlt' | 'header' | 'itemId' | 'bestTag' | 'removeA11yLabel'
> & {
  removeLabel: string;
  bestTagLabel: string;
  onRemove: (itemId: string) => void;
  fadedRatio?: number;
};

const getClassName = cssModules(STYLES);

function BpkCompareModalColumnHeader({
  bestTag = false,
  bestTagLabel,
  fadedRatio = 0,
  header,
  imageAlt = '',
  imageSrc,
  itemId,
  onRemove,
  removeA11yLabel,
  removeLabel,
}: BpkCompareModalColumnHeaderProps) {
  return (
    <div
      className={getClassName('bpk-compare-modal__header-content')}
      style={{ '--bpk-image-opacity': 1 - fadedRatio } as CSSProperties & Record<string, number>}
    >
      <div className={getClassName('bpk-compare-modal__header-image-wrapper')}>
        <div
          className={getClassName('bpk-compare-modal__header-image-area')}
        >
          {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        </div>
        {bestTag && (
          <span className={getClassName('bpk-compare-modal__best-tag')}>
            <BpkBadge type={BADGE_TYPES.brand}>{bestTagLabel}</BpkBadge>
          </span>
        )}
      </div>

      <div className={getClassName('bpk-compare-modal__header-id-section')}>
        {header}
      </div>

      <div className={getClassName('bpk-compare-modal__remove-button')}>
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
}

export default BpkCompareModalColumnHeader;
