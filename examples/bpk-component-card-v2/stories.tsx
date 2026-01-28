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

import type { Meta, StoryObj } from '@storybook/react';
import BpkCardV2 from '../../packages/bpk-component-card-v2/src/BpkCardV2/BpkCardV2';

type BpkCardV2Meta = Meta<typeof BpkCardV2>;

const meta: BpkCardV2Meta = {
  title: 'BpkCardV2',
  component: BpkCardV2,
  parameters: {
    docs: {
      description: {
        component:
          'BpkCardV2 is a composable, responsive card component that supports multi-section layouts, explicit composition, and flexible surface colour theming.',
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
      description: 'Background surface colour token',
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
      <BpkCardV2.Body>This card uses the elevated surface colour for emphasis and visual hierarchy.</BpkCardV2.Body>
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
 * Complex product card layout combining multiple features
 */
export const ComplexProductCard: Story = {
  args: {
    variant: 'default',
    bgColor: 'surfaceDefault',
    ariaLabel: 'Product card example',
  },
  render: (args) => (
    <BpkCardV2 {...args}>
      <BpkCardV2.Header>
        <h2 style={{ margin: 0 }}>Premium Package</h2>
      </BpkCardV2.Header>
      <BpkCardV2.Body split splitRatio={60}>
        <BpkCardV2.Primary>
          <div style={{ padding: '1rem' }}>
            <img
              src="https://via.placeholder.com/200"
              alt="Product"
              style={{ width: '100%', borderRadius: '0.5rem' }}
            />
          </div>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <div style={{ padding: '1rem' }}>
            <h3>€299/month</h3>
            <p>
              <strong>Features:</strong>
            </p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </BpkCardV2.Secondary>
      </BpkCardV2.Body>
      <BpkCardV2.Footer>
        <button style={{ padding: '0.5rem 1rem' }}>Select Package</button>
      </BpkCardV2.Footer>
    </BpkCardV2>
  ),
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
      <BpkCardV2.Header>Custom Split (40/60)</BpkCardV2.Header>
      <BpkCardV2.Body split splitRatio={40}>
        <BpkCardV2.Primary>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.05)' }}>Primary (40%)</div>
        </BpkCardV2.Primary>
        <BpkCardV2.Secondary>
          <div style={{ padding: '1rem' }}>Secondary (60%)</div>
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
        <BpkCardV2.Body>Card with elevated surface colour</BpkCardV2.Body>
      </BpkCardV2>
    </div>
  ),
};
