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

import { textOnDarkDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button';
import { BpkCardV2 } from '../../bpk-component-card';
import AirportsIcon from '../../bpk-component-icon/sm/airports';
import ChevronDownIcon from '../../bpk-component-icon/sm/chevron-down';
import {
  BpkBox,
  BpkHStack,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import BpkCollapsible from './BpkCollapsible';
import { COLLAPSIBLE_VARIANTS } from './common-types';
import useBpkCollapsible from './useBpkCollapsible';

import type { Meta } from '@storybook/react';

import STYLES from './BpkCollapsible.stories.module.scss';

// Icons sit inline as flex children of the trigger button. Skip
// withButtonAlignment — its margin-top is calculated for inline alignment with
// a button's line-height and visually offsets icons when combined with
// `align-items: center` in a flex container.
const ChevronIcon = ChevronDownIcon;
const LeadingIcon = AirportsIcon;
const getClassName = cssModules(STYLES);
const SHOW_MORE_COLLAPSED_HEIGHT = '3.5rem';

// BpkCollapsible.Trigger is itself the flex row (display: flex / align-items:
// center / gap / inline-size: 100%) and BpkCollapsible.Indicator pulls itself
// to the end via auto margin, so contents drop in directly. Don't wrap them
// in BpkFlex / BpkHStack: the Trigger renders a <button> and HTML5 only
// allows phrasing content inside it; Bpk layout components render <div>s,
// which browsers silently reparent. See
// .claude/guidelines/bpk-layout-components.md ("Inside a <button> element").

const Basic = () => (
  <BpkCollapsible.Root>
    <BpkCollapsible.Trigger>
      <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <BpkBox paddingTop={BpkSpacing.SM}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Hidden contents revealed when the trigger is activated.
        </BpkText>
      </BpkBox>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const WithIconAndLabel = () => (
  <BpkCollapsible.Root defaultOpen>
    <BpkCollapsible.Trigger>
      <LeadingIcon />
      <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
      <BpkText textStyle={TEXT_STYLES.label2}>Label</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <BpkBox paddingTop={BpkSpacing.SM}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Description text inside the collapsible.
        </BpkText>
      </BpkBox>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const OnContrast = () => (
  // BpkBox does not expose borderRadius (intentional — see BpkLayout
  // commonProps). The contrasting surface itself is provided via
  // backgroundColor="surface-contrast".
  <BpkBox backgroundColor="surface-contrast" padding={BpkSpacing.Base}>
    <BpkCollapsible.Root variant={COLLAPSIBLE_VARIANTS.onContrast} defaultOpen>
      <BpkCollapsible.Trigger>
        <BpkText textStyle={TEXT_STYLES.heading5}>Title on contrast</BpkText>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </BpkCollapsible.Trigger>
      <BpkCollapsible.Content>
        <BpkBox paddingTop={BpkSpacing.SM}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Contents in the on-contrast variant.
          </BpkText>
        </BpkBox>
      </BpkCollapsible.Content>
    </BpkCollapsible.Root>
  </BpkBox>
);

const OnContrastWithLeadingIcon = () => (
  <BpkBox backgroundColor="surface-contrast" padding={BpkSpacing.Base}>
    <BpkCollapsible.Root variant={COLLAPSIBLE_VARIANTS.onContrast} defaultOpen>
      <BpkCollapsible.Trigger>
        <LeadingIcon fill={textOnDarkDay} />
        <BpkText textStyle={TEXT_STYLES.heading5}>
          Leading icon on contrast
        </BpkText>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </BpkCollapsible.Trigger>
      <BpkCollapsible.Content>
        <BpkBox paddingTop={BpkSpacing.SM}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault}>
            Leading accessories on contrast need an explicit on-dark fill.
          </BpkText>
        </BpkBox>
      </BpkCollapsible.Content>
    </BpkCollapsible.Root>
  </BpkBox>
);

const InsideCard = () => (
  // BpkCardV2.Root has no intrinsic width, so the card resizes to fit its
  // tallest/widest child. Constraining the wrapper width keeps the card a
  // stable size as the collapsible expands, matching how cards are used in
  // product layouts.
  <BpkBox width="25rem">
    <BpkCardV2.Root>
      <BpkCardV2.Body>
        <BpkCollapsible.Root>
          <BpkCollapsible.Trigger>
            <LeadingIcon />
            <BpkText textStyle={TEXT_STYLES.heading5}>Card title</BpkText>
            <BpkCollapsible.Indicator>
              <ChevronIcon />
            </BpkCollapsible.Indicator>
          </BpkCollapsible.Trigger>
          <BpkCollapsible.Content>
            <BpkBox paddingTop={BpkSpacing.SM}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Drops inside BpkCardV2 without imposing extra padding or
                borders.
              </BpkText>
            </BpkBox>
          </BpkCollapsible.Content>
        </BpkCollapsible.Root>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </BpkBox>
);

const NestedInsideCard = () => (
  // Same width-constraint as InsideCard: BpkCardV2.Root has no intrinsic
  // width, so the wrapper sets a stable size for both expand states.
  <BpkBox width="25rem">
    <BpkCardV2.Root>
      <BpkCardV2.Body>
        <BpkCollapsible.Root defaultOpen>
          <BpkCollapsible.Trigger>
            <LeadingIcon />
            <BpkText textStyle={TEXT_STYLES.heading5}>Filters</BpkText>
            <BpkCollapsible.Indicator>
              <ChevronIcon />
            </BpkCollapsible.Indicator>
          </BpkCollapsible.Trigger>
          <BpkCollapsible.Content>
            <BpkVStack
              paddingTop={BpkSpacing.SM}
              gap={BpkSpacing.SM}
              alignItems="flex-start"
            >
              <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                Outer collapsible content. Use it for the main section copy.
              </BpkText>
              <BpkCollapsible.Root>
                <BpkCollapsible.Trigger>
                  <BpkText textStyle={TEXT_STYLES.label1}>
                    Advanced filters
                  </BpkText>
                  <BpkCollapsible.Indicator>
                    <ChevronIcon />
                  </BpkCollapsible.Indicator>
                </BpkCollapsible.Trigger>
                <BpkCollapsible.Content>
                  <BpkBox paddingTop={BpkSpacing.SM}>
                    <BpkText textStyle={TEXT_STYLES.bodyDefault}>
                      Inner collapsible content. Each level keeps its own open
                      state, so toggling the inner section does not affect the
                      outer one.
                    </BpkText>
                  </BpkBox>
                </BpkCollapsible.Content>
              </BpkCollapsible.Root>
            </BpkVStack>
          </BpkCollapsible.Content>
        </BpkCollapsible.Root>
      </BpkCardV2.Body>
    </BpkCardV2.Root>
  </BpkBox>
);

const Controlled = () => {
  const [open, setOpen] = useState(false);
  return (
    <BpkVStack gap={BpkSpacing.SM} alignItems="flex-start">
      <BpkButton
        type={BUTTON_TYPES.secondary}
        onClick={() => setOpen((value) => !value)}
      >
        External toggle ({open ? 'open' : 'closed'})
      </BpkButton>
      <BpkCollapsible.Root
        open={open}
        onOpenChange={({ open: nextOpen }) => setOpen(nextOpen)}
      >
        <BpkCollapsible.Trigger>
          <BpkText textStyle={TEXT_STYLES.heading5}>Controlled</BpkText>
          <BpkCollapsible.Indicator>
            <ChevronIcon />
          </BpkCollapsible.Indicator>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>
          <BpkBox paddingTop={BpkSpacing.SM}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Open state mirrored to a button outside the collapsible.
            </BpkText>
          </BpkBox>
        </BpkCollapsible.Content>
      </BpkCollapsible.Root>
    </BpkVStack>
  );
};

const LazyMount = () => (
  <BpkCollapsible.Root lazyMount unmountOnExit>
    <BpkCollapsible.Trigger>
      <BpkText textStyle={TEXT_STYLES.heading5}>Lazy mount</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <BpkBox paddingTop={BpkSpacing.SM}>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          Children are mounted only when the section is expanded.
        </BpkText>
      </BpkBox>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const ShowMore = () => (
  <BpkBox width="20rem">
    <BpkCollapsible.Root collapsedHeight={SHOW_MORE_COLLAPSED_HEIGHT}>
      <BpkCollapsible.Content>
        <div className={getClassName('bpk-collapsible-story__show-more-copy')}>
          <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.`}
          </BpkText>
        </div>
      </BpkCollapsible.Content>
      <BpkCollapsible.Trigger>
        <BpkText textStyle={TEXT_STYLES.label2}>Show more</BpkText>
      </BpkCollapsible.Trigger>
    </BpkCollapsible.Root>
  </BpkBox>
);

const LongContent = () => (
  <BpkCollapsible.Root defaultOpen>
    <BpkCollapsible.Trigger>
      <BpkText textStyle={TEXT_STYLES.heading5}>Long content</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>
      <BpkVStack
        paddingTop={BpkSpacing.SM}
        gap={BpkSpacing.SM}
        alignItems="flex-start"
      >
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
      </BpkVStack>
    </BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

const Disabled = () => (
  <BpkVStack gap={BpkSpacing.Base}>
    <BpkCollapsible.Root disabled>
      <BpkCollapsible.Trigger>
        <BpkText textStyle={TEXT_STYLES.heading5}>Disabled</BpkText>
        <BpkCollapsible.Indicator>
          <ChevronIcon />
        </BpkCollapsible.Indicator>
      </BpkCollapsible.Trigger>
      <BpkCollapsible.Content>Hidden while disabled</BpkCollapsible.Content>
    </BpkCollapsible.Root>

    <BpkBox backgroundColor="surface-contrast" padding={BpkSpacing.Base}>
      <BpkCollapsible.Root
        variant={COLLAPSIBLE_VARIANTS.onContrast}
        defaultOpen
        disabled
      >
        <BpkCollapsible.Trigger>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            Disabled on contrast
          </BpkText>
          <BpkCollapsible.Indicator>
            <ChevronIcon />
          </BpkCollapsible.Indicator>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>
          <BpkBox paddingTop={BpkSpacing.SM}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Visible content uses the disabled on-dark color token.
            </BpkText>
          </BpkBox>
        </BpkCollapsible.Content>
      </BpkCollapsible.Root>
    </BpkBox>
  </BpkVStack>
);

const RootProviderWithStateMachine = () => {
  const collapsible = useBpkCollapsible();
  const { disabled, open, setOpen, visible } = collapsible;

  return (
    <BpkVStack gap={BpkSpacing.Base} alignItems="flex-start">
      <BpkVStack gap={BpkSpacing.SM} alignItems="flex-start">
        <BpkText textStyle={TEXT_STYLES.label1}>State machine values</BpkText>
        <pre>{JSON.stringify({ open, visible, disabled }, null, 2)}</pre>
      </BpkVStack>

      <BpkVStack gap={BpkSpacing.SM} alignItems="flex-start">
        <BpkText textStyle={TEXT_STYLES.label1}>External controls</BpkText>
        <BpkText textStyle={TEXT_STYLES.bodyDefault}>
          These buttons drive the same machine instance via the hook API.
        </BpkText>
        <BpkHStack gap={BpkSpacing.SM}>
          <BpkButton
            type={BUTTON_TYPES.secondary}
            onClick={() => setOpen(true)}
          >
            Open
          </BpkButton>
          <BpkButton
            type={BUTTON_TYPES.secondary}
            onClick={() => setOpen(false)}
          >
            Close
          </BpkButton>
          <BpkButton
            type={BUTTON_TYPES.secondary}
            onClick={() => setOpen(!open)}
          >
            Toggle
          </BpkButton>
        </BpkHStack>
      </BpkVStack>

      <BpkCollapsible.RootProvider value={collapsible}>
        <BpkCollapsible.Trigger>
          <BpkText textStyle={TEXT_STYLES.heading5}>
            RootProvider with hook
          </BpkText>
          <BpkCollapsible.Indicator>
            <ChevronIcon />
          </BpkCollapsible.Indicator>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>
          <BpkBox paddingTop={BpkSpacing.SM}>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Consumers own the machine via useBpkCollapsible and pass it to
              RootProvider, exposing open, visible, disabled, and setOpen.
            </BpkText>
          </BpkBox>
        </BpkCollapsible.Content>
      </BpkCollapsible.RootProvider>
    </BpkVStack>
  );
};

const VisualTest = () => (
  <BpkVStack gap={BpkSpacing.Base}>
    <Basic />
    <WithIconAndLabel />
    <OnContrastWithLeadingIcon />
    <InsideCard />
    <Disabled />
    <ShowMore />
    <LongContent />
  </BpkVStack>
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
export const OnContrastWithLeadingIconStory = {
  render: () => <OnContrastWithLeadingIcon />,
};
export const NestedInCard = { render: () => <InsideCard /> };
export const NestedCollapsibleInCard = {
  render: () => <NestedInsideCard />,
};
export const ControlledMode = { render: () => <Controlled /> };
export const RootProviderWithUseBpkCollapsible = {
  render: () => <RootProviderWithStateMachine />,
};
export const LazyMountUnmountOnExit = { render: () => <LazyMount /> };
export const DisabledState = { render: () => <Disabled /> };
export const CollapsedHeightShowMore = { render: () => <ShowMore /> };
export const LongContentExample = { render: () => <LongContent /> };
export const VisualTestComposite = { render: () => <VisualTest /> };
