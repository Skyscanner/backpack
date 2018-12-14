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
import readme from '../../../../../backpack-react-native/packages/react-native-bpk-component-section-list/README.md';

import iosScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-section-list/screenshots/ios/default.png';
import androidScreenshotDefault from '../../../../../backpack-react-native/packages/react-native-bpk-component-section-list/screenshots/android/default.png';
import iosScreenshotWithImages from '../../../../../backpack-react-native/packages/react-native-bpk-component-section-list/screenshots/ios/with-images.png';
import androidScreenshotWithImages from '../../../../../backpack-react-native/packages/react-native-bpk-component-section-list/screenshots/android/with-images.png';

import DocsPageBuilder from '../../components/DocsPageBuilder';

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
        altText: 'iOS Default Section List Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Section List Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-images',
    title: 'With images',
    blurb: 'List items can also contain images.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithImages}`,
        altText: 'iOS Section List Component With Images',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithImages}`,
        altText: 'Android Section List Component With Images',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const NativeSectionListSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Section list"
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeSectionListSubPage;
