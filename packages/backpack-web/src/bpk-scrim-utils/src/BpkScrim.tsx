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

import { TransitionInitialMount, cssModules, getDataComponentAttribute, portalLock } from '../../bpk-react-utils';

import STYLES from './bpk-scrim.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  onClose?: (e?: SyntheticEvent) => void | null;
};
const BpkScrim = ({ onClose = () => {} }: Props) => {
  // When a higher-priority overlay (e.g. BpkModalV3) closes, ark-ui's
  // pointerdown handler fires first and changes data-state to 'closed',
  // making the modal scrim pointer-events:none before mousedown fires.
  // The mousedown then falls through to this scrim and would immediately
  // trigger onClose (hide), causing a visible flash. Guard against this
  // by ignoring mousedown/touchstart while the portal lock is active.
  // TODO: CLOV-1643 Remove once BpkDrawer, BpkModal, BpkDialog are deprecated.
  const handlePointerDown = (e: SyntheticEvent) => {
    if (!portalLock.isLocked()) {
      onClose(e);
    }
  };

  return (
    <TransitionInitialMount
      appearClassName={getClassName('bpk-scrim--appear')}
      appearActiveClassName={getClassName('bpk-scrim--appear-active')}
      transitionTimeout={200}
    >
      <div
        role="presentation"
        className={getClassName('bpk-scrim')}
        {...getDataComponentAttribute('Scrim')}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      />
    </TransitionInitialMount>
  );
};

export default BpkScrim;