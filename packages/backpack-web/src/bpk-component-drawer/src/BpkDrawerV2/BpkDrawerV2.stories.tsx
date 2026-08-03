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
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import { ArgTypes, Markdown } from '@storybook/addon-docs/blocks';

import BpkButton from '../../../bpk-component-button';
import { BpkProvider } from '../../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';

import BpkDrawerV2 from './BpkDrawerV2';
import readme from './README.md';

import type { Meta, StoryObj } from '@storybook/react';

const DrawerContent = () => (
  <>
    <BpkDrawerV2.Grabber />
    <BpkDrawerV2.Header>
      <BpkDrawerV2.Title>Trip filters</BpkDrawerV2.Title>
      <BpkDrawerV2.CloseTrigger label="Close filters" />
    </BpkDrawerV2.Header>
    <BpkDrawerV2.Body>
      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
        Refine your search by stops, departure time, airline, and cabin.
      </BpkText>
    </BpkDrawerV2.Body>
  </>
);

const PersistentSnapDrawer = () => {
  const [backgroundClicks, setBackgroundClicks] = useState(0);
  const [snapPoint, setSnapPoint] =
    useState<ComponentProps<typeof BpkDrawerV2.Root>['snapPoint']>(0.1);
  const ignoreNextSurfaceClick = useRef(false);
  const expandDrawer = () => setSnapPoint(0.9);
  const toggleDrawer = () =>
    setSnapPoint((currentSnapPoint) => (currentSnapPoint === 0.9 ? 0.1 : 0.9));
  const toggleDrawerOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    toggleDrawer();
  };
  const expandDrawerOnSurfaceClick = ({
    target,
  }: MouseEvent<HTMLDivElement>) => {
    if ((target as HTMLElement).closest('button')) {
      return;
    }

    if (ignoreNextSurfaceClick.current) {
      ignoreNextSurfaceClick.current = false;
      return;
    }

    toggleDrawer();
  };

  return (
    <BpkProvider>
      <BpkText textStyle={TEXT_STYLES.heading2}>Map results</BpkText>
      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
        Background clicks: {backgroundClicks}
      </BpkText>
      <BpkButton onClick={() => setBackgroundClicks(backgroundClicks + 1)}>
        Interact with background
      </BpkButton>
      <BpkDrawerV2.Root
        open
        modal={false}
        preventScroll={false}
        snapToSequentialPoints
        trapFocus={false}
        closeOnInteractOutside={false}
        snapPoints={[0.1, 0.9]}
        snapPoint={snapPoint}
        onSnapPointChange={({ snapPoint: nextSnapPoint }) => {
          if (nextSnapPoint !== snapPoint) {
            ignoreNextSurfaceClick.current = true;
          }

          setSnapPoint(nextSnapPoint);
        }}
        onOpenChange={({ open }) => {
          if (!open) {
            setSnapPoint(0.1);
          }
        }}
      >
        <BpkDrawerV2.Content onClick={expandDrawerOnSurfaceClick}>
          <BpkDrawerV2.Grabber
            role="button"
            tabIndex={0}
            aria-label={
              snapPoint === 0.9 ? 'Collapse filters' : 'Expand filters'
            }
            onKeyDown={toggleDrawerOnKeyDown}
          />
          <BpkDrawerV2.Header>
            <BpkDrawerV2.Title>Trip filters</BpkDrawerV2.Title>
            <BpkButton onClick={expandDrawer}>Expand</BpkButton>
            <BpkDrawerV2.CloseTrigger label="Collapse filters" />
          </BpkDrawerV2.Header>
          <BpkDrawerV2.Body>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              This drawer stays available while the page behind it remains
              interactive.
            </BpkText>
          </BpkDrawerV2.Body>
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>
    </BpkProvider>
  );
};

const meta: Meta<typeof BpkDrawerV2.Root> = {
  title: 'bpk-component-drawer-v2',
  component: BpkDrawerV2.Root,
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
};

export default meta;

type Story = StoryObj<typeof BpkDrawerV2.Root>;

export const Default: Story = {
  render: () => (
    <BpkProvider>
      <BpkDrawerV2.Root>
        <BpkDrawerV2.Trigger asChild>
          <BpkButton>Open drawer</BpkButton>
        </BpkDrawerV2.Trigger>
        <BpkDrawerV2.Backdrop />
        <BpkDrawerV2.Content>
          <DrawerContent />
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>
    </BpkProvider>
  ),
};

export const SideDrawer: Story = {
  render: () => (
    <BpkProvider>
      <BpkDrawerV2.Root swipeDirection="end">
        <BpkDrawerV2.Trigger asChild>
          <BpkButton>Open side drawer</BpkButton>
        </BpkDrawerV2.Trigger>
        <BpkDrawerV2.Backdrop />
        <BpkDrawerV2.Content draggable={false}>
          <BpkDrawerV2.Header>
            <BpkDrawerV2.Title>Navigation</BpkDrawerV2.Title>
            <BpkDrawerV2.CloseTrigger label="Close navigation" />
          </BpkDrawerV2.Header>
          <BpkDrawerV2.Body>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Choose a section to continue planning your trip.
            </BpkText>
          </BpkDrawerV2.Body>
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>
    </BpkProvider>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <BpkProvider>
      <BpkDrawerV2.Root
        snapPoints={[0.4, 0.9]}
        defaultSnapPoint={0.4}
        snapToSequentialPoints
      >
        <BpkDrawerV2.Trigger asChild>
          <BpkButton>Open snap drawer</BpkButton>
        </BpkDrawerV2.Trigger>
        <BpkDrawerV2.Backdrop />
        <BpkDrawerV2.Content>
          <DrawerContent />
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>
    </BpkProvider>
  ),
};

export const ClickablePillWithInteractableBackground: Story = {
  render: () => <PersistentSnapDrawer />,
};
