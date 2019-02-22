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

import readme from '../../../../../backpack-android/docs/Button/README.md';
import screenshotPrimary from '../../../../../backpack-android/docs/Button/screenshots/primary.png';
import screenshotSecondary from '../../../../../backpack-android/docs/Button/screenshots/secondary.png';
import screenshotDestructive from '../../../../../backpack-android/docs/Button/screenshots/destructive.png';
import screenshotOutline from '../../../../../backpack-android/docs/Button/screenshots/outline.png';
import screenshotFeatured from '../../../../../backpack-android/docs/Button/screenshots/featured.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'primary',
    title: 'Primary',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotPrimary}`,
        altText: 'Android primary button',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotSecondary}`,
        altText: 'Android secondary button',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotDestructive}`,
        altText: 'Android destructive button',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotFeatured}`,
        altText: 'Android featured button',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'outline',
    title: 'Outline',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotOutline}`,
        altText: 'Android outline button',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AndroidButtonPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Button"
    components={components}
    readme={readme}
    androidDocId="net.skyscanner.backpack.button"
    showMenu
    {...rest}
  />
);

export default AndroidButtonPage;
