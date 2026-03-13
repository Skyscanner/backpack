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
import { createRef } from 'react';

import { render, screen } from '@testing-library/react';

import { BpkProvider, BpkSpacing } from '../../../bpk-component-layout';

import BpkCardV2 from './BpkCardV2';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

describe('BpkCardV2', () => {
  describe('Basic Composition', () => {
    it('renders with Header, Body, and Footer', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header>Card title</BpkCardV2.Header>
          <BpkCardV2.Body>Card content</BpkCardV2.Body>
          <BpkCardV2.Footer>Card footer</BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Card title')).toBeInTheDocument();
      expect(screen.getByText('Card content')).toBeInTheDocument();
      expect(screen.getByText('Card footer')).toBeInTheDocument();
    });

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

    it('renders with children in Body', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Body content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Body content')).toBeInTheDocument();
    });
  });

  describe('Multi-Column Layout', () => {
    it('renders Section children in columns layout', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="7fr 3fr">
            <BpkCardV2.Section>Main content</BpkCardV2.Section>
            <BpkCardV2.Section>Sidebar</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByText('Sidebar')).toBeInTheDocument();
    });

    it('renders three Section children', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="1fr 2fr 1fr">
            <BpkCardV2.Section>Left</BpkCardV2.Section>
            <BpkCardV2.Section>Center</BpkCardV2.Section>
            <BpkCardV2.Section>Right</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Center')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });

    it('renders explicit Divider between sections', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="7fr auto 3fr">
            <BpkCardV2.Section>Main</BpkCardV2.Section>
            <BpkCardV2.Divider />
            <BpkCardV2.Section>Side</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('[class*="bpk-card-v2__divider"]')).toBeInTheDocument();
    });

    it('does not render divider when none is placed', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="1fr 1fr">
            <BpkCardV2.Section>Left</BpkCardV2.Section>
            <BpkCardV2.Section>Right</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('[class*="bpk-card-v2__divider"]')).not.toBeInTheDocument();
    });

    it('does not insert divider when templateColumns is not set', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(container.querySelector('[class*="bpk-card-v2__divider"]')).not.toBeInTheDocument();
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
      it(`applies ${color} surface color as BEM modifier class`, () => {
        const { container } = renderWithProvider(
          <BpkCardV2.Root bgColor={color}>Content</BpkCardV2.Root>,
        );

        const card = container.querySelector('[class*="bpk-card-v2"]');

        expect(card).toHaveClass(`bpk-card-v2--${color}`);
      });
    });

    it('defaults to surfaceDefault color', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>Content</BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('bpk-card-v2--surfaceDefault');
    });
  });

  describe('Visual Variants', () => {
    it('applies default variant class by default', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root>Content</BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('bpk-card-v2--default');
    });

    it('applies outlined variant class when specified', () => {
      const { container } = renderWithProvider(
        <BpkCardV2.Root variant="outlined">Content</BpkCardV2.Root>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveClass('bpk-card-v2--outlined');
    });
  });

  describe('Refs', () => {
    it('forwards ref to root div element', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = renderWithProvider(
        <BpkCardV2.Root ref={ref}>Content</BpkCardV2.Root>,
      );

      expect(ref.current).toBe(container.querySelector('[class*="bpk-card-v2"]'));
    });

    it('ref provides access to root element properties', () => {
      const ref = createRef<HTMLDivElement>();
      renderWithProvider(<BpkCardV2.Root ref={ref}>Content</BpkCardV2.Root>);

      expect(ref.current?.className).toContain('bpk-card-v2');
      expect(ref.current?.className).toContain('bpk-card-v2--surfaceDefault');
    });
  });

  describe('Display Names', () => {
    it('sets display name for debugging', () => {
      expect(BpkCardV2.Root.displayName).toBe('BpkCardV2.Root');
      expect(BpkCardV2.Header.displayName).toBe('BpkCardV2.Header');
      expect(BpkCardV2.Body.displayName).toBe('BpkCardV2.Body');
      expect(BpkCardV2.Section.displayName).toBe('BpkCardV2.Section');
      expect(BpkCardV2.Divider.displayName).toBe('BpkCardV2.Divider');
      expect(BpkCardV2.Footer.displayName).toBe('BpkCardV2.Footer');
    });
  });

  describe('Layout Props', () => {
    it('renders Header with BpkFlex and passes layout props', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Header data-testid="header" padding={BpkSpacing.LG}>
            Title
          </BpkCardV2.Header>
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('renders Footer with BpkFlex and passes layout props', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Footer data-testid="footer" padding={BpkSpacing.SM}>
            Footer
          </BpkCardV2.Footer>
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('renders Body with BpkFlex and passes layout props', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body data-testid="body" padding={BpkSpacing.XL}>
            Content
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('body')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders Section with BpkBox and passes layout props', () => {
      renderWithProvider(
        <BpkCardV2.Root>
          <BpkCardV2.Body templateColumns="1fr 1fr">
            <BpkCardV2.Section data-testid="section-1">Left</BpkCardV2.Section>
            <BpkCardV2.Section data-testid="section-2">Right</BpkCardV2.Section>
          </BpkCardV2.Body>
        </BpkCardV2.Root>,
      );

      expect(screen.getByTestId('section-1')).toBeInTheDocument();
      expect(screen.getByTestId('section-2')).toBeInTheDocument();
    });
  });
});
