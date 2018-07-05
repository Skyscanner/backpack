/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';

import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';
import BpkImage, {
  /* BpkBackgroundImage, */ withLazyLoading,
  withLoadingBehavior,
} from './index';

const image =
  'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingImage = withLoadingBehavior(BpkImage);
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);
// Unused, will be reinstated when BpkBackgroundImage is.
// const FadingLazyLoadedBackgroundImage = withLoadingBehavior(withLazyLoading(BpkBackgroundImage, documentIfExists));

const imageWidth = 612;
const imageHeight = 408;

storiesOf('bpk-component-image', module)
  .add('Default', () => (
    <BpkImage
      altText="image"
      width={612}
      height={408}
      style={{ width: imageWidth, height: imageHeight }}
      src={image}
    />
  ))
  .add('Full Width', () => (
    <BpkImage altText="image" width={612} height={408} src={image} />
  ))
  .add('Using SrcSet', () => (
    <BpkImage
      altText="image"
      width={612}
      height={408}
      src={image}
      srcSet={`${image}?resize=320px:213px&quality=100 320w,
        ${image}?resize=640px:226px&quality=100 640w,
        ${image}?resize=1640px:1427px&quality=100 1640w,
        ${image}?resize=3200px:2133px&quality=100 3200w`}
      // The image will take up all but 318px of the viewport.
      sizes="calc(100vw - 318px)"
    />
  ))
  .add('With Animation', () => (
    <FadingImage
      altText="image"
      width={612}
      height={408}
      style={{ width: imageWidth, height: imageHeight }}
      src={image}
    />
  ))
  .add('With Lazy Loading', () => (
    <LazyLoadedImage
      altText="image"
      width={612}
      height={408}
      style={{ width: imageWidth, height: imageHeight }}
      src={image}
    />
  ))
  .add('With Lazy Loading and Animation', () => (
    <FadingLazyLoadedImage
      altText="image"
      width={612}
      height={408}
      style={{ width: imageWidth, height: imageHeight }}
      src={image}
    />
  ))
  .add('Within a scroll div', () => (
    <BpkMobileScrollContainer>
      <div style={{ display: 'flex' }}>
        <FadingLazyLoadedImage
          altText="image"
          width={612}
          height={408}
          style={{ width: imageWidth, height: imageHeight }}
          src={image}
        />
        <FadingLazyLoadedImage
          altText="image"
          width={612}
          height={408}
          style={{ width: imageWidth, height: imageHeight }}
          src={image}
        />
        <FadingLazyLoadedImage
          altText="image"
          width={612}
          height={408}
          style={{ width: imageWidth, height: imageHeight }}
          src={image}
        />
      </div>
    </BpkMobileScrollContainer>
  ));

// Commented out until BpkBackgroundImage is working.
//
// .add('Background Image', () => (
//   <BpkBackgroundImage
//     style={{
//       width: '816',
//       height: '20rem',
//     }}
//     imageStyle={{
//       width: '100%',
//       height: '100%',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: 'cover',
//       backgroundPosition: '50% 50%',
//     }}
//     src={image}
//   >
//     <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 10 }} >
//       <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
//     </div>
//   </BpkBackgroundImage >
// ))
// .add('Background Image with Lazy Loading and Animation', () => (
//   <FadingLazyLoadedBackgroundImage
//     style={{
//       width: '816',
//       height: '20rem',
//     }}
//     imageStyle={{
//       width: '100%',
//       height: '100%',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: 'cover',
//       backgroundPosition: '50% 50%',
//     }}
//     src={image}
//   >
//     <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 10 }} >
//       <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
//     </div>
//   </FadingLazyLoadedBackgroundImage >
// ))
