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

import React from 'react';

import readme from '../../../../../backpack-android/docs/Card/README.md';
import screenshotDefault from '../../../../../backpack-android/docs/Card/screenshots/default.png';
import screenshotCornerStyleLarge from '../../../../../backpack-android/docs/Card/screenshots/corner-style-large.png';
import screenshotSelected from '../../../../../backpack-android/docs/Card/screenshots/selected.png';
import screenshotWithoutPadding from '../../../../../backpack-android/docs/Card/screenshots/without-padding.png';
import screenshotWithDivider from '../../../../../backpack-android/docs/Card/screenshots/with-divider.png';
import screenshotWithDividerArrangedVertically from '../../../../../backpack-android/docs/Card/screenshots/with-divider-arranged-vertically.png';
import screenshotWithDividerCornerStyleLarge from '../../../../../backpack-android/docs/Card/screenshots/with-divider-and-corner-style-large.png';
import screenshotWithDividerWithoutPadding from '../../../../../backpack-android/docs/Card/screenshots/with-divider-without-padding.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotDefault}`,
        altText: 'Default card component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'selected',
    title: 'Selected',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotSelected}`,
        altText: 'Selected card component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'large-corner-style',
    title: 'Large corner style',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotCornerStyleLarge}`,
        altText: 'Card component with large corner style',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotWithoutPadding}`,
        altText: 'Card component without padding',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-divider',
    title: 'Default',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotWithDivider}`,
        altText: 'Card component with divider',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-divider-arranged-vertically',
    title: 'With divider arranged vertically',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotWithDividerArrangedVertically}`,
        altText: 'Card component with divider arranged vertically',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-divider-without-padding',
    title: 'With divider and without padding',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotWithDividerWithoutPadding}`,
        altText: 'Card component with divider and without padding',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'with-divider-large-corner-style',
    title: 'With divider and with large corner style',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotWithDividerCornerStyleLarge}`,
        altText: 'Card component with divider and large corner style',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AndroidCardPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Card"
    components={components}
    readme={readme}
    androidDocId="net.skyscanner.backpack.card"
    showMenu
    {...rest}
  />
);

export default AndroidCardPage;
