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
// @ts-nocheck

import { cssModules } from '../../bpk-react-utils';

import BpkBaseSkeleton from './BpkBaseSkeleton';
import { SKELETON_TYPES, IMAGE_SKELETON_STYLE, SIZE_TYPES, BACKGROUND_STYLE } from './common-types';

import type { ComponentProps} from './common-types';

import STYLES from './BpkSkeleton.module.scss';


const getClassName = cssModules(STYLES);

const BpkSkeleton = (props: ComponentProps) => {
  const { backgroundStyle = BACKGROUND_STYLE.default, size = SIZE_TYPES.default, type } = props;

  const isImageRounded = type === SKELETON_TYPES.image && props.style === IMAGE_SKELETON_STYLE.rounded;
  const classNames: string = getClassName(
      `bpk-skeleton__${type}`,
      typeof size !== 'object' && `bpk-skeleton__${type}--${size}`,
      isImageRounded && 'bpk-skeleton__image--rounded',
      `bpk-skeleton__${backgroundStyle}`
   );
  const styleObj = typeof size === 'object' ? size : undefined;

  return (
    <BpkBaseSkeleton skeletonStyle={classNames} styleObj={styleObj} />
  )
};

export default BpkSkeleton;