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

import BpkLink from '../index';

import {
  LinkExample,
  ImplicitLinkExample,
  LinkAlternativeExample,
  LinkAlternativeImplicitExample,
  MixedExample,
  PolymorphicOverviewExample,
} from './examples';

export default {
  title: 'bpk-component-link',
  component: BpkLink,
  argTypes: {
    alternate: {
      control: 'boolean',
      description: 'Use alternate (light) styling for dark backgrounds.',
      defaultValue: { summary: 'false' },
    },
    as: {
      control: 'select',
      options: ['a', 'button', 'span', 'div'],
      description: 'The element type of HTML to render.',
      table: {
        type: { summary: 'a | button | span | div' },
        defaultValue: { summary: 'a' },
      },
    },
    blank: {
      control: 'boolean',
      description: 'Opens link in a new tab/window (only when as="a").',
      defaultValue: { summary: 'false' },
    },
    children: {
      control: 'text',
      description: 'The content of the link.',
      type: { name: 'ReactNode', required: true },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply.',
      table: { type: { summary: 'string | null' } },
    },
    href: {
      control: 'text',
      description: 'The URL the link points to (only when as="a").',
      type: { name: 'string | null', required: true },
    },
    implicit: {
      control: 'boolean',
      description: 'Use implicit styling (no underline until hover).',
      defaultValue: { summary: 'false' },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function triggered when the link is clicked.',
      table: { type: { summary: '(event: MouseEvent) => void' } },
    },
  },
  args: {
    as: 'a',
    children: 'Link text',
    href: '#',
    alternate: false,
    blank: false,
    implicit: false,
  },
};

// Basic Examples
export const Link = LinkExample;
export const LinkImplicit = ImplicitLinkExample;

// Alternate (Dark Background)
export const Alternate = LinkAlternativeExample;
export const AlternateImplicit = LinkAlternativeImplicitExample;

// Polymorphic "as" Prop Examples
export const PolymorphicOverview = PolymorphicOverviewExample;

// Visual Tests
export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
