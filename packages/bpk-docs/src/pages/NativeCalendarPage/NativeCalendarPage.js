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

import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-calendar/README.md';
import iosScreenshotSingle from '../../../../../backpack-react-native/packages/react-native-bpk-component-calendar/screenshots/ios/single.png';
import iosScreenshotMultiple from '../../../../../backpack-react-native/packages/react-native-bpk-component-calendar/screenshots/ios/multiple.png';
import iosScreenshotRange from '../../../../../backpack-react-native/packages/react-native-bpk-component-calendar/screenshots/ios/range.png';
import androidScreenshotRange from '../../../../../backpack-react-native/packages/react-native-bpk-component-calendar/screenshots/android/range.png';
import androidEmpty from '../../static/android_empty.svg';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'single',
    title: 'Single date',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSingle}`,
        altText: 'iOS Calendar Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidEmpty}`,
        altText: 'Android Calendar Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'multiple',
    title: 'Multiple dates',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotMultiple}`,
        altText: 'iOS Calendar Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidEmpty}`,
        altText: 'Android Calendar Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'range',
    title: 'Date range',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotRange}`,
        altText: 'iOS Calendar Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotRange}`,
        altText: 'Android Calendar Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeCalendarPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Calendar"
    blurb="The Backpack RN calendar bridges our native calendar offerings for Android and iOS for use in RN."
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeCalendarPage;
