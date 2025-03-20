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

const segments = {
  low: {
    price: '£100',
    percentage: 20,
  },
  high: {
    price: '£200',
    percentage: 80,
  },
};

const SmallerLowPriceRangeExample = () => (
  <BpkPriceRange
    marker={{ price: '£50', percentage: 10 }}
    segments={segments}
  />
);
const SmallerTypicalPriceRangeExample = () => (
  <BpkPriceRange
    marker={{ price: '£150', percentage: 50 }}
    segments={segments}
  />
);

const SmallerHighPriceRangeExample = () => (
  <BpkPriceRange
    marker={{ price: '£300', percentage: 90 }}
    segments={segments}
  />
);

const LargeLowPriceRangeExample = () => (
  <BpkPriceRange
    showPriceIndicator
    marker={{ price: '£50', percentage: 10 }}
    segments={segments}
  />
);

const LargeTypicalPriceRangeExample = () => (
  <BpkPriceRange
    showPriceIndicator
    marker={{ price: '£150', percentage: 50 }}
    segments={segments}
  />
);

const LargeHighPriceRangeExample = () => (
  <BpkPriceRange
    showPriceIndicator
    marker={{ price: '£300', percentage: 90 }}
    segments={segments}
  />
);

const MixedExample = () => (
  <div>
    <SmallerLowPriceRangeExample />
    <SmallerTypicalPriceRangeExample />
    <SmallerHighPriceRangeExample />
    <LargeLowPriceRangeExample />
    <LargeTypicalPriceRangeExample />
    <LargeHighPriceRangeExample />
  </div>
);

export {
  SmallerLowPriceRangeExample,
  SmallerHighPriceRangeExample,
  SmallerTypicalPriceRangeExample,
  LargeLowPriceRangeExample,
  LargeHighPriceRangeExample,
  LargeTypicalPriceRangeExample,
  MixedExample,
};
