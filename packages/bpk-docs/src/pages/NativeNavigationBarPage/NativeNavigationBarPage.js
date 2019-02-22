/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/README.md';
import iosScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/ios/default.png';
import androidScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/android/default.png';
import iosScreenshotSubtitleView from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/ios/subtitle-view.png';
import androidScreenshotSubtitleView from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/android/subtitle-view.png';
import iosScreenshotModal from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/ios/modal.png';
import androidScreenshotModal from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/android/modal.png';
import iosScreenshotPrimaryTextButtons from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/ios/primary-text-buttons.png';
import iosScreenshotTitleIcon from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/ios/title-icon.png';
import androidScreenshotTitleIcon from '../../../../../backpack-react-native/packages/react-native-bpk-component-navigation-bar/screenshots/android/title-icon.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb:
      'Navigation bars mirror the style of the OS and the Skyscanner app. The most common configuration uses a back button on the leading side for navigation to previous pages.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default Navigation Bar',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Navigation Bar',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'modal',
    title: 'Modal',
    blurb: 'Modal style navigation bars that mirror the OS are also possible.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotModal}`,
        altText: 'iOS Modal Navigation Bar',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotModal}`,
        altText: 'Android Modal Navigation Bar',
        subText: '(Nexus 5 Emulator)',
      },
    ],
  },
  {
    id: 'primary-text-buttons',
    title: 'Primary text buttons',
    blurb: 'On iOS, text buttons can have a primary colour.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotPrimaryTextButtons}`,
        altText: 'iOS Navigation Bar with primary text buttons',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'subtitle-view',
    title: 'Subtitle view',
    blurb:
      'Optionally a subtitle view can be rendered below the main bar content.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSubtitleView}`,
        altText: 'iOS Subtitle  Navigation Bar',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotSubtitleView}`,
        altText: 'Android Subtitle Navigation Bar',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'title-icon',
    title: 'Icon',
    blurb: 'Optionally an icon can be rendered next to the title.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotTitleIcon}`,
        altText: 'iOS Icon Navigation Bar',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotTitleIcon}`,
        altText: 'Android Icon Navigation Bar',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeNavigationBarPage = (props: Object) => (
  <DocsPageBuilder
    title="Navigation bar"
    components={components}
    readme={readme}
    showMenu
    {...props}
  />
);

export default NativeNavigationBarPage;
