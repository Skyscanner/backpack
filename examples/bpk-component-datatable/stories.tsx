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
import {
  AutowidthExample,
  NonClickNonHoverRowsExample,
  FixedWidthExample,
  DisabledSortExample,
  CustomRowAndHeaderHeightsExample,
  HeaderRendererExample,
  CustomSortingExample,
  WithColumnArrayExample,
} from './examples';

import { BpkDataTable } from '@backpack/bpk-component-datatable';


export default {
  title: 'bpk-component-datatable',
  component: BpkDataTable,
}

export const Autowidth = AutowidthExample;
export const RowsNotHoverableOrClickable = NonClickNonHoverRowsExample;

export const FixedWidth = FixedWidthExample;
export const DisabledSort = DisabledSortExample;
export const CustomRowAndHeaderHeights = CustomRowAndHeaderHeightsExample;

export const CustomSorting = CustomSortingExample;

export const CustomHeaderData = HeaderRendererExample;

export const WithColumnArray = WithColumnArrayExample;

export const VisualTest = AutowidthExample;

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {zoomEnabled: true}
}