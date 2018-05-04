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
import BpkLink from 'bpk-component-link';
import readme from 'react-native-bpk-component-text/readme.md';
import iosScreenshot from 'react-native-bpk-component-text/screenshots/ios/text-styles.png';
import androidScreenshot from 'react-native-bpk-component-text/screenshots/android/text-styles.png';
import iosScreenshotBold from 'react-native-bpk-component-text/screenshots/ios/text-bold.png';
import androidScreenshotBold from 'react-native-bpk-component-text/screenshots/android/text-bold.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const reactNativeUrl = 'https://facebook.github.io/react-native/docs/text.html';

const components = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshot}`,
        altText: 'iOS Default Text Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android Default Text Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'emphasize',
    title: 'Emphasize',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotBold}`,
        altText: 'iOS Emphasized Text Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotBold}`,
        altText: 'Android Emphasized Text Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeTextPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Text"
    blurb={[
      <Paragraph>
        The Backpack text component encapsulates six different text styles
        tailored specifically for both iOS and Android. It&#39;s a wrapper
        around the React Native{' '}
        <BpkLink href={reactNativeUrl}>Text component</BpkLink>, therefore it
        supports all the same behaviours and properties.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    {...rest}
  />
);

export default NativeTextPage;
