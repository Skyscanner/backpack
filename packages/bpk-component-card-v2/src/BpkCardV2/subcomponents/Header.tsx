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

import type { BpkCardV2HeaderProps } from '../common-types';
import STYLES from '../BpkCardV2.module.scss';

/**
 * Header subcomponent for BpkCardV2.
 *
 * Renders a semantic <header> element positioned at the top of the card.
 * Inherits surface color and styling from parent BpkCardV2.
 *
 * @param props - Component props of type BpkCardV2HeaderProps
 * @returns {JSX.Element} Rendered header element
 *
 * @example
 * <BpkCardV2>
 *   <BpkCardV2.Header>Card title</BpkCardV2.Header>
 * </BpkCardV2>
 */
const Header = ({\n  children,\n  className,\n}: BpkCardV2HeaderProps) => (
  <header
    className={[STYLES['bpk-card-v2__header'], className]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </header>
);

Header.displayName = 'BpkCardV2.Header';

export default Header;
