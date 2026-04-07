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

import { action, BpkDarkExampleWrapper } from '../../../examples/bpk-storybook-utils';
import BpkPanel from '../../bpk-component-panel';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.

import BpkLink from './BpkLink';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLink.stories.module.scss';

const getClassName = cssModules(STYLES);

const LinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')}>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')}>
      Link #2
    </BpkLink>
  </div>
);

const ImplicitLinkExample = () => (
  <div>
    <BpkLink href="#" onClick={action('#1 clicked')} implicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} implicit>
      Link #2
    </BpkLink>
  </div>
);

const LinkAlternativeExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const LinkAlternativeImplicitExample = () => (
  <BpkDarkExampleWrapper>
    <BpkLink href="#" onClick={action('#1 clicked')} alternate implicit>
      Link #1
    </BpkLink>
    <br />
    <BpkLink href="#" onClick={action('#2 clicked')} alternate implicit>
      Link #2
    </BpkLink>
  </BpkDarkExampleWrapper>
);

const PolymorphicOverviewExample = () => (
  <div className={getClassName('bpk-link-example__section')}>
    <div>
      <BpkText tagName="h3" textStyle={TEXT_STYLES.heading3}>
        Polymorphic BpkLink
      </BpkText>
      <BpkText
        tagName="p"
        textStyle={TEXT_STYLES.bodyDefault}
      >
        BpkLink supports a polymorphic{' '}
        <BpkText textStyle={TEXT_STYLES.label1}>as</BpkText> prop that allows
        rendering as different HTML elements while maintaining consistent link
        styling. Use the appropriate element based on the use case:
      </BpkText>
    </div>

    <div className={getClassName('bpk-link-example__cards')}>
      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="a" (default)`}
        </BpkText>
        <div className={getClassName('bpk-link-example__card-description')}>
          <BpkText
            tagName="p"
            textStyle={TEXT_STYLES.caption}
            color={TEXT_COLORS.textSecondary}
          >
            For navigation
          </BpkText>
        </div>
        <BpkLink href="#">Click to navigate</BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="button"`}
        </BpkText>
        <div className={getClassName('bpk-link-example__card-description')}>
          <BpkText
            tagName="p"
            textStyle={TEXT_STYLES.caption}
            color={TEXT_COLORS.textSecondary}
          >
            For actions without navigation
          </BpkText>
        </div>
        <BpkLink as="button" onClick={action('Action triggered')}>
          Trigger action
        </BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="span"`}
        </BpkText>
        <div className={getClassName('bpk-link-example__card-description')}>
          <BpkText
            tagName="p"
            textStyle={TEXT_STYLES.caption}
            color={TEXT_COLORS.textSecondary}
          >
            Non-interactive inline text
          </BpkText>
        </div>
        <BpkLink as="span">Static inline text</BpkLink>
      </BpkPanel>

      <BpkPanel>
        <BpkText tagName="h4" textStyle={TEXT_STYLES.heading5}>
          {`as="div"`}
        </BpkText>
        <div className={getClassName('bpk-link-example__card-description')}>
          <BpkText
            tagName="p"
            textStyle={TEXT_STYLES.caption}
            color={TEXT_COLORS.textSecondary}
          >
            Non-interactive block element
          </BpkText>
        </div>
        <BpkLink as="div">Static block text</BpkLink>
      </BpkPanel>
    </div>
  </div>
);

const MixedExample = () => (
  <div>
    <LinkExample />
    <ImplicitLinkExample />
    <LinkAlternativeExample />
    <LinkAlternativeImplicitExample />
  </div>
);

const meta = {
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
      type: { name: 'other', value: 'ReactNode', required: true },
    },
    href: {
      control: 'text',
      description: 'The URL the link points to (only when as="a").',
      type: { name: 'other', value: 'string | null', required: true },
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
} satisfies Meta;

export default meta;

export const Link = {
  render: () => <LinkExample />,
};

export const LinkImplicit = {
  render: () => <ImplicitLinkExample />,
};

export const Alternate = {
  render: () => <LinkAlternativeExample />,
};

export const AlternateImplicit = {
  render: () => <LinkAlternativeImplicitExample />,
};

export const PolymorphicOverview = {
  render: () => <PolymorphicOverviewExample />,
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
