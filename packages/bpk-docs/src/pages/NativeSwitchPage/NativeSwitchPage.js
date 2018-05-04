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
import readme from 'react-native-bpk-component-switch/readme.md';

import iosScreenshotDefault from 'react-native-bpk-component-switch/screenshots/ios/default.png';
import androidScreenshotDefault from 'react-native-bpk-component-switch/screenshots/android/default.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';

import { THEMING } from './../../constants/routes';

const reactNativeUrl =
  'https://facebook.github.io/react-native/docs/switch.html';

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
        altText: 'iOS Default Switch Component',
        subText: '(iPhone 8 Simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDefault}`,
        altText: 'Android Default Switch Component',
        subText: '(Google Pixel Emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <Paragraph>
    Switches allow users to toggle between two states, on or off. These are
    often used as a replacement for radio buttons. This component is a wrapper
    around the React Native{' '}
    <BpkLink href={reactNativeUrl}>Switch component</BpkLink>, therefore it
    supports all the same behaviours and properties.
  </Paragraph>,
  <Paragraph>
    Switches can be <BpkLink href={THEMING}>themed</BpkLink>.
  </Paragraph>,
];

const NativeSwitchPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Switch"
    blurb={isNeo ? null : blurb}
    components={components}
    readme={readme}
    showMenu={false}
    {...rest}
  />
);

const NeoNativeSwitchPage = () => (
  <DocsPageWrapper
    title="Switch"
    blurb={blurb}
    nativeSubpage={<NativeSwitchPage wrapped />}
  />
);

export default (isNeo ? NeoNativeSwitchPage : NativeSwitchPage);
