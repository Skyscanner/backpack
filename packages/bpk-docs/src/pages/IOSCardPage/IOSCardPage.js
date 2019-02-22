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

import readme from '../../../../../backpack-ios/Backpack/Card/README.md';
import screenshotDefault from '../../../../../backpack-ios/screenshots/Card/default.png';
import screenshotSelected from '../../../../../backpack-ios/screenshots/Card/selected.png';
import screenshotCornerStyleLarge from '../../../../../backpack-ios/screenshots/Card/corner-style-large.png';
import screenshotWithoutPadding from '../../../../../backpack-ios/screenshots/Card/without-padding.png';
import screenshotWithDivider from '../../../../../backpack-ios/screenshots/Card/with-divider.png';
import screenshotWithDividerWithoutPadding from '../../../../../backpack-ios/screenshots/Card/with-divider-without-padding.png';
import screenshotWithDividerCornerStyleLarge from '../../../../../backpack-ios/screenshots/Card/with-divider-and-corner-style-large.png';
import screenshotWithDividerArrangedVertically from '../../../../../backpack-ios/screenshots/Card/with-divider-arranged-vertically.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotDefault}`,
        altText: 'iOS default card.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'selected',
    title: 'Selected',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotSelected}`,
        altText: 'iOS selected card.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'corner-style-large',
    title: 'Large corner style',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotCornerStyleLarge}`,
        altText: 'iOS card with large corner style.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotWithoutPadding}`,
        altText: 'iOS card without padding.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'with-divider',
    title: 'With divider',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotWithDivider}`,
        altText: 'iOS card with divider.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'with-divider-arranged-vertically',
    title: 'With divider arranged vertically',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotWithDividerArrangedVertically}`,
        altText: 'iOS card with divider arranged vertically.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'with-divider-without-padding',
    title: 'With divider and without padding',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotWithDividerWithoutPadding}`,
        altText: 'iOS card with divider and without padding.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'with-divider-corner-style-large',
    title: 'With divider and with large corner style',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotWithDividerCornerStyleLarge}`,
        altText: 'iOS card with divider and large corner style.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
];

const IOSCardPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Card"
    components={components}
    readme={readme}
    iosDocId="BPKCard"
    showMenu
    {...rest}
  />
);

export default IOSCardPage;
