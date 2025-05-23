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

import BpkCardList from '../../packages/bpk-component-card-list';

import {
  BasicExample,
  RowToRailForCardsExample,
  RowToRailForSnippetsExample,
  RowToStackForCardsWithExpandExample,
  RowToStackForSnippetsWithExpandExample,
  GridToRailForCardsWithExpandExample,
  GridToStackExample,
  GridToStackWithExpandExample,
} from './examples';

export default {
  title: 'bpk-component-card-list',
  component: BpkCardList,
};

export const Basic = BasicExample;
export const RowToRailForCards = RowToRailForCardsExample;
export const RowToRailForSnippets = RowToRailForSnippetsExample;
export const RowToStackForCardsWithExpand = RowToStackForCardsWithExpandExample;
export const RowToStackForSnippetsWithExpand = RowToStackForSnippetsWithExpandExample;
export const GridToRailForCardsWithExpand = GridToRailForCardsWithExpandExample;
export const GridToStack = GridToStackExample;
export const GridToStackWithExpand = GridToStackWithExpandExample;

export const VisualTest = Basic;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
