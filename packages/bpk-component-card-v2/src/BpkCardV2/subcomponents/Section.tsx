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

import type { BpkCardV2SectionProps } from '../common-types';

/**
 * Section subcomponent for multi-column layouts in BpkCardV2.
 *
 * Generic content area used with the `columns` prop on BpkCardV2.Body.
 * Flex value is injected by Body via cloneElement based on the columns spec.
 * All BpkBox props can be used to customise the layout.
 *
 * @returns {JSX.Element} Section component
 *
 * @example
 * <BpkCardV2.Body templateColumns="1fr 2fr 1fr">
 *   <BpkCardV2.Section>Left</BpkCardV2.Section>
 *   <BpkCardV2.Section>Center</BpkCardV2.Section>
 *   <BpkCardV2.Section>Right</BpkCardV2.Section>
 * </BpkCardV2.Body>
 */
const Section = ({
  children,
  display = 'flex',
  flexDirection = 'column',
  padding = BpkSpacing.Base,
  ...rest
}: BpkCardV2SectionProps) => (
  <BpkBox
    display={display}
    flexDirection={flexDirection}
    padding={padding}
    {...getDataComponentAttribute('CardV2.Section')}
    {...rest}
  >
    {children}
  </BpkBox>
);

Section.displayName = 'BpkCardV2.Section';

export default Section;
