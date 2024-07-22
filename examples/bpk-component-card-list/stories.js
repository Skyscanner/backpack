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

import BpkCardList from '../../packages/bpk-component-card-list/src/BpkCardList';

import {
  GridToRailExample,
  GridToStackExample,
  GridToStackWithButtonExample,
  RowToRailExample,
  RowToRailWith5InitiallyShownCardsExample,
  RowToStackExample,
} from './examples';

export default {
  title: 'bpk-component-card-list',
  component: BpkCardList,
};

export const GridToRail = GridToRailExample;
export const GridToStack = GridToStackExample;
export const GridToStackWithButton = GridToStackWithButtonExample;
export const RowToRail = RowToRailExample;
export const RowToRailWithHeaderButton =
  RowToRailWith5InitiallyShownCardsExample;
export const RowToStack = RowToStackExample;

export const VisualTest = GridToRail;
export const VisualTestVariant = RowToStack;

export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};

export const VisualTestVariantWithZoom = VisualTestVariant.bind({});
VisualTestVariantWithZoom.args = {
  zoomEnabled: true,
};
