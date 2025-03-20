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

import BpkPriceRange from '../../packages/bpk-component-price-range';

import {
  SmallerLowPriceRangeExample,
  SmallerHighPriceRangeExample,
  SmallerTypicalPriceRangeExample,
  LargeLowPriceRangeExample,
  LargeHighPriceRangeExample,
  LargeTypicalPriceRangeExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-price-range',
  component: BpkPriceRange,
};

export const SmallerLowPriceRange = SmallerLowPriceRangeExample;
export const SmallerTypicalPriceRange = SmallerTypicalPriceRangeExample;
export const SmallerHighPriceRange = SmallerHighPriceRangeExample;
export const LargeLowPriceRange = LargeLowPriceRangeExample;
export const LargeTypicalPriceRange = LargeTypicalPriceRangeExample;
export const LargeHighPriceRange = LargeHighPriceRangeExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
