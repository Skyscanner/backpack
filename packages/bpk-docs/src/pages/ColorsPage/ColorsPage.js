/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { colors, primaryGradient } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import STYLES from './colors-page.scss';
import ColorSwatch from './../../components/ColorSwatch';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const getClassName = cssModules(STYLES);
const containerClassName = getClassName(
  'bpkdocs-colors-page__swatch-container',
);

const components = [
  {
    id: 'primary',
    title: 'Primary',
    blurb: [
      <div className={containerClassName}>
        <ColorSwatch
          name="color-blue-500"
          color={colors.colorBlue500}
          whiteColor
        />
        <ColorSwatch
          name="color-blue-700"
          color={colors.colorBlue700}
          whiteColor
        />
        <ColorSwatch name="color-white" color={colors.colorWhite} border />
      </div>,
    ],
    examples: [],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    blurb: [
      <div className={containerClassName}>
        <ColorSwatch
          name="color-green-500"
          color={colors.colorGreen500}
          whiteColor
        />
        <ColorSwatch name="color-yellow-500" color={colors.colorYellow500} />
        <ColorSwatch
          name="color-red-500"
          color={colors.colorRed500}
          whiteColor
        />
      </div>,
    ],
    examples: [],
  },
  {
    id: 'grays',
    title: 'Grays',
    blurb: [
      <div className={containerClassName}>
        <ColorSwatch name="color-gray-50" color={colors.colorGray50} />
        <ColorSwatch name="color-gray-100" color={colors.colorGray100} />
        <ColorSwatch
          name="color-gray-300"
          color={colors.colorGray300}
          whiteColor
        />
        <ColorSwatch
          name="color-gray-500"
          color={colors.colorGray500}
          whiteColor
        />
        <ColorSwatch
          name="color-gray-700"
          color={colors.colorGray700}
          whiteColor
        />
        <ColorSwatch
          name="color-gray-900"
          color={colors.colorGray900}
          whiteColor
        />
      </div>,
    ],
    examples: [],
  },
  {
    id: 'gradients',
    title: 'Gradients',
    blurb: [
      <div className={containerClassName}>
        <ColorSwatch
          name="primary-gradient"
          gradient={primaryGradient}
          whiteColor
        />
      </div>,
    ],
    examples: [],
  },
];

const ColorsPage = () => (
  <DocsPageBuilder title="Colors" components={components} />
);

export default ColorsPage;
