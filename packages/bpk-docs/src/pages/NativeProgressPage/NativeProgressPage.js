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
/* @flow */

import React from 'react';
import readme from 'react-native-bpk-component-progress/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-progress/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-progress/screenshots/android/default.png';
import iosScreenshotBar from 'react-native-bpk-component-progress/screenshots/ios/bar.png';
import androidScreenshotBar from 'react-native-bpk-component-progress/screenshots/android/bar.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb:
      'The default progress bar is intended to be used as a stand alone component with margins all around.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Progress Bar (Default)',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Progress Bar (Default)',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'bar',
    title: 'Bar',
    blurb:
      'The bar version of the progress bar has sharp corners and is intended to be connect to other areas of the UI, e.g at the top of the page and occupies the full width of its parent container.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotBar}`,
        altText: 'iOS Progress Bar (Bar)',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotBar}`,
        altText: 'Android Progress Bar (Bar)',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    Progress bars are a great way of providing feedback when a tasking is
    running. Unlike spinners, they give the user a clear idea of how long the
    given task will take.
  </Paragraph>,
];

const NativeProgressPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Progress Bar"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeProgressPage;
