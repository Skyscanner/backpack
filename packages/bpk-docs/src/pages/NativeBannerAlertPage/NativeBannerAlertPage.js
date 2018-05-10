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
import readme from 'react-native-bpk-component-banner-alert/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-banner-alert/screenshots/ios/default.png';
import iosScreenshotDismissable from 'react-native-bpk-component-banner-alert/screenshots/ios/dismissable.png';
import iosScreenshotExpandable from 'react-native-bpk-component-banner-alert/screenshots/ios/expandable.png';

import androidScreenshotDefault from 'react-native-bpk-component-banner-alert/screenshots/android/default.png';
import androidScreenshotDismissable from 'react-native-bpk-component-banner-alert/screenshots/android/dismissable.png';
import androidScreenshotExpandable from 'react-native-bpk-component-banner-alert/screenshots/android/expandable.png';

import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/neo/IntroBlurb';
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
        altText: 'iOS Default Banner Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Banner Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'dismissable',
    title: 'Dismissable',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDismissable}`,
        altText: 'iOS Dismissable Banner Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDismissable}`,
        altText: 'Android Dismissable Banner Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'expandable',
    title: 'Expandable',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotExpandable}`,
        altText: 'iOS Expandable Banner Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotExpandable}`,
        altText: 'Android Expandable Banner Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const NativeBannerAlertPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Banner Alerts"
    blurb={
      isNeo
        ? []
        : [
            <IntroBlurb>
              Banner alerts provide feedback to the user when an action has been
              performed.
            </IntroBlurb>,
            <Paragraph>
              Banner alerts come in four styles to indicate success, warning or
              error, or some neutral information. They can be configured to be
              dissmissible, or to display further information to the user in the
              form of an expandable panel.
            </Paragraph>,
          ]
    }
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeBannerAlertPage;
