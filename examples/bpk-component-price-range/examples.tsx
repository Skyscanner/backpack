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

// Use case 3: Dot marker without boundaries
const DotMarkerWithoutBoundariesLowExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£50', percentage: 10, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerWithoutBoundariesMediumExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£150', percentage: 50, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerWithoutBoundariesHighExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£300', percentage: 90, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

// Use case 1: Dot marker with boundaries
const DotMarkerWithBoundariesLowExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£50', percentage: 10, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerWithBoundariesMediumExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£150', percentage: 50, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerWithBoundariesHighExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£300', percentage: 90, type: 'dot' }}
      segments={segments}
    />
  </Wrapper>
);

// Use case 2: Bubble marker with boundaries
const BubbleMarkerWithBoundariesLowExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£50', percentage: 10, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerWithBoundariesMediumExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£150', percentage: 50, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerWithBoundariesHighExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '£300', percentage: 90, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerWithBoundariesVeryLargeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      showPriceOnBoundaries
      marker={{ price: '70M ₫', percentage: 90, type: 'bubble' }}
      segments={veryLargeSegments}
    />
  </Wrapper>
);

// Use case 4: Bubble marker without boundaries
const BubbleMarkerWithoutBoundariesLowExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£50', percentage: 10, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerWithoutBoundariesMediumExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£150', percentage: 50, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerWithoutBoundariesHighExample = () => (
  <Wrapper>
    <BpkPriceRange
      showPriceOnBoundaries={false}
      marker={{ price: '£300', percentage: 90, type: 'bubble' }}
      segments={segments}
    />
  </Wrapper>
);

// Use case 5: No marker with boundaries
const NoMarkerWithBoundariesExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange showPriceOnBoundaries segments={segments} />
  </Wrapper>
);

// Use case 6: No marker without boundaries
const NoMarkerWithoutBoundariesExample = () => (
  <Wrapper>
    <BpkPriceRange showPriceOnBoundaries={false} segments={segments} />
  </Wrapper>
);

const MixedExample = () => (
  <div>
    <h4>Use case 1: Dot marker with boundaries</h4>
    <DotMarkerWithBoundariesLowExample />
    <DotMarkerWithBoundariesMediumExample />
    <DotMarkerWithBoundariesHighExample />

    <h4>Use case 2: Bubble marker with boundaries</h4>
    <BubbleMarkerWithBoundariesLowExample />
    <BubbleMarkerWithBoundariesMediumExample />
    <BubbleMarkerWithBoundariesHighExample />
    <BubbleMarkerWithBoundariesVeryLargeExample />

    <h4>Use case 3: Dot marker without boundaries</h4>
    <DotMarkerWithoutBoundariesLowExample />
    <DotMarkerWithoutBoundariesMediumExample />
    <DotMarkerWithoutBoundariesHighExample />

    <h4>Use case 4: Bubble marker without boundaries</h4>
    <BubbleMarkerWithoutBoundariesLowExample />
    <BubbleMarkerWithoutBoundariesMediumExample />
    <BubbleMarkerWithoutBoundariesHighExample />

    <h4>Use case 5: No marker with boundaries</h4>
    <NoMarkerWithBoundariesExample />

    <h4>Use case 6: No marker without boundaries</h4>
    <NoMarkerWithoutBoundariesExample />
  </div>
);

export {
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
};
