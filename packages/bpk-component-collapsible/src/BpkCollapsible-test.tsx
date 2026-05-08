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
import useBpkCollapsible from './useBpkCollapsible';

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

const getRenderedParts = () => {
  const trigger = screen.getByRole('button', { name: /toggle/i });
  const root = trigger.closest('[data-part="root"]') as HTMLElement;
  const content = document.getElementById(
    trigger.getAttribute('aria-controls') as string,
  ) as HTMLElement;

  return { root, trigger, content };
};

describe('BpkCollapsible', () => {
  describe('Root', () => {
    it('renders the default closed state', () => {
      render(<SimpleCollapsible />);

      const { content, root, trigger } = getRenderedParts();

      expect(root).toHaveClass(
        'bpk-collapsible',
        'bpk-collapsible--default',
      );
      expect(root).toHaveAttribute('data-state', 'closed');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(content).toHaveAttribute('data-state', 'closed');
      expect(content).toHaveAttribute('hidden');
    });

    it('renders the default open state', () => {
      render(<SimpleCollapsible defaultOpen />);

      const { content, root, trigger } = getRenderedParts();

      expect(root).toHaveAttribute('data-state', 'open');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(content).not.toHaveAttribute('hidden');
      expect(screen.getByText('Hidden content')).toBeInTheDocument();
    });

    it('renders the onContrast variant', () => {
      render(<SimpleCollapsible variant="onContrast" />);

      const { root } = getRenderedParts();

      expect(root).toHaveClass('bpk-collapsible--on-contrast');
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

  describe('RootProvider with useBpkCollapsible', () => {
    const ProviderHarness = ({
      onOpen,
    }: { onOpen?: () => void } = {}) => {
      const collapsible = useBpkCollapsible({
        onOpenChange: ({ open }) => {
          if (open && onOpen) onOpen();
        },
      });
      return (
        <>
          <button
            type="button"
            onClick={() => collapsible.setOpen(true)}
          >
            Open externally
          </button>
          <BpkCollapsible.RootProvider value={collapsible}>
            <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
            <BpkCollapsible.Content>Body</BpkCollapsible.Content>
          </BpkCollapsible.RootProvider>
        </>
      );
    };

    it('applies the bpk-collapsible className and data attribute', () => {
      const { container } = render(<ProviderHarness />);
      const root = container.querySelector(
        '[data-backpack-ds-component]',
      ) as HTMLElement;

      expect(root).toHaveClass('bpk-collapsible', 'bpk-collapsible--default');
    });

    it('applies the onContrast variant', () => {
      const Harness = () => {
        const collapsible = useBpkCollapsible();
        return (
          <BpkCollapsible.RootProvider value={collapsible} variant="onContrast">
            <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
            <BpkCollapsible.Content>Body</BpkCollapsible.Content>
          </BpkCollapsible.RootProvider>
        );
      };
      const { container } = render(<Harness />);
      const root = container.firstChild as HTMLElement;

      expect(root).toHaveClass('bpk-collapsible--on-contrast');
    });

    it('opens via the hook setOpen API', async () => {
      const user = userEvent.setup();
      const onOpen = jest.fn();
      render(<ProviderHarness onOpen={onOpen} />);

      const trigger = screen.getByRole('button', { name: /toggle/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(
        screen.getByRole('button', { name: /open externally/i }),
      );

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(onOpen).toHaveBeenCalled();
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

    it('keeps closed content mounted when collapsedHeight is set', () => {
      render(
        <BpkCollapsible.Root collapsedHeight="3rem">
          <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
          <BpkCollapsible.Content>
            <button type="button">Inner action</button>
          </BpkCollapsible.Content>
        </BpkCollapsible.Root>,
      );

      const { content } = getRenderedParts();

      expect(content).toHaveAttribute('data-has-collapsed-size');
      expect(content).not.toHaveAttribute('hidden');
      expect(screen.getByRole('button', { name: /inner action/i })).toBeInTheDocument();
    });
  });
});
