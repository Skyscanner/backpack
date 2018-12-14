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
import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/README.md';

import iosScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/ios/default.png';
import iosScreenshotDockedStart from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/ios/docked-start.png';
import iosScreenshotDockedEnd from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/ios/docked-end.png';
import iosScreenshotWithIcon from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/ios/with-icon.png';
import iosScreenshotWithMultipleIcons from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/ios/with-multiple-icons.png';
import androidScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/android/default.png';
import androidScreenshotDockedStart from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/android/docked-start.png';
import androidScreenshotDockedEnd from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/android/docked-end.png';
import androidScreenshotWithIcon from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/android/with-icon.png';
import androidScreenshotWithMultipleIcons from '../../../../../backpack-react-native/packages/react-native-bpk-component-badge/screenshots/android/with-multiple-icons.png';

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
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Badge Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Badge Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-icon',
    title: 'With an icon',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithIcon}`,
        altText: 'iOS Badge Component with a single icon',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithIcon}`,
        altText: 'Android Badge Component with a single icon',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-icons',
    title: 'With multiple icons and an icon separator',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithMultipleIcons}`,
        altText: 'iOS Badge Component with multiple icons',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithMultipleIcons}`,
        altText: 'Android Badge Component with multiple icons',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'docked-start',
    title: 'Docked (start)',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDockedStart}`,
        altText: 'iOS Docked (start) Badge Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDockedStart}`,
        altText: 'Android Docked (start) Badge Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'docked-end',
    title: 'Docked (end)',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDockedEnd}`,
        altText: 'iOS Docked (end) Badge Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDockedEnd}`,
        altText: 'Android Docked (end) Badge Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeBadgePage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Badges"
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeBadgePage;
