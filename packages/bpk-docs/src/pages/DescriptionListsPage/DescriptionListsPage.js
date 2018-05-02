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
import {
  BpkDescriptionList,
  BpkDescriptionTerm,
  BpkDescriptionDetails,
} from 'bpk-component-description-list';

import descriptionlistsReadme from 'bpk-component-description-list/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const blurb = [
  <Paragraph>
    The description list component allows can be used to create a definition
    term an relative description.
  </Paragraph>,
];

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkDescriptionList>
        <BpkDescriptionTerm>Airport code</BpkDescriptionTerm>
        <BpkDescriptionDetails>
          The three digit code which is unique to a specific airport. eg. LHR
          for Heathrow or LGW for Gatwick.
        </BpkDescriptionDetails>
        <BpkDescriptionTerm>Boarding pass</BpkDescriptionTerm>
        <BpkDescriptionDetails>
          A card given to the passenger after check-in which allocates a seat
          number or indicates a boarding pattern. The stub of the card should be
          retained after going through the boarding gate to show to the flight
          crew once reaching the aircraft.
        </BpkDescriptionDetails>
        <BpkDescriptionTerm>Charter</BpkDescriptionTerm>
        <BpkDescriptionDetails>
          An aircraft which is used by a specific group be it customers of a
          particular holiday company or an individual party.
        </BpkDescriptionDetails>
      </BpkDescriptionList>,
    ],
  },
];

const DescriptionListsPage = () => (
  <DocsPageBuilder
    title="Description Lists"
    readme={descriptionlistsReadme}
    blurb={blurb}
    components={components}
  />
);

export default DescriptionListsPage;
