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
import readme from 'react-native-bpk-component-text-input/readme.md';
import iosScreenshot from 'react-native-bpk-component-text-input/screenshots/ios/text-inputs.png';
import iosScreenshotWithAccessoryView from 'react-native-bpk-component-text-input/screenshots/ios/text-inputs-with-accessory-view.png';
import androidScreenshot from 'react-native-bpk-component-text-input/screenshots/android/text-inputs.png';
import androidScreenshotWithAccessoryView from 'react-native-bpk-component-text-input/screenshots/android/text-inputs-with-accessory-view.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const reactNativeUrl =
  'https://facebook.github.io/react-native/docs/textinput.html';

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
        altText: 'iOS Text Input Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android Text Input Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'text-inputs-with-accessory-view',
    title: 'Text Inputs with Acessory View',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithAccessoryView}`,
        altText: 'iOS Text Input Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithAccessoryView}`,
        altText: 'Android Text Input Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeInputPage = () => (
  <DocsPageBuilder
    title="Text input"
    blurb={[
      <Paragraph>
        The Backpack input is a wrapper around the React Native{' '}
        <BpkLink href={reactNativeUrl}>TextInput component</BpkLink>, therefore
        it supports all the same behaviours and properties. Optionally an
        accessory view can be provided which will be rendered on the leading
        side of the text input. Providing an accessory view changes the
        behaviour of the floating label.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu={false}
  />
);

export default NativeInputPage;
