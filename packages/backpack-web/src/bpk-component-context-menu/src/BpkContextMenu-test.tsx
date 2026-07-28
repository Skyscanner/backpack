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

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkContextMenu from './BpkContextMenu';
import { CONTEXT_MENU_ITEM_VARIANTS } from './common-types';

// When the menu opens, Ark/Zag initialises Floating UI's autoUpdate which
// subscribes a ResizeObserver to reposition the panel on size changes.
// JSDOM doesn't implement ResizeObserver, so any test that opens the menu
// throws "ReferenceError: ResizeObserver is not defined" before reaching
// its assertion. This no-op stub satisfies the API; no real repositioning
// is needed in tests.
global.ResizeObserver = class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
};

const renderBasicMenu = ({
  onSelect,
  open = true,
}: {
  onSelect?: (details: { value: string }) => void;
  open?: boolean;
} = {}) => (
  <BpkContextMenu.Root open={open} onSelect={onSelect}>
    <BpkContextMenu.Trigger>
      <span>Open menu</span>
    </BpkContextMenu.Trigger>
    <BpkContextMenu.Content>
      <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
      <BpkContextMenu.Item value="christmas">
        Christmas shopping
      </BpkContextMenu.Item>
      <BpkContextMenu.Separator />
      <BpkContextMenu.Item value="new-trip">Plan a new trip</BpkContextMenu.Item>
      <BpkContextMenu.Item value="quick-save">Quick save</BpkContextMenu.Item>
    </BpkContextMenu.Content>
  </BpkContextMenu.Root>
);

describe('BpkContextMenu', () => {
  it('renders the trigger', () => {
    render(renderBasicMenu({ open: false }));
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });

  it('renders items when open', () => {
    render(renderBasicMenu());
    expect(screen.getByText('Tokyo 2026')).toBeVisible();
    expect(screen.getByText('Christmas shopping')).toBeVisible();
    expect(screen.getByText('Plan a new trip')).toBeVisible();
    expect(screen.getByText('Quick save')).toBeVisible();
  });

  it('fires onSelect when an item is activated', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(renderBasicMenu({ onSelect }));

    await user.click(screen.getByText('Tokyo 2026'));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'tokyo' }),
    );
  });

  it('renders the destructive variant with the destructive class modifier', () => {
    render(
      <BpkContextMenu.Root open>
        <BpkContextMenu.Trigger>
          <span>Open</span>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item
            value="remove"
            variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
          >
            Remove
          </BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );

    const item = screen.getByText('Remove').closest('[role="menuitem"]');
    expect(item?.className).toContain('destructive');
  });

  it('renders the endIcon slot when provided', () => {
    render(
      <BpkContextMenu.Root open>
        <BpkContextMenu.Trigger>
          <span>Open</span>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item
            value="new-trip"
            endIcon={<span data-testid="end-icon">+</span>}
          >
            Plan a new trip
          </BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );

    expect(screen.getByTestId('end-icon')).toBeVisible();
  });

  describe('SaveTrigger', () => {
    const renderMenuWithSaveTrigger = (open = false) =>
      render(
        <BpkContextMenu.Root open={open}>
          <BpkContextMenu.SaveTrigger aria-label="Save to trip" />
          <BpkContextMenu.Content>
            <BpkContextMenu.Item value="item">Item</BpkContextMenu.Item>
          </BpkContextMenu.Content>
        </BpkContextMenu.Root>,
      );

    it('registers pointerdown and keydown listeners on document on mount', () => {
      const addSpy = jest.spyOn(document, 'addEventListener');
      renderMenuWithSaveTrigger();
      expect(addSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
      expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
      addSpy.mockRestore();
    });

    it('removes event listeners from document on unmount', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener');
      const { unmount } = renderMenuWithSaveTrigger();
      unmount();
      expect(removeSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
      removeSpy.mockRestore();
    });

    it('renders a button with the given aria-label', () => {
      renderMenuWithSaveTrigger();
      expect(screen.getByRole('button', { name: 'Save to trip' })).toBeVisible();
    });

    it('has the ContextMenuSaveTrigger data-backpack-ds-component attribute', () => {
      renderMenuWithSaveTrigger();
      expect(
        document.querySelector('[data-backpack-ds-component="ContextMenuSaveTrigger"]'),
      ).toBeInTheDocument();
    });

    it('sets data-pointer-focus when focus follows a pointer interaction', () => {
      renderMenuWithSaveTrigger();
      const trigger = screen.getByRole('button', { name: 'Save to trip' });

      fireEvent.pointerDown(document);
      fireEvent.focus(trigger);

      expect(trigger).toHaveAttribute('data-pointer-focus');
    });

    it('does not set data-pointer-focus when focus follows a Tab keydown', () => {
      renderMenuWithSaveTrigger();
      const trigger = screen.getByRole('button', { name: 'Save to trip' });

      fireEvent.pointerDown(document);
      fireEvent.keyDown(document, { key: 'Tab' });
      fireEvent.focus(trigger);

      expect(trigger).not.toHaveAttribute('data-pointer-focus');
    });

    it('does not reset pointer mode for non-Tab keys such as Enter', () => {
      renderMenuWithSaveTrigger();
      const trigger = screen.getByRole('button', { name: 'Save to trip' });

      fireEvent.pointerDown(document);
      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.focus(trigger);

      expect(trigger).toHaveAttribute('data-pointer-focus');
    });

    it('sets data-pointer-focus when focus returns from inside the menu', () => {
      renderMenuWithSaveTrigger(true);
      const trigger = screen.getByRole('button', { name: 'Save to trip' });
      const menuItem = screen.getByText('Item');

      fireEvent.focus(trigger, { relatedTarget: menuItem });

      expect(trigger).toHaveAttribute('data-pointer-focus');
    });

    it('removes data-pointer-focus on blur', () => {
      renderMenuWithSaveTrigger();
      const trigger = screen.getByRole('button', { name: 'Save to trip' });

      fireEvent.pointerDown(document);
      fireEvent.focus(trigger);
      fireEvent.blur(trigger);

      expect(trigger).not.toHaveAttribute('data-pointer-focus');
    });
  });

  it('does not accept className from consumers', () => {
    // @ts-expect-error — className is intentionally not part of the public API.
    // Menu.Root is a context provider with no DOM element so we can't query it;
    // the TypeScript error above is the actual API boundary check.
    expect(() => render(<BpkContextMenu.Root className="custom-classname" open />)).not.toThrow();
  });

  it('renders TriggerItem with endIcon', () => {
    render(
      <BpkContextMenu.Root open>
        <BpkContextMenu.Trigger aria-label="Open">
          <span />
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.ItemGroup>
            <BpkContextMenu.Root>
              <BpkContextMenu.TriggerItem endIcon={<span data-testid="chevron">›</span>}>
                Move
              </BpkContextMenu.TriggerItem>
              <BpkContextMenu.Content>
                <BpkContextMenu.Item value="dest">Destination</BpkContextMenu.Item>
              </BpkContextMenu.Content>
            </BpkContextMenu.Root>
          </BpkContextMenu.ItemGroup>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    expect(screen.getByText('Move')).toBeVisible();
    expect(screen.getByTestId('chevron')).toBeVisible();
  });
});
