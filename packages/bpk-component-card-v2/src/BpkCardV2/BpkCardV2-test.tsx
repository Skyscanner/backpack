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

import { createRef } from 'react';

import { render } from '@testing-library/react';

import BpkCardV2 from './BpkCardV2';

describe('BpkCardV2', () => {
  describe('Basic Composition', () => {
    it('renders with Header, Body, and Footer', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Card title</BpkCardV2.Header>
          <BpkCardV2.Body>Card content</BpkCardV2.Body>
          <BpkCardV2.Footer>Card footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('[class*="bpk-card-v2__header"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="bpk-card-v2__body"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="bpk-card-v2__footer"]')).toBeInTheDocument();
    });

    it('renders header element', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Title</BpkCardV2.Header>
        </BpkCardV2.Root>,
      );

      const header = container.querySelector('[class*="bpk-card-v2__header"]');

      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Title');
    });

    it('renders footer element', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      const footer = container.querySelector('[class*="bpk-card-v2__footer"]');

      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer');
    });

    it('renders with children in Body', () => {
      const { getByText } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Body content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(getByText('Body content')).toBeInTheDocument();
    });
  });

  describe('Split Layout', () => {
    it('renders Primary and Secondary in split layout', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split>
            <BpkCardV2.Primary>Primary content</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Secondary content</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('[class*="bpk-card-v2__primary"]')).toBeInTheDocument();
      expect(container.querySelector('[class*="bpk-card-v2__secondary"]')).toBeInTheDocument();
    });

    it('applies split modifier class when split={true}', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split>
            <BpkCardV2.Primary>Main</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Side</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]');

      expect(body).toHaveClass('bpk-card-v2__body--split');
    });

    it('does not apply split modifier when split={false}', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split={false}>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]');

      expect(body).not.toHaveClass('bpk-card-v2__body--split');
    });

    it('applies splitRatio via CSS custom property', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split splitRatio={60}>
            <BpkCardV2.Primary>Main (60%)</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Side (40%)</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('60%');
    });

    it('defaults to 70% split ratio when not specified', () => {
      const { container } = render(
        <BpkCardV2.Root>
          <BpkCardV2.Body split>
            <BpkCardV2.Primary>Main</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Side</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

      expect(body.style.getPropertyValue('--bpk-card-v2-primary-width')).toBe('70%');
    });
  });

  describe('Surface Colors', () => {
    const surfaceColors = [
      'surfaceDefault',
      'surfaceElevated',
      'surfaceTint',
      'surfaceSubtle',
      'surfaceHero',
      'surfaceContrast',
      'surfaceLowContrast',
      'surfaceHighlight',
    ] as const;

    surfaceColors.forEach((color) => {
      it(`applies ${color} surface color as data attribute`, () => {
        const { container } = render(
          <BpkCardV2.Root bgColor={color}>Content</BpkCardV2.Root>,
        );

        const card = container.querySelector('[class*="bpk-card-v2"]');

        expect(card).toHaveAttribute('data-bg-color', color);
      });
    });

    it('defaults to surfaceDefault color', () => {
      const { container } = render(<BpkCardV2.Root>Content</BpkCardV2.Root>);

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('data-bg-color', 'surfaceDefault');
    });
  });

  describe('Visual Variants', () => {
    it('applies default variant class by default', () => {
      const { container } = render(<BpkCardV2.Root>Content</BpkCardV2.Root>);

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('bpk-card-v2--default');
    });

    it('applies outlined variant class when specified', () => {
      const { container } = render(<BpkCardV2.Root variant="outlined">Content</BpkCardV2.Root>);

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('bpk-card-v2--outlined');
    });
  });

  describe('Refs', () => {
    it('forwards ref to root div element', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <BpkCardV2.Root ref={ref}>Content</BpkCardV2.Root>,
      );

      expect(ref.current).toBe(container.querySelector('[class*="bpk-card-v2"]'));
    });

    it('ref provides access to root element properties', () => {
      const ref = createRef<HTMLDivElement>();
      render(<BpkCardV2.Root ref={ref}>Content</BpkCardV2.Root>);

      expect(ref.current?.dataset.bgColor).toBe('surfaceDefault');
      expect(ref.current?.className).toContain('bpk-card-v2');
    });
  });

  describe('ARIA Attributes', () => {
    it('applies ariaLabel prop', () => {
      const { container } = render(
        <BpkCardV2.Root ariaLabel="Product card">Content</BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-label', 'Product card');
    });

    it('applies ariaLabelledBy prop', () => {
      const { container } = render(
        <BpkCardV2.Root ariaLabelledBy="card-title">Content</BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });
  });

  describe('Display Names', () => {
    it('sets display name for debugging', () => {
      expect(BpkCardV2.Root.displayName).toBe('BpkCardV2.Root');
      expect(BpkCardV2.Header.displayName).toBe('BpkCardV2.Header');
      expect(BpkCardV2.Body.displayName).toBe('BpkCardV2.Body');
      expect(BpkCardV2.Primary.displayName).toBe('BpkCardV2.Primary');
      expect(BpkCardV2.Secondary.displayName).toBe('BpkCardV2.Secondary');
      expect(BpkCardV2.Footer.displayName).toBe('BpkCardV2.Footer');
    });
  });

  describe('Padding Props', () => {
    describe('Header padding', () => {
      it('applies string padding to Header', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Header padding="lg">Title</BpkCardV2.Header>
          </BpkCardV2.Root>,
        );

        const header = container.querySelector('[class*="bpk-card-v2__header"]') as HTMLElement;

        expect(header.style.padding).toBe('var(--bpk-spacing-lg)');
      });

      it('applies none padding to Header', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Header padding="none">Title</BpkCardV2.Header>
          </BpkCardV2.Root>,
        );

        const header = container.querySelector('[class*="bpk-card-v2__header"]') as HTMLElement;

        expect(header.style.padding).toBe('0px');
      });

      it('applies vertical/horizontal padding to Header', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Header padding={{ vertical: 'sm', horizontal: 'xl' }}>Title</BpkCardV2.Header>
          </BpkCardV2.Root>,
        );

        const header = container.querySelector('[class*="bpk-card-v2__header"]') as HTMLElement;

        expect(header.style.paddingTop).toBe('var(--bpk-spacing-sm)');
        expect(header.style.paddingBottom).toBe('var(--bpk-spacing-sm)');
        expect(header.style.paddingInlineStart).toBe('var(--bpk-spacing-xl)');
        expect(header.style.paddingInlineEnd).toBe('var(--bpk-spacing-xl)');
      });

      it('applies individual side padding to Header', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Header padding={{ top: 'lg', bottom: 'sm', start: 'md', end: 'none' }}>Title</BpkCardV2.Header>
          </BpkCardV2.Root>,
        );

        const header = container.querySelector('[class*="bpk-card-v2__header"]') as HTMLElement;

        expect(header.style.paddingTop).toBe('var(--bpk-spacing-lg)');
        expect(header.style.paddingBottom).toBe('var(--bpk-spacing-sm)');
        expect(header.style.paddingInlineStart).toBe('var(--bpk-spacing-md)');
        // JSDOM normalizes '0' to '0px' for some properties inconsistently
        expect(['0', '0px']).toContain(header.style.paddingInlineEnd);
      });
    });

    describe('Body padding', () => {
      it('applies string padding to Body', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Body padding="xl">Content</BpkCardV2.Body>
          </BpkCardV2.Root>,
        );

        const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

        expect(body.style.padding).toBe('var(--bpk-spacing-xl)');
      });

      it('applies vertical/horizontal padding to Body', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Body padding={{ vertical: 'xxl', horizontal: 'base' }}>Content</BpkCardV2.Body>
          </BpkCardV2.Root>,
        );

        const body = container.querySelector('[class*="bpk-card-v2__body"]') as HTMLElement;

        expect(body.style.paddingTop).toBe('var(--bpk-spacing-xxl)');
        expect(body.style.paddingBottom).toBe('var(--bpk-spacing-xxl)');
        expect(body.style.paddingInlineStart).toBe('var(--bpk-spacing-base)');
        expect(body.style.paddingInlineEnd).toBe('var(--bpk-spacing-base)');
      });
    });

    describe('Footer padding', () => {
      it('applies string padding to Footer', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Footer padding="sm">Footer</BpkCardV2.Footer>
          </BpkCardV2.Root>,
        );

        const footer = container.querySelector('[class*="bpk-card-v2__footer"]') as HTMLElement;

        expect(footer.style.padding).toBe('var(--bpk-spacing-sm)');
      });

      it('applies individual side padding to Footer', () => {
        const { container } = render(
          <BpkCardV2.Root>
            <BpkCardV2.Footer padding={{ top: 'none', bottom: 'md' }}>Footer</BpkCardV2.Footer>
          </BpkCardV2.Root>,
        );

        const footer = container.querySelector('[class*="bpk-card-v2__footer"]') as HTMLElement;

        // JSDOM normalizes '0' to '0px' for some properties
        expect(['0', '0px']).toContain(footer.style.paddingTop);
        expect(footer.style.paddingBottom).toBe('var(--bpk-spacing-md)');
      });
    });

    describe('All padding sizes', () => {
      const paddingSizes = ['none', 'sm', 'md', 'base', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'] as const;

      paddingSizes.forEach((size) => {
        it(`applies ${size} padding correctly`, () => {
          const { container } = render(
            <BpkCardV2.Root>
              <BpkCardV2.Header padding={size}>Title</BpkCardV2.Header>
            </BpkCardV2.Root>,
          );

          const header = container.querySelector('[class*="bpk-card-v2__header"]') as HTMLElement;
          const expectedValue = size === 'none' ? '0px' : `var(--bpk-spacing-${size})`;

          expect(header.style.padding).toBe(expectedValue);
        });
      });
    });
  });
});
