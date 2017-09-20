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
import BpkLink from 'bpk-component-link';
import readme from 'react-native-bpk-component-text/readme.md';
import iosScreenshot from 'react-native-bpk-component-text/screenshots/ios/text-styles.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import androidEmpty from './../../static/android_empty.svg';

const reactNativeUrl = 'https://facebook.github.io/react-native/docs/text.html';

const components = [
  {
    id: 'text-styles',
    title: 'Text styles',
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
        src: `/${androidEmpty}`,
        altText: 'Android Default Text Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeTextPage = () => <DocsPageBuilder
  title="Text"
  blurb={[
    <Paragraph>
      The Backpack text component encapsulates 6 different text styles tailored specifically for both iOS and (soon to
      be) Android. It&#39;s a wrapper around the React
      Native <BpkLink href={reactNativeUrl}>Text component</BpkLink>, therefore it supports all the same behaviours and
      properties.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
  showMenu={false}
/>;

export default NativeTextPage;
