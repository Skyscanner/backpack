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

import { Menu, Portal } from '@ark-ui/react';

import { withRtlSupport } from '../../bpk-component-icon';
import ChevronRightIconBase from '../../bpk-component-icon/sm/chevron-right';
import HeartIcon from '../../bpk-component-icon/sm/heart';
import PlusIcon from '../../bpk-component-icon/sm/plus';
import { BpkProvider } from '../../bpk-component-layout';
import { cssModules } from '../../bpk-react-utils';

import BpkContextMenu from './BpkContextMenu';
import { CONTEXT_MENU_ITEM_VARIANTS } from './common-types';


import type { Meta } from '@storybook/react';

import STYLES from './BpkContextMenu.module.scss';

const ChevronRightIcon = withRtlSupport(ChevronRightIconBase);

const getClassName = cssModules(STYLES);

// Story-only trigger button. A native <button> is used because asChild requires
// the direct child of BpkContextMenu.Trigger to be a DOM element or a
// forwardRef component. In production, consumers supply their own trigger
// (e.g. the GC heart button) which manages its own focus styles.
const TriggerFocusStyle = () => (
  <style>{`
    .bpk-context-menu-story-trigger {
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
      display: inline-flex;
      align-items: center;
      outline: none;
    }
  `}</style>
);

const DefaultExample = () => (
  <BpkProvider>
    <TriggerFocusStyle />
    <BpkContextMenu.Root>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas">
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const NoTripsExample = () => (
  <BpkProvider>
    <TriggerFocusStyle />
    <BpkContextMenu.Root>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const WithDestructiveItemExample = () => (
  <BpkProvider>
    <TriggerFocusStyle />
    <BpkContextMenu.Root>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.Item
          value="remove"
          variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
        >
          Remove
        </BpkContextMenu.Item>
        {/* Nested submenu — uses Ark UI primitives directly until
            BpkContextMenu.Sub is implemented */}
        <Menu.Root>
          <Menu.TriggerItem className={getClassName('bpk-context-menu__item')}>
            Move
            <ChevronRightIcon />
          </Menu.TriggerItem>
          <Portal>
            <Menu.Positioner className={getClassName('bpk-context-menu__positioner')}>
              <Menu.Content className={getClassName('bpk-context-menu__content')}>
                <Menu.Item className={getClassName('bpk-context-menu__item')} value="move-tokyo">Tokyo 2026</Menu.Item>
                <Menu.Item className={getClassName('bpk-context-menu__item')} value="move-christmas">Christmas shopping</Menu.Item>
                <Menu.Item className={getClassName('bpk-context-menu__item')} value="move-relax">Relax</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const WithDisabledItemExample = () => (
  <BpkProvider>
    <TriggerFocusStyle />
    <BpkContextMenu.Root>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas" disabled>
            Christmas shopping (full)
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const LongListExample = () => (
  <BpkProvider>
    <TriggerFocusStyle />
    <BpkContextMenu.Root>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          {Array.from({ length: 12 }, (_, i) => (
            <BpkContextMenu.Item key={i} value={`trip-${i}`}>
              {`Trip ${i + 1}`}
            </BpkContextMenu.Item>
          ))}
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

// Open by default so Percy captures the popover in visual regression runs.
const OpenByDefaultExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root defaultOpen>
      <BpkContextMenu.Trigger>
        <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
          <HeartIcon />
        </button>
      </BpkContextMenu.Trigger>
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas">
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const meta = {
  title: 'bpk-component-context-menu',
  component: BpkContextMenu.Root,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const NoTrips = {
  render: () => <NoTripsExample />,
};

export const WithDestructiveItem = {
  render: () => <WithDestructiveItemExample />,
};

export const WithDisabledItem = {
  render: () => <WithDisabledItemExample />,
};

export const LongList = {
  render: () => <LongListExample />,
};

export const VisualTest = {
  render: () => <OpenByDefaultExample />,
};

export const VisualTestNoTrips = {
  render: () => (
    <BpkProvider>
      <BpkContextMenu.Root defaultOpen>
        <BpkContextMenu.Trigger>
          <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
            <HeartIcon />
          </button>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>
    </BpkProvider>
  ),
};

export const VisualTestDestructive = {
  render: () => (
    <BpkProvider>
      <BpkContextMenu.Root defaultOpen>
        <BpkContextMenu.Trigger>
          <button type="button" aria-label="Save to trip" className="bpk-context-menu-story-trigger" onFocus={(e) => e.currentTarget.blur()}>
            <HeartIcon />
          </button>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item
            value="remove"
            variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
          >
            Remove
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="move" endIcon={<ChevronRightIcon />}>
            Move
          </BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>
    </BpkProvider>
  ),
};
