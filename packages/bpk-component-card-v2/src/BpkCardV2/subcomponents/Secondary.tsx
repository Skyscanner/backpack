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

import type { BpkCardV2SecondaryProps } from '../common-types';

import STYLES from '../BpkCardV2.module.scss';

/**
 * Secondary subcomponent for split layout in BpkCardV2.
 *
 * Renders the secondary (sidebar) content area in a split layout. Takes
 * (100 - splitRatio)% width on desktop (>= 768px) and full width on mobile
 * (< 768px). Positioned second in vertical stack on mobile.
 *
 * Must be used as a child of BpkCardV2.Body with split={true}.
 *
 * @param props - Component props of type BpkCardV2SecondaryProps
 * @returns {JSX.Element} Rendered secondary content div
 *
 * @example
 * <BpkCardV2.Body split splitRatio={70}>
 *   <BpkCardV2.Primary>Main content area</BpkCardV2.Primary>
 *   <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
 * </BpkCardV2.Body>
 */
const Secondary = ({ children, className }: BpkCardV2SecondaryProps) => (
  <div
    className={[STYLES['bpk-card-v2__secondary'], className]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);

Secondary.displayName = 'BpkCardV2.Secondary';

export default Secondary;
