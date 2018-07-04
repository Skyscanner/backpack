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
import BpkSectionList, {
  BpkSectionListSection,
  BpkSectionListItem,
} from 'bpk-component-section-list';

import sectionListReadme from 'bpk-component-section-list/readme.md';

import DocsPageBuilder from '../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkSectionList>
        <BpkSectionListSection headerText="Cities">
          <BpkSectionListItem>Tokyo</BpkSectionListItem>
          <BpkSectionListItem href="#">Rio de Janeiro</BpkSectionListItem>
          <BpkSectionListItem href="#">London</BpkSectionListItem>
        </BpkSectionListSection>
        <BpkSectionListSection headerText="Countries">
          <BpkSectionListItem>Japan</BpkSectionListItem>
          <BpkSectionListItem href="#">Brazil</BpkSectionListItem>
          <BpkSectionListItem href="#">United Kingdom</BpkSectionListItem>
        </BpkSectionListSection>
      </BpkSectionList>,
    ],
  },
];

const SectionListPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Section list"
    readme={sectionListReadme}
    components={components}
    {...rest}
  />
);

export default SectionListPage;
