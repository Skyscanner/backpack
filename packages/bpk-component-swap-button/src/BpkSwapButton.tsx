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

import { useState } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkAriaLive from '../../bpk-component-aria-live'
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import SwapVertical from '../../bpk-component-icon/sm/swap--vertical';
import { BpkButtonV2 } from '../../bpk-component-button';

import STYLES from './BpkSwapButton.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  onClick: () => void,
  ariaLabel: string,
  ariaLiveTextProp: string,
}
const BpkSwapButton = ( props: Props ) => {
  const { ariaLabel, ariaLiveTextProp, onClick } = props;

  const [rotationDegree, setRotationDegree] = useState(0);
  const [ariaLiveText, setAriaLiveText] = useState('');

  const handleRotation = () => {
    if (rotationDegree === 0) {
      setRotationDegree(-180);
    } else {
      setRotationDegree(0);
    }
    setAriaLiveText(ariaLiveTextProp);
    // without set timeout, the aria-live text would not change and screenreader would read out 'swapped' for the first time only.
    setTimeout(() => {
      setAriaLiveText('');
    }, 250);
  };

  return (
    <div className={getClassName('bpk-swap-button__container')}>
      <BpkButtonV2
        className={getClassName('bpk-swap-button__swap-button')}
        style={{ transform: `rotate(${rotationDegree}deg)` }}
        aria-label={ariaLabel}
        onClick={() => {
          onClick();
          handleRotation();
        }}
      >
        <SwapVertical className={getClassName('bpk-swap-button__icon')} />
      </BpkButtonV2>
      <BpkAriaLive>{ariaLiveText}</BpkAriaLive>
    </div>
  );
};
export default BpkSwapButton;

