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
import readme from 'react-native-bpk-component-image/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-image/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-image/screenshots/android/default.png';

import iosScreenshotNoBorderRadius from 'react-native-bpk-component-image/screenshots/ios/no-border-radius.png';
import androidScreenshotNoBorderRadius from 'react-native-bpk-component-image/screenshots/android/no-border-radius.png';

import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: '',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default image Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default image Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'no-border-radius',
    title: 'Without rounded-corners',
    blurb: '',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotNoBorderRadius}`,
        altText: 'iOS image Component without rounded corners',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotNoBorderRadius}`,
        altText: 'Android image Component without rounded corners',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeImagesPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Images"
    components={components}
    readme={readme}
    {...rest}
  />
);

export default NativeImagesPage;
