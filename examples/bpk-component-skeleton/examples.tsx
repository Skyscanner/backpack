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
  IMAGE_SKELETON_STYLE,
  BACKGROUND_STYLE 
} from '../../packages/bpk-component-skeleton';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const ImageDefaultSizeWithDefaultStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} />
const ImageDefaultSizeWithRoundedStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} style={IMAGE_SKELETON_STYLE.rounded} />

const BodyTextSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.small} />
const BodyTextDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.default} />
const BodyTextLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.large} />

const CircleSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} size={SIZE_TYPES.small} />;
const CircleDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} />;

const HeadlineSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.small} />
const HeadlineDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.default} />
const HeadlineLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.large} />

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
  <div>
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

const BackgroundStyleDefaultExample = () => 
  <div className={getClassName('bpk-background-style-default')}>
    <BpkSkeleton type={SKELETON_TYPES.image} backgroundStyle={BACKGROUND_STYLE.default} />
  </div>

const BackgroundStyleOnContrastExample = () => 
  <div className={getClassName('bpk-background-style-on-contrast')}>
    <BpkSkeleton type={SKELETON_TYPES.image} backgroundStyle={BACKGROUND_STYLE.onContrast} />
  </div>

export {
  ImageSkeletonExample,
  BodyTextSkeletonExample,
  CircleSkeletonExample,
  HeadlineSkeletonExample,
  CombinedComponentExample,
  BackgroundStyleDefaultExample,
  BackgroundStyleOnContrastExample,
};
