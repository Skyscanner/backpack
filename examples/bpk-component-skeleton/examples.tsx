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

import {
  BpkImageSkeleton, 
  BpkBodyTextSkeleton, 
  BpkCircleSkeleton,
  BpkHeadlineSkeleton,
  SIZE_TYPES, 
  IMAGE_SKELETON_STYLE 
} from '../../packages/bpk-component-skeleton';
import BpkBaseSkeleton from '../../packages/bpk-component-skeleton/src/BpkBaseSkeleton';

/* eslint-disable backpack/use-tokens */
const BaseSkeletonExample = () => <BpkBaseSkeleton className='' />;

const ImageDefaultSizeWithDefaultStyleExample = () => <BpkImageSkeleton ariaLabel='loading' />
const ImageDefaultSizeWithRoundedStyleExample = () => <BpkImageSkeleton ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />
const ImageCustomNumberSizeWithDefaultStyleExample = () => <BpkImageSkeleton size={{width: 7, height: 6}} ariaLabel='loading' />
const ImageCustomStringSizeWithRoundedStyleExample = () => <BpkImageSkeleton size={{width: '7rem', height: '6rem'}} ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />

const BodyTextSmallSizeExample = () => <BpkBodyTextSkeleton size={SIZE_TYPES.small} ariaLabel='loading' />
const BodyTextDefaultSizeExample = () => <BpkBodyTextSkeleton size={SIZE_TYPES.default} ariaLabel='loading' />
const BodyTextLargeSizeExample = () => <BpkBodyTextSkeleton size={SIZE_TYPES.large} ariaLabel='loading' />
const BodyTextCustomSizeExample = () => <BpkBodyTextSkeleton size={{width: 16, height: 1}} ariaLabel='loading' />

const CircleSmallSizeExample = () => <BpkCircleSkeleton size={SIZE_TYPES.small} ariaLabel='loading'/>;
const CircleDefaultSizeExample = () => <BpkCircleSkeleton ariaLabel='loading' />;
const CircleCustomSizeExample = () => <BpkCircleSkeleton size={{width: 5, height: 5}} ariaLabel='loading' />;


const HeadlineSmallSizeExample = () => <BpkHeadlineSkeleton size={SIZE_TYPES.small} ariaLabel='loading' />
const HeadlineDefaultSizeExample = () => <BpkHeadlineSkeleton size={SIZE_TYPES.default} ariaLabel='loading' />
const HeadlineLargeSizeExample = () => <BpkHeadlineSkeleton size={SIZE_TYPES.large} ariaLabel='loading' />
const HeadlineCustomSizeExample = () => <BpkHeadlineSkeleton size={{width: 18, height: 1.5}} ariaLabel='loading' />

/* eslint-enable backpack/use-tokens */
export {
  BaseSkeletonExample,
  ImageDefaultSizeWithDefaultStyleExample,
  ImageDefaultSizeWithRoundedStyleExample,
  ImageCustomNumberSizeWithDefaultStyleExample,
  ImageCustomStringSizeWithRoundedStyleExample,
  BodyTextSmallSizeExample,
  BodyTextDefaultSizeExample,
  BodyTextLargeSizeExample,
  BodyTextCustomSizeExample,
  CircleSmallSizeExample,
  CircleDefaultSizeExample,
  CircleCustomSizeExample,
  HeadlineSmallSizeExample,
  HeadlineDefaultSizeExample,
  HeadlineLargeSizeExample,
  HeadlineCustomSizeExample,
};
