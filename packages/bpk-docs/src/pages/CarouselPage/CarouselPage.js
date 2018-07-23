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

/* @flow */

import React from 'react';
import readme from 'react-native-bpk-component-carousel/README.md';

import iosScreenshotDefault from 'react-native-bpk-component-carousel/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-carousel/screenshots/android/default.png';

import DocsPageWrapper from '../../components/DocsPageWrapper';
import IntroBlurb from '../../components/IntroBlurb';
import Paragraph from '../../components/Paragraph';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: (
      <Paragraph>
        Whilst this example shows images, any content can be inserted here.
      </Paragraph>
    ),
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS default carousel component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android default carousel component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const CarouselPageNativeSubPage = () => (
  <DocsPageBuilder
    title="Carousel"
    components={components}
    readme={readme}
    wrapped
  />
);

const NativeCarouselPage = () => (
  <DocsPageWrapper
    title="Carousel"
    blurb={[
      <IntroBlurb>
        The carousel component allows a series of content to cycle horizontally.
      </IntroBlurb>,
    ]}
    nativeSubpage={<CarouselPageNativeSubPage />}
  />
);

export default NativeCarouselPage;
