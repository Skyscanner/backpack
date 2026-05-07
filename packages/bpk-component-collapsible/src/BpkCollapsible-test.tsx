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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkCollapsible from './BpkCollapsible';

import type { BpkCollapsibleRootProps } from './BpkCollapsibleRoot';

const SimpleCollapsible = (props: Partial<BpkCollapsibleRootProps> = {}) => (
  <BpkCollapsible.Root {...props}>
    <BpkCollapsible.Trigger>
      Toggle
      <BpkCollapsible.Indicator>v</BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>Hidden content</BpkCollapsible.Content>
  </BpkCollapsible.Root>
);

describe('BpkCollapsible', () => {
  describe('Root', () => {
    it('renders correctly when closed by default', () => {
      const { asFragment } = render(<SimpleCollapsible />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly when open by default', () => {
      const { asFragment } = render(<SimpleCollapsible defaultOpen />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders the onContrast variant', () => {
      const { asFragment } = render(
        <SimpleCollapsible variant="onContrast" />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('has the data-backpack-ds-component attribute', () => {
      const { container } = render(<SimpleCollapsible />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveAttribute('data-backpack-ds-component');
    });
  });

  describe('Trigger interaction', () => {
    it('opens on click', async () => {
      const user = userEvent.setup();
      render(<SimpleCollapsible />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes on click when initially open', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      render(<SimpleCollapsible defaultOpen onOpenChange={onOpenChange} />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith({ open: false });
    });

    it('toggles on Enter key press', async () => {
      const user = userEvent.setup();
      render(<SimpleCollapsible />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      trigger.focus();

      await user.keyboard('{Enter}');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles on Space key press', async () => {
      const user = userEvent.setup();
      render(<SimpleCollapsible />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      trigger.focus();

      await user.keyboard(' ');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      render(<SimpleCollapsible disabled onOpenChange={onOpenChange} />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      await user.click(trigger);

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('forwards the native disabled attribute to the trigger button', () => {
      // Ark/Zag only emit data-disabled; we re-apply native disabled so
      // the button is removed from the tab order and announced as disabled.
      render(<SimpleCollapsible disabled />);
      const trigger = screen.getByRole('button', { name: /toggle/i });
      expect(trigger).toBeDisabled();
    });

    it('calls onOpenChange when toggled', async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();
      render(<SimpleCollapsible onOpenChange={onOpenChange} />);

      await user.click(screen.getByRole('button', { name: /toggle/i }));
      expect(onOpenChange).toHaveBeenCalledWith({ open: true });
    });
  });

  describe('Controlled mode', () => {
    const Controlled = () => {
      const [open, setOpen] = useState(false);
      return (
        <BpkCollapsible.Root
          open={open}
          onOpenChange={({ open: nextOpen }) => setOpen(nextOpen)}
        >
          <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
          <BpkCollapsible.Content>Body</BpkCollapsible.Content>
        </BpkCollapsible.Root>
      );
    };

    it('respects external open state', async () => {
      const user = userEvent.setup();
      render(<Controlled />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('ARIA wiring', () => {
    it('connects trigger and content via aria-controls', () => {
      render(<SimpleCollapsible defaultOpen />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      const controlsId = trigger.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();

      const content = document.getElementById(controlsId as string);
      expect(content).toBeInTheDocument();
    });

    it('marks the indicator as aria-hidden', () => {
      const { container } = render(<SimpleCollapsible />);
      const indicator = container.querySelector('[aria-hidden="true"]');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Content rendering', () => {
    it('does not mount content until opened when lazyMount is true', () => {
      render(
        <BpkCollapsible.Root lazyMount unmountOnExit>
          <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
          <BpkCollapsible.Content>Lazy body</BpkCollapsible.Content>
        </BpkCollapsible.Root>,
      );

      expect(screen.queryByText('Lazy body')).not.toBeInTheDocument();
    });
  });
});
