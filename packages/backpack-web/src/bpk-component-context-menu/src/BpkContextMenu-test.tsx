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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkContextMenu from './BpkContextMenu';
import { CONTEXT_MENU_ITEM_VARIANTS } from './common-types';

const renderBasicMenu = ({
  onSelect,
  open = true,
}: {
  onSelect?: (details: { value: string }) => void;
  open?: boolean;
} = {}) => (
  <BpkContextMenu.Root open={open} onSelect={onSelect}>
    <BpkContextMenu.Trigger>
      <button type="button">Open menu</button>
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
          <button type="button">Open</button>
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
          <button type="button">Open</button>
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

  it('does not accept className from consumers', () => {
    // @ts-expect-error — className is intentionally not part of the public API
    render(<BpkContextMenu.Root className="custom-classname" open />);
    const root = document.querySelector('[data-component="ContextMenu"]');
    expect(root?.className).not.toContain('custom-classname');
  });
});
