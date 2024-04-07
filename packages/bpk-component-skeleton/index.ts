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

import BpkImageSkeleton, { IMAGE_SKELETON_STYLE, IMAGE_SIZE_TYPES } from './src/BpkImageSkeleton';
import BpkBodyTextSkeleton, { BODY_TEXT_SIZE_TYPES } from './src/BpkBodyTextSkeleton';
import BpkCircleSkeleton, { CIRCLE_SIZE_TYPES } from './src/BpkCircleSkeleton';
import BpkHeadlineSkeleton, { HEADLINE_SIZE_TYPES } from './src/BpkHeadlineSkeleton';

const SIZE_TYPES = {
  ...IMAGE_SIZE_TYPES,
  ...BODY_TEXT_SIZE_TYPES,
  ...CIRCLE_SIZE_TYPES,
  ...HEADLINE_SIZE_TYPES,
}

export {
  BpkImageSkeleton,
  BpkBodyTextSkeleton,
  BpkCircleSkeleton,
  BpkHeadlineSkeleton,
  SIZE_TYPES, 
  IMAGE_SKELETON_STYLE
}
