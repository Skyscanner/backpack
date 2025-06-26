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

import type { MouseEvent } from 'react';
import { useState } from 'react';

import {
  colorBlack,
  colorWhite,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkHeartIcon from '../../bpk-component-icon/lg/heart';
import BpkHeartOutlineIcon from '../../bpk-component-icon/lg/heart--outline';
import BpkHeartIconSm from '../../bpk-component-icon/sm/heart';
import BpkHeartOutlineIconSm from '../../bpk-component-icon/sm/heart--outline';
import { cssModules } from '../../bpk-react-utils';


import STYLES from './BpkSaveButton.module.scss';

export const SIZE_TYPES = {
  default: 'default',
  small: 'small',
} as const;

export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];

export const STYLE_TYPES = {
  default: 'default',
  contained: 'contained',
  onDark: 'onDark',
} as const;

export type StyleType = (typeof STYLE_TYPES)[keyof typeof STYLE_TYPES];

const getClassName = cssModules(STYLES);

type Props = {
  checked: boolean;
  accessibilityLabel: string;
  onCheckedChange: (e: MouseEvent) => void;
  size?: SizeType;
  style?: StyleType;
};

const AlignedHeartIcon = BpkHeartIcon;
const AlignedHeartOutlineIcon = BpkHeartOutlineIcon;
const AlignedHeartIconSm = BpkHeartIconSm;
const AlignedHeartOutlineIconSm = BpkHeartOutlineIconSm;

const BpkSaveButton = ({
  accessibilityLabel,
  checked,
  onCheckedChange,
  size = SIZE_TYPES.default,
  style = STYLE_TYPES.default,
  ...rest
}: Props) => {
  const [shouldPlayAnim, setPlayAnim] = useState(false);
  const smallSize = size === SIZE_TYPES.small;
  const HeartIcon = smallSize ? AlignedHeartIconSm : AlignedHeartIcon;
  const HeartOutLineIcon = smallSize
    ? AlignedHeartOutlineIconSm
    : AlignedHeartOutlineIcon;
  return (
    <button
      type="button"
      aria-label={accessibilityLabel}
      aria-pressed={checked}
      className={getClassName(
        'bpk-save-button',
        smallSize && 'bpk-save-button__small',
        `bpk-save-button__${style}`,
      )}
      onClick={(e: MouseEvent) => {
        onCheckedChange(e);
        if (!checked) {
          setPlayAnim(true);
        }
      }}
      {...rest}
    >
      <div
        className={getClassName(
          `bpk-save-button__heartIcon`,
          checked && shouldPlayAnim && `bpk-save-button__heartIcon--clicked`,
          `bpk-save-button__heartIcon--${style}`,
        )}
        data-show={checked}
      >
        <HeartIcon />
      </div>
      <div
        className={getClassName(`bpk-save-button__heartOutlineIcon`)}
        data-show={!checked}
      >
        <HeartOutLineIcon
          fill={style === STYLE_TYPES.onDark ? colorWhite : colorBlack}
        />
      </div>
    </button>
  );
};

export default BpkSaveButton;
