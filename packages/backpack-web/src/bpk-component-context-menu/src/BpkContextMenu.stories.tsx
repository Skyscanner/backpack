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

import { withRtlSupport } from '../../bpk-component-icon';
import ChevronRightIconBase from '../../bpk-component-icon/sm/chevron-right';
import HeartIcon from '../../bpk-component-icon/sm/heart';
import PlusIcon from '../../bpk-component-icon/sm/plus';
import { BpkProvider } from '../../bpk-component-layout';

import BpkContextMenu from './BpkContextMenu';
import { CONTEXT_MENU_ITEM_VARIANTS } from './common-types';

import type { Meta } from '@storybook/react';

const ChevronRightIcon = withRtlSupport(ChevronRightIconBase);

const SaveTrigger = () => (
  <BpkContextMenu.SaveTrigger aria-label="Save to trip" />
);

const DefaultExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo" onClick={() => {}}>Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas" onClick={() => {}}>
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax" onClick={() => {}}>Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />} onClick={() => {}}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />} onClick={() => {}}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const NoTripsExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const WithDestructiveItemExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item
            value="remove"
            variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
          >
            Remove
          </BpkContextMenu.Item>
          {/* Sub-menu: nesting BpkContextMenu.Root inside the parent Content
              is the correct Ark UI pattern. TriggerItem is the row that
              opens the child menu on hover / arrow-right. */}
          <BpkContextMenu.Root>
            <BpkContextMenu.TriggerItem endIcon={<ChevronRightIcon />}>
              Move
            </BpkContextMenu.TriggerItem>
            <BpkContextMenu.Content>
              <BpkContextMenu.ItemGroup>
                <BpkContextMenu.Item value="move-tokyo">Tokyo 2026</BpkContextMenu.Item>
                <BpkContextMenu.Item value="move-christmas">Christmas shopping</BpkContextMenu.Item>
                <BpkContextMenu.Item value="move-relax">Relax</BpkContextMenu.Item>
              </BpkContextMenu.ItemGroup>
            </BpkContextMenu.Content>
          </BpkContextMenu.Root>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const WithDisabledItemExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas" disabled>
            Christmas shopping (full)
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const LongListExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          {Array.from({ length: 12 }, (_, i) => (
            <BpkContextMenu.Item key={i} value={`trip-${i}`}>
              {`Trip ${i + 1}`}
            </BpkContextMenu.Item>
          ))}
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

const LongTripNameExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="long-1" onClick={() => {}}>
            Summer holiday in Southeast Asia 2026
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="long-2" onClick={() => {}}>
            Christmas markets — Vienna, Prague &amp; Budapest
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="long-3" onClick={() => {}}>
            Superlongwordwithnospacesthatbreakslayout
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />} onClick={() => {}}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />} onClick={() => {}}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
      </BpkContextMenu.Content>
    </BpkContextMenu.Root>
  </BpkProvider>
);

// Open by default so Percy captures the popover in visual regression runs.
const OpenByDefaultExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root defaultOpen>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas">
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax">Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
            Quick save
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
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

export const LongTripName = {
  render: () => <LongTripNameExample />,
};

export const VisualTest = {
  render: () => <OpenByDefaultExample />,
};

export const VisualTestNoTrips = {
  render: () => (
    <BpkProvider>
      <BpkContextMenu.Root defaultOpen>
        <SaveTrigger />
        <BpkContextMenu.Content>
          <BpkContextMenu.ItemGroup>
            <BpkContextMenu.Item value="new-trip" endIcon={<PlusIcon />}>
              Plan a new trip
            </BpkContextMenu.Item>
            <BpkContextMenu.Item value="quick-save" endIcon={<HeartIcon />}>
              Quick save
            </BpkContextMenu.Item>
          </BpkContextMenu.ItemGroup>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>
    </BpkProvider>
  ),
};

export const VisualTestDestructive = {
  render: () => (
    <BpkProvider>
      <BpkContextMenu.Root defaultOpen>
        <SaveTrigger />
        <BpkContextMenu.Content>
          <BpkContextMenu.ItemGroup>
            <BpkContextMenu.Item
              value="remove"
              variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
            >
              Remove
            </BpkContextMenu.Item>
            <BpkContextMenu.Root>
              <BpkContextMenu.TriggerItem endIcon={<ChevronRightIcon />}>
                Move
              </BpkContextMenu.TriggerItem>
              <BpkContextMenu.Content>
                <BpkContextMenu.ItemGroup>
                  <BpkContextMenu.Item value="move-tokyo">Tokyo 2026</BpkContextMenu.Item>
                  <BpkContextMenu.Item value="move-christmas">Christmas shopping</BpkContextMenu.Item>
                  <BpkContextMenu.Item value="move-relax">Relax</BpkContextMenu.Item>
                </BpkContextMenu.ItemGroup>
              </BpkContextMenu.Content>
            </BpkContextMenu.Root>
          </BpkContextMenu.ItemGroup>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>
    </BpkProvider>
  ),
};
