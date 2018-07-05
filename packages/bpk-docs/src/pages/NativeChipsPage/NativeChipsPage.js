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
import readme from 'react-native-bpk-component-chip/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-chip/screenshots/ios/BpkChip.png';
import iosScreenshotDismissible from 'react-native-bpk-component-chip/screenshots/ios/BpkDismissibleChip.png';
import androidScreenshotDefault from 'react-native-bpk-component-chip/screenshots/android/BpkChip.png';
import androidScreenshotDismissible from 'react-native-bpk-component-chip/screenshots/android/BpkDismissibleChip.png';

import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'Chips can be pressed to function as on/off toggles.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Chip Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Chip Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'dismissible',
    title: 'Dismissible',
    blurb: 'Dismissible chips have a close button to remove them.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDismissible}`,
        altText: 'iOS Dismissible Chip Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDismissible}`,
        altText: 'Android Dismissible Chip Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeChipsPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Chip"
    components={components}
    readme={readme}
    {...rest}
  />
);

export default NativeChipsPage;
