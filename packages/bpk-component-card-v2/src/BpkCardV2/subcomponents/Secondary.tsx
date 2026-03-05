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

import { BpkBox, BpkSpacing } from '../../../../bpk-component-layout';
import { getDataComponentAttribute } from '../../../../bpk-react-utils';

import type { BpkCardV2SecondaryProps } from '../common-types';

/**
 * Secondary subcomponent for split layout in BpkCardV2.
 *
 * Renders a BpkBox for the secondary (sidebar) content area in a split layout.
 * Width is injected by BpkCardV2.Body via cloneElement based on splitRatio.
 * All BpkBox props can be used to customise the layout.
 *
 * Must be used as a child of BpkCardV2.Body with split={true}.
 *
 * @example
 * <BpkCardV2.Body split splitRatio={70}>
 *   <BpkCardV2.Primary>Main content area</BpkCardV2.Primary>
 *   <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
 * </BpkCardV2.Body>
 *
 * @returns {JSX.Element} Secondary component
 */
const Secondary = ({
  children,
  display = 'flex',
  flex = '1 1 auto',
  flexDirection = 'column',
  padding = BpkSpacing.Base,
  ...rest
}: BpkCardV2SecondaryProps) => (
  <BpkBox display={display} flex={flex} flexDirection={flexDirection} padding={padding} {...getDataComponentAttribute('CardV2.Secondary')} {...rest}>
    {children}
  </BpkBox>
);

Secondary.displayName = 'BpkCardV2.Secondary';

export default Secondary;
