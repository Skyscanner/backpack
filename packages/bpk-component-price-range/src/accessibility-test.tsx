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
import { axe } from 'jest-axe';

import BpkPriceRange from './BpkPriceRange';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const segments = {
  low: {
    price: '£100',
    percentage: 20,
  },
  high: {
    price: '£200',
    percentage: 80,
  },
};

describe('BpkPriceRange accessibility tests', () => {
  describe('bubble marker with boundaries (use case 2)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          showPriceOnBoundaries
          marker={{ price: '£150', percentage: 50, type: 'bubble' }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('dot marker with boundaries (use case 1)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          showPriceOnBoundaries
          marker={{ price: '£150', percentage: 50, type: 'dot' }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('dot marker without boundaries (use case 3)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          showPriceOnBoundaries={false}
          marker={{ price: '£150', percentage: 50, type: 'dot' }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('bubble marker without boundaries (use case 4)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          showPriceOnBoundaries={false}
          marker={{ price: '£150', percentage: 50, type: 'bubble' }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('no marker with boundaries (use case 5)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange showPriceOnBoundaries segments={segments} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('no marker without boundaries (use case 6)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange showPriceOnBoundaries={false} segments={segments} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
