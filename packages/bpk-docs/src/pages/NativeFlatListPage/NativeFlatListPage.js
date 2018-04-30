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
import readme from 'react-native-bpk-component-flat-list/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-flat-list/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-flat-list/screenshots/android/default.png';
import iosScreenshotWithImages from 'react-native-bpk-component-flat-list/screenshots/ios/with-images.png';
import androidScreenshotWithImages from 'react-native-bpk-component-flat-list/screenshots/android/with-images.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const REACT_NATIVE_FLAT_LIST_URI =
  'https://facebook.github.io/react-native/docs/flatlist.html';

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
        altText: 'iOS Default Flat List Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Flat List Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
  {
    id: 'with-images',
    title: 'With Images',
    blurb: 'List items can also contain images.',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotWithImages}`,
        altText: 'iOS Flat List Component With Images',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithImages}`,
        altText: 'Android Flat List Component With Images',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const NativeFlatListPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Flat List"
    blurb={[
      <Paragraph>
        Flat List can be used for lists. It&#39;s a wrapper around React
        Native&#39;s{' '}
        <BpkLink href={REACT_NATIVE_FLAT_LIST_URI}>FlatList component</BpkLink>,
        therefore it supports all the same behaviours and properties.
      </Paragraph>,
    ]}
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeFlatListPage;
