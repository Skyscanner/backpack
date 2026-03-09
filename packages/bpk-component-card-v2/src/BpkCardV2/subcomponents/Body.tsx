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

import { BpkGrid, BpkSpacing } from '../../../../bpk-component-layout';
import { getDataComponentAttribute } from '../../../../bpk-react-utils';

import type { BpkCardV2BodyProps } from '../common-types';

/**
 * Body subcomponent for BpkCardV2.
 *
 * Renders the main content area of the card as a BpkGrid container.
 * Defaults to a single-column vertical layout with base padding.
 * Use templateColumns for multi-column layouts. Include `auto` for each Divider child.
 * All BpkGrid props can be used to customise the layout.
 *
 * @example
 * // Simple body
 * <BpkCardV2.Body>Content here</BpkCardV2.Body>
 *
 * @example
 * // Multi-column layout
 * <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '1fr 2fr 1fr' }}>
 *   <BpkCardV2.Section>Left</BpkCardV2.Section>
 *   <BpkCardV2.Section>Center (2x wide)</BpkCardV2.Section>
 *   <BpkCardV2.Section>Right</BpkCardV2.Section>
 * </BpkCardV2.Body>
 *
 * @example
 * // Multi-column with divider (include auto for the divider)
 * <BpkCardV2.Body templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}>
 *   <BpkCardV2.Section>Main content</BpkCardV2.Section>
 *   <BpkCardV2.Divider />
 *   <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
 * </BpkCardV2.Body>
 *
 * @returns {JSX.Element} Body component
 */
const Body = ({
  children,
  padding = BpkSpacing.Base,
  templateColumns = '1fr',
  ...rest
}: BpkCardV2BodyProps) => (
  <BpkGrid
    templateColumns={templateColumns}
    padding={padding}
    {...getDataComponentAttribute('CardV2.Body')}
    {...rest}
  >
    {children}
  </BpkGrid>
);

Body.displayName = 'BpkCardV2.Body';

export default Body;
