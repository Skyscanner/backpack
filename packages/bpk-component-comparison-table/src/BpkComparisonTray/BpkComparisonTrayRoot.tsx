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

import BpkButton, { BUTTON_TYPES } from '../../../bpk-component-button';
import { BpkCardV2, CARD_V2_SURFACE_COLORS } from '../../../bpk-component-card';
import { BpkSpacing } from '../../../bpk-component-layout';
import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import BpkComparisonTrayItem from './BpkComparisonTrayItem';
import BpkComparisonTrayItemPlaceholder from './BpkComparisonTrayItemPlaceholder';

import type { BpkComparisonTrayRootProps } from './common-types';

import STYLES from './BpkComparisonTray.module.scss';

const getClassName = cssModules(STYLES);

const MAX_ITEMS = 3;

const BpkComparisonTrayRoot = ({
  ariaLabel,
  compareLabel,
  items,
  onCompare,
  onRemove,
  removeLabel,
}: BpkComparisonTrayRootProps) => {
  const displayItems = Array.from({ length: MAX_ITEMS }, (_value, index) => items[index] ?? null);

  return (
    <div
      {...getDataComponentAttribute('ComparisonTray')}
      className={getClassName('bpk-comparison-tray')}
    >
      <BpkCardV2.Root
        bgColor={CARD_V2_SURFACE_COLORS.surfaceContrast}
        role="region"
        aria-label={ariaLabel}
      >
        <BpkCardV2.Body templateColumns="minmax(0, 1fr) auto" align="center" gap={BpkSpacing.Base}>
          <BpkCardV2.Section
            flexDirection="row"
            alignItems="center"
            padding={BpkSpacing.None}
            gap={BpkSpacing.MD}
          >
            {displayItems.map((item, index) =>
              item ? (
                <BpkComparisonTrayItem key={item.id} item={item} onRemove={onRemove} removeLabel={`${removeLabel} ${item.label}`} />
              ) : (
                // eslint-disable-next-line react/no-array-index-key
                <BpkComparisonTrayItemPlaceholder key={`placeholder-${index}`} />
              ),
            )}
          </BpkCardV2.Section>
          <BpkButton
            type={BUTTON_TYPES.linkOnDark}
            implicit
            disabled={items.length <= 1}
            onClick={onCompare}
          >
            {compareLabel}
          </BpkButton>
        </BpkCardV2.Body>
      </BpkCardV2.Root>
    </div>
  );
};

export default BpkComparisonTrayRoot;
