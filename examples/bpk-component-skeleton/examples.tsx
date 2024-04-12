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

const ImageDefaultSizeWithDefaultStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} ariaLabel='loading' />
const ImageDefaultSizeWithRoundedStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />
const ImageCustomStringSizeWithRoundedStyleExample = () => <BpkSkeleton type={SKELETON_TYPES.image} size={{width: '7rem', height: '7rem'}} ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />

const BodyTextSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.small} ariaLabel='loading' />
const BodyTextDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.default} ariaLabel='loading' />
const BodyTextLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.large} ariaLabel='loading' />
const BodyTextCustomSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.bodyText} size={{width: '16rem', height: '0.5rem'}} ariaLabel='loading' />

const CircleSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} size={SIZE_TYPES.small} ariaLabel='loading'/>;
const CircleDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} ariaLabel='loading' />;
const CircleCustomSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.circle} size={{width: '5rem', height: '5rem'}} ariaLabel='loading' />;

const HeadlineSmallSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.small} ariaLabel='loading' />
const HeadlineDefaultSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.default} ariaLabel='loading' />
const HeadlineLargeSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={SIZE_TYPES.large} ariaLabel='loading' />
const HeadlineCustomSizeExample = () => <BpkSkeleton type={SKELETON_TYPES.headline} size={{width: '5rem', height: '2.5rem'}} ariaLabel='loading' />

const ImageSkeletonExample = () => 
  <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "30rem"}}>
    <ImageDefaultSizeWithDefaultStyleExample />
    <ImageDefaultSizeWithRoundedStyleExample />
    <ImageCustomStringSizeWithRoundedStyleExample />
  </div>

const BodyTextSkeletonExample = () => 
  <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "30rem"}}>
    <BodyTextSmallSizeExample /><br />
    <BodyTextDefaultSizeExample /><br />
    <BodyTextLargeSizeExample /><br />
    <BodyTextCustomSizeExample /><br />
  </div>

const CircleSkeletonExample = () => 
  <div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "30rem"}}>
    <CircleSmallSizeExample /><br />
    <CircleDefaultSizeExample /><br />
    <CircleCustomSizeExample /><br />
  </div>

const HeadlineSkeletonExample = () => 
<div style={{display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "38rem"}}>
    <HeadlineSmallSizeExample /><br />
    <HeadlineDefaultSizeExample /><br />
    <HeadlineLargeSizeExample /><br />
    <HeadlineCustomSizeExample /><br />
  </div>

const CombinedComponentExample = () => 
  <>
    <h2>ImageSkeleton</h2>
    <ImageSkeletonExample />

    <h2>BodyTextSkeleton</h2>
    <BodyTextSkeletonExample />

    <h2>CircleSkeleton</h2>
    <CircleSkeletonExample />

    <h2>HeadlineSkeleton</h2>
    <HeadlineSkeletonExample />
  </>

export {
  ImageSkeletonExample,
  BodyTextSkeletonExample,
  CircleSkeletonExample,
  HeadlineSkeletonExample,
  CombinedComponentExample,
};
