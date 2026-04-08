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

import BpkButton, { BUTTON_TYPES } from '../../../../bpk-component-button';
import { BpkCardV2, CARD_V2_SURFACE_COLORS } from '../../../../bpk-component-card';
import { BpkSpacing } from '../../../../bpk-component-layout';
import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import Item from './Item';
import ItemPlaceholder from './ItemPlaceholder';

import type { ComparisonTrayRootProps } from '../common-types';

import STYLES from '../ComparisonTray.module.scss';

const getClassName = cssModules(STYLES);

const MAX_ITEMS = 3;

function Root({
  compareLabel,
  items,
  onCompare,
  onRemove,
}: ComparisonTrayRootProps) {
  const displayItems = Array.from({ length: MAX_ITEMS }, (_, i) => items[i] ?? null);

  return (
    <div
      {...getDataComponentAttribute('ComparisonTray')}
      className={getClassName('bpk-comparison-tray')}
    >
      <BpkCardV2.Root bgColor={CARD_V2_SURFACE_COLORS.surfaceContrast}>
        <BpkCardV2.Body templateColumns="1fr auto" align="center" gap={BpkSpacing.Base}>
          <BpkCardV2.Section
            flexDirection="row"
            alignItems="center"
            padding={BpkSpacing.None}
            gap={BpkSpacing.Base}
          >
            {displayItems.map((item, index) =>
              item ? (
                <Item key={item.id} item={item} onRemove={onRemove} />
              ) : (
                // eslint-disable-next-line react/no-array-index-key
                <ItemPlaceholder key={`placeholder-${index}`} />
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
}

Root.displayName = 'ComparisonTray.Root';

export default Root;
