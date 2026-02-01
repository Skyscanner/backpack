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

import BpkBadge from '../../packages/bpk-component-badge';
import BpkButton from '../../packages/bpk-component-button';
import BpkCardV2 from '../../packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2';
import BpkImage from '../../packages/bpk-component-image';
import BpkRating from '../../packages/bpk-component-rating';
import BpkText from '../../packages/bpk-component-text';

import type { Meta, StoryObj } from '@storybook/react';


type BpkCardV2RootMeta = Meta<typeof BpkCardV2.Root>;

const meta: BpkCardV2RootMeta = {
  title: 'BpkCardV2',
  component: BpkCardV2.Root,
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
type Story = StoryObj<typeof BpkCardV2.Root>;

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
    <BpkCardV2.Root {...args}>
      <BpkCardV2.Header>Card Title</BpkCardV2.Header>
      <BpkCardV2.Body>This is the main content area of the card with normal spacing and layout.</BpkCardV2.Body>
      <BpkCardV2.Footer>Card footer with actions or additional information</BpkCardV2.Footer>
    </BpkCardV2.Root>
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
    <BpkCardV2.Root {...args}>
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
    </BpkCardV2.Root>
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
    <BpkCardV2.Root {...args}>
      <BpkCardV2.Header>Outlined Card</BpkCardV2.Header>
      <BpkCardV2.Body>This card uses a border instead of a shadow for a lighter, more minimal appearance.</BpkCardV2.Body>
      <BpkCardV2.Footer>Outlined variant footer</BpkCardV2.Footer>
    </BpkCardV2.Root>
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
    <BpkCardV2.Root {...args}>
      <BpkCardV2.Header>Elevated Surface</BpkCardV2.Header>
      <BpkCardV2.Body>This card uses the elevated surface color for emphasis and visual hierarchy.</BpkCardV2.Body>
    </BpkCardV2.Root>
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
      <BpkCardV2.Root bgColor="surfaceDefault">
        <BpkCardV2.Header>surfaceDefault</BpkCardV2.Header>
        <BpkCardV2.Body>Default surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceElevated">
        <BpkCardV2.Header>surfaceElevated</BpkCardV2.Header>
        <BpkCardV2.Body>Elevated surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceTint">
        <BpkCardV2.Header>surfaceTint</BpkCardV2.Header>
        <BpkCardV2.Body>Tinted surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceSubtle">
        <BpkCardV2.Header>surfaceSubtle</BpkCardV2.Header>
        <BpkCardV2.Body>Subtle surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceHero">
        <BpkCardV2.Header>surfaceHero</BpkCardV2.Header>
        <BpkCardV2.Body>Hero surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceContrast">
        <BpkCardV2.Header>surfaceContrast</BpkCardV2.Header>
        <BpkCardV2.Body>High contrast surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceLowContrast">
        <BpkCardV2.Header>surfaceLowContrast</BpkCardV2.Header>
        <BpkCardV2.Body>Low contrast surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root bgColor="surfaceHighlight">
        <BpkCardV2.Header>surfaceHighlight</BpkCardV2.Header>
        <BpkCardV2.Body>Highlighted surface background</BpkCardV2.Body>
      </BpkCardV2.Root>
    </div>
  ),
};

/**
 * Complex travel deal card component
 * @returns {JSX.Element} Hotel booking card with split layout matching screenshot
 */
function ComplexProductCardComponent() {
  return (
    <BpkCardV2.Root variant="default" bgColor="surfaceDefault" ariaLabel="Hotel Aiguaclara booking card">
      <BpkCardV2.Body split splitRatio={60}>
        {/* Primary Slot (60%) - Hotel details and offers */}
        <BpkCardV2.Primary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Hotel image */}
            <BpkImage
              altText="Hotel Aiguaclara beachfront resort"
              aspectRatio={4 / 3}
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"
            />

            {/* Hotel name */}
            <BpkText textStyle="heading-3">Hotel Aiguaclara</BpkText>

            {/* Hotel classification and location */}
            <BpkText textStyle="body-default">
              4 star hotel • Begur, Costa Brava
            </BpkText>

            {/* Rating section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BpkRating value={4.5} ariaLabel="Hotel rating 4.5 out of 5 based on 13,433 reviews" title="Excellent" subtitle="13,433 reviews" />
            </div>

            {/* Amenities/Features section with checkmarks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <BpkText textStyle="body-default">✓ ATOL protection</BpkText>
                <BpkText textStyle="body-default">✓ Checked baggage 23kg</BpkText>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <BpkText textStyle="body-default">✓ Flexible payments</BpkText>
                <BpkText textStyle="body-default">✓ Transfers</BpkText>
              </div>
            </div>

            {/* Flight times section */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BpkBadge type="strong">Jet2</BpkBadge>
                <BpkText textStyle="body-default">15:25 - 20:50</BpkText>
                <BpkText textStyle="caption">STN - BCN, Direct</BpkText>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BpkBadge type="strong">Jet2</BpkBadge>
                <BpkText textStyle="body-default">19:50 - 22:45</BpkText>
                <BpkText textStyle="caption">BCN - LHR, Direct</BpkText>
              </div>
            </div>

            {/* Price options section */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🎯</span>
                <BpkText textStyle="body-default">Cheapest • Breakfast included • £587/pp</BpkText>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>⭐</span>
                <BpkText textStyle="body-default">Half board • £684/pp</BpkText>
              </div>
            </div>
          </div>
        </BpkCardV2.Primary>

        {/* Secondary Slot (40%) - Pricing and CTA */}
        <BpkCardV2.Secondary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
            {/* Package label */}
            <BpkText textStyle="caption">All inclusive</BpkText>

            {/* Original price with discount */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <BpkText textStyle="body-default">£819</BpkText>
              <BpkText textStyle="body-default" style={{ textDecoration: 'line-through' }}>
                -£90 off
              </BpkText>
            </div>

            {/* Main price */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <BpkText textStyle="heading-1">£729</BpkText>
                <BpkText textStyle="body-default">per person</BpkText>
              </div>
              <BpkText textStyle="caption">£1,458 total</BpkText>
            </div>

            {/* Provider badge */}
            <BpkBadge>Love Holidays</BpkBadge>

            {/* CTA button */}
            <BpkButton fullWidth>Go to site</BpkButton>

            {/* More deals link */}
            <div style={{ marginTop: 'auto' }}>
              <BpkText textStyle="caption">
                8 deals from £587 →
              </BpkText>
            </div>
          </div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  );
}

/**
 * Complex product card with hotel booking details
 */
export const ComplexProductCard: Story = {
  args: {
    ariaLabel: 'Hotel Aiguaclara booking card',
  },
  render: () => <ComplexProductCardComponent />,
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
    <BpkCardV2.Root {...args}>
      <BpkCardV2.Body>Just content, no header or footer required</BpkCardV2.Body>
    </BpkCardV2.Root>
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
    <BpkCardV2.Root {...args}>
      <BpkCardV2.Body split splitRatio={60}>
        <BpkCardV2.Primary>
          <div style={{background: 'rgba(0,0,0,0.05)' }}>Primary (60%)</div>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <div>Secondary (40%)</div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
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
      <BpkCardV2.Root variant="default" bgColor="surfaceDefault">
        <BpkCardV2.Header>Default Shadow</BpkCardV2.Header>
        <BpkCardV2.Body>Card with default shadow variant</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root variant="outlined" bgColor="surfaceDefault">
        <BpkCardV2.Header>Outlined Border</BpkCardV2.Header>
        <BpkCardV2.Body>Card with outlined border variant</BpkCardV2.Body>
      </BpkCardV2.Root>
      <BpkCardV2.Root variant="default" bgColor="surfaceElevated">
        <BpkCardV2.Header>Elevated Surface</BpkCardV2.Header>
        <BpkCardV2.Body>Card with elevated surface color</BpkCardV2.Body>
      </BpkCardV2.Root>
    </div>
  ),
};
