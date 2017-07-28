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
import BpkCard from 'bpk-component-card';

import cardReadme from 'bpk-component-card/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default card comes with padding already applied to get you up and running quickly and has normal and
        hover states baked in.
      </Paragraph>,
    ],
    examples: [
      <BpkCard>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'For full flexibility you can opt to remove the default padding e.g. to display full-bleed images.',
    examples: [
      <BpkCard padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ],
  },
];

const CardsPage = () => <DocsPageBuilder
  title="Cards"
  blurb={[
    <Paragraph>
      Cards are used to group related items within the UI. They allow complex datasets to be broken down into
      individual, distinct areas for easy consumption. Cards are used as a signifier to give affordance
      to a clickable set of elements.
    </Paragraph>,
  ]}
  components={components}
  readme={cardReadme}
  sassdocId="cards"
/>;

export default CardsPage;
