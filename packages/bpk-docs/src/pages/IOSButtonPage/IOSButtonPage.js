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

import readme from '../../../../../backpack-ios/Backpack/Button/README.md';
import screenshotPrimary from '../../../../../backpack-ios/screenshots/Button/primary.png';
import screenshotSecondary from '../../../../../backpack-ios/screenshots/Button/secondary.png';
import screenshotDestructive from '../../../../../backpack-ios/screenshots/Button/destructive.png';
import screenshotFeatured from '../../../../../backpack-ios/screenshots/Button/featured.png';
import screenshotLink from '../../../../../backpack-ios/screenshots/Button/link.png';
import screenshotOutline from '../../../../../backpack-ios/screenshots/Button/outline.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'primary',
    title: 'Primary',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotPrimary}`,
        altText: 'iOS primary button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotSecondary}`,
        altText: 'iOS secondary button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotDestructive}`,
        altText: 'iOS destructive button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotFeatured}`,
        altText: 'iOS featured button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'outline',
    title: 'Outline',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotOutline}`,
        altText: 'iOS outline button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
  {
    id: 'link',
    title: 'Link',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotLink}`,
        altText: 'iOS link button.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
];

const IOSButtonPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Button"
    components={components}
    readme={readme}
    iosDocId="BPKButton"
    showMenu
    {...rest}
  />
);

export default IOSButtonPage;
