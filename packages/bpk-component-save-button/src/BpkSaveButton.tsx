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

import BpkButtonV2 from '../../bpk-component-button/src/BpkButtonV2/BpkButton';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkHeartIcon from '../../bpk-component-icon/lg/heart';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkHeartOutlineIcon from '../../bpk-component-icon/lg/heart--outline';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkHeartIconSm from '../../bpk-component-icon/sm/heart';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkHeartOutlineIconSm from '../../bpk-component-icon/sm/heart--outline';
import { withLargeButtonAlignment } from '../../bpk-component-icon';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSaveButton.module.scss';

const getClassName = cssModules(STYLES);

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

type Props = {
  checked: boolean;
  accessibilityLabel: string;
  onCheckedChange: () => void;
  size?: SizeType;
  style?: StyleType;
};

const AlignedHeartIcon = withLargeButtonAlignment(BpkHeartIcon);
const AlignedHeartOutlineIcon = withLargeButtonAlignment(BpkHeartOutlineIcon);
const AlignedHeartIconSm = withLargeButtonAlignment(BpkHeartIconSm);
const AlignedHeartOutlineIconSm = withLargeButtonAlignment(BpkHeartOutlineIconSm);

const BpkSaveButton = ({
                         accessibilityLabel,
                         checked,
                         onCheckedChange,
                         size = SIZE_TYPES.default,
                         style = STYLE_TYPES.default,
                       }: Props) => {
  const smallSize = size === SIZE_TYPES.small;
  const specialStyle = style !== STYLE_TYPES.default;
  const FullHeart = smallSize ? AlignedHeartIconSm : AlignedHeartIcon;
  const EmptyHeart = smallSize ? AlignedHeartOutlineIconSm : AlignedHeartOutlineIcon;
  return <BpkButtonV2
    aria-label={accessibilityLabel}
    className={getClassName('bpk-save-button', smallSize && 'bpk-save-button__small', specialStyle && `bpk-save-button__${style}`,
    )}
    onClick={onCheckedChange}
    iconOnly
  >
      <FullHeart className={getClassName('bpk-save-button__icon',
        'bpk-save-button__fullHeart',
        `bpk-save-button__fullHeart--${checked ? 'show' : 'hide'}`,
        specialStyle && `bpk-save-button__fullHeart--${style}`,
      )} />
      <EmptyHeart className={getClassName('bpk-save-button__icon',
        'bpk-save-button__emptyHeart',
        `bpk-save-button__emptyHeart--${checked ? 'hide' : 'show'}`,
        specialStyle && `bpk-save-button__emptyHeart--${style}`,
      )} />
  </BpkButtonV2>;
};

export default BpkSaveButton;
