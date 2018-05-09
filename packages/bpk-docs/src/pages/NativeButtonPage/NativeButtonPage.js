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
import readme from 'react-native-bpk-component-button/readme.md';

import iosScreenshotPrimary from 'react-native-bpk-component-button/screenshots/ios/primary.png';
import iosScreenshotSecondary from 'react-native-bpk-component-button/screenshots/ios/secondary.png';
import iosScreenshotDestructive from 'react-native-bpk-component-button/screenshots/ios/destructive.png';
import iosScreenshotFeatured from 'react-native-bpk-component-button/screenshots/ios/featured.png';
import androidScreenshotPrimary from 'react-native-bpk-component-button/screenshots/android/primary.png';
import androidScreenshotSecondary from 'react-native-bpk-component-button/screenshots/android/secondary.png';
import androidScreenshotDestructive from 'react-native-bpk-component-button/screenshots/android/destructive.png';
import androidScreenshotFeatured from 'react-native-bpk-component-button/screenshots/android/featured.png';

import Paragraph from './../../components/Paragraph';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import { THEMING } from './../../constants/routes';

const reactNativeUrl =
  'https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html';

const components = [
  {
    id: 'primary',
    title: 'Primary',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotPrimary}`,
        altText: 'iOS Primary Button Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotPrimary}`,
        altText: 'Android Primary Button Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotSecondary}`,
        altText: 'iOS Secondary Button Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotSecondary}`,
        altText: 'Android Secondary Button Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotDestructive}`,
        altText: 'iOS Destructive Button Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotDestructive}`,
        altText: 'Android Destructive Button Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshotFeatured}`,
        altText: 'iOS Featured Button Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshotFeatured}`,
        altText: 'Android Featured Button Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const NativeTextPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Buttons"
    blurb={
      isNeo
        ? []
        : [
            <Paragraph>
              The Backpack button component is for all your button pressing
              needs. It&#39;s a wrapper around the React Native{' '}
              <BpkLink href={reactNativeUrl}>
                TouchableWithoutFeedback component
              </BpkLink>, therefore it supports all the same behaviours and
              properties.
            </Paragraph>,
            <Paragraph>
              There are four types of button: primary, secondary, destructive
              and featured. All button types can be large and disabled.
            </Paragraph>,
            <Paragraph>Buttons can be text or icon based.</Paragraph>,
            <Paragraph>
              Primary and secondary buttons can be{' '}
              <BpkLink href={THEMING}>themed</BpkLink>.
            </Paragraph>,
          ]
    }
    components={components}
    readme={readme}
    showMenu
    {...rest}
  />
);

export default NativeTextPage;
