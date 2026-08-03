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

import BpkDrawerV2 from './BpkDrawerV2';
import mockResizeObserver from './test-utils';
import useBpkDrawerV2 from './useBpkDrawerV2';
import useBpkDrawerV2Context from './useBpkDrawerV2Context';

beforeAll(mockResizeObserver);

const renderDrawerV2 = (
  props: Partial<Parameters<typeof BpkDrawerV2.Root>[0]> = {},
  children?: ReactNode,
) =>
  render(
    <BpkDrawerV2.Root open onOpenChange={jest.fn()} {...props}>
      <BpkDrawerV2.Backdrop />
      <BpkDrawerV2.Content>
        {children || (
          <>
            <BpkDrawerV2.Grabber />
            <BpkDrawerV2.Header>
              <BpkDrawerV2.Title>Filters</BpkDrawerV2.Title>
              <BpkDrawerV2.CloseTrigger label="Close filters" />
            </BpkDrawerV2.Header>
            <BpkDrawerV2.Body>Drawer content</BpkDrawerV2.Body>
          </>
        )}
      </BpkDrawerV2.Content>
    </BpkDrawerV2.Root>,
  );

describe('BpkDrawerV2', () => {
  describe('Namespace exports', () => {
    it('exports all sub-components', () => {
      expect(BpkDrawerV2.Root).toBeDefined();
      expect(BpkDrawerV2.RootProvider).toBeDefined();
      expect(BpkDrawerV2.Trigger).toBeDefined();
      expect(BpkDrawerV2.SwipeArea).toBeDefined();
      expect(BpkDrawerV2.Backdrop).toBeDefined();
      expect(BpkDrawerV2.Content).toBeDefined();
      expect(BpkDrawerV2.Header).toBeDefined();
      expect(BpkDrawerV2.Title).toBeDefined();
      expect(BpkDrawerV2.Description).toBeDefined();
      expect(BpkDrawerV2.Body).toBeDefined();
      expect(BpkDrawerV2.Grabber).toBeDefined();
      expect(BpkDrawerV2.GrabberIndicator).toBeDefined();
      expect(BpkDrawerV2.CloseTrigger).toBeDefined();
    });
  });

  describe('Root', () => {
    it('renders the root data component attribute', () => {
      const { container } = renderDrawerV2();
      expect(
        container.querySelector('[data-backpack-ds-component="DrawerV2"]'),
      ).toBeInTheDocument();
    });

    it('renders dialog content', () => {
      renderDrawerV2();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('passes swipeDirection to Ark', () => {
      const { container } = renderDrawerV2({ swipeDirection: 'end' });
      expect(
        container.querySelector('[data-scope="drawer"][data-part="content"]'),
      ).toHaveAttribute('data-swipe-direction', 'right');
    });
  });

  describe('Parts', () => {
    it('renders the backdrop with the Backpack class', () => {
      const { container } = renderDrawerV2();
      const backdrop = container.querySelector(
        '[data-backpack-ds-component="DrawerV2Backdrop"]',
      );
      expect(backdrop?.className).toContain('bpk-drawer-v2__backdrop');
    });

    it('renders the content with the Backpack class', () => {
      const { container } = renderDrawerV2();
      const content = container.querySelector(
        '[data-backpack-ds-component="DrawerV2Content"]',
      );
      expect(content?.className).toContain('bpk-drawer-v2__content');
    });

    it('renders the header, title, and body', () => {
      const { container } = renderDrawerV2();
      expect(
        container.querySelector('[data-backpack-ds-component="DrawerV2Header"]'),
      ).toBeInTheDocument();
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('renders the default grabber indicator', () => {
      const { container } = renderDrawerV2();
      expect(
        container.querySelector(
          '[data-backpack-ds-component="DrawerV2GrabberIndicator"]',
        ),
      ).toBeInTheDocument();
    });

    it('passes accessibility props to grabber', () => {
      renderDrawerV2(
        {},
        <>
          <BpkDrawerV2.Grabber
            role="button"
            tabIndex={0}
            aria-label="Expand filters"
          />
          <BpkDrawerV2.Title>Filters</BpkDrawerV2.Title>
        </>,
      );

      expect(
        screen.getByRole('button', { name: 'Expand filters' }),
      ).toHaveAttribute('tabIndex', '0');
    });

    it('marks body content as a no-drag area', () => {
      const { container } = renderDrawerV2();
      expect(
        container.querySelector('[data-backpack-ds-component="DrawerV2Body"]'),
      ).toHaveAttribute('data-no-drag');
    });
  });

  describe('Interactions', () => {
    it('calls onOpenChange when the close trigger is clicked', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      renderDrawerV2({ onOpenChange });

      await user.click(screen.getByRole('button', { name: 'Close filters' }));

      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
      );
    });

    it('supports Trigger asChild', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <BpkDrawerV2.Root onOpenChange={onOpenChange}>
          <BpkDrawerV2.Trigger asChild>
            <button type="button">Open drawer</button>
          </BpkDrawerV2.Trigger>
          <BpkDrawerV2.Content>
            <BpkDrawerV2.Title>Drawer</BpkDrawerV2.Title>
          </BpkDrawerV2.Content>
        </BpkDrawerV2.Root>,
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
        <BpkDrawerV2.Root open onOpenChange={jest.fn()}>
          <BpkDrawerV2.Content onClick={onClick}>
            <BpkDrawerV2.Title>Drawer</BpkDrawerV2.Title>
          </BpkDrawerV2.Content>
        </BpkDrawerV2.Root>,
      );

      await user.click(screen.getByRole('dialog'));

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('RootProvider with useBpkDrawerV2', () => {
    const StateReadout = () => {
      const { open } = useBpkDrawerV2Context();
      return <span>{open ? 'Open' : 'Closed'}</span>;
    };

    it('reads state from a RootProvider', () => {
      const Example = () => {
        const drawer = useBpkDrawerV2({ open: true });
        return (
          <BpkDrawerV2.RootProvider value={drawer}>
            <StateReadout />
            <BpkDrawerV2.Content>
              <BpkDrawerV2.Title>Drawer</BpkDrawerV2.Title>
            </BpkDrawerV2.Content>
          </BpkDrawerV2.RootProvider>
        );
      };

      render(<Example />);

      expect(screen.getByText('Open')).toBeInTheDocument();
    });
  });
});
