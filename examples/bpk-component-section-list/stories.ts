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

import BpkSectionList from '../../packages/bpk-component-section-list/src/BpkSectionList';
import BpkSectionListItem from '../../packages/bpk-component-section-list/src/BpkSectionListItem';
import BpkSectionListSection from '../../packages/bpk-component-section-list/src/BpkSectionListSection';

import DefaultExample from './examples';

export default {
  title: 'bpk-component-section-list',
  component: BpkSectionList,
  subcomponents: {
    BpkSectionListSection,
    BpkSectionListItem,
  },
};

export const Default = DefaultExample;
export const VisualTest = DefaultExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
