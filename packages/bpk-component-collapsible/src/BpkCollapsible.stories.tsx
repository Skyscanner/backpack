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

import { surfaceContrastDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkCardV2 } from '../../bpk-component-card';
import { withButtonAlignment } from '../../bpk-component-icon';
import AirportsIcon from '../../bpk-component-icon/sm/airports';
import ChevronDownIcon from '../../bpk-component-icon/sm/chevron-down';
import {
  BpkFlex,
  BpkProvider,
  BpkSpacing,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import BpkCollapsible from './BpkCollapsible';

import type { Meta } from '@storybook/react';

const ChevronIcon = withButtonAlignment(ChevronDownIcon);
const LeadingIcon = withButtonAlignment(AirportsIcon);

const triggerRowStyle = {
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem',
  width: '100%',
};
const titleStyle = { flexGrow: 1 };
const contentPaddingStyle = { paddingTop: '0.5rem' };
const showMoreContainerStyle = { width: '20rem' };

const Basic = () => (
  <BpkCollapsible.Root>
    <BpkCollapsible.Trigger>
      <span style={triggerRowStyle}>
        <span style={titleStyle}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
        </span>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </span>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <div style={contentPaddingStyle}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Hidden contents revealed when the trigger is activated.
        </BpkText>
      </div>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const WithIconAndLabel = () => (
  <BpkCollapsible.Root defaultOpen>
    <BpkCollapsible.Trigger>
      <span style={triggerRowStyle}>
        <LeadingIcon />
        <span style={titleStyle}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
        </span>
        <BpkText textStyle={TEXT_STYLES.label2}>Label</BpkText>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </span>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <div style={contentPaddingStyle}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Description text inside the collapsible.
        </BpkText>
      </div>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const onContrastWrapperStyle = {
  background: surfaceContrastDay,
  borderRadius: '0.5rem',
  padding: '1rem',
};
const OnContrast = () => (
  <div style={onContrastWrapperStyle}>
    <BpkCollapsible.Root variant="onContrast" defaultOpen>
      <BpkCollapsible.Trigger>
        <span style={triggerRowStyle}>
          <span style={titleStyle}>
            <BpkText textStyle={TEXT_STYLES.heading5}>
              Title on contrast
            </BpkText>
          </span>
          <BpkCollapsible.Indicator>
            <ChevronIcon />
          </BpkCollapsible.Indicator>
        </span>
      </BpkCollapsible.Trigger>
      <BpkCollapsible.Content>
        <div style={contentPaddingStyle}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Contents in the on-contrast variant.
          </BpkText>
        </div>
      </BpkCollapsible.Content>
    </BpkCollapsible.Root>
  </div>
);

const InsideCard = () => (
  <BpkCardV2.Root>
    <BpkCardV2.Body>
      <BpkCollapsible.Root>
        <BpkCollapsible.Trigger>
          <span style={triggerRowStyle}>
            <LeadingIcon />
            <span style={titleStyle}>
              <BpkText textStyle={TEXT_STYLES.heading5}>Card title</BpkText>
            </span>
            <BpkCollapsible.Indicator>
              <ChevronIcon />
            </BpkCollapsible.Indicator>
          </span>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>
          <div style={contentPaddingStyle}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Drops inside BpkCardV2 without imposing extra padding or borders.
            </BpkText>
          </div>
        </BpkCollapsible.Content>
      </BpkCollapsible.Root>
    </BpkCardV2.Body>
  </BpkCardV2.Root>
);

const Controlled = () => {
  const [open, setOpen] = useState(false);
  return (
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <button type="button" onClick={() => setOpen((value) => !value)}>
        External toggle ({open ? 'open' : 'closed'})
      </button>
      <BpkCollapsible.Root
        open={open}
        onOpenChange={({ open: nextOpen }) => setOpen(nextOpen)}
      >
        <BpkCollapsible.Trigger>
          <span style={triggerRowStyle}>
            <span style={titleStyle}>
              <BpkText textStyle={TEXT_STYLES.heading5}>Controlled</BpkText>
            </span>
            <BpkCollapsible.Indicator>
              <ChevronIcon />
            </BpkCollapsible.Indicator>
          </span>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>
          <div style={contentPaddingStyle}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Open state mirrored to a button outside the collapsible.
            </BpkText>
          </div>
        </BpkCollapsible.Content>
      </BpkCollapsible.Root>
    </BpkFlex>
  );
};

const LazyMount = () => (
  <BpkCollapsible.Root lazyMount unmountOnExit>
    <BpkCollapsible.Trigger>
      <span style={triggerRowStyle}>
        <span style={titleStyle}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Lazy mount</BpkText>
        </span>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </span>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <div style={contentPaddingStyle}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Children are mounted only when the section is expanded.
        </BpkText>
      </div>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const ShowMore = () => (
  <div style={showMoreContainerStyle}>
    <BpkCollapsible.Root collapsedHeight="3rem">
      <BpkCollapsible.Content>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
        </BpkText>
      </BpkCollapsible.Content>
      <BpkCollapsible.Trigger>
        <BpkText textStyle={TEXT_STYLES.label2}>Show more</BpkText>
      </BpkCollapsible.Trigger>
    </BpkCollapsible.Root>
  </div>
);

const LongContent = () => (
  <BpkCollapsible.Root defaultOpen>
    <BpkCollapsible.Trigger>
      <span style={triggerRowStyle}>
        <span style={titleStyle}>
          <BpkText textStyle={TEXT_STYLES.heading5}>Long content</BpkText>
        </span>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </span>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <div style={contentPaddingStyle}>
        {Array.from({ length: 6 }, (_, index) => (
          <BpkText
            key={`paragraph-${index}`}
            textStyle={TEXT_STYLES.bodyDefault}
            tagName="p"
          >
            Paragraph {index + 1}: longer body text used to verify the
            expand/collapse animation works smoothly with substantial content.
          </BpkText>
        ))}
      </div>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const VisualTest = () => (
  <BpkFlex direction="column" gap={BpkSpacing.Base}>
    <Basic />
    <WithIconAndLabel />
    <InsideCard />
    <ShowMore />
    <LongContent />
  </BpkFlex>
);

const meta = {
  title: 'bpk-component-collapsible',
  component: BpkCollapsible.Root,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
} satisfies Meta;

export default meta;

export const Default = { render: () => <Basic /> };
export const WithIconLabelAndChevron = { render: () => <WithIconAndLabel /> };
export const OnContrastVariant = { render: () => <OnContrast /> };
export const NestedInCard = { render: () => <InsideCard /> };
export const ControlledMode = { render: () => <Controlled /> };
export const LazyMountUnmountOnExit = { render: () => <LazyMount /> };
export const CollapsedHeightShowMore = { render: () => <ShowMore /> };
export const LongContentExample = { render: () => <LongContent /> };
export const VisualTestComposite = { render: () => <VisualTest /> };
