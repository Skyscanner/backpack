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
import BpkLink from 'bpk-component-link';
import readme from 'react-native-bpk-component-spinner/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-spinner/screenshots/ios/default.png';
import iosScreenshotSmall from 'react-native-bpk-component-spinner/screenshots/ios/small.png';
import androidScreenshotDefault from 'react-native-bpk-component-spinner/screenshots/android/default.png';
import androidScreenshotSmall from 'react-native-bpk-component-spinner/screenshots/android/small.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import { THEMING } from './../../constants/routes';

const reactNativeUrl = 'https://facebook.github.io/react-native/docs/activityindicator.html';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: 'By default, spinners come in a large size and are available in three types: primary, dark and light.', // eslint-disable-line max-len
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Spinner Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Spinner Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'small',
    title: 'Small',
    blurb: 'Spinners can also appear in a smaller size in the same types as mentioned above.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSmall}`,
        altText: 'iOS Small Spinner Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotSmall}`,
        altText: 'Android Small Spinner Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeSpinnerPage = () => (<DocsPageBuilder
  title="Spinners"
  blurb={[
    <Paragraph>
      Spinners are used to to indicate that a part of the product is loading or performing a task.
      These are available in two sizes, small and large. It&#39;s a wrapper around the React
      Native <BpkLink href={reactNativeUrl}>ActivityIndicator component</BpkLink>, therefore it supports all the
      same behaviours and properties.
    </Paragraph>,
    <Paragraph>
      Primary spinners can be <BpkLink href={THEMING}>themed</BpkLink>.
    </Paragraph>,
  ]}
  components={components}
  readme={readme}
  showMenu
/>);

export default NativeSpinnerPage;
