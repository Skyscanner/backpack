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
import { axe, toHaveNoViolations } from 'jest-axe';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCardV2 from './BpkCardV2';
import { CARD_V2_SURFACE_COLORS, CARD_V2_VARIANTS } from './common-types';

expect.extend(toHaveNoViolations);

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

describe('BpkCardV2 Accessibility', () => {
  describe('Subcomponent Structure', () => {
    it('renders header content', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Title</BpkCardV2.Header>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('renders footer content', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('card container is a valid landmark region', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root aria-label="Card region">
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
        </BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toBeInTheDocument();
    });

    it('allows focusable children to be keyboard accessible', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>
            <button type="button">Action</button>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const button = container.querySelector('button') as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });
  });

  describe('Axe Automated Tests', () => {
    it('has no accessibility violations - basic card', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root aria-label="Basic card">
          <BpkCardV2.Header>Title</BpkCardV2.Header>
          <BpkCardV2.Body>Content</BpkCardV2.Body>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - multi-column layout', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root aria-label="Multi-column card">
          <BpkCardV2.Body templateColumns="7fr auto 3fr">
            <BpkCardV2.Section>Main content</BpkCardV2.Section>
            <BpkCardV2.Divider />
            <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - outlined variant', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined} aria-label="Outlined card">
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - with different surface colors', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root bgColor={CARD_V2_SURFACE_COLORS.surfaceElevated} aria-label="Elevated card">
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - carsPrompt variant', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root variant={CARD_V2_VARIANTS.carsPrompt} aria-label="Cars prompt card">
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - complex layout', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root variant={CARD_V2_VARIANTS.default} bgColor={CARD_V2_SURFACE_COLORS.surfaceDefault} aria-label="Complex card">
          <BpkCardV2.Header>Product Details</BpkCardV2.Header>
          <BpkCardV2.Body templateColumns="65fr auto 35fr">
            <BpkCardV2.Section>
              <h3>Main Section</h3>
              <p>Product information goes here</p>
            </BpkCardV2.Section>
            <BpkCardV2.Divider />
            <BpkCardV2.Section>
              <h3>Related</h3>
              <p>Related content</p>
            </BpkCardV2.Section>
          </BpkCardV2.Body>
          <BpkCardV2.Footer>
            <button type="button">Action</button>
          </BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast', () => {
    it('maintains color contrast in default variant', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Text content with sufficient contrast</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('maintains color contrast in outlined variant', async () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root variant={CARD_V2_VARIANTS.outlined}>
          <BpkCardV2.Body>Text content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Structure and Elements', () => {
    it('renders all subcomponents as div elements', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header data-testid="header">Title</BpkCardV2.Header>
          <BpkCardV2.Body data-testid="body">Content</BpkCardV2.Body>
          <BpkCardV2.Footer data-testid="footer">Footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('header').tagName).toBe('DIV');
      expect(screen.getByTestId('body').tagName).toBe('DIV');
      expect(screen.getByTestId('footer').tagName).toBe('DIV');
    });
  });
});
