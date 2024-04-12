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

import type { CUSTOM_SIZE_TYPE } from './common-types';

import STYLES from './BpkSkeleton.module.scss';

const getClassName = cssModules(STYLES);

export const SIZE_TYPES = {
  small: 'small',
  default: 'default',
  large: 'large',
} as const;

export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES] | CUSTOM_SIZE_TYPE;

export const SKELETON_TYPES = {
  image: 'image',
  bodyText: 'bodyText',
  circle: 'circle',
  headline: 'headline',
} as const;

export type SkeletonType = (typeof SKELETON_TYPES)[keyof typeof SKELETON_TYPES];

export const IMAGE_SKELETON_STYLE = {
  rounded: 'rounded',
  default: 'default',
} as const;
export type ImageSkeletonStyle = (typeof IMAGE_SKELETON_STYLE)[keyof typeof IMAGE_SKELETON_STYLE];

type SizeMap = {
  [SKELETON_TYPES.image]: (typeof SIZE_TYPES)['default'];
  [SKELETON_TYPES.bodyText]: (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];
  [SKELETON_TYPES.circle]: Exclude<(typeof SIZE_TYPES)[keyof typeof SIZE_TYPES], 'large'>
  [SKELETON_TYPES.headline]: (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];
};

type ComponentProps = {
  type: Extract<SkeletonType, 'image'>
  size?: SizeMap['image'] | CUSTOM_SIZE_TYPE;
  ariaLabel: string;
  style?: ImageSkeletonStyle;
} | {
  type: Exclude<keyof SizeMap, 'image'>;
  size?: SizeMap[keyof SizeMap] | CUSTOM_SIZE_TYPE;
  ariaLabel: string;
};

const BpkSkeleton = (props: ComponentProps) => {
  const { ariaLabel, size, type } = props;
  const classNames:string[] = [getClassName(`bpk-skeleton__${type}`)];
  let styleObj;

  if(typeof size === 'object') {
    styleObj = size;
  } else {
    classNames.push(getClassName(`bpk-skeleton__${type}--${size}`))
  }

  if(type === SKELETON_TYPES.image) {
    if(props.style === IMAGE_SKELETON_STYLE.rounded) {
      classNames.push(getClassName('bpk-skeleton__image--rounded'));
    }
  }

  return (
    <BpkBaseSkeleton skeletonStyle={classNames.join(' ')} ariaLabel={ariaLabel} styleObj={styleObj} />
  )
};

BpkSkeleton.defaultProps = {
  size: SIZE_TYPES.default,
  style: IMAGE_SKELETON_STYLE.default,
}

export default BpkSkeleton;
