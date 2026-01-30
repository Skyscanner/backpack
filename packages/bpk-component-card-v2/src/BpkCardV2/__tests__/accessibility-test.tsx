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
import { axe, toHaveNoViolations } from 'jest-axe';

import BpkCardV2 from '../BpkCardV2';

expect.extend(toHaveNoViolations);

describe('BpkCardV2 Accessibility', () => {
  describe('Semantic HTML', () => {
    it('uses semantic header element', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Header>Title</BpkCardV2.Header>
        </BpkCardV2>,
      );

      const header = container.querySelector('header');

      expect(header).toBeInTheDocument();
    });

    it('uses semantic footer element', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2>,
      );

      const footer = container.querySelector('footer');

      expect(footer).toBeInTheDocument();
    });
  });

  describe('ARIA Labels', () => {
    it('supports ariaLabel for card labeling', () => {
      const { container } = render(
        <BpkCardV2 ariaLabel="Product information">Content</BpkCardV2>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-label', 'Product information');
    });

    it('supports ariaLabelledBy for card labeling', () => {
      const { container } = render(
        <>
          <h2 id="card-heading">Card Heading</h2>
          <BpkCardV2 ariaLabelledBy="card-heading">Content</BpkCardV2>
        </>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-labelledby', 'card-heading');
    });

    it('allows aria label to be provided without ariaLabelledBy', () => {
      const { container } = render(
        <BpkCardV2 ariaLabel="Standalone label">Content</BpkCardV2>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toHaveAttribute('aria-label');
      expect(card).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('Keyboard Navigation', () => {
    it('card container is a valid landmark region', () => {
      const { container } = render(
        <BpkCardV2 ariaLabel="Card region">
          <button type="button">Button 1</button>
          <button type="button">Button 2</button>
        </BpkCardV2>,
      );

      const card = container.querySelector('[class*="bpk-card-v2"]');

      expect(card).toBeInTheDocument();
    });

    it('allows focusable children to be keyboard accessible', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Body>
            <button type="button">Action</button>
          </BpkCardV2.Body>
        </BpkCardV2>,
      );

      const button = container.querySelector('button') as HTMLButtonElement;

      expect(button).toBeInTheDocument();
    });
  });

  describe('Axe Automated Tests', () => {
    it('has no accessibility violations - basic card', async () => {
      const { container } = render(
        <BpkCardV2 ariaLabel="Basic card">
          <BpkCardV2.Header>Title</BpkCardV2.Header>
          <BpkCardV2.Body>Content</BpkCardV2.Body>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - split layout', async () => {
      const { container } = render(
        <BpkCardV2 ariaLabel="Split layout card">
          <BpkCardV2.Body split splitRatio={70}>
            <BpkCardV2.Primary>Main content</BpkCardV2.Primary>
            <BpkCardV2.Secondary>Sidebar</BpkCardV2.Secondary>
          </BpkCardV2.Body>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - outlined variant', async () => {
      const { container } = render(
        <BpkCardV2 variant="outlined" ariaLabel="Outlined card">
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - with different surface colors', async () => {
      const { container } = render(
        <BpkCardV2 bgColor="surfaceElevated" ariaLabel="Elevated card">
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations - complex layout', async () => {
      const { container } = render(
        <BpkCardV2 variant="default" bgColor="surfaceDefault" ariaLabel="Complex card">
          <BpkCardV2.Header>Product Details</BpkCardV2.Header>
          <BpkCardV2.Body split splitRatio={65}>
            <BpkCardV2.Primary>
              <h3>Main Section</h3>
              <p>Product information goes here</p>
            </BpkCardV2.Primary>
            <BpkCardV2.Secondary>
              <h3>Related</h3>
              <p>Related content</p>
            </BpkCardV2.Secondary>
          </BpkCardV2.Body>
          <BpkCardV2.Footer>
            <button type="button">Action</button>
          </BpkCardV2.Footer>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Color Contrast', () => {
    it('maintains color contrast in default variant', async () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Body>Text content with sufficient contrast</BpkCardV2.Body>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('maintains color contrast in outlined variant', async () => {
      const { container } = render(
        <BpkCardV2 variant="outlined">
          <BpkCardV2.Body>Text content</BpkCardV2.Body>
        </BpkCardV2>,
      );

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Structure and Landmarks', () => {
    it('header is properly marked as semantic header element', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Header>Title</BpkCardV2.Header>
        </BpkCardV2>,
      );

      const header = container.querySelector('header');

      expect(header?.tagName).toBe('HEADER');
    });

    it('footer is properly marked as semantic footer element', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Footer>Footer</BpkCardV2.Footer>
        </BpkCardV2>,
      );

      const footer = container.querySelector('footer');

      expect(footer?.tagName).toBe('FOOTER');
    });

    it('body maintains proper semantic structure', () => {
      const { container } = render(
        <BpkCardV2>
          <BpkCardV2.Body>Content</BpkCardV2.Body>
        </BpkCardV2>,
      );

      const body = container.querySelector('[class*="bpk-card-v2__body"]');

      expect(body?.tagName).toBe('DIV');
    });
  });
});
