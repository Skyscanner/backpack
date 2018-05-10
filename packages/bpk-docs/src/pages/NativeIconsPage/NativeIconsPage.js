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
import readme from 'react-native-bpk-component-icon/readme.md';

import BpkLink from 'bpk-component-link';
import iosScreenshotDefault from 'react-native-bpk-component-icon/screenshots/ios/icons.png';
import androidScreenshotDefault from 'react-native-bpk-component-icon/screenshots/android/icons.png';

import Paragraph from './../../components/Paragraph';
import IntroBlurb from './../../components/neo/IntroBlurb';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: '',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDefault}`,
        altText: 'iOS Default icon Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default icon Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <div>
    <IntroBlurb>
      Backpack icons are crafted to display across web and native apps. Their
      clean, solid shapes effortlessly compliment the rest of Backpack.
    </IntroBlurb>,
    <Paragraph>
      View all icons on the{' '}
      <BpkLink href="/components/web/icons">icons page</BpkLink>.
    </Paragraph>
  </div>,
];

const NativeIconsPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Icons"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    {...rest}
  />
);

export default NativeIconsPage;
