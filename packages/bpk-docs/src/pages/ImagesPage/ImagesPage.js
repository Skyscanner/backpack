/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import BpkImage, { BpkBackgroundImage, withLazyLoading, withLoadingBehavior } from 'bpk-component-image';
import { BpkCode } from 'bpk-component-code';
import BpkText from 'bpk-component-text';

import imagesReadme from 'bpk-component-image/readme.md';
import * as BREAKPOINTS from 'bpk-tokens/tokens/breakpoints.es6';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingImage = withLoadingBehavior(BpkImage);
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const FadingLazyLoadedBackgroundImage = withLoadingBehavior(withLazyLoading(BpkBackgroundImage, documentIfExists));

const image1 = 'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg';
const image2 = 'https://content.skyscnr.com/8bd0d1b67b1bda63e5567a4c402402f2/iceland.jpg';
const image3 = 'https://content.skyscnr.com/200946ddb82b7c026e6e186a7037b1f8/machu-picchu.jpg';
const image4 = 'https://content.skyscnr.com/8a8ac17b591b61e6fe5d8f63414561cd/amsterdam-the-netherlands.jpg';
const image5 = 'https://content.skyscnr.com/6c8f0e633bde70798a9d6f0a26cb6016/andalsnes-norway.jpg';
const image6 = 'https://content.skyscnr.com/46382d528f3f7c8d84628f4f73d03ea9/skogafoss-iceland.jpg';
const image7 = 'https://content.skyscnr.com/9e31082c518f0bf15e48e0ab54cb652a/iceland.jpg';


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
        // then the image will be 765px wide. If the viewport
        // is wider than the tablet-breakpoint it will be 292px
        // narrower than the viewport.
        // Otherwise, it will take up all but 72px.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 765px,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 292px),
          calc(100vw - 72px)`}
      />,
    ],
  },
  {
    id: 'noFullWidth',
    title: 'Without full width',
    examples: [
      <BpkImage
        altText="Waterfall"
        width={612}
        height={408}
        fullWidth={false}
        src={image2}
        srcSet={`${image2}?resize=320px:213px&quality=100 320w,
          ${image2}?resize=640px:226px&quality=100 640w,
          ${image2}?resize=1640px:1427px&quality=100 1640w,
          ${image2}?resize=3200px:2133px&quality=100 3200w`}
        // As the image has a max-width of 612px, if the viewport
        // is wider than 688px the image will be 765px wide.
        // Otherwise, it will take up all but 72px.
        sizes={`(min-width: 688px) 612px,
          calc(100vw - 72px)`}
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
        // then the image will be 765px wide. If the viewport
        // is wider than the tablet-breakpoint it will be 292px
        // narrower than the viewport.
        // Otherwise, it will take up all but 72px.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 765px,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 292px),
          calc(100vw - 72px)`}
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
        // then the image will be 765px wide. If the viewport
        // is wider than the tablet-breakpoint it will be 292px
        // narrower than the viewport.
        // Otherwise, it will take up all but 72px.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 765px,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 292px),
          calc(100vw - 72px)`}
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
        // then the image will be 765px wide. If the viewport
        // is wider than the tablet-breakpoint it will be 292px
        // narrower than the viewport.
        // Otherwise, it will take up all but 72px.
        sizes={`(min-width: ${BREAKPOINTS.breakpointDesktop}) 765px,
          (min-width: ${BREAKPOINTS.breakpointTablet}) calc(100vw - 292px),
          calc(100vw - 72px)`}
      />,
    ],
  },
  {
    id: 'backgroundImage',
    title: 'Background Image',
    examples: [
      <BpkBackgroundImage
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src={image6}
      >
        <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} >
          <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
          <BpkCode>consectetuer adipiscing elit</BpkCode>
        </div>
      </BpkBackgroundImage >,
    ],
  },
  {
    id: 'backgroundImageWithLazyLoadingAndAnimation',
    title: 'Background Image with lazy loading and animation',
    examples: [
      <FadingLazyLoadedBackgroundImage
        style={{
          width: '100%',
          height: '20rem',
        }}
        imageStyle={{
          width: '100%',
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
        src={image7}
      >
        <div style={{ opacity: 0.7, marginLeft: 35, paddingTop: 25 }} >
          <BpkText tagName="h2" textStyle="lg" >Lorem ipsum dolor sit amet</BpkText>
          <BpkCode>consectetuer adipiscing elit</BpkCode>
        </div>
      </FadingLazyLoadedBackgroundImage >,
    ],
  },
];


const ImagesPage = () => <DocsPageBuilder
  title="Images"
  blurb={[
    <Paragraph>
      The <BpkCode>BpkImage</BpkCode> and <BpkCode>BpkBackgroundImage</BpkCode> components can be used to display a
      given image. <BpkCode>BpkImage</BpkCode> will place an <BpkCode>img</BpkCode> tag in the DOM, whilst
      <BpkCode>BpkBackgroundImage</BpkCode> will place a <BpkCode>div</BpkCode> tag in the DOM.
    </Paragraph>,
    <Paragraph>
      Images will only be loaded when the inView prop is set to true. Using the <BpkCode>withLazyLoading</BpkCode> HOC
      will ensure that this only happens once the image is in view, saving user`s data and providing a smoother
      experience. The <BpkCode>withLoadingBehavior</BpkCode> HOC will allow a spinner to be shown until
      the image gently fades in on load.
    </Paragraph>,
    <Paragraph>
      By default, images will have a <BpkCode>width 100%</BpkCode>, but this can be prevented by setting
      <BpkCode>fullWidth</BpkCode> false.
    </Paragraph>,
    <Paragraph>
      The <BpkCode>BpkImage</BpkCode> component supports use of image <BpkCode>srcset</BpkCode> which allow
      different size images to be loaded by the browser according to the viewport width.
    </Paragraph>,
  ]}
  components={components}
  readme={imagesReadme}
/>;

export default ImagesPage;
