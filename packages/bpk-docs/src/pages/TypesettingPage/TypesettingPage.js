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
    id: 'font-families',
    title: 'Font families',
    blurb: [
      <Paragraph>
        Rather than specify a single font across all Skyscanner products, we rely on the native font used on each
        device. The benefits of this are two-fold, firstly we can lean on the hard-work and expertise that OS vendors
        have expended in producing a font that works best on their respective platforms. Second, we avoid
        any drawbacks of serving a custom web-font; for example extra load time, and a so-called FOUT (flash of unstyled
        text). This will improve the user experience of our product on all devices.
      </Paragraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'fontFamilyBase')),
  },
  {
    id: 'font-sizes',
    title: 'Font sizes',
    blurb: [
      <Paragraph>
        Backpack uses a set of 5 font-sizes which when used in conjunction with their retrospective line heights,
        produces text styles which align to the baseline grid.
      </Paragraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'fontSize')),
  },
  {
    id: 'line-heights',
    title: 'Line heights',
    blurb: [
      <Paragraph>
        The following line-heights should be paired with the font-sizes above to ensure text aligns with the baseline
        grid.
      </Paragraph>,
    ],
    examples: [],
    tokenMap: pickBy(TOKENS, (value, key) => includes(key, 'lineHeight')),
  },
];

const TypesettingPage = () => <DocsPageBuilder
  title="Typesetting"
  blurb="Here you can find information on how the Backpack type is set including fonts, sizes and line heights."
  components={components}
  sassdocId="typesettings"
/>;

export default TypesettingPage;
