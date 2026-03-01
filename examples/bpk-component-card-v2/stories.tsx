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

import BpkCardV2 from '../../packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPrice from '../../packages/bpk-component-price/src/BpkPrice';

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
      options: ['default', 'outlined', 'noElevation'],
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
      <BpkCardV2.Body split>
        <BpkCardV2.Primary>
          Primary slot
        </BpkCardV2.Primary>

        <BpkCardV2.Secondary>
          <BpkPrice
              previousPrice="£819"
              price="£729"
              leadingText="£90 off"
              trailingText="per person"
            />
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
      <BpkCardV2.Footer padding='md'>
        <BpkCardV2.Root bgColor="surfaceLowContrast" variant='noElevation'>
          <BpkCardV2.Body>
            Cheapest!
          </BpkCardV2.Body>
        </BpkCardV2.Root>
      </BpkCardV2.Footer>
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
