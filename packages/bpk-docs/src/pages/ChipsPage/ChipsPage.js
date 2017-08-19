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

import chipReadme from 'bpk-component-chip/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';
import DefaultChipContainer from './DefaultChipContainer';
import DefaultChipInput from './DefaultChipInput';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default configuration displays a text value with a close button.
        This button can be assigned a custom action to remove itself from the view.
      </Paragraph>,
    ],
    examples: [
      <DefaultChipContainer />,
    ],
  },
  {
    id: 'chipInput',
    title: 'Input Field',
    blurb: [
      <Paragraph>
        The `BpkChipInput` component present chips within a text-box such that user
        input can be collected.
      </Paragraph>,
    ],
    examples: [
      <DefaultChipInput />,
    ],
  },
];

const ChipsPage = () => <DocsPageBuilder
  title="Chips"
  blurb={[
    <Paragraph>
      Chips, sometimes called tags, are useful for displaying keywords or categories from common sets of data.
    </Paragraph>,
  ]}
  components={components}
  readme={chipReadme}
  sassdocId="cards"
/>;

export default ChipsPage;
