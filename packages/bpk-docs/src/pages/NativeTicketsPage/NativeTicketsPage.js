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
import BpkRouterLink from 'bpk-component-router-link';
import readme from 'react-native-bpk-component-ticket/readme.md';
import iosScreenshot from 'react-native-bpk-component-ticket/screenshots/ios/default.png';
import androidScreenshot from 'react-native-bpk-component-ticket/screenshots/android/default.png';
import iosScreenshotVertical from 'react-native-bpk-component-ticket/screenshots/ios/vertical.png';
import androidScreenshotVertical from 'react-native-bpk-component-ticket/screenshots/android/vertical.png';
import iosScreenshotWithoutPadding from 'react-native-bpk-component-ticket/screenshots/ios/without-padding.png';
import androidScreenshotWithoutPadding from 'react-native-bpk-component-ticket/screenshots/android/without-padding.png';
import iosScreenshotFocused from 'react-native-bpk-component-ticket/screenshots/ios/focused.png';
import androidScreenshotFocused from 'react-native-bpk-component-ticket/screenshots/android/focused.png';

import * as ROUTES from './../../constants/routes';
import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'The default ticket positions its stub content to the right of the main content.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshot}`,
        altText: 'iOS Default Ticket Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android Default Ticket Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'vertical',
    title: 'Vertical',
    blurb: 'The stub can be positioned to the bottom as well.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotVertical}`,
        altText: 'iOS Vertical Ticket Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotVertical}`,
        altText: 'Android Vertical Ticket Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'without-padding',
    title: 'Without Padding',
    blurb: 'For full flexibility you can opt to remove the default padding and roll your own.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithoutPadding}`,
        altText: 'iOS Without Padding Ticket Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithoutPadding}`,
        altText: 'Android Without Padding Ticket Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'focused',
    title: 'Focused',
    blurb: 'Cards can be focused to make them appear more prominently.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotFocused}`,
        altText: 'iOS Focused Ticket Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotFocused}`,
        altText: 'Android Focused Ticket Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeTicketsPage = () => (<DocsPageBuilder
  title="Tickets"
  blurb={[
    <Paragraph>
      Tickets combine the look and feel of <BpkRouterLink to={ROUTES.NATIVE_CARDS}>Cards</BpkRouterLink> with an added
      separation line to divide their content into two distinct areas. They can be configured to display both
      horizontally and vertically.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
/>);

export default NativeTicketsPage;
