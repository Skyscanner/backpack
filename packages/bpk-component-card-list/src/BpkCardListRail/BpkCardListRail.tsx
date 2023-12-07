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
// @ts-ignore: TODO - fix
import BpkMobileScrollContainer from '../../../bpk-component-mobile-scroll-container';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCardListRail.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListRail = ({ children }: any) => (
  <BpkMobileScrollContainer>
    {children.map((card: any) => (
      <div className={getClassName('bpk-card-list--rail_card')}> {card}</div>
    ))}
  </BpkMobileScrollContainer>
);

export default BpkCardListRail;
