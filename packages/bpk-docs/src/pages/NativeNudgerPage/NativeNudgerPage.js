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
import readme from 'react-native-bpk-component-nudger/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-nudger/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-nudger/screenshots/android/default.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb:
      'Nudgers come with decrease and increase buttons on either side of the selected value. A minimum and maximum value need to be provided.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Nudger Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Nudger Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    Nudgers allow users to quickly specify a value within a given range.
  </Paragraph>,
];

const NativeNudgerPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Nudgers"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeNudgerPage;
