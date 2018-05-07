/*
 * Backpack - Skyscanner's Design Systrem
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
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import imagesReadme from 'bpk-component-image/readme.md';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingImage = withLoadingBehavior(BpkImage);
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const image1 =
  'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';
const image2 =
  'https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg';
const image3 =
  'https://content.skyscnr.com/200946ddb82b7c026e6e186a7037b1f8/machu-picchu.jpg';
const image4 =
  'https://content.skyscnr.com/8a8ac17b591b61e6fe5d8f63414561cd/amsterdam-the-netherlands.jpg';
const image5 =
  'https://content.skyscnr.com/6c8f0e633bde70798a9d6f0a26cb6016/andalsnes-norway.jpg';

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkImage
        altText="Lake"
        width={816}
        height={544}
        src={image1}
        srcSet={`${image1}?resize=320px:213px&quality=100 320w,
          ${image1}?resize=640px:226px&quality=100 640w,
          ${image1}?resize=1640px:1427px&quality=100 1640w,
          ${image1}?resize=3200px:2133px&quality=100 3200w`}
        // If the viewport is wider than the desktop-breakpoint,
        // then the image will be 48rem wide. If the viewport
        // is wider than the tablet-breakpoint it will be 18rem
        // narrower than the viewport.
        // Otherwise, it will take up all but 4.5rem.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
          calc(100vw - 4.5rem)`}
      />,
    ],
  },
  {
    id: 'notFullWidth',
    title: 'Not full width',
    examples: [
      <BpkImage
        altText="Waterfall"
        width={612}
        height={408}
        style={{ maxWidth: 512 }}
        src={image2}
        srcSet={`${image2}?resize=320px:213px&quality=100 320w,
          ${image2}?resize=640px:226px&quality=100 640w,
          ${image2}?resize=1640px:1427px&quality=100 1640w,
          ${image2}?resize=3200px:2133px&quality=100 3200w`}
        // As the image has a max-width of 32rem, if the viewport
        // is wider than 850w the image will be 32rem wide.
        // Otherwise, it will take up all but 4.5rem.
        sizes="(min-width: 850w) 32rem,
          calc(100vw - 4.5rem)"
      />,
    ],
  },
  {
    id: 'withAnimation',
    title: 'With animated loading spinner and animation',
    examples: [
      <FadingImage
        altText="Waterfall"
        width={816}
        height={544}
        src={image3}
        srcSet={`${image3}?resize=320px:213px&quality=100 320w,
          ${image3}?resize=640px:226px&quality=100 640w,
          ${image3}?resize=1640px:1427px&quality=100 1640w,
          ${image3}?resize=3200px:2133px&quality=100 3200w`}
        // If the viewport is wider than the desktop-breakpoint,
        // then the image will be 48rem wide. If the viewport
        // is wider than the tablet-breakpoint it will be 18rem
        // narrower than the viewport.
        // Otherwise, it will take up all but 4.5rem.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
          calc(100vw - 4.5rem)`}
      />,
    ],
  },
  {
    id: 'withLazyLoading',
    title: 'Use with Lazy Loading',
    examples: [
      <LazyLoadedImage
        altText="Mountain"
        width={816}
        height={544}
        src={image4}
        srcSet={`${image4}?resize=320px:213px&quality=100 320w,
          ${image4}?resize=640px:226px&quality=100 640w,
          ${image4}?resize=1640px:1427px&quality=100 1640w,
          ${image4}?resize=3200px:2133px&quality=100 3200w`}
        // If the viewport is wider than the desktop-breakpoint,
        // then the image will be 48rem wide. If the viewport
        // is wider than the tablet-breakpoint it will be 18rem
        // narrower than the viewport.
        // Otherwise, it will take up all but 4.5rem.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
          calc(100vw - 4.5rem)`}
      />,
    ],
  },
  {
    id: 'withLazyLoadingAndAnimation',
    title: 'Use with Lazy Loading and animation',
    examples: [
      <FadingLazyLoadedImage
        altText="Shop"
        width={816}
        height={544}
        src={image5}
        srcSet={`${image5}?resize=320px:213px&quality=100 320w,
          ${image5}?resize=640px:226px&quality=100 640w,
          ${image5}?resize=1640px:1427px&quality=100 1640w,
          ${image5}?resize=3200px:2133px&quality=100 3200w`}
        // If the viewport is wider than the desktop-breakpoint,
        // then the image will be 48rem wide. If the viewport
        // is wider than the tablet-breakpoint it will be 18rem
        // narrower than the viewport.
        // Otherwise, it will take up all but 4.5rem.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 48rem,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 18rem),
          calc(100vw - 4.5rem)`}
      />,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [<Paragraph>A component for including images.</Paragraph>];

const ImagesPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Images"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={imagesReadme}
    {...rest}
  />
);

const NeoImagePage = () => (
  <DocsPageWrapper
    title="Image"
    blurb={blurb}
    webSubpage={<ImagesPage wrapped />}
  />
);

export default (isNeo ? NeoImagePage : ImagesPage);
