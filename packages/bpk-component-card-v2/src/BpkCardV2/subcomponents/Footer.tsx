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

import type { BpkCardV2FooterProps } from '../common-types';

/**
 * Footer subcomponent for BpkCardV2.
 *
 * Renders a BpkFlex container positioned at the bottom of the card.
 * Defaults to horizontal (row) direction with base padding.
 * All BpkFlex props can be used to customise the layout.
 *
 * @example
 * <BpkCardV2.Footer>Footer content</BpkCardV2.Footer>
 *
 * @example
 * <BpkCardV2.Footer justify="flex-end" gap={BpkSpacing.SM}>
 *   <button>Cancel</button>
 *   <button>Save</button>
 * </BpkCardV2.Footer>
 *
 * @returns {JSX.Element} Footer component
 */
const Footer = ({
  children,
  direction = 'row',
  padding = BpkSpacing.Base,
  ...rest
}: BpkCardV2FooterProps) => (
  <BpkFlex direction={direction} padding={padding} {...rest}>
    {children}
  </BpkFlex>
);

Footer.displayName = 'BpkCardV2.Footer';

export default Footer;
