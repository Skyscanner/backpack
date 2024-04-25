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

import type { SyntheticEvent } from 'react';

import { TransitionInitialMount, getClassName } from '../../bpk-react-utils';

import STYLES from './bpk-scrim.module.scss';

type Props = {
  onClose?: (e?: SyntheticEvent) => void | null;
};
const BpkScrim = ({ onClose = () => {} }: Props) => (
  <TransitionInitialMount
    appearClassName={getClassName(STYLES["bpk-scrim--appear"])}
    appearActiveClassName={getClassName(STYLES["bpk-scrim--appear-active"])}
    transitionTimeout={200}
  >
    <div
      role="presentation"
      className={getClassName(STYLES["bpk-scrim"])}
      onMouseDown={onClose}
      onTouchStart={onClose}
    />
  </TransitionInitialMount>
);

export default BpkScrim;
