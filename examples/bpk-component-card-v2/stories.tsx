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

import { useState } from 'react';

import BpkBadge from '../../packages/bpk-component-badge';
import BpkButton from '../../packages/bpk-component-button';
import BpkCardV2 from '../../packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2';
import BpkImage from '../../packages/bpk-component-image';
import BpkRating from '../../packages/bpk-component-rating';
import BpkText from '../../packages/bpk-component-text';

import type { Meta, StoryObj } from '@storybook/react';


type BpkCardV2Meta = Meta<typeof BpkCardV2>;

const meta: BpkCardV2Meta = {
  title: 'BpkCardV2',
  component: BpkCardV2,
  parameters: {
    docs: {
      description: {
        component:
          'BpkCardV2 is a composable, responsive card component that supports multi-section layouts, explicit composition, and flexible surface color theming.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual variant controlling styling treatment',
      options: ['default', 'outlined'],
      control: { type: 'radio' },
    },
    bgColor: {
      description: 'Background surface color token',
      options: [
        'surfaceDefault',
        'surfaceElevated',
        'surfaceTint',
        'surfaceSubtle',
        'surfaceHero',
        'surfaceContrast',
        'surfaceLowContrast',
        'surfaceHighlight',
      ],
      control: { type: 'select' },
    },
    className: {
      description: 'Additional CSS class names',
      control: { type: 'text' },
    },
    ariaLabel: {
      description: 'Accessible label describing the card',
      control: { type: 'text' },
    },
    ariaLabelledBy: {
      description: 'ID of element that labels the card',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BpkCardV2>;

/**
 * Basic card with Header, Body, and Footer sections
 */
export const BasicCard: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Basic card example',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Header>Card Title</BpkCardV2.Header>
      <BpkCardV2.Body>This is the main content area of the card with normal spacing and layout.</BpkCardV2.Body>
      <BpkCardV2.Footer>Card footer with actions or additional information</BpkCardV2.Footer>
    </BpkCardV2>
  ),
};

/**
 * Split layout with Primary and Secondary content areas
 */
export const SplitLayout: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Split layout card',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Header>Product Listing</BpkCardV2.Header>
      <BpkCardV2.Body split splitRatio={70}>
        <BpkCardV2.Primary>
          <div style={{ padding: '1rem' }}>
            <h3>Main Product Information</h3>
            <p>This section takes 70% of the width on desktop and full width on mobile.</p>
            <p>On mobile, this content appears above the secondary section.</p>
          </div>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <div style={{ padding: '1rem' }}>
            <h3>Sidebar Information</h3>
            <p>This section takes 30% of the width on desktop and full width on mobile.</p>
            <p>On mobile, this appears below the primary section.</p>
          </div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2>
  ),
};

/**
 * Card with outlined visual variant (border instead of shadow)
 */
export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Outlined card example',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Header>Outlined Card</BpkCardV2.Header>
      <BpkCardV2.Body>This card uses a border instead of a shadow for a lighter, more minimal appearance.</BpkCardV2.Body>
      <BpkCardV2.Footer>Outlined variant footer</BpkCardV2.Footer>
    </BpkCardV2>
  ),
};

/**
 * Card with elevated surface color
 */
export const ElevatedSurface: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceElevated',
    ariaLabel: 'Elevated surface card',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Header>Elevated Surface</BpkCardV2.Header>
      <BpkCardV2.Body>This card uses the elevated surface color for emphasis and visual hierarchy.</BpkCardV2.Body>
    </BpkCardV2>
  ),
};

/**
 * Surface color variants demonstration
 */
export const SurfaceColorVariants: Story = {
  args: {
    ariaLabel: 'Surface color variants',
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <BpkCardV2 bgColor="surfaceDefault">
        <BpkCardV2.Header>surfaceDefault</BpkCardV2.Header>
        <BpkCardV2.Body>Default surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceElevated">
        <BpkCardV2.Header>surfaceElevated</BpkCardV2.Header>
        <BpkCardV2.Body>Elevated surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceTint">
        <BpkCardV2.Header>surfaceTint</BpkCardV2.Header>
        <BpkCardV2.Body>Tinted surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceSubtle">
        <BpkCardV2.Header>surfaceSubtle</BpkCardV2.Header>
        <BpkCardV2.Body>Subtle surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceHero">
        <BpkCardV2.Header>surfaceHero</BpkCardV2.Header>
        <BpkCardV2.Body>Hero surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceContrast">
        <BpkCardV2.Header>surfaceContrast</BpkCardV2.Header>
        <BpkCardV2.Body>High contrast surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceLowContrast">
        <BpkCardV2.Header>surfaceLowContrast</BpkCardV2.Header>
        <BpkCardV2.Body>Low contrast surface background</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 bgColor="surfaceHighlight">
        <BpkCardV2.Header>surfaceHighlight</BpkCardV2.Header>
        <BpkCardV2.Body>Highlighted surface background</BpkCardV2.Body>
      </BpkCardV2>
    </div>
  ),
};

/**
 * Hotel product card component for complex product card story
 * @returns {JSX.Element} Hotel product card with split layout
 */
function HotelProductCard() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <BpkCardV2 variant="default" bgColor="surfaceDefault" ariaLabel="Hotel product card">
      <BpkCardV2.Body split splitRatio={60}>
        {/* Primary section - Hotel image and info */}
        <BpkCardV2.Primary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Hotel image */}
            <BpkImage
              altText="Luxury mountain resort hotel"
              aspectRatio={1}
              src="https://images.unsplash.com/photo-1566683388090-987f520f5a14?w=500&h=500&fit=crop"
            />

            {/* Hotel name with rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <BpkText textStyle="heading-4">Mountain View Resort</BpkText>
              <BpkBadge>5★</BpkBadge>
            </div>

            {/* Rating component */}
            <BpkRating rating={4.8} ratedCount={324} />

            {/* Description */}
            <BpkText textStyle="body-default">
              Luxury mountain resort with panoramic views, spa facilities, and world-class dining.
            </BpkText>

            {/* Amenities badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <BpkBadge type="light">Free WiFi</BpkBadge>
              <BpkBadge type="light">Pool</BpkBadge>
              <BpkBadge type="light">Restaurant</BpkBadge>
            </div>
          </div>
        </BpkCardV2.Primary>

        {/* Secondary section - Booking info and CTA */}
        <BpkCardV2.Secondary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Price section */}
            <div>
              <BpkText textStyle="body-default">From</BpkText>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <BpkText textStyle="heading-2">$299</BpkText>
                <BpkText textStyle="body-default">/night</BpkText>
              </div>
            </div>

            {/* Location info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <BpkText textStyle="body-default">Location</BpkText>
              <BpkText textStyle="body-default">Colorado, USA</BpkText>
              <BpkText textStyle="caption">2.5 km from city center</BpkText>
            </div>

            {/* Availability info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <BpkText textStyle="body-default">Available</BpkText>
              <BpkText textStyle="body-default">Check-in: Feb 15, 2024</BpkText>
              <BpkText textStyle="caption">3 nights available</BpkText>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <BpkButton
                fullWidth
                onClick={() => setIsWishlisted(!isWishlisted)}
                type="secondary"
              >
                {isWishlisted ? '❤️ Wishlisted' : '🤍 Wishlist'}
              </BpkButton>
              <BpkButton fullWidth>Book Now</BpkButton>
            </div>
          </div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2>
  );
}

/**
 * Complex product card layout combining multiple features
 */
export const ComplexProductCard: Story = {
  args: {
    ariaLabel: 'Hotel product card',
  },
  render: () => <HotelProductCard />,
};

/**
 * Card with only body content (no header or footer)
 */
export const MinimalCard: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Minimal card',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Body>Just content, no header or footer required</BpkCardV2.Body>
    </BpkCardV2>
  ),
};

/**
 * Card with custom split ratio (40/60 instead of default 70/30)
 */
export const CustomSplitRatio: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Custom split ratio card',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Body split splitRatio={60}>
        <BpkCardV2.Primary>
          <div style={{background: 'rgba(0,0,0,0.05)' }}>Primary (60%)</div>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <div>Secondary (40%)</div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2>
  ),
};

/**
 * Multiple cards side by side showing different variants and colors
 */
export const CardGrid: Story = {
  args: {
    ariaLabel: 'Card grid example',
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <BpkCardV2 variant="default" bgColor="surfaceDefault">
        <BpkCardV2.Header>Default Shadow</BpkCardV2.Header>
        <BpkCardV2.Body>Card with default shadow variant</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 variant="outlined" bgColor="surfaceDefault">
        <BpkCardV2.Header>Outlined Border</BpkCardV2.Header>
        <BpkCardV2.Body>Card with outlined border variant</BpkCardV2.Body>
      </BpkCardV2>
      <BpkCardV2 variant="default" bgColor="surfaceElevated">
        <BpkCardV2.Header>Elevated Surface</BpkCardV2.Header>
        <BpkCardV2.Body>Card with elevated surface color</BpkCardV2.Body>
      </BpkCardV2>
    </div>
  ),
};
