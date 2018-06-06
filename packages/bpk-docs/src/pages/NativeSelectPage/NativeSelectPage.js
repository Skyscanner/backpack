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
import readme from 'react-native-bpk-component-select/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-select/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-select/screenshots/android/default.png';

import IntroBlurb from './../../components/neo/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

const components = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Select Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Select Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Selects are styled to look like traditional dropdowns, however provide no
    functionality. Instead they act as triggers for elements such as the Picker
    component.
  </IntroBlurb>,
];

const NativeSelectSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Select"
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NativeSelectPage = () => (
  <DocsPageWrapper
    title="Select"
    blurb={blurb}
    nativeSubpage={<NativeSelectSubPage wrapped />}
  />
);

export default NativeSelectPage;
