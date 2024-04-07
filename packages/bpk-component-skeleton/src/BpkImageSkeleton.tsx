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

import { cssModules } from '../../bpk-react-utils';

import BpkBaseSkeleton from './BpkBaseSkeleton';
import getCustomStyles from './utils';

import type { CUSTOM_SIZE_TYPE } from './common-types';

import STYLES from './BpkImageSkeleton.module.scss';

const getClassName = cssModules(STYLES);

export const IMAGE_SKELETON_STYLE = {
  rounded: 'rounded',
  default: 'default',
} as const;
export type ImageSkeletonStyle = (typeof IMAGE_SKELETON_STYLE)[keyof typeof IMAGE_SKELETON_STYLE];

export const IMAGE_SIZE_TYPES = {
  default: 'default',
} as const;

export type SizeType = (typeof IMAGE_SIZE_TYPES)[keyof typeof IMAGE_SIZE_TYPES] | CUSTOM_SIZE_TYPE;

type Props = {
  style?: ImageSkeletonStyle,
  size?: SizeType,
  className?: string;
  ariaLabel?: string;
};

const BpkImageSkeleton = ({
  ariaLabel,
  className,
  size = IMAGE_SIZE_TYPES.default,
  style = IMAGE_SKELETON_STYLE.default
 }: Props) => {
  const classNames = [getClassName('bpk-image-skeleton__default-size')];
  let styleObj;

  if(typeof size === 'object') {
    styleObj = getCustomStyles(size);
  }

  if(style === IMAGE_SKELETON_STYLE.rounded) {
    classNames.push(getClassName('bpk-image-skeleton__round-style'));
  }

  if (className) {
    classNames.push(className);
  }

  return (
    <BpkBaseSkeleton className={classNames.join(' ')} ariaLabel={ariaLabel} styleObj={styleObj} />
  )};

export default BpkImageSkeleton;
