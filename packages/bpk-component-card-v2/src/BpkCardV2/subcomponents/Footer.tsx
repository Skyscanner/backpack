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

import { forwardRef } from 'react';

import { cssModules } from '../../../../bpk-react-utils';
import getPaddingStyle from '../utils/getPaddingStyle';

import type { BpkCardV2FooterProps } from '../common-types';

import STYLES from '../BpkCardV2.module.scss';

const getClassName = cssModules(STYLES);

/**
 * Footer subcomponent for BpkCardV2.
 *
 * Renders a <div> element positioned at the bottom of the card.
 * Inherits surface color and styling from parent BpkCardV2.
 *
 * @param props - Component props of type BpkCardV2FooterProps
 * @returns {JSX.Element} Rendered footer element
 *
 * @example
 * <BpkCardV2>
 *   <BpkCardV2.Header>Card title</BpkCardV2.Header>
 *   <BpkCardV2.Body>Content</BpkCardV2.Body>
 *   <BpkCardV2.Footer>Footer content</BpkCardV2.Footer>
 * </BpkCardV2>
 */
const Footer = forwardRef<HTMLDivElement, BpkCardV2FooterProps>(
  ({ children, padding }, ref) => (
    <div
      ref={ref}
      className={getClassName('bpk-card-v2__footer')}
      style={getPaddingStyle(padding)}
    >
      {children}
    </div>
  ),
);

Footer.displayName = 'BpkCardV2.Footer';

export default Footer;
