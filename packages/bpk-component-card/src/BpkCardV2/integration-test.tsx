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

import type { ReactElement } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCardV2 from './BpkCardV2';

const toKebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

describe('BpkCardV2 Integration Tests', () => {
  describe('Interactive Content', () => {
    it('supports interactive elements in card sections', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Card with interaction</BpkCardV2.Header>
          <BpkCardV2.Body>
            <button type="button" onClick={handleClick}>Click me</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports form elements within card', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>
            <input type="text" placeholder="Enter text" />
            <button type="button">Submit</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports focus management through card content', async () => {
      const user = userEvent.setup();

      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>
            <button type="button">First</button>
            <button type="button">Second</button>
            <button type="button">Third</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const buttons = screen.getAllByRole('button');

      await user.tab();

      expect(buttons[0]).toHaveFocus();

      await user.tab();

      expect(buttons[1]).toHaveFocus();

      await user.tab();

      expect(buttons[2]).toHaveFocus();
    });
  });

  describe('Dynamic Content', () => {
    it('handles dynamic content updates', () => {
      const { rerender } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Initial content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Initial content')).toBeInTheDocument();

      rerender(
        <BpkProvider>
          <BpkCardV2.Root>
            <BpkCardV2.Body>Updated content</BpkCardV2.Body>
          </BpkCardV2.Root>
        </BpkProvider>,
      );

      expect(screen.getByText('Updated content')).toBeInTheDocument();
    });

    it('handles conditional rendering of sections', () => {
      const shouldShowFooter = true;

      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Header</BpkCardV2.Header>
          <BpkCardV2.Body>Body</BpkCardV2.Body>
          {shouldShowFooter && <BpkCardV2.Footer>Footer</BpkCardV2.Footer>}
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('handles empty sections gracefully', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header data-testid="header" />
          <BpkCardV2.Body data-testid="body" />
          <BpkCardV2.Footer data-testid="footer" />
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('body')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Multi-Column Layout', () => {
    it('renders Section content in columns layout', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="1fr 1fr">
            <BpkCardV2.Section>Left (50%)</BpkCardV2.Section>
            <BpkCardV2.Section>Right (50%)</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Left (50%)')).toBeInTheDocument();
      expect(screen.getByText('Right (50%)')).toBeInTheDocument();
    });

    it('renders content without columns when columns is not set', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Nested Content', () => {
    it('supports nested cards', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root aria-label="Outer card">
          <BpkCardV2.Body>
            <BpkCardV2.Root aria-label="Inner card">
              <BpkCardV2.Body>Nested card content</BpkCardV2.Body>
            </BpkCardV2.Root>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const cards = container.querySelectorAll('[class*="bpk-card-v2"]:not([class*="bpk-card-v2__"])');

      expect(cards.length).toBe(2);
    });

    it('supports complex nested layouts', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Outer</BpkCardV2.Header>
          <BpkCardV2.Body templateColumns="6fr auto 4fr">
            <BpkCardV2.Section>
              <div>
                <h3>Main Section</h3>
                <BpkCardV2.Root bgColor="surfaceElevated">
                  <BpkCardV2.Body>Nested card</BpkCardV2.Body>
                </BpkCardV2.Root>
              </div>
            </BpkCardV2.Section>
            <BpkCardV2.Divider />
            <BpkCardV2.Section>
              <div>Sidebar Section</div>
            </BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Outer')).toBeInTheDocument();
      expect(screen.getByText('Main Section')).toBeInTheDocument();
      expect(screen.getByText('Nested card')).toBeInTheDocument();
      expect(screen.getByText('Sidebar Section')).toBeInTheDocument();
    });
  });

  describe('Variant and Color Combinations', () => {
    const variants = ['default', 'outlined'] as const;
    const colors = [
      'surfaceDefault',
      'surfaceElevated',
      'surfaceSubtle',
    ] as const;

    variants.forEach((variant) => {
      colors.forEach((color) => {
        it(`renders ${variant} variant with ${color} color`, () => {
          const { container } = renderWithProvider(
            <BpkCardV2.Root variant={variant} bgColor={color}>
              <BpkCardV2.Body>Content</BpkCardV2.Body>
            </BpkCardV2.Root>,
          );

          const card = container.querySelector('[class*="bpk-card-v2"]');

          expect(card).toHaveClass(`bpk-card-v2--${toKebab(variant)}`);
          expect(card).toHaveClass(`bpk-card-v2--${toKebab(color)}`);
        });
      });
    });
  });

});
