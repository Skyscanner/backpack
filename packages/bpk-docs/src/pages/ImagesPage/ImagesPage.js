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

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';
import image4 from './image4.jpg';
import image5 from './image5.jpg';
import image6 from './image6.jpg';
import image7 from './image7.jpg';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingImage = withLoadingBehavior(BpkImage);
const LazyLoadedImage = withLazyLoading(BpkImage, documentIfExists);
const FadingLazyLoadedImage = withLoadingBehavior(withLazyLoading(BpkImage, documentIfExists));
const FadingLazyLoadedBackgroundImage = withLoadingBehavior(withLazyLoading(BpkBackgroundImage, documentIfExists));

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkImage
        altText="Lake"
        width={816}
        height={544}
        src={`/${image1}`}
      />,
    ],
  },
  {
    id: 'noFullWidth',
    title: 'Without full width',
    examples: [
      <BpkImage
        altText="Lake"
        width={612}
        height={408}
        fullWidth={false}
        src={`/${image2}`}
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
        src={`/${image3}`}
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
        src={`/${image4}`}
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
        src={`/${image5}`}
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
        src={`/${image6}`}
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
        src={`/${image7}`}
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
      Images will only be loaded when the inView prop is set to true. Using the <BpkCode>withLazyLoading</BpkCode> HOC
      will ensure that this only happens once the image is in view, saving user`s data and providing a smoother
      experience. The <BpkCode>withLoadingBehavior</BpkCode> HOC will allow a spinner to be shown until
      the image gently fades in on load.
      By default, images will have a <BpkCode>width 100%</BpkCode>, but this can be prevented by setting
      <BpkCode>fullWidth</BpkCode> false.
    </Paragraph>,
  ]}
  components={components}
  readme={imagesReadme}
/>;

export default ImagesPage;
