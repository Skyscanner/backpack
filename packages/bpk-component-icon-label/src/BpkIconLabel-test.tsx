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

import InformationCircleIcon from '../../bpk-component-icon/sm/information-circle';
import BpkLink from '../../bpk-component-link';

import BpkIconLabel, { LABEL_STYLE } from './BpkIconLabel';

import type { BpkIconLabelColorScheme } from './common-types';

describe('BpkIconLabel', () => {
  describe('Compound component usage', () => {
    it('should render with icon and text', () => {
      render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Information text</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(screen.getByText('Information text')).toBeInTheDocument();
    });

    it('should render with BpkLink as children in Text', () => {
      render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Information text with{' '}
            <BpkLink href="/learn">inline link</BpkLink>
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(screen.getByText(/Information text with/)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'inline link' })).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/learn');
    });

    it('should render without icon', () => {
      render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Text>Text only</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(screen.getByText('Text only')).toBeInTheDocument();
    });

    it('should apply custom className to Root', () => {
      const { container } = render(
        <BpkIconLabel.Root className="custom-class">
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Text</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Type variants', () => {
    it('should render with type="body" (default)', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root type={LABEL_STYLE.body}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Body text</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with type="label1"', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root type={LABEL_STYLE.label1}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Label 1 text</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with type="footnote"', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Footnote text</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('colorScheme prop', () => {
    it('should render with colorScheme="default" (default)', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Default style</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with colorScheme="on-dark"', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root colorScheme="on-dark">
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>On-dark style</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render with colorScheme="night"', () => {
      const { asFragment } = render(
        <BpkIconLabel.Root colorScheme="night">
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Night style</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('All variant combinations', () => {
    const types = Object.values(LABEL_STYLE);
    const colorSchemes: BpkIconLabelColorScheme[] = ['default', 'on-dark', 'night'];

    types.forEach((type) => {
      colorSchemes.forEach((colorScheme) => {
        it(`should render correctly with type="${type}" and colorScheme="${colorScheme}"`, () => {
          const { asFragment } = render(
            <BpkIconLabel.Root type={type} colorScheme={colorScheme}>
              <BpkIconLabel.Icon>
                <InformationCircleIcon />
              </BpkIconLabel.Icon>
              <BpkIconLabel.Text>Test text</BpkIconLabel.Text>
            </BpkIconLabel.Root>,
          );

          expect(asFragment()).toMatchSnapshot();
        });
      });
    });
  });

  describe('Flexible icon positioning', () => {
    it('should render with icon before text (default order)', () => {
      const { container } = render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>Text after icon</BpkIconLabel.Text>
        </BpkIconLabel.Root>,
      );

      const root = container.firstChild as HTMLElement;
      const children = Array.from(root.children);

      // First child should contain the icon (has aria-hidden somewhere in its tree)
      expect(children[0].querySelector('[aria-hidden="true"]')).toBeInTheDocument();
      // Second child should contain the text
      expect(children[1]).toHaveTextContent('Text after icon');
    });

    it('should render with icon after text (flexible positioning)', () => {
      const { container } = render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Text>Text before icon</BpkIconLabel.Text>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
        </BpkIconLabel.Root>,
      );

      const root = container.firstChild as HTMLElement;
      const children = Array.from(root.children);

      // First child should contain the text
      expect(children[0]).toHaveTextContent('Text before icon');
      // Second child should contain the icon (has aria-hidden somewhere in its tree)
      expect(children[1].querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('should support flexible positioning with all color schemes', () => {
      const { asFragment } = render(
        <>
          <BpkIconLabel.Root colorScheme="default">
            <BpkIconLabel.Text>Default text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
          <BpkIconLabel.Root colorScheme="on-dark">
            <BpkIconLabel.Text>On-dark text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
          <BpkIconLabel.Root colorScheme="night">
            <BpkIconLabel.Text>Night text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
        </>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should support flexible positioning with all typography variants', () => {
      const { asFragment } = render(
        <>
          <BpkIconLabel.Root type={LABEL_STYLE.body}>
            <BpkIconLabel.Text>Body text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
          <BpkIconLabel.Root type={LABEL_STYLE.label1}>
            <BpkIconLabel.Text>Label1 text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
          <BpkIconLabel.Root type={LABEL_STYLE.footnote}>
            <BpkIconLabel.Text>Footnote text first</BpkIconLabel.Text>
            <BpkIconLabel.Icon>
              <InformationCircleIcon />
            </BpkIconLabel.Icon>
          </BpkIconLabel.Root>
        </>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should support flexible positioning with inline links', () => {
      render(
        <BpkIconLabel.Root>
          <BpkIconLabel.Text>
            Check our{' '}
            <BpkLink href="/privacy">privacy policy</BpkLink>
          </BpkIconLabel.Text>
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
        </BpkIconLabel.Root>,
      );

      expect(screen.getByText('Check our')).toBeInTheDocument();
      expect(screen.getByText('privacy policy')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/privacy');
    });
  });
});
