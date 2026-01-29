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

import { BpkVessel } from '../../packages/bpk-component-layout';

import STYLES from './examples.module.scss';

const BpkVesselExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Basic migration example */}
    <BpkVessel
      className={STYLES['bpk-layout-examples__outline']}
      style={{
        padding: '16px',
        transition: 'opacity 0.3s',
      }}
      data-testid="vessel-basic"
    >
      Basic: className + style + data-testid
    </BpkVessel>

    {/* Interactive component migration */}
    <BpkVessel
      as="section"
      className={STYLES['bpk-layout-examples__outline']}
      style={{ padding: '16px' }}
      role="region"
      aria-label="Interactive section"
      tabIndex={0}
      data-testid="vessel-interactive"
    >
      Interactive content
    </BpkVessel>
  </div>
);

export default BpkVesselExample;
