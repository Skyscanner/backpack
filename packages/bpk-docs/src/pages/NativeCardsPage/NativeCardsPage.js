/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import readme from 'react-native-bpk-component-card/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-card/screenshots/ios/default.png';
import iosScreenshotWithoutPadding from 'react-native-bpk-component-card/screenshots/ios/without-padding.png';
import androidScreenshotDefault from 'react-native-bpk-component-card/screenshots/android/default.png';
import androidScreenshotWithoutPadding from 'react-native-bpk-component-card/screenshots/android/without-padding.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'The default card comes with padding already applied to get you up and running quickly.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Card Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Card Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'without-padding',
    title: 'Without Padding',
    blurb: 'For full flexibility you can opt to remove the default padding e.g. to display full-bleed images.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithoutPadding}`,
        altText: 'iOS Card Without Padding Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithoutPadding}`,
        altText: 'Android Card Without Padding Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeCardsPage = () => <DocsPageBuilder
  title="Cards"
  blurb={[
    <Paragraph>
      Cards are used to group related items within the UI.
      They allow complex datasets to be broken down into individual, distinct areas for easy consumption.
      Cards are used as a signifier to give affordance to a clickable set of elements.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
  showMenu
/>;

export default NativeCardsPage;
