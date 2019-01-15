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

import readme from '../../../../../backpack-ios/Backpack/Badge/README.md';
import screenshotAll from '../../../../../backpack-ios/screenshots/Badge/all.png';

import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        width: 750,
        height: 1334,
        src: `/${screenshotAll}`,
        altText: 'The various configurations of badges.',
        subText: '(iPhone 8 simulator)',
      },
    ],
  },
];

const IOSBadgePage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Badge"
    components={components}
    readme={readme}
    iosDocId="BPKBadge"
    showMenu
    {...rest}
  />
);

export default IOSBadgePage;
