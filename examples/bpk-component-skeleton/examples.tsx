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

import BpkSkeleton, {
  SKELETON_TYPES,
  SIZE_TYPES, 
  IMAGE_SKELETON_STYLE 
} from '../../packages/bpk-component-skeleton';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const ImageDefaultSizeWithDefaultStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} ariaLabel='loading' />
const ImageDefaultSizeWithRoundedStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />

const BodyTextSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.small} ariaLabel='loading' />
const BodyTextDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.default} ariaLabel='loading' />
const BodyTextLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.large} ariaLabel='loading' />

const CircleSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} size={SIZE_TYPES.small} ariaLabel='loading'/>;
const CircleDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} ariaLabel='loading' />;

const HeadlineSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.small} ariaLabel='loading' />
const HeadlineDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.default} ariaLabel='loading' />
const HeadlineLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.large} ariaLabel='loading' />

const ImageSkeletonExample = () => 
  <div className={getClassName('bpk-image-skeleton-layout')}>
    <ImageDefaultSizeWithRoundedStyleExample />
    <ImageDefaultSizeWithDefaultStyleExample />
  </div>

const BodyTextSkeletonExample = () => 
  <div className={getClassName('bpk-body-text-skeleton-layout')}>
    <BodyTextDefaultSizeExample />
    <BodyTextLargeSizeExample />
    <BodyTextSmallSizeExample />
  </div>

const CircleSkeletonExample = () => 
  <div className={getClassName('bpk-circle-skeleton-layout')}>
    <CircleSmallSizeExample />
    <CircleDefaultSizeExample />
  </div>

const HeadlineSkeletonExample = () => 
  <div className={getClassName('bpk-headline-skeleton-layout')}>
    <HeadlineSmallSizeExample />
    <HeadlineDefaultSizeExample />
    <HeadlineLargeSizeExample />
  </div>

const CombinedComponentExample = () => 
  <div className={getClassName('bpk-combined-skeleton-layout')}>
    <div>
      <h2>ImageSkeleton</h2>
      <ImageSkeletonExample />
    </div>

    <div>
      <h2>HeadlineSkeleton</h2>
      <HeadlineSkeletonExample />
    </div>

    <div>
      <h2>CircleSkeleton</h2>
      <CircleSkeletonExample />
    </div>

    <div>
      <h2>BodyTextSkeleton</h2>
      <BodyTextSkeletonExample />
    </div>
  </div>

export {
  ImageSkeletonExample,
  BodyTextSkeletonExample,
  CircleSkeletonExample,
  HeadlineSkeletonExample,
  CombinedComponentExample,
};
