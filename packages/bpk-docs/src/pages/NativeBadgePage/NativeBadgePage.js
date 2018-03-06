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
import readme from 'react-native-bpk-component-badge/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-badge/screenshots/ios/default.png';
import iosScreenshotDockedLeft from 'react-native-bpk-component-badge/screenshots/ios/docked-left.png';
import iosScreenshotDockedRight from 'react-native-bpk-component-badge/screenshots/ios/docked-right.png';
import androidScreenshotDefault from 'react-native-bpk-component-badge/screenshots/android/default.png';
import androidScreenshotDockedLeft from 'react-native-bpk-component-badge/screenshots/android/docked-left.png';
import androidScreenshotDockedRight from 'react-native-bpk-component-badge/screenshots/android/docked-right.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

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
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Badge Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'docked-left',
    title: 'Docked Left',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDockedLeft}`,
        altText: 'iOS Docked Left Badge Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDockedLeft}`,
        altText: 'Android Docked Left Badge Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'docked-right',
    title: 'Docked Right',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDockedRight}`,
        altText: 'iOS Docked Right Badge Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDockedRight}`,
        altText: 'Android Docked Right Badge Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeTextPage = () => (
  <DocsPageBuilder
    title="Badges"
    blurb={[
      <Paragraph>
        Badges are labels which hold small amounts of information. Badges are
        most often used as counters, such as an indication of unread
        notifications.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu
  />
);

export default NativeTextPage;
