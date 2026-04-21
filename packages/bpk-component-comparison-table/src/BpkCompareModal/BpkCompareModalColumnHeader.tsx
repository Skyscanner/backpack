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

import { useCompareModalColumn, useCompareModalContent } from './BpkCompareModalContext';

import type { BpkCompareModalColumnHeaderProps } from './common-types';

import STYLES from './BpkCompareModal.module.scss';

const getClassName = cssModules(STYLES);

// Must match SCSS: bpk-compare-modal__header-image-area height (5.1875rem) and bpk-spacing-base (1rem).
// Re-exported so BpkCompareModalContent can use the height as its scroll fade threshold.
export const IMAGE_AREA_HEIGHT_PX = 83;
export const IMAGE_AREA_MARGIN_PX = 16;

/**
 * BpkCompareModalColumnHeader — visual header for one comparison column:
 * image area, bestTag badge, consumer header slot, and remove button.
 *
 * Consumer props: children, imageSrc, imageAlt, bestTag.
 * Rendering props (fadedRatio, removeLabel, bestTagLabel, onRemove, removeA11yLabel)
 * are read from context — set up automatically by Content and Column.
 *
 * @returns {JSX.Element} The column header visual.
 */
function BpkCompareModalColumnHeader({
  bestTag = false,
  children,
  imageAlt = '',
  imageSrc,
}: BpkCompareModalColumnHeaderProps) {
  const { bestTagLabel, fadedRatio, removeLabel } = useCompareModalContent();
  const { onRemove, removeA11yLabel } = useCompareModalColumn();

  const contentOpacity = 1 - fadedRatio;
  const visibleRatio = 1 - fadedRatio;
  const isHidden = fadedRatio >= 1;

  return (
    <div className={getClassName('bpk-compare-modal__header-content')}>
      <div
        className={getClassName('bpk-compare-modal__header-image-area')}
        style={{
          opacity: contentOpacity,
          height: `${IMAGE_AREA_HEIGHT_PX * visibleRatio}px`,
          marginBottom: `${IMAGE_AREA_MARGIN_PX * visibleRatio}px`,
        }}
      >
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        {bestTag && (
          <span className={getClassName('bpk-compare-modal__best-tag')}>
            <BpkBadge type={BADGE_TYPES.brand}>{bestTagLabel}</BpkBadge>
          </span>
        )}
      </div>

      {children}

      <div
        className={getClassName(
          'bpk-compare-modal__remove-button',
          isHidden && 'bpk-compare-modal__remove-button--hidden',
        )}
        style={{ opacity: contentOpacity }}
      >
        <BpkButton
          type={BUTTON_TYPES.link}
          size={SIZE_TYPES.small}
          onClick={onRemove}
          aria-label={removeA11yLabel}
        >
          {removeLabel}
        </BpkButton>
      </div>
    </div>
  );
}

export default BpkCompareModalColumnHeader;
