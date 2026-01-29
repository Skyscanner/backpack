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

import BpkSkeleton from '../index';

import {
  ImageSkeletonExample,
  BodyTextSkeletonExample,
  CircleSkeletonExample,
  HeadlineSkeletonExample,
  CombinedComponentExample,
  BackgroundStyleDefaultExample,
  BackgroundStyleOnContrastExample,
} from './examples';

export default {
  title: 'bpk-component-skeleton',
  component: BpkSkeleton,
};

export const ImageSkeleton = ImageSkeletonExample;
export const BodyTextSkeleton = BodyTextSkeletonExample;
export const CircleSkeleton = CircleSkeletonExample;
export const HeadlineSkeleton = HeadlineSkeletonExample;

export const CombinedComponent = CombinedComponentExample;

export const BackgroundStyleDefault = BackgroundStyleDefaultExample;
export const BackgroundStyleOnContrast = BackgroundStyleOnContrastExample;
