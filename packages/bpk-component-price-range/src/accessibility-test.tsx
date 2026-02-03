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

import BpkPriceRange, { type BpkPriceRangeProps } from './BpkPriceRange';
import { MARKER_DISPLAY_TYPES } from './common-types';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

const segments: BpkPriceRangeProps['segments'] = {
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
  describe('dot marker (use case 1 - boundaries hidden)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£150',
            percentage: 50,
            type: MARKER_DISPLAY_TYPES.DOT,
          }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('bubble marker (use case 2 - boundaries shown)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£150',
            percentage: 50,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('default marker type (bubble when type omitted)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£150',
            percentage: 50,
          }}
          segments={segments}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('no marker (use case 3 - boundaries shown)', () => {
    it('should not have programmatically-detectable accessibility issues', async () => {
      const { container } = render(<BpkPriceRange segments={segments} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
