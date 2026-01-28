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
  BpkVessel,
  BpkSpacing,
} from '../../packages/bpk-component-layout';

import Wrapper from './layout-wrapper';

import STYLES from './examples.module.scss';

const BpkVesselExample = () => (
  <Wrapper>
    <BpkVessel
      padding={BpkSpacing.MD}
      className={STYLES['bpk-layout-examples__outline']}
      style={{
        transition: 'opacity 0.3s',
      }}
    >
      Using BpkVessel with legacy className and inline styles.
      <br />
      Backpack spacing tokens: <code>padding=&#123;BpkSpacing.MD&#125;</code>
    </BpkVessel>
  </Wrapper>
);

export default BpkVesselExample;
