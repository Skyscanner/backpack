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
  // Use case 1: Dot marker with boundaries
  DotMarkerWithBoundariesLowExample,
  DotMarkerWithBoundariesMediumExample,
  DotMarkerWithBoundariesHighExample,
  // Use case 2: Bubble marker with boundaries
  BubbleMarkerWithBoundariesLowExample,
  BubbleMarkerWithBoundariesMediumExample,
  BubbleMarkerWithBoundariesHighExample,
  BubbleMarkerWithBoundariesVeryLargeExample,
  // Use case 3: Dot marker without boundaries
  DotMarkerWithoutBoundariesLowExample,
  DotMarkerWithoutBoundariesMediumExample,
  DotMarkerWithoutBoundariesHighExample,
  // Use case 4: Bubble marker without boundaries
  BubbleMarkerWithoutBoundariesLowExample,
  BubbleMarkerWithoutBoundariesMediumExample,
  BubbleMarkerWithoutBoundariesHighExample,
  // Use case 5: No marker with boundaries
  NoMarkerWithBoundariesExample,
  // Use case 6: No marker without boundaries
  NoMarkerWithoutBoundariesExample,
  // Mixed
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-price-range',
  component: BpkPriceRange,
};

// Use case 1: Dot marker with boundaries
export const DotMarkerWithBoundariesLow = DotMarkerWithBoundariesLowExample;
export const DotMarkerWithBoundariesMedium =
  DotMarkerWithBoundariesMediumExample;
export const DotMarkerWithBoundariesHigh = DotMarkerWithBoundariesHighExample;

// Use case 2: Bubble marker with boundaries
export const BubbleMarkerWithBoundariesLow =
  BubbleMarkerWithBoundariesLowExample;
export const BubbleMarkerWithBoundariesMedium =
  BubbleMarkerWithBoundariesMediumExample;
export const BubbleMarkerWithBoundariesHigh =
  BubbleMarkerWithBoundariesHighExample;
export const BubbleMarkerWithBoundariesVeryLarge =
  BubbleMarkerWithBoundariesVeryLargeExample;

// Use case 3: Dot marker without boundaries
export const DotMarkerWithoutBoundariesLow =
  DotMarkerWithoutBoundariesLowExample;
export const DotMarkerWithoutBoundariesMedium =
  DotMarkerWithoutBoundariesMediumExample;
export const DotMarkerWithoutBoundariesHigh =
  DotMarkerWithoutBoundariesHighExample;

// Use case 4: Bubble marker without boundaries
export const BubbleMarkerWithoutBoundariesLow =
  BubbleMarkerWithoutBoundariesLowExample;
export const BubbleMarkerWithoutBoundariesMedium =
  BubbleMarkerWithoutBoundariesMediumExample;
export const BubbleMarkerWithoutBoundariesHigh =
  BubbleMarkerWithoutBoundariesHighExample;

// Use case 5: No marker with boundaries
export const NoMarkerWithBoundaries = NoMarkerWithBoundariesExample;

// Use case 6: No marker without boundaries
export const NoMarkerWithoutBoundaries = NoMarkerWithoutBoundariesExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
