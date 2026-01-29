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


import {
  textColors,
  spacings
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { InformationCircleIcon } from '../../bpk-component-icon';
import BpkLink from '../../bpk-component-link';

import BpkIconLabel, { LABEL_STYLE } from './BpkIconLabel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BpkIconLabel.Root> = {
  title: 'bpk-component-icon-label/BpkIconLabel',
  component: BpkIconLabel.Root,
  argTypes: {
    type: {
      control: 'select',
      options: ['body', 'label1', 'footnote'],
      description: 'Typography variant for the text',
    },
    onDark: {
      control: 'select',
      options: ['true', 'false'],
      description: 'Color scheme variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BpkIconLabel.Root>;

export const Default: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        This is an information message with default styling
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: false,
  },
};

export const WithLink: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>
        Learn more about our{' '}
        <BpkLink href="https://www.skyscanner.net/privacy">
          privacy policy
        </BpkLink>{' '}
        and how we handle your data
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: false,
  },
};

export const TextOnly: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Text>
        This is a text-only message without an icon
      </BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: false,
  },
};

export const LongText: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <BpkIconLabel.Root {...args}>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          This is a longer information message that demonstrates how the
          component handles text wrapping. The icon stays aligned to the first
          line while the text wraps naturally across multiple lines, maintaining
          proper spacing and readability.
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: false,
  },
};

export const TypeBody: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Body typography (16px regular)</BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: false,
  },
};

export const TypeLabel1: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Label 1 typography (16px bold)</BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.label1,
    onDark: false,
  },
};

export const TypeFootnote: Story = {
  render: (args) => (
    <BpkIconLabel.Root {...args}>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Footnote typography (14px regular)</BpkIconLabel.Text>
    </BpkIconLabel.Root>
  ),
  args: {
    type: LABEL_STYLE.footnote,
    onDark: false,
  },
};

export const OnDark: Story = {
  render: (args) => (
    <div style={{ backgroundColor: textColors.textPrimaryDay, padding: spacings.onePixelRem * 16 }}>
      <BpkIconLabel.Root {...args}>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          This message appears on a dark background
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: true,
  },
};

export const OnDarkWithLink: Story = {
  render: (args) => (
    <div style={{ backgroundColor: textColors.textPrimaryDay, padding: spacings.onePixelRem * 16   }}>
      <BpkIconLabel.Root {...args}>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Visit our{' '}
          <BpkLink href="https://www.skyscanner.net">website</BpkLink> to learn
          more
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    </div>
  ),
  args: {
    type: LABEL_STYLE.body,
    onDark: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Default Style</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BpkIconLabel.Root type={LABEL_STYLE.body}>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Body typography (default)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.label1}>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Label 1 typography (default)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Footnote typography (default)</BpkIconLabel.Text>
          </BpkIconLabel.Root>
        </div>
      </div>

      <div style={{ backgroundColor: textColors.textPrimaryDay, padding: spacings.onePixelRem * 16 }}>
        <h3 style={{ color: textColors.textOnDarkDay }}>On-Dark Style</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BpkIconLabel.Root type={LABEL_STYLE.body} onDark>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Body typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.label1} onDark>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Label 1 typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>

          <BpkIconLabel.Root type={LABEL_STYLE.footnote} onDark>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
            <BpkIconLabel.Text>Footnote typography (on-dark)</BpkIconLabel.Text>
          </BpkIconLabel.Root>
        </div>
      </div>
    </div>
  ),
};
