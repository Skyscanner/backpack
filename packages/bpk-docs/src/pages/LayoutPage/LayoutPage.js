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
import pickBy from 'lodash/pickBy';
import includes from 'lodash/includes';
import TOKENS from 'bpk-tokens/tokens/base.common';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'spacing',
    title: 'Spacing',
    blurb: [
      <Paragraph>To ensure elements are distributed evenly, we use .375rem (6px) increments:</Paragraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'spacing')),
    sassdocId: 'spacings',
  },
  {
    id: 'baseline-grid',
    title: 'Baseline grid (aka vertical rhythm)',
    blurb: [
      <Paragraph>
        Backpack uses a baseline grid to provide consistent vertical rhythm. A baseline grid is an underlying structure
        that helps guide the vertical spacing of a design. Just like using columns for laying out elements horizontally,
        the baseline grid is a way to help you make decisions and build consistency into a layout.
      </Paragraph>,
      <Paragraph>
        Backpack’s baseline grid is set to .375rem (6px) increments, with an optimised font-size, line-height and
        spacing that align to the grid.
      </Paragraph>,
      <Paragraph>You can preview this by switching on the grid at the bottom of the page.</Paragraph>,
    ],
    examples: [],
  },
];

const LayoutPage = () => <DocsPageBuilder
  title="Layout"
  components={components}
/>;

export default LayoutPage;
