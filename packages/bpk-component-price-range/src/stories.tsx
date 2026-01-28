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
  SmallerLowPriceRangeExample,
  SmallerHighPriceRangeExample,
  SmallerMediumPriceRangeExample,
  LargeLowPriceRangeExample,
  LargeHighPriceRangeExample,
  LargeMediumPriceRangeExample,
  VeryLargeHighPriceRangeExample,
  MixedExample,
} from './examples';

import BpkPriceRange from '@backpack/bpk-component-price-range';


export default {
  title: 'bpk-component-price-range',
  component: BpkPriceRange,
};

export const SmallerLowPriceRange = SmallerLowPriceRangeExample;
export const SmallerMediumPriceRange = SmallerMediumPriceRangeExample;
export const SmallerHighPriceRange = SmallerHighPriceRangeExample;
export const LargeLowPriceRange = LargeLowPriceRangeExample;
export const LargeMediumPriceRange = LargeMediumPriceRangeExample;
export const LargeHighPriceRange = LargeHighPriceRangeExample;
export const VeryLargeHighPriceRange = VeryLargeHighPriceRangeExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
