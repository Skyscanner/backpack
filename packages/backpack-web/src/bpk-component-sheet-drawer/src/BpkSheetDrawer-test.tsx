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

import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BpkSheetDrawer from './BpkSheetDrawer';
import useBpkSheetDrawer from './useBpkSheetDrawer';
import useBpkSheetDrawerContext from './useBpkSheetDrawerContext';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const renderSheetDrawer = (
  props: Partial<Parameters<typeof BpkSheetDrawer.Root>[0]> = {},
  children?: ReactNode,
) =>
  render(
    <BpkSheetDrawer.Root open onOpenChange={jest.fn()} {...props}>
      <BpkSheetDrawer.Backdrop />
      <BpkSheetDrawer.Content>
        {children || (
          <>
            <BpkSheetDrawer.Grabber />
            <BpkSheetDrawer.Header>
              <BpkSheetDrawer.Title>Filters</BpkSheetDrawer.Title>
              <BpkSheetDrawer.CloseTrigger label="Close filters" />
            </BpkSheetDrawer.Header>
            <BpkSheetDrawer.Body>Drawer content</BpkSheetDrawer.Body>
          </>
        )}
      </BpkSheetDrawer.Content>
    </BpkSheetDrawer.Root>,
  );

describe('BpkSheetDrawer', () => {
  describe('Namespace exports', () => {
    it('exports all sub-components', () => {
      expect(BpkSheetDrawer.Root).toBeDefined();
      expect(BpkSheetDrawer.RootProvider).toBeDefined();
      expect(BpkSheetDrawer.Trigger).toBeDefined();
      expect(BpkSheetDrawer.SwipeArea).toBeDefined();
      expect(BpkSheetDrawer.Backdrop).toBeDefined();
      expect(BpkSheetDrawer.Content).toBeDefined();
      expect(BpkSheetDrawer.Header).toBeDefined();
      expect(BpkSheetDrawer.Title).toBeDefined();
      expect(BpkSheetDrawer.Description).toBeDefined();
      expect(BpkSheetDrawer.Body).toBeDefined();
      expect(BpkSheetDrawer.Grabber).toBeDefined();
      expect(BpkSheetDrawer.GrabberIndicator).toBeDefined();
      expect(BpkSheetDrawer.CloseTrigger).toBeDefined();
    });
  });

  describe('Root', () => {
    it('renders the root data component attribute', () => {
      const { container } = renderSheetDrawer();
      expect(
        container.querySelector('[data-backpack-ds-component="SheetDrawer"]'),
      ).toBeInTheDocument();
    });

    it('renders dialog content', () => {
      renderSheetDrawer();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('passes swipeDirection to Ark', () => {
      const { container } = renderSheetDrawer({ swipeDirection: 'end' });
      expect(
        container.querySelector('[data-scope="drawer"][data-part="content"]'),
      ).toHaveAttribute('data-swipe-direction', 'right');
    });
  });

  describe('Parts', () => {
    it('renders the backdrop with the Backpack class', () => {
      const { container } = renderSheetDrawer();
      const backdrop = container.querySelector(
        '[data-backpack-ds-component="SheetDrawerBackdrop"]',
      );
      expect(backdrop?.className).toContain('bpk-sheet-drawer__backdrop');
    });

    it('renders the content with the Backpack class', () => {
      const { container } = renderSheetDrawer();
      const content = container.querySelector(
        '[data-backpack-ds-component="SheetDrawerContent"]',
      );
      expect(content?.className).toContain('bpk-sheet-drawer__content');
    });

    it('renders the header, title, and body', () => {
      const { container } = renderSheetDrawer();
      expect(
        container.querySelector('[data-backpack-ds-component="SheetDrawerHeader"]'),
      ).toBeInTheDocument();
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('renders the default grabber indicator', () => {
      const { container } = renderSheetDrawer();
      expect(
        container.querySelector(
          '[data-backpack-ds-component="SheetDrawerGrabberIndicator"]',
        ),
      ).toBeInTheDocument();
    });

    it('passes accessibility props to grabber', () => {
      renderSheetDrawer(
        {},
        <>
          <BpkSheetDrawer.Grabber
            role="button"
            tabIndex={0}
            aria-label="Expand filters"
          />
          <BpkSheetDrawer.Title>Filters</BpkSheetDrawer.Title>
        </>,
      );

      expect(
        screen.getByRole('button', { name: 'Expand filters' }),
      ).toHaveAttribute('tabIndex', '0');
    });

    it('marks body content as a no-drag area', () => {
      const { container } = renderSheetDrawer();
      expect(
        container.querySelector('[data-backpack-ds-component="SheetDrawerBody"]'),
      ).toHaveAttribute('data-no-drag');
    });
  });

  describe('Interactions', () => {
    it('calls onOpenChange when the close trigger is clicked', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      renderSheetDrawer({ onOpenChange });

      await user.click(screen.getByRole('button', { name: 'Close filters' }));

      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
      );
    });

    it('supports Trigger asChild', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <BpkSheetDrawer.Root onOpenChange={onOpenChange}>
          <BpkSheetDrawer.Trigger asChild>
            <button type="button">Open drawer</button>
          </BpkSheetDrawer.Trigger>
          <BpkSheetDrawer.Content>
            <BpkSheetDrawer.Title>Drawer</BpkSheetDrawer.Title>
          </BpkSheetDrawer.Content>
        </BpkSheetDrawer.Root>,
      );

      await user.click(screen.getByRole('button', { name: 'Open drawer' }));

      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: true }),
      );
    });

    it('passes click handlers to content', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(
        <BpkSheetDrawer.Root open onOpenChange={jest.fn()}>
          <BpkSheetDrawer.Content onClick={onClick}>
            <BpkSheetDrawer.Title>Drawer</BpkSheetDrawer.Title>
          </BpkSheetDrawer.Content>
        </BpkSheetDrawer.Root>,
      );

      await user.click(screen.getByRole('dialog'));

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('RootProvider with useBpkSheetDrawer', () => {
    const StateReadout = () => {
      const { open } = useBpkSheetDrawerContext();
      return <span>{open ? 'Open' : 'Closed'}</span>;
    };

    it('reads state from a RootProvider', () => {
      const Example = () => {
        const drawer = useBpkSheetDrawer({ open: true });
        return (
          <BpkSheetDrawer.RootProvider value={drawer}>
            <StateReadout />
            <BpkSheetDrawer.Content>
              <BpkSheetDrawer.Title>Drawer</BpkSheetDrawer.Title>
            </BpkSheetDrawer.Content>
          </BpkSheetDrawer.RootProvider>
        );
      };

      render(<Example />);

      expect(screen.getByText('Open')).toBeInTheDocument();
    });
  });
});
