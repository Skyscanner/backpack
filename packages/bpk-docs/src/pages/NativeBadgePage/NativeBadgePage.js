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
import iosScreenshotDockedStart from 'react-native-bpk-component-badge/screenshots/ios/docked-start.png';
import iosScreenshotDockedEnd from 'react-native-bpk-component-badge/screenshots/ios/docked-end.png';
import androidScreenshotDefault from 'react-native-bpk-component-badge/screenshots/android/default.png';
import androidScreenshotDockedStart from 'react-native-bpk-component-badge/screenshots/android/docked-start.png';
import androidScreenshotDockedEnd from 'react-native-bpk-component-badge/screenshots/android/docked-end.png';

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

const isNeo = process.env.BPK_NEO;

const NativeBadgePage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Badges"
    blurb={
      isNeo
        ? []
        : [
            <Paragraph>
              Badges are labels which hold small amounts of information. Badges
              are most often used as counters, such as an indication of unread
              notifications.
            </Paragraph>,
          ]
    }
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeBadgePage;
