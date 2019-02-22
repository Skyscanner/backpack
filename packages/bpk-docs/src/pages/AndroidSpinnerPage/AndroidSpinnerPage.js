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

import readme from '../../../../../backpack-android/docs/Spinner/README.md';
import screenshotDefault from '../../../../../backpack-android/docs/Spinner/screenshots/default.png';
import screenshotSmall from '../../../../../backpack-android/docs/Spinner/screenshots/small.png';
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
        altText: 'Spinner component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
  {
    id: 'small',
    title: 'Small',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotSmall}`,
        altText: 'Small spinner component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AndroidSpinnerPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Spinner"
    components={components}
    readme={readme}
    androidDocId="net.skyscanner.backpack.spinner"
    showMenu
    {...rest}
  />
);

export default AndroidSpinnerPage;
