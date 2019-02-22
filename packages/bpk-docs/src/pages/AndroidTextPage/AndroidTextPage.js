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

import readme from '../../../../../backpack-android/docs/Text/README.md';
import screenshotDefault from '../../../../../backpack-android/docs/Text/screenshots/default.png';
import screenshotEmphasized from '../../../../../backpack-android/docs/Text/screenshots/emphasized.png';
import screenshotHeavy from '../../../../../backpack-android/docs/Text/screenshots/heavy.png';
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
        altText: 'Default text component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'emphasized',
    title: 'Emphasized',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotEmphasized}`,
        altText: 'Emphasized text component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'heavy',
    title: 'Heavy',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotHeavy}`,
        altText: 'Heavy text component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AndroidTextPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Text"
    components={components}
    readme={readme}
    androidDocId="net.skyscanner.backpack.text"
    showMenu
    {...rest}
  />
);

export default AndroidTextPage;
