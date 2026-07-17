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

import { ArgTypes, Markdown } from '@storybook/addon-docs/blocks';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from 'bpk-storybook-utils';


import BpkBadge from '../../bpk-component-badge';
import { withButtonAlignment } from '../../bpk-component-icon';
import SmallHeartIcon from '../../bpk-component-icon/sm/heart';
import SmallSearchIcon from '../../bpk-component-icon/sm/search';
import {
  BpkFlex,
  BpkProvider,
  BpkSpacing,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import readme from '../README.md';

import BpkPressable from './BpkPressable';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'bpk-component-pressable',
  component: BpkPressable,
  parameters: {
    docs: {
      page: () => (
        <>

          <Markdown>{readme}</Markdown>
          <ArgTypes exclude={['zoomEnabled']} />
        </>
      ),
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: 'The underlying HTML element to render.',
      table: {
        type: { summary: 'button | a' },
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables interactions. Button: native disabled. Anchor: aria-disabled + prevents navigation.',
      defaultValue: { summary: 'false' },
    },
    href: {
      control: 'text',
      description: 'The URL to navigate to (anchor mode only).',
    },
    blank: {
      control: 'boolean',
      description: 'Open in a new tab (anchor mode only).',
      defaultValue: { summary: 'false' },
    },
  },
} satisfies Meta;

export default meta;

const AlignedSearchIcon = withButtonAlignment(SmallSearchIcon);

const ButtonModeExample = () => (
  <BpkProvider>
    <BpkFlex gap={BpkSpacing.LG} align="center" wrap="wrap">
      <BpkPressable onClick={action('text pressed')}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>Explore</BpkText>
      </BpkPressable>

      <BpkPressable onClick={action('badge pressed')}>
        <BpkBadge>Track prices</BpkBadge>
      </BpkPressable>

      <BpkPressable onClick={action('icon pressed')} aria-label="Favourite">
        <SmallHeartIcon />
      </BpkPressable>

      <BpkPressable onClick={action('icon+text pressed')}>
        <AlignedSearchIcon />
        &nbsp;
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>Search flights</BpkText>
      </BpkPressable>

      <BpkPressable disabled onClick={action('should not fire')}>
        Disabled
      </BpkPressable>
    </BpkFlex>
  </BpkProvider>
);

const AnchorModeExample = () => (
  <BpkProvider>
    <BpkFlex gap={BpkSpacing.LG} align="center" wrap="wrap">
      <BpkPressable as="a" href="#" onClick={action('link pressed')}>
        <BpkBadge>Navigate</BpkBadge>
      </BpkPressable>
      <BpkPressable as="a" href="#" blank onClick={action('new tab')}>
        Opens in new tab ↗
      </BpkPressable>
      <BpkPressable as="a" href="#" disabled onClick={action('disabled link')}>
        <BpkBadge>Disabled link</BpkBadge>
      </BpkPressable>
    </BpkFlex>
  </BpkProvider>
);

const MixedExample = () => (
  <>
    <ButtonModeExample />
    <AnchorModeExample />
  </>
);

export const ButtonMode = {
  name: 'Button mode (default)',
  render: () => <ButtonModeExample />,
};

export const AnchorMode = {
  name: "Anchor mode (as='a')",
  render: () => <AnchorModeExample />,
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
