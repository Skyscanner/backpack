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

// Shared sub-menu body used by both mobile (Panel) and desktop (flyout Content).
// BackButton is CSS-hidden on desktop (display:none) so it is absent from the
// accessibility tree and tab order — no harm on desktop.
const MoveSubMenuBody = () => (
  <>
    <BpkContextMenu.StickyHeader>
      <BpkContextMenu.BackButton />
      <BpkContextMenu.ItemGroup>
        <BpkContextMenu.Item value="move-new-trip" startIcon={<PlusIcon />}>
          Plan a new trip
        </BpkContextMenu.Item>
        <BpkContextMenu.Item value="move-quick-save" startIcon={<HeartIcon />}>
          Quick save
        </BpkContextMenu.Item>
      </BpkContextMenu.ItemGroup>
      <BpkContextMenu.Separator />
    </BpkContextMenu.StickyHeader>
    <BpkContextMenu.ScrollableList>
      <BpkContextMenu.ItemGroup>
        {Array.from({ length: 12 }, (_, i) => (
          <BpkContextMenu.Item key={i} value={`move-trip-${i}`}>
            {`Trip ${i + 1}`}
          </BpkContextMenu.Item>
        ))}
      </BpkContextMenu.ItemGroup>
    </BpkContextMenu.ScrollableList>
  </>
);

// Desktop flyout wrapper — provides the Ark portal + Menu.Content context.
const MoveDesktopFlyout = () => (
  <BpkContextMenu.Content>
    <MoveSubMenuBody />
  </BpkContextMenu.Content>
);

const DefaultExample = () => (
  <BpkProvider>
    <BpkContextMenu.Root>
      <SaveTrigger />
      <BpkContextMenu.Content>
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="tokyo" onSelect={() => {}}>Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas" onSelect={() => {}}>
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="relax" onSelect={() => {}}>Relax</BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />} onSelect={() => {}}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />} onSelect={() => {}}>
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
          <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />}>
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
        <BpkContextMenu.PanelGroup>
          <BpkContextMenu.Panel id="root">
            <BpkContextMenu.ItemGroup>
              <BpkContextMenu.Item
                value="remove"
                variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
              >
                Remove
              </BpkContextMenu.Item>
              <BpkContextMenu.TriggerItem
                panelId="move"
                endIcon={<ChevronRightIcon />}
                desktopFlyout={<MoveDesktopFlyout />}
              >
                Move
              </BpkContextMenu.TriggerItem>
            </BpkContextMenu.ItemGroup>
          </BpkContextMenu.Panel>

          {/* Mobile panel — same body as the desktop flyout; BackButton is
              visible here and CSS-hidden in the flyout. */}
          <BpkContextMenu.Panel id="move">
            <MoveSubMenuBody />
          </BpkContextMenu.Panel>
        </BpkContextMenu.PanelGroup>
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
          <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />}>
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
        <BpkContextMenu.StickyHeader>
          <BpkContextMenu.BackButton />
          <BpkContextMenu.ItemGroup>
            <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />}>
              Plan a new trip
            </BpkContextMenu.Item>
            <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />}>
              Quick save
            </BpkContextMenu.Item>
          </BpkContextMenu.ItemGroup>
          <BpkContextMenu.Separator />
        </BpkContextMenu.StickyHeader>
        <BpkContextMenu.ScrollableList>
          <BpkContextMenu.ItemGroup>
            {Array.from({ length: 12 }, (_, i) => (
              <BpkContextMenu.Item key={i} value={`trip-${i}`}>
                {`Trip ${i + 1}`}
              </BpkContextMenu.Item>
            ))}
          </BpkContextMenu.ItemGroup>
        </BpkContextMenu.ScrollableList>
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
          <BpkContextMenu.Item value="long-1" onSelect={() => {}}>
            Summer holiday in Southeast Asia 2026
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="long-2" onSelect={() => {}}>
            Christmas markets — Vienna, Prague &amp; Budapest
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="long-3" onSelect={() => {}}>
            Superlongwordwithnospacesthatbreakslayout
          </BpkContextMenu.Item>
        </BpkContextMenu.ItemGroup>
        <BpkContextMenu.Separator />
        <BpkContextMenu.ItemGroup>
          <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />} onSelect={() => {}}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />} onSelect={() => {}}>
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
          <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />}>
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />}>
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

export const WithEndIcon = {
  render: () => (
    <BpkProvider>
      <BpkContextMenu.Root>
        <SaveTrigger />
        <BpkContextMenu.Content>
          <BpkContextMenu.ItemGroup>
            <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
            <BpkContextMenu.Item value="christmas">Christmas shopping</BpkContextMenu.Item>
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
  ),
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
            <BpkContextMenu.Item value="new-trip" startIcon={<PlusIcon />}>
              Plan a new trip
            </BpkContextMenu.Item>
            <BpkContextMenu.Item value="quick-save" startIcon={<HeartIcon />}>
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
          <BpkContextMenu.PanelGroup>
            <BpkContextMenu.Panel id="root">
              <BpkContextMenu.ItemGroup>
                <BpkContextMenu.Item
                  value="remove"
                  variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
                >
                  Remove
                </BpkContextMenu.Item>
                <BpkContextMenu.TriggerItem
                  panelId="move"
                  endIcon={<ChevronRightIcon />}
                  desktopFlyout={<MoveDesktopFlyout />}
                >
                  Move
                </BpkContextMenu.TriggerItem>
              </BpkContextMenu.ItemGroup>
            </BpkContextMenu.Panel>
            <BpkContextMenu.Panel id="move">
              <MoveSubMenuBody />
            </BpkContextMenu.Panel>
          </BpkContextMenu.PanelGroup>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>
    </BpkProvider>
  ),
};
