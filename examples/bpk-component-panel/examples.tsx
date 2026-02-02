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

import BpkPanel from '../../packages/bpk-component-panel';

import STYLES from './examples.module.scss';

export const DefaultExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const WithoutPaddingExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel padded={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const FullWidthExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel fullWidth>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const NoKeylineExample = () => (
  <div className={STYLES['bpk-panel-examples--wrapper']}>
    <BpkPanel keyline={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      imperdiet lobortis tellus, non rhoncus erat tincidunt id. Pellentesque
      consectetur, dolor nec vulputate vehicula, ex metus mattis ante, non
      dictum mi ante eu arcu.
    </BpkPanel>
  </div>
);

export const MixedExample = () => (
  <div>
    <DefaultExample />
    <WithoutPaddingExample />
    <FullWidthExample />
    <NoKeylineExample />
  </div>
);
