/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import BpkSectionList, {
  BpkSectionListSection,
  BpkSectionListItem,
} from '../../packages/bpk-component-section-list';
import { action } from '../bpk-storybook-utils';

const DefaultExample = () => (
  <BpkSectionList>
    <BpkSectionListSection>
      <BpkSectionListItem>Section list item</BpkSectionListItem>
      <BpkSectionListItem
        onClick={action('Clickable BpkSectionListItem clicked')}
      >
        With onClick prop
      </BpkSectionListItem>
      <BpkSectionListItem
        href="https://skyscanner.net"
        blank
        onClick={action('BpkSectionListItem with href clicked')}
      >
        With href
      </BpkSectionListItem>
    </BpkSectionListSection>
    <BpkSectionListSection headerText="Cities">
      <BpkSectionListItem>Tokyo</BpkSectionListItem>
      <BpkSectionListItem>Rio de Janeiro</BpkSectionListItem>
      <BpkSectionListItem>London</BpkSectionListItem>
      <BpkSectionListItem>Beijing</BpkSectionListItem>
    </BpkSectionListSection>
  </BpkSectionList>
);

export default DefaultExample;
