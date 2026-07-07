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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action } from 'bpk-storybook-utils';

import BpkBadge from '../../bpk-component-badge';
import SmallHeartIcon from '../../bpk-component-icon/sm/heart';
import SmallSearchIcon from '../../bpk-component-icon/sm/search';
import {
  BpkFlex,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import BpkPressable from './BpkPressable';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'bpk-component-pressable',
  component: BpkPressable,
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
      description: 'Disables the button (button mode only).',
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

export const ButtonMode = {
  name: 'Button mode (default)',
  render: () => (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.Base}>
        <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
          BpkPressable — button semantics, no visual styling
        </BpkText>
        <BpkFlex gap={BpkSpacing.Base} align="center" wrap="wrap">
          <BpkPressable onClick={action('pressed')}>
            <BpkBadge>Press me</BpkBadge>
          </BpkPressable>
          <BpkPressable onClick={action('icon pressed')} aria-label="Favourite">
            <SmallHeartIcon />
          </BpkPressable>
        </BpkFlex>
        <BpkVStack gap={BpkSpacing.SM}>
          <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>Disabled</BpkText>
          <BpkPressable disabled onClick={action('should not fire')}>
            <BpkBadge>Disabled</BpkBadge>
          </BpkPressable>
        </BpkVStack>
      </BpkVStack>
    </BpkProvider>
  ),
};

export const WithIconAndText = {
  name: 'Icon + text content',
  render: () => (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.LG}>
        <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
          Arbitrary content — icon and text inside BpkPressable
        </BpkText>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
          BpkPressable wraps any content. Use a flex span to align icon and
          text; BpkFlex cannot be used directly inside a button element.
        </BpkText>

        <BpkFlex gap={BpkSpacing.Base} align="center" wrap="wrap">
          {/* icon leading */}
          <BpkPressable onClick={action('search pressed')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <SmallSearchIcon />
              <span>Search flights</span>
            </span>
          </BpkPressable>

          {/* icon trailing */}
          <BpkPressable onClick={action('save pressed')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>Save</span>
              <SmallHeartIcon />
            </span>
          </BpkPressable>

          {/* icon-only with accessible label */}
          <BpkPressable onClick={action('favourite pressed')} aria-label="Add to favourites">
            <SmallHeartIcon />
          </BpkPressable>

          {/* disabled */}
          <BpkPressable disabled onClick={action('should not fire')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <SmallSearchIcon />
              <span>Disabled</span>
            </span>
          </BpkPressable>
        </BpkFlex>
      </BpkVStack>
    </BpkProvider>
  ),
};

export const AnchorMode = {
  name: "Anchor mode (as='a')",
  render: () => (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.Base}>
        <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
          BpkPressable as=a — anchor semantics, no visual link styling
        </BpkText>
        <BpkFlex gap={BpkSpacing.Base} align="center" wrap="wrap">
          <BpkPressable as="a" href="#" onClick={action('link pressed')}>
            <BpkBadge>Navigate</BpkBadge>
          </BpkPressable>
          <BpkPressable as="a" href="#" blank onClick={action('new tab')}>
            Opens in new tab ↗
          </BpkPressable>
        </BpkFlex>
      </BpkVStack>
    </BpkProvider>
  ),
};

export const WhenToUse = {
  name: 'When to use',
  render: () => (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.LG}>
        <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
          Choosing the right primitive
        </BpkText>
        <table style={{ borderCollapse: 'collapse', inlineSize: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'start', padding: '0.5rem', borderBlock: '1px solid #ccc' }}>Use</th>
              <th style={{ textAlign: 'start', padding: '0.5rem', borderBlock: '1px solid #ccc' }}>When</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['BpkButton', 'Styled button — primary, secondary, destructive actions'],
              ['BpkLink', 'Styled anchor or button with link appearance'],
              ['BpkCard', 'Surface card with elevation / padding that is itself pressable'],
              ['BpkPressable (default)', 'Any content needing button semantics without button styling'],
              ["BpkPressable as='a'", 'Any content needing anchor semantics without link styling'],
              ['<button>', 'Private implementation detail inside a Backpack component only'],
              ['<a>', 'Private implementation detail inside a Backpack component only'],
            ].map(([component, description]) => (
              <tr key={component} style={{ borderBlockEnd: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{component}</td>
                <td style={{ padding: '0.5rem' }}>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BpkVStack>
    </BpkProvider>
  ),
};

export const VisualTest = {
  render: () => (
    <BpkProvider>
      <BpkVStack gap={BpkSpacing.Base}>
        <BpkPressable onClick={action('pressed')}>
          <BpkBadge>BpkPressable (button)</BpkBadge>
        </BpkPressable>
        <BpkPressable disabled>
          <BpkBadge>BpkPressable disabled</BpkBadge>
        </BpkPressable>
        <BpkPressable onClick={action('icon+text pressed')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <SmallSearchIcon />
            <span>Search flights</span>
          </span>
        </BpkPressable>
        <BpkPressable onClick={action('icon-only pressed')} aria-label="Add to favourites">
          <SmallHeartIcon />
        </BpkPressable>
        <BpkPressable as="a" href="#">
          <BpkBadge>BpkPressable (anchor)</BpkBadge>
        </BpkPressable>
        <BpkPressable as="a" href="#" blank>
          <BpkBadge>BpkPressable anchor blank</BpkBadge>
        </BpkPressable>
        <BpkPressable as="a" href="#">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <SmallSearchIcon />
            <span>Anchor with icon</span>
          </span>
        </BpkPressable>
      </BpkVStack>
    </BpkProvider>
  ),
};
