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

import BpkButton from '../../bpk-component-button';
import { BpkProvider } from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';

import BpkSheetDrawer from './BpkSheetDrawer';

import type { Meta, StoryObj } from '@storybook/react';

const DrawerContent = () => (
  <>
    <BpkSheetDrawer.Grabber />
    <BpkSheetDrawer.Header>
      <BpkSheetDrawer.Title>Trip filters</BpkSheetDrawer.Title>
      <BpkSheetDrawer.CloseTrigger label="Close filters" />
    </BpkSheetDrawer.Header>
    <BpkSheetDrawer.Body>
      <BpkText textStyle={TEXT_STYLES.bodyDefault}>
        Refine your search by stops, departure time, airline, and cabin.
      </BpkText>
    </BpkSheetDrawer.Body>
  </>
);

const PersistentSnapDrawer = () => {
  const [backgroundClicks, setBackgroundClicks] = useState(0);
  const [snapPoint, setSnapPoint] =
    useState<ComponentProps<typeof BpkSheetDrawer.Root>['snapPoint']>(0.1);
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
      <BpkSheetDrawer.Root
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
        <BpkSheetDrawer.Content onClick={expandDrawerOnSurfaceClick}>
          <BpkSheetDrawer.Grabber
            role="button"
            tabIndex={0}
            aria-label={
              snapPoint === 0.9 ? 'Collapse filters' : 'Expand filters'
            }
            onKeyDown={toggleDrawerOnKeyDown}
          />
          <BpkSheetDrawer.Header>
            <BpkSheetDrawer.Title>Trip filters</BpkSheetDrawer.Title>
            <BpkButton onClick={expandDrawer}>Expand</BpkButton>
            <BpkSheetDrawer.CloseTrigger label="Collapse filters" />
          </BpkSheetDrawer.Header>
          <BpkSheetDrawer.Body>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              This drawer stays available while the page behind it remains
              interactive.
            </BpkText>
          </BpkSheetDrawer.Body>
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>
    </BpkProvider>
  );
};

const meta: Meta<typeof BpkSheetDrawer.Root> = {
  title: 'bpk-component-sheet-drawer',
  component: BpkSheetDrawer.Root,
};

export default meta;

type Story = StoryObj<typeof BpkSheetDrawer.Root>;

export const Default: Story = {
  render: () => (
    <BpkProvider>
      <BpkSheetDrawer.Root>
        <BpkSheetDrawer.Trigger asChild>
          <BpkButton>Open drawer</BpkButton>
        </BpkSheetDrawer.Trigger>
        <BpkSheetDrawer.Backdrop />
        <BpkSheetDrawer.Content>
          <DrawerContent />
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>
    </BpkProvider>
  ),
};

export const SideDrawer: Story = {
  render: () => (
    <BpkProvider>
      <BpkSheetDrawer.Root swipeDirection="end">
        <BpkSheetDrawer.Trigger asChild>
          <BpkButton>Open side drawer</BpkButton>
        </BpkSheetDrawer.Trigger>
        <BpkSheetDrawer.Backdrop />
        <BpkSheetDrawer.Content draggable={false}>
          <BpkSheetDrawer.Header>
            <BpkSheetDrawer.Title>Navigation</BpkSheetDrawer.Title>
            <BpkSheetDrawer.CloseTrigger label="Close navigation" />
          </BpkSheetDrawer.Header>
          <BpkSheetDrawer.Body>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              Choose a section to continue planning your trip.
            </BpkText>
          </BpkSheetDrawer.Body>
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>
    </BpkProvider>
  ),
};

export const SnapPoints: Story = {
  render: () => (
    <BpkProvider>
      <BpkSheetDrawer.Root
        snapPoints={[0.4, 0.9]}
        defaultSnapPoint={0.4}
        snapToSequentialPoints
      >
        <BpkSheetDrawer.Trigger asChild>
          <BpkButton>Open snap drawer</BpkButton>
        </BpkSheetDrawer.Trigger>
        <BpkSheetDrawer.Backdrop />
        <BpkSheetDrawer.Content>
          <DrawerContent />
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>
    </BpkProvider>
  ),
};

export const PersistentSnapPoints: Story = {
  render: () => <PersistentSnapDrawer />,
};
