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
import readme from 'react-native-bpk-component-text-input/readme.md';
import iosScreenshot from 'react-native-bpk-component-text-input/screenshots/ios/text-inputs.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import androidEmpty from './../../static/android_empty.svg';

const reactNativeUrl = 'https://facebook.github.io/react-native/docs/textinput.html';

const components = [
  {
    id: 'text-inputs',
    title: 'Text Inputs',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshot}`,
        altText: 'iOS Default Text Input Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidEmpty}`,
        altText: 'Android Default Text Input Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeInputPage = () => <DocsPageBuilder
  title="Text input"
  blurb={[
    <Paragraph>
      The Backpack input is a wrapper around
      the React Native <BpkLink href={reactNativeUrl}>TextInput component</BpkLink>,
      therefore it supports all the same behaviours and
      properties.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
  showMenu={false}
/>;

export default NativeInputPage;
