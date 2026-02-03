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

import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';
import BpkBubbleArrow from '../icons/BpkBubbleArrow';

import STYLES from './BpkBubble.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: string;
};

const BpkBubble = ({ children }: Props) => (
  <span className={getClassName('bpk-bubble')} {...getDataComponentAttribute('Bubble')}>
    <BpkText textStyle={TEXT_STYLES.label3} tagName="span" color={TEXT_COLORS.textOnDark}>
      {children}
    </BpkText>
    <BpkBubbleArrow styles={getClassName('bpk-bubble__arrow')} />
  </span>
);

export default BpkBubble;
