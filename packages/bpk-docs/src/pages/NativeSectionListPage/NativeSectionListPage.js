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
import readme from 'react-native-bpk-component-section-list/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-section-list/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-section-list/screenshots/android/default.png';
import iosScreenshotWithImages from 'react-native-bpk-component-section-list/screenshots/ios/with-images.png';
import androidScreenshotWithImages from 'react-native-bpk-component-section-list/screenshots/android/with-images.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

const REACT_NATIVE_SECTION_LIST_URI =
  'https://facebook.github.io/react-native/docs/sectionlist.html';

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
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Section List Component',
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
        altText: 'iOS Section List Component With Images',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotWithImages}`,
        altText: 'Android Section List Component With Images',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    Section List can be used for rendering sectioned lists. It&#39;s a wrapper
    around React Native&#39;s{' '}
    <BpkLink href={REACT_NATIVE_SECTION_LIST_URI}>
      SectionList component
    </BpkLink>, therefore it supports all the same behaviours and properties.
  </Paragraph>,
];

const NativeSectionListPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Section List"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

const NeoNativeSectionListPage = () => (
  <DocsPageWrapper
    title="Section list"
    blurb={blurb}
    nativeSubpage={<NativeSectionListPage wrapped />}
  />
);

export default (isNeo ? NeoNativeSectionListPage : NativeSectionListPage);
