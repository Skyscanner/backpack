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



import BpkList from '../../packages/bpk-component-list/src/BpkList';
import BpkListItem from '../../packages/bpk-component-list/src/BpkListItem';

import { UnorderedExample, OrderedExample, NestedExample } from './examples';

export default {
  title: 'bpk-component-list',
  component: BpkList,
  subcomponents: {
    BpkListItem
  },
};

export const Unordered = UnorderedExample;
export const Ordered = OrderedExample;
export const Nested = NestedExample;
export const VisualTest = NestedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
