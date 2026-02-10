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

import BpkPanel, { PANEL_BG_COLORS } from '../../packages/bpk-component-panel';
import BpkText, { TEXT_COLORS } from '../../packages/bpk-component-text';

import type { PanelBgColor } from '../../packages/bpk-component-panel';

import STYLES from './examples.module.scss';

const textColorForBg = {
  [PANEL_BG_COLORS.surfaceDefault]: TEXT_COLORS.textPrimary,
  [PANEL_BG_COLORS.surfaceElevated]: TEXT_COLORS.textPrimary,
  [PANEL_BG_COLORS.surfaceHero]: TEXT_COLORS.textOnDark,
  [PANEL_BG_COLORS.surfaceContrast]: TEXT_COLORS.textOnDark,
  [PANEL_BG_COLORS.surfaceHighlight]: TEXT_COLORS.textPrimary,
  [PANEL_BG_COLORS.surfaceSubtle]: TEXT_COLORS.textPrimary,
  [PANEL_BG_COLORS.surfaceLowContrast]: TEXT_COLORS.textPrimary,
  [PANEL_BG_COLORS.surfaceTint]: TEXT_COLORS.textPrimary,
};

const rowStyleForBg: Partial<Record<PanelBgColor, string>> = {
  [PANEL_BG_COLORS.surfaceLowContrast]: 'bpk-panel-examples--row-dark',
  [PANEL_BG_COLORS.surfaceTint]: 'bpk-panel-examples--row-gradient',
};

export const DefaultExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
      mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const WithoutPaddingExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel padded={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
      mi ante eu arcu.
    </BpkPanel>
  </div >
);

export const FullWidthExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel fullWidth>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
      mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const NoKeylineExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel keyline={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non dictum
      mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const BackgroundColorExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    {Object.entries(PANEL_BG_COLORS).map(([key, value]) => (
      <div key={key} className={STYLES[rowStyleForBg[value] || 'bpk-panel-examples--row']}>
        <BpkPanel bgColor={value}>
          <BpkText tagName="p" textStyle="heading-4" color={textColorForBg[value]}>
            {key}
          </BpkText>
          <BpkText tagName="p" color={textColorForBg[value]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            imperdiet lobortis tellus, non rhoncus erat tincidunt id.
          </BpkText>
        </BpkPanel>
        <BpkPanel bgColor={value} keyline={false}>
          <BpkText tagName="p" textStyle="heading-4" color={textColorForBg[value]}>
            {key} (no keyline)
          </BpkText>
          <BpkText tagName="p" color={textColorForBg[value]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            imperdiet lobortis tellus, non rhoncus erat tincidunt id.
          </BpkText>
        </BpkPanel>
      </div>
    ))}
  </div>
);

export const MixedExample = () => (
  <div>
    <DefaultExample />
    <BackgroundColorExample />
    <WithoutPaddingExample />
    <FullWidthExample />
    <NoKeylineExample />
  </div>
);
