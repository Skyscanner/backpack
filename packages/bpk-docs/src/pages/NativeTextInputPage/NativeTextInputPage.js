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
import readme from 'react-native-bpk-component-text-input/readme.md';
import iosScreenshot from 'react-native-bpk-component-text-input/screenshots/ios/text-inputs.png';
import iosScreenshotWithAccessoryView from 'react-native-bpk-component-text-input/screenshots/ios/text-inputs-with-accessory-view.png';
import androidScreenshot from 'react-native-bpk-component-text-input/screenshots/android/text-inputs.png';
import androidScreenshotWithAccessoryView from 'react-native-bpk-component-text-input/screenshots/android/text-inputs-with-accessory-view.png';

import IntroBlurb from './../../components/neo/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

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
        altText: 'iOS text input component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android text input component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'text-inputs-with-accessory-view',
    title: 'With acessory view',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithAccessoryView}`,
        altText: 'iOS Text Input Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithAccessoryView}`,
        altText: 'Android Text Input Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Text inputs are used to capture textual information as well as numbers and
    passwords.
  </IntroBlurb>,
];

const NativeInputSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Text input"
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NativeInputPage = () => (
  <DocsPageWrapper
    title="Text input"
    blurb={blurb}
    nativeSubpage={<NativeInputSubPage wrapped />}
  />
);

export default NativeInputPage;
