/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/README.md';
import iosScreenshot from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/ios/default.png';
import androidScreenshot from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/android/default.png';
import iosScreenshotEmphasized from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/ios/emphasize.png';
import androidScreenshotEmphasized from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/android/emphasize.png';
import iosScreenshotHeavy from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/ios/heavy.png';
import androidScreenshotHeavy from '../../../../../backpack-react-native/packages/react-native-bpk-component-text/screenshots/android/heavy.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

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
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android Default Text Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'emphasized',
    title: 'Emphasized',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotEmphasized}`,
        altText: 'iOS Emphasized Text Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotEmphasized}`,
        altText: 'Android Emphasized Text Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'heavy',
    title: 'Heavy',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotHeavy}`,
        altText: 'iOS Heavy Text Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotHeavy}`,
        altText: 'Android Heavy Text Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeTextPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Text"
    components={components}
    readme={readme}
    {...rest}
  />
);

export default NativeTextPage;
