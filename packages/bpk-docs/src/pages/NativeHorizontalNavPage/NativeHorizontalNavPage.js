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
import BpkLink from 'bpk-component-link';
import readme from 'react-native-bpk-component-horizontal-nav/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-horizontal-nav/screenshots/ios/default.png';
import iosScreenshotSmall from 'react-native-bpk-component-horizontal-nav/screenshots/ios/small.png';
import iosScreenshotSpaceAround from 'react-native-bpk-component-horizontal-nav/screenshots/ios/space-around.png';
import androidScreenshotDefault from 'react-native-bpk-component-horizontal-nav/screenshots/android/default.png';
import androidScreenshotSmall from 'react-native-bpk-component-horizontal-nav/screenshots/android/small.png';
import androidScreenshotSpaceAround from 'react-native-bpk-component-horizontal-nav/screenshots/android/space-around.png'; // eslint-disable-line max-len

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import { THEMING } from './../../constants/routes';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'By default, navigation items are left-aligned.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Horizontal Navigation Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Horizontal Navigation Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'small',
    title: 'Small',
    blurb: 'Like the default, only a little bit smaller.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSmall}`,
        altText: 'iOS Default Horizontal Navigation Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotSmall}`,
        altText: 'Android Default Horizontal Navigation Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'space-around',
    title: 'Space Around',
    blurb:
      'Navigation items can be configured to occupy the full width of their container.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSpaceAround}`,
        altText: 'iOS Small Horizontal Navigation Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotSpaceAround}`,
        altText: 'Android Small Horizontal Navigation Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeHorizontalNavPage = () => (
  <DocsPageBuilder
    title="Horizontal Navigation"
    blurb={[
      <Paragraph>
        A simple navigation component, ideal for representing a section of a
        page that links to other pages or views within the page.
      </Paragraph>,
      <Paragraph>
        It features an indicator line that animates automatically when the
        selected item changes.
      </Paragraph>,
      <Paragraph>
        The selected item can be <BpkLink href={THEMING}>themed</BpkLink>.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu
  />
);

export default NativeHorizontalNavPage;
