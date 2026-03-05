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

import type { BpkCardV2PrimaryProps } from '../common-types';

/**
 * Primary subcomponent for split layout in BpkCardV2.
 *
 * Renders a BpkBox for the primary (main) content area in a split layout.
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
 * @returns {JSX.Element} Primary component
 */
const Primary = ({
  children,
  flexDirection = 'column',
  padding = BpkSpacing.Base,
  ...rest
}: BpkCardV2PrimaryProps) => (
  <BpkBox flexDirection={flexDirection} padding={padding} {...rest}>
    {children}
  </BpkBox>
);

Primary.displayName = 'BpkCardV2.Primary';

export default Primary;
