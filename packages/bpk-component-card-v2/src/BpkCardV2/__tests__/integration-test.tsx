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

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkCardV2 from '../BpkCardV2';

describe('BpkCardV2 Integration Tests', () => {
  describe('Interactive Content', () => {
    it('supports interactive elements in card sections', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      const { getByRole } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Card with interaction</BpkCardV2.Header>
          <BpkCardV2.Body>
            <button type="button" onClick={handleClick}>Click me</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const button = getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports form elements within card', () => {
      const { getByRole } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body>
            <input type="text" placeholder="Enter text" />
            <button type="button">Submit</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(getByRole('textbox')).toBeInTheDocument();
      expect(getByRole('button')).toBeInTheDocument();
    });

    it('supports focus management through card content', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body>
            <button type="button">First</button>
            <button type="button">Second</button>
            <button type="button">Third</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const buttons = getAllByRole('button');

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
      const { getByText, rerender } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Initial content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(getByText('Initial content')).toBeInTheDocument();

      rerender(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Updated content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(getByText('Updated content')).toBeInTheDocument();
    });

    it('handles conditional rendering of sections', () => {
      const shouldShowFooter = true;

      const { queryByText } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Header</BpkCardV2.Header>
          <BpkCardV2.Body>Body</BpkCardV2.Body>
          {shouldShowFooter && <BpkCardV2.Footer>Footer</BpkCardV2.Footer>}
        </BpkCardV2.Root>,
      );

      expect(queryByText('Header')).toBeInTheDocument();
      expect(queryByText('Body')).toBeInTheDocument();
      expect(queryByText('Footer')).toBeInTheDocument();
    });

    it('handles empty sections gracefully', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header />
          <BpkCardV2.Body />
          <BpkCardV2.Footer />
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('[class*="bpk-card-v2__body"]')).toBeInTheDocument();
      expect(container.querySelector('footer')).toBeInTheDocument();
    });
  });

  describe('Edge Cases - Split Layout', () => {
    it('handles splitRatio edge values (0)', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split splitRatio={0}>
            <BpkCardV2.Primary>Primary (0%)</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Secondary (100%)</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('0%');
    });

    it('handles splitRatio edge values (100)', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split splitRatio={100}>
            <BpkCardV2.Primary>Primary (100%)</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Secondary (0%)</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('100%');
    });

    it('handles splitRatio values (50)', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split splitRatio={50}>
            <BpkCardV2.Primary>Primary (50%)</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Secondary (50%)</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('50%');
    });

    it('does not set CSS custom property when split is false', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split={false}>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('');
    });
  });

  describe('Nested Content', () => {
    it('supports nested cards', () => {
      const { container } = render(
        <BpkCardV2.Root ariaLabel="Outer card">
          <BpkCardV2.Body>
            <BpkCardV2.Root ariaLabel="Inner card">
              <BpkCardV2.Body>Nested card content</BpkCardV2.Body>
            </BpkCardV2.Root>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const cards = container.querySelectorAll('[class*="bpk-card-v2"]:not([class*="bpk-card-v2__"])');

      expect(cards.length).toBe(2);
    });

    it('supports complex nested layouts', () => {
      const { getByText } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Outer</BpkCardV2.Header>
          <BpkCardV2.Body split splitRatio={60}>
            <BpkCardV2.Primary>
              <div>
                <h3>Primary Section</h3>
                <BpkCardV2.Root bgColor="surfaceElevated">
                  <BpkCardV2.Body>Nested card</BpkCardV2.Body>
                </BpkCardV2.Root>
              </div>
            </BpkCardV2.Primary>
            <BpkCardV2.Secondary>
              <div>Secondary Section</div>
            </BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(getByText('Outer')).toBeInTheDocument();
      expect(getByText('Primary Section')).toBeInTheDocument();
      expect(getByText('Nested card')).toBeInTheDocument();
      expect(getByText('Secondary Section')).toBeInTheDocument();
    });
  });

  describe('Multiple Class Names', () => {
    it('combines multiple custom classes with BEM classes', () => {
      const { container } = render(
        <BpkCardV2.Root className="custom-1 custom-2">
          <BpkCardV2.Header className="header-custom">Header</BpkCardV2.Header>
          <BpkCardV2.Body className="body-custom">Body</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('custom-1');
      expect(card).toHaveClass('custom-2');
      expect(card).toHaveClass('bpk-card-v2');

      const header = container.querySelector('header');

      expect(header).toHaveClass('header-custom');
      expect(header).toHaveClass('bpk-card-v2__header');

      const body = container.querySelector('[class*="bpk-card-v2__body"]');

      expect(body).toHaveClass('body-custom');
      expect(body).toHaveClass('bpk-card-v2__body');
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
          const { container } = render(
            <BpkCardV2.Root variant={variant} bgColor={color}>
              <BpkCardV2.Body>Content</BpkCardV2.Body>
            </BpkCardV2.Root>,
          );

          const card = container.querySelector('[class*="bpk-card-v2"]');

          expect(card).toHaveClass(`bpk-card-v2--${variant}`);
          expect(card).toHaveAttribute('data-bg-color', color);
        });
      });
    });
  });

  describe('ARIA and Accessibility Integration', () => {
    it('maintains accessibility with complex interactive content', () => {
      const { container } = render(
        <BpkCardV2.Root ariaLabel="Form card" ariaLabelledBy="form-title">
          <BpkCardV2.Header>
            <h2 id="form-title">Settings Form</h2>
          </BpkCardV2.Header>
          <BpkCardV2.Body>
            <label htmlFor="input-1">Input 1:</label>
            <input id="input-1" type="text" />
            <label htmlFor="input-2">Input 2:</label>
            <input id="input-2" type="text" />
          </BpkCardV2.Body>
          <BpkCardV2.Footer>
            <button type="button">Submit</button>
            <button type="button">Cancel</button>
          </BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-label', 'Form card');
      expect(card).toHaveAttribute('aria-labelledby', 'form-title');
    });
  });
});
