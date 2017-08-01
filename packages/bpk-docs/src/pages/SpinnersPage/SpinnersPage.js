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
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from 'bpk-component-spinner';

import spinnerReadme from 'bpk-component-spinner/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const blurb = [
  <Paragraph>
    Spinners are used to to indicate that a part of the product is loading or performing a task. These are available in
    3 sizes, small (18px), large (24px) and extra-large (48px).
  </Paragraph>,
];

const components = [
  {
    id: 'small',
    title: 'Small',
    examples: [
      <BpkSpinner />,
    ],
  },
  {
    id: 'large',
    title: 'Large',
    examples: [
      <BpkLargeSpinner />,
    ],
  },
  {
    id: 'extra-large',
    title: 'Extra large',
    examples: [
      <BpkExtraLargeSpinner />,
    ],
  },
];

const SpinnersPage = () => <DocsPageBuilder
  title="Spinners"
  blurb={blurb}
  components={components}
  readme={spinnerReadme}
  sassdocId="svgs-mixin-bpk-spinner"
/>;

export default SpinnersPage;
