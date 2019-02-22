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

import readme from '../../../../../backpack-android/docs/Calendar/README.md';
import screenshotAll from '../../../../../backpack-android/docs/Calendar/screenshots/range.png';
import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'range',
    title: 'Range',
    screenshots: [
      {
        width: 1080,
        height: 1920,
        src: `/${screenshotAll}`,
        altText: 'Calendar with a range of dates',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const AndroidCalendarPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Calendar"
    components={components}
    readme={readme}
    androidDocId="net.skyscanner.backpack.calendar"
    showMenu
    {...rest}
  />
);

export default AndroidCalendarPage;
