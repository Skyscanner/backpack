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

import type { ReactNode } from 'react';

import BpkPriceRange from '@backpack/bpk-component-price-range';

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

const veryLargeSegments = {
  low: {
    price: '35M ₫',
    percentage: 20,
  },
  high: {
    price: '53.4M ₫',
    percentage: 80,
  },
};

const Wrapper = ({
  children,
  isLarge,
}: {
  children: ReactNode;
  isLarge?: boolean;
}) => <div style={{ width: isLarge ? '15rem' : '8.75rem' }}>{children}</div>;

const SmallerLowPriceRangeExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceIndicator={false}
      marker={{ price: '£50', percentage: 10 }}
      segments={segments}
    />
  </Wrapper>
);
const SmallerMediumPriceRangeExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceIndicator={false}
      marker={{ price: '£150', percentage: 50 }}
      segments={segments}
    />
  </Wrapper>
);

const SmallerHighPriceRangeExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceIndicator={false}
      marker={{ price: '£300', percentage: 90 }}
      segments={segments}
    />
  </Wrapper>
);

const LargeLowPriceRangeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{ price: '£50', percentage: 10 }}
      segments={segments}
    />
  </Wrapper>
);

const LargeMediumPriceRangeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{ price: '£150', percentage: 50 }}
      segments={segments}
    />
  </Wrapper>
);

const LargeHighPriceRangeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{ price: '£300', percentage: 90 }}
      segments={segments}
    />
  </Wrapper>
);

const VeryLargeHighPriceRangeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{ price: '70M ₫', percentage: 90 }}
      segments={veryLargeSegments}
    />
  </Wrapper>
);

const MixedExample = () => (
  <div>
    <SmallerLowPriceRangeExample />
    <SmallerMediumPriceRangeExample />
    <SmallerHighPriceRangeExample />
    <LargeLowPriceRangeExample />
    <LargeMediumPriceRangeExample />
    <LargeHighPriceRangeExample />
    <VeryLargeHighPriceRangeExample />
  </div>
);

export {
  SmallerLowPriceRangeExample,
  SmallerHighPriceRangeExample,
  SmallerMediumPriceRangeExample,
  LargeLowPriceRangeExample,
  LargeHighPriceRangeExample,
  LargeMediumPriceRangeExample,
  VeryLargeHighPriceRangeExample,
  MixedExample,
};
