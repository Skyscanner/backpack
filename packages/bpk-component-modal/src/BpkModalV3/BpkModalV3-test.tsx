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

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import BpkModalV3 from './BpkModalV3';

// ResizeObserver mock required for Ark UI / Zag.js
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const defaultProps = {
  open: true,
  onOpenChange: jest.fn(),
};

const renderModal = (
  props: Partial<Parameters<typeof BpkModalV3.Root>[0]> = {},
  children?: React.ReactNode,
) =>
  render(
    <BpkModalV3.Root {...defaultProps} {...props}>
      <BpkModalV3.Scrim />
      <BpkModalV3.Content>
        {children || (
          <>
            <BpkModalV3.Header>
              <BpkModalV3.Title>Test Title</BpkModalV3.Title>
              <BpkModalV3.CloseTrigger label="Close" />
            </BpkModalV3.Header>
            <p>Content</p>
          </>
        )}
      </BpkModalV3.Content>
    </BpkModalV3.Root>,
  );

describe('BpkModalV3', () => {
  describe('Namespace exports', () => {
    it('should export all sub-components', () => {
      expect(BpkModalV3.Root).toBeDefined();
      expect(BpkModalV3.Trigger).toBeDefined();
      expect(BpkModalV3.Portal).toBeDefined();
      expect(BpkModalV3.Scrim).toBeDefined();
      expect(BpkModalV3.Content).toBeDefined();
      expect(BpkModalV3.Header).toBeDefined();
      expect(BpkModalV3.Title).toBeDefined();
      expect(BpkModalV3.Description).toBeDefined();
      expect(BpkModalV3.Body).toBeDefined();
      expect(BpkModalV3.HeroImage).toBeDefined();
      expect(BpkModalV3.CloseTrigger).toBeDefined();
    });
  });

  describe('Root', () => {
    it('should render wrapper div with default type', () => {
      const { container } = renderModal();
      const wrapper = container.querySelector('[data-type]');
      expect(wrapper).toHaveAttribute('data-type', 'default');
    });

    it('should render wrapper div with sheet type', () => {
      const { container } = renderModal({ type: 'sheet' });
      const wrapper = container.querySelector('[data-type]');
      expect(wrapper).toHaveAttribute('data-type', 'sheet');
    });

    it('should render wrapper div with full type', () => {
      const { container } = renderModal({ type: 'full' });
      const wrapper = container.querySelector('[data-type]');
      expect(wrapper).toHaveAttribute('data-type', 'full');
    });

    it('should render wrapper div with chatbot type', () => {
      const { container } = renderModal({ type: 'chatbot' });
      const wrapper = container.querySelector('[data-type]');
      expect(wrapper).toHaveAttribute('data-type', 'chatbot');
    });

    it('should have data-backpack-ds-component attribute', () => {
      const { container } = renderModal();
      const wrapper = container.querySelector(
        '[data-backpack-ds-component="ModalV3"]',
      );
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('should render dialog content', () => {
      renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have data-backpack-ds-component attribute', () => {
      const { container } = renderModal();
      const content = container.querySelector(
        '[data-backpack-ds-component="ModalV3Content"]',
      );
      expect(content).toBeInTheDocument();
    });

    it('should apply variant modifier class from context', () => {
      const { container } = renderModal({ type: 'sheet' });
      const content = container.querySelector(
        '[data-backpack-ds-component="ModalV3Content"]',
      );
      expect(content?.className).toContain('bpk-modal-v3__content--sheet');
    });

    it('should apply chatbot modifier class from context', () => {
      const { container } = renderModal({ type: 'chatbot' });
      const content = container.querySelector(
        '[data-backpack-ds-component="ModalV3Content"]',
      );
      expect(content?.className).toContain('bpk-modal-v3__content--chatbot');
    });
  });

  describe('Scrim', () => {
    it('should render with BEM class', () => {
      const { container } = renderModal();
      const scrim = container.querySelector('[data-scope="dialog"][data-part="backdrop"]');
      expect(scrim?.className).toContain('bpk-modal-v3__scrim');
    });
  });

  describe('Header', () => {
    it('should render as a flex container', () => {
      const { container } = renderModal();
      const header = container.querySelector(
        '[data-backpack-ds-component="ModalV3Header"]',
      );
      expect(header).toBeInTheDocument();
      expect(header?.className).toContain('bpk-modal-v3__header');
    });

    it('should apply variant modifier class from context', () => {
      const { container } = renderModal({ type: 'sheet' });
      const header = container.querySelector(
        '[data-backpack-ds-component="ModalV3Header"]',
      );
      expect(header?.className).toContain('bpk-modal-v3__header--sheet');
    });
  });

  describe('Title', () => {
    it('should render with semantic-only wrapper', () => {
      renderModal();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should have data-backpack-ds-component attribute', () => {
      const { container } = renderModal();
      const title = container.querySelector(
        '[data-backpack-ds-component="ModalV3Title"]',
      );
      expect(title).toBeInTheDocument();
    });
  });

  describe('Description', () => {
    it('should render description text', () => {
      renderModal(
        {},
        <>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Description>A description</BpkModalV3.Description>
        </>,
      );
      expect(screen.getByText('A description')).toBeInTheDocument();
    });
  });

  describe('Body', () => {
    it('should render with BEM class', () => {
      const { container } = renderModal(
        {},
        <>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <p>Body content</p>
          </BpkModalV3.Body>
        </>,
      );
      const body = container.querySelector(
        '[data-backpack-ds-component="ModalV3Body"]',
      );
      expect(body).toBeInTheDocument();
      expect(body?.className).toContain('bpk-modal-v3__body');
    });

    it('should render children', () => {
      renderModal(
        {},
        <>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <p>Body content</p>
          </BpkModalV3.Body>
        </>,
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });
  });

  describe('HeroImage', () => {
    it('should render with BEM class and image', () => {
      const { container } = renderModal(
        {},
        <>
          <BpkModalV3.Title>Title</BpkModalV3.Title>
          <BpkModalV3.HeroImage src="test.jpg" alt="Test image" />
        </>,
      );
      const heroImage = container.querySelector(
        '[data-backpack-ds-component="ModalV3HeroImage"]',
      );
      expect(heroImage).toBeInTheDocument();
      expect(heroImage?.className).toContain('bpk-modal-v3__hero-image');

      const img = heroImage?.querySelector('img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'Test image');
      expect(img?.className).toContain('bpk-modal-v3__hero-image-img');
    });

    it('should apply fixed height when height prop is provided', () => {
      const { container } = renderModal(
        {},
        <>
          <BpkModalV3.Title>Title</BpkModalV3.Title>
          <BpkModalV3.HeroImage src="test.jpg" alt="" height="12rem" />
        </>,
      );
      const heroImage = container.querySelector(
        '[data-backpack-ds-component="ModalV3HeroImage"]',
      );
      expect(heroImage).toHaveStyle({ height: '12rem', flex: 'none' });
    });

    it('should render children as overlays', () => {
      renderModal(
        {},
        <>
          <BpkModalV3.Title>Title</BpkModalV3.Title>
          <BpkModalV3.HeroImage src="test.jpg" alt="">
            <BpkModalV3.CloseTrigger label="Close" onImage />
          </BpkModalV3.HeroImage>
        </>,
      );
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });
  });

  describe('CloseTrigger', () => {
    it('should render with accessible label', () => {
      renderModal();
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('should render default style without onImage', () => {
      const { container } = renderModal();
      const closeTrigger = container.querySelector(
        '[data-backpack-ds-component="ModalV3CloseTrigger"]',
      );
      expect(closeTrigger?.className).toContain('bpk-close-button');
      expect(closeTrigger?.className).not.toContain(
        'bpk-modal-v3__close-trigger--on-image',
      );
    });

    it('should render onImage style', () => {
      const { container } = render(
        <BpkModalV3.Root {...defaultProps}>
          <BpkModalV3.Content>
            <BpkModalV3.CloseTrigger label="Close" onImage />
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      const closeTrigger = container.querySelector(
        '[data-backpack-ds-component="ModalV3CloseTrigger"]',
      );
      expect(closeTrigger?.className).toContain(
        'bpk-modal-v3__close-trigger--on-image',
      );
    });
  });

  describe('Trigger', () => {
    it('should render trigger', () => {
      render(
        <BpkModalV3.Root open={false} onOpenChange={jest.fn()}>
          <BpkModalV3.Trigger asChild>
            <button type="button">Open</button>
          </BpkModalV3.Trigger>
          <BpkModalV3.Content>
            <p>Content</p>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('should support asChild', () => {
      render(
        <BpkModalV3.Root open={false} onOpenChange={jest.fn()}>
          <BpkModalV3.Trigger asChild>
            <button type="button">Open Modal</button>
          </BpkModalV3.Trigger>
          <BpkModalV3.Content>
            <p>Content</p>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      const button = screen.getByText('Open Modal');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Controlled open/close', () => {
    it('should render content when open', () => {
      renderModal({ open: true });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onOpenChange when CloseTrigger is clicked', async () => {
      const onOpenChange = jest.fn();
      renderModal({ onOpenChange });
      await userEvent.click(screen.getByLabelText('Close'));
      expect(onOpenChange).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
      );
    });
  });

  describe('Body lock (chatbot type)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    });

    afterEach(() => {
      jest.useRealTimers();
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.touchAction = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.backgroundColor = '';
    });

    it('should lock body scroll when chatbot modal is open', () => {
      renderModal({ type: 'chatbot', open: true });
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('fixed');
      expect(document.body.style.top).toBe('-100px');
      expect(document.body.style.width).toBe('100%');
    });

    it('should not lock body scroll for non-chatbot types', () => {
      renderModal({ type: 'default', open: true });
      expect(document.body.style.position).not.toBe('fixed');
      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('should restore body styles when chatbot modal closes', () => {
      const { rerender } = render(
        <BpkModalV3.Root type="chatbot" open onOpenChange={jest.fn()}>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Title>Test</BpkModalV3.Title>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      expect(document.body.style.position).toBe('fixed');

      rerender(
        <BpkModalV3.Root type="chatbot" open={false} onOpenChange={jest.fn()}>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Title>Test</BpkModalV3.Title>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      act(() => { jest.runAllTimers(); });
      expect(document.body.style.position).toBe('');
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Uncontrolled with Trigger', () => {
    it('should render without open or onOpenChange props', () => {
      const { container } = render(
        <BpkModalV3.Root>
          <BpkModalV3.Trigger asChild>
            <button type="button">Open</button>
          </BpkModalV3.Trigger>
          <BpkModalV3.Content>
            <BpkModalV3.Title>Uncontrolled</BpkModalV3.Title>
            <p>Content</p>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );
      expect(container.querySelector('[data-type="default"]')).toBeInTheDocument();
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('should open when Trigger is clicked', async () => {
      render(
        <BpkModalV3.Root>
          <BpkModalV3.Trigger asChild>
            <button type="button">Open</button>
          </BpkModalV3.Trigger>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Title>Uncontrolled</BpkModalV3.Title>
            <p>Dialog body</p>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );

      await userEvent.click(screen.getByText('Open'));
      // In jsdom, ark-ui keeps the `hidden` attribute on dialog content
      // because CSS animations that toggle it don't run. Use `hidden: true`
      // to find the dialog regardless.
      expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
      expect(screen.getByText('Dialog body')).toBeInTheDocument();
    });

    it('Trigger should set aria-haspopup and aria-expanded', () => {
      render(
        <BpkModalV3.Root>
          <BpkModalV3.Trigger asChild>
            <button type="button">Open</button>
          </BpkModalV3.Trigger>
          <BpkModalV3.Content>
            <BpkModalV3.Title>Title</BpkModalV3.Title>
            <p>Content</p>
          </BpkModalV3.Content>
        </BpkModalV3.Root>,
      );

      const trigger = screen.getByText('Open');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
