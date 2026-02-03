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
export type CUSTOM_SIZE_TYPE = {
  width: string;
  height: string;
}

export declare const SIZE_TYPES: {
  small: 'small';
  default: 'default';
  large: 'large';
};
export type SizeType = (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES] | CUSTOM_SIZE_TYPE;

export declare const SKELETON_TYPES: {
  image: 'image';
  bodyText: 'bodyText';
  circle: 'circle';
  headline: 'headline';
};
export type SkeletonType = (typeof SKELETON_TYPES)[keyof typeof SKELETON_TYPES];

export declare const IMAGE_SKELETON_STYLE: {
  rounded: 'rounded';
  default: 'default';
};
export type ImageSkeletonStyle = (typeof IMAGE_SKELETON_STYLE)[keyof typeof IMAGE_SKELETON_STYLE];

type SizeMap = {
  [SKELETON_TYPES.image]: (typeof SIZE_TYPES)['default'];
  [SKELETON_TYPES.bodyText]: (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];
  [SKELETON_TYPES.circle]: Exclude<(typeof SIZE_TYPES)[keyof typeof SIZE_TYPES], 'large'>;
  [SKELETON_TYPES.headline]: (typeof SIZE_TYPES)[keyof typeof SIZE_TYPES];
};

export type ComponentProps =
  | {
      type: Extract<SkeletonType, 'image'>;
      size?: SizeMap['image'] | CUSTOM_SIZE_TYPE;
      style?: ImageSkeletonStyle;
    }
  | {
      type: Exclude<keyof SizeMap, 'image'>;
      size?: SizeMap[keyof SizeMap] | CUSTOM_SIZE_TYPE;
    };