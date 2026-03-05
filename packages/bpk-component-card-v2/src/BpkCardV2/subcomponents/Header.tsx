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

import { BpkFlex, BpkSpacing } from '../../../../bpk-component-layout';

import type { BpkCardV2HeaderProps } from '../common-types';

/**
 * Header subcomponent for BpkCardV2.
 *
 * Renders a BpkFlex container positioned at the top of the card.
 * Defaults to horizontal (row) direction with base padding.
 * All BpkFlex props can be used to customise the layout.
 *
 * @example
 * <BpkCardV2.Header>Card title</BpkCardV2.Header>
 *
 * @example
 * <BpkCardV2.Header justify="space-between" align="center">
 *   <span>Title</span>
 *   <span>Action</span>
 * </BpkCardV2.Header>
 *
 * @returns {JSX.Element} Header component
 */
const Header = ({
  children,
  direction = 'row',
  padding = BpkSpacing.Base,
  ...rest
}: BpkCardV2HeaderProps) => (
  <BpkFlex direction={direction} padding={padding} {...rest}>
    {children}
  </BpkFlex>
);

Header.displayName = 'BpkCardV2.Header';

export default Header;
