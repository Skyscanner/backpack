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
import readme from 'react-native-bpk-component-alert/readme.md';
import { BpkCode } from 'bpk-component-code';

import iosScreenshotDefault from 'react-native-bpk-component-alert/screenshots/ios/default.png';
import iosCancelable from 'react-native-bpk-component-alert/screenshots/ios/cancelable.png';
import iosThreeButton from 'react-native-bpk-component-alert/screenshots/ios/three-button.png';
import androidScreenshotDefault from 'react-native-bpk-component-alert/screenshots/android/default.png';
import androidCancelable from 'react-native-bpk-component-alert/screenshots/android/cancelable.png';
import androidThreeButton from 'react-native-bpk-component-alert/screenshots/android/three-button.png';

import IntroBlurb from './../../components/neo/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import Paragraph from './../../components/Paragraph';

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
        altText: 'iOS Default Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'cancelable',
    title: 'Cancellable',
    blurb: [
      <Paragraph>
        Android alerts can optionally be marked as <BpkCode>cancelable</BpkCode>.
        Clicking outside the bounds of the alert will dismiss it without a
        callback.
      </Paragraph>,
    ],
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosCancelable}`,
        altText: 'iOS Cancelable Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidCancelable}`,
        altText: 'Android Cancelable Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'three-button',
    title: 'Three Buttons',
    blurb: [
      <Paragraph>
        iOS alerts can accommodate any number of buttons. Each button can
        optionally specify a style, which is one of &apos;default&apos;,
        &apos;cancel&apos; or &apos;destructive&apos;.
      </Paragraph>,
    ],
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosThreeButton}`,
        altText: 'iOS Three button Alert Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidThreeButton}`,
        altText: 'Android Three button Alert Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AlertSubPage = () => (
  <DocsPageBuilder
    title="Alert"
    components={components}
    readme={readme}
    wrapped
  />
);

const AlertPage = () => (
  <DocsPageWrapper
    title="Alert"
    blurb={[
      <IntroBlurb>
        Alerts are used to provide the user with a choice of actions. On Android
        the button colours can be changed by modifying the
        &apos;colorAccent&apos; property of the theme.
      </IntroBlurb>,
    ]}
    nativeSubpage={<AlertSubPage />}
  />
);

export default AlertPage;
