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

import BpkPriceRange, {
  type BpkPriceRangeProps,
  MARKER_DISPLAY_TYPES,
} from './BpkPriceRange';

import type { Meta } from '@storybook/react';


const segments: BpkPriceRangeProps['segments'] = {
  low: {
    price: '£100',
    percentage: 20,
  },
  high: {
    price: '£200',
    percentage: 80,
  },
};

const veryLargeSegments: BpkPriceRangeProps['segments'] = {
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

const DotMarkerLowExample = () => (
  <Wrapper>
    <BpkPriceRange
      marker={{ price: '£50', percentage: 10, type: MARKER_DISPLAY_TYPES.DOT }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerMediumExample = () => (
  <Wrapper>
    <BpkPriceRange
      marker={{ price: '£150', percentage: 50, type: MARKER_DISPLAY_TYPES.DOT }}
      segments={segments}
    />
  </Wrapper>
);

const DotMarkerHighExample = () => (
  <Wrapper>
    <BpkPriceRange
      marker={{ price: '£300', percentage: 90, type: MARKER_DISPLAY_TYPES.DOT }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerLowExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{
        price: '£50',
        percentage: 10,
        type: MARKER_DISPLAY_TYPES.BUBBLE,
      }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerMediumExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{
        price: '£150',
        percentage: 50,
        type: MARKER_DISPLAY_TYPES.BUBBLE,
      }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerHighExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{
        price: '£300',
        percentage: 90,
        type: MARKER_DISPLAY_TYPES.BUBBLE,
      }}
      segments={segments}
    />
  </Wrapper>
);

const BubbleMarkerVeryLargeExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange
      marker={{
        price: '70M ₫',
        percentage: 90,
        type: MARKER_DISPLAY_TYPES.BUBBLE,
      }}
      segments={veryLargeSegments}
    />
  </Wrapper>
);

const NoMarkerExample = () => (
  <Wrapper isLarge>
    <BpkPriceRange segments={segments} />
  </Wrapper>
);

const MixedExample = () => (
  <div>
    <h4>Use case 1: Dot marker (boundaries hidden)</h4>
    <DotMarkerLowExample />
    <DotMarkerMediumExample />
    <DotMarkerHighExample />

    <h4>Use case 2: Bubble marker (boundaries shown)</h4>
    <BubbleMarkerLowExample />
    <BubbleMarkerMediumExample />
    <BubbleMarkerHighExample />
    <BubbleMarkerVeryLargeExample />

    <h4>Use case 3: No marker (boundaries shown)</h4>
    <NoMarkerExample />
  </div>
);

const meta = {
  title: 'bpk-component-price-range',
  component: BpkPriceRange,
} satisfies Meta;

export default meta;

export const DotMarkerLow = {
  render: () => <DotMarkerLowExample />,
};

export const DotMarkerMedium = {
  render: () => <DotMarkerMediumExample />,
};

export const DotMarkerHigh = {
  render: () => <DotMarkerHighExample />,
};

export const BubbleMarkerLow = {
  render: () => <BubbleMarkerLowExample />,
};

export const BubbleMarkerMedium = {
  render: () => <BubbleMarkerMediumExample />,
};

export const BubbleMarkerHigh = {
  render: () => <BubbleMarkerHighExample />,
};

export const BubbleMarkerVeryLarge = {
  render: () => <BubbleMarkerVeryLargeExample />,
};

export const NoMarker = {
  render: () => <NoMarkerExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
