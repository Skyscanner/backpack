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
  // Use case 1: Dot marker (boundaries hidden)
  DotMarkerLowExample,
  DotMarkerMediumExample,
  DotMarkerHighExample,
  // Use case 2: Bubble marker (boundaries shown)
  BubbleMarkerLowExample,
  BubbleMarkerMediumExample,
  BubbleMarkerHighExample,
  BubbleMarkerVeryLargeExample,
  // Use case 3: No marker (boundaries shown)
  NoMarkerExample,
  // Mixed
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-price-range',
  component: BpkPriceRange,
};

// Use case 1: Dot marker (boundaries hidden)
export const DotMarkerLow = DotMarkerLowExample;
export const DotMarkerMedium = DotMarkerMediumExample;
export const DotMarkerHigh = DotMarkerHighExample;

// Use case 2: Bubble marker (boundaries shown)
export const BubbleMarkerLow = BubbleMarkerLowExample;
export const BubbleMarkerMedium = BubbleMarkerMediumExample;
export const BubbleMarkerHigh = BubbleMarkerHighExample;
export const BubbleMarkerVeryLarge = BubbleMarkerVeryLargeExample;

// Use case 3: No marker (boundaries shown)
export const NoMarker = NoMarkerExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
