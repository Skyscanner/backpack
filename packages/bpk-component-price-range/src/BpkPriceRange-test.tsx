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

import BpkPriceRange, { type BpkPriceRangeProps } from './BpkPriceRange';
import { MARKER_DISPLAY_TYPES } from './common-types';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkPriceRange', () => {
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

  describe('dot marker (use case 1 - boundaries hidden)', () => {
    it('should render low dot marker without boundaries correctly', () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£50',
            percentage: 10,
            type: MARKER_DISPLAY_TYPES.DOT,
          }}
          segments={segments}
        />,
      );

      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toHaveClass('bpk-price-range__line--low');
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).not.toBeInTheDocument();
    });

    it('should render medium dot marker without boundaries correctly', () => {
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

      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toHaveClass('bpk-price-range__line--medium');
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).not.toBeInTheDocument();
    });

    it('should render high dot marker without boundaries correctly', () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£300',
            percentage: 90,
            type: MARKER_DISPLAY_TYPES.DOT,
          }}
          segments={segments}
        />,
      );

      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).toHaveClass('bpk-price-range__line--high');
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).not.toBeInTheDocument();
    });
  });

  describe('bubble marker (use case 2 - boundaries shown)', () => {
    it('should render bubble marker by default when type is not provided', () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£150',
            percentage: 50,
          }}
          segments={segments}
        />,
      );

      // Should render bubble marker
      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).toHaveTextContent('£150');
      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--medium',
      );
      // Should show boundaries (default bubble behaviour)
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).toHaveTextContent('£100£200');
      // Should NOT render dot
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).not.toBeInTheDocument();
    });

    it('should render low bubble marker with boundaries correctly', () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£50',
            percentage: 10,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).toHaveTextContent('£50');
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).toHaveTextContent('£100£200');
      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--low',
      );
    });

    it('should render medium bubble marker with boundaries correctly', () => {
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

      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--medium',
      );
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).toHaveTextContent('£100£200');
    });

    it('should render high bubble marker with boundaries correctly', () => {
      const { container } = render(
        <BpkPriceRange
          marker={{
            price: '£300',
            percentage: 90,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--high',
      );
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).toHaveTextContent('£100£200');
    });
  });

  describe('no marker (use case 3 - boundaries shown)', () => {
    it('should render without marker when marker prop is omitted', () => {
      const { container } = render(<BpkPriceRange segments={segments} />);

      // Should not render marker or dot
      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--dot'),
      ).not.toBeInTheDocument();

      // Should still render segment bars
      expect(
        container.querySelector('.bpk-price-range__line--low'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--medium'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.bpk-price-range__line--high'),
      ).toBeInTheDocument();

      // Should render segment labels (boundaries shown when no marker)
      expect(
        container.querySelector('.bpk-price-range__ranges'),
      ).toHaveTextContent('£100£200');
    });
  });

  describe('additional behaviour', () => {
    it('should not support custom class names', () => {
      const { container } = render(
        <BpkPriceRange
          // @ts-expect-error - ignoring for test
          className="custom-classname"
          marker={{
            price: '£50',
            percentage: 10,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      expect(container.className).not.toContain('custom-classname');
    });

    it('should update marker position when marker value changes', () => {
      const { container, rerender } = render(
        <BpkPriceRange
          marker={{
            price: '£50',
            percentage: 10,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      // Initial render with low marker
      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--low',
      );
      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).toHaveTextContent('£50');

      // Re-render with high marker
      rerender(
        <BpkPriceRange
          marker={{
            price: '£300',
            percentage: 90,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      expect(container.querySelector('.bpk-price-marker')).toHaveClass(
        'bpk-price-marker--high',
      );
      expect(
        container.querySelector('.bpk-price-range__marker'),
      ).toHaveTextContent('£300');
    });

    it('should recalculate percentages correctly when min or max changes', () => {
      const { container, rerender } = render(
        <BpkPriceRange
          min={0}
          max={100}
          marker={{
            price: '£50',
            percentage: 50,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      // Get the container with style attribute
      const priceRangeContainer = container.querySelector('.bpk-price-range');

      // Initial render: 50% of range 0-100 should be 0.5
      // segments.low.percentage = 20, so (20-0)/(100-0) = 0.2
      // segments.high.percentage = 80, so (80-0)/(100-0) = 0.8
      let style = priceRangeContainer?.getAttribute('style');
      expect(style).toContain('--low: 0.2');
      expect(style).toContain('--high: 0.8');

      // Re-render with different min/max range
      // Now range is 20-80 (same as segment percentages)
      rerender(
        <BpkPriceRange
          min={20}
          max={80}
          marker={{
            price: '£50',
            percentage: 50,
            type: MARKER_DISPLAY_TYPES.BUBBLE,
          }}
          segments={segments}
        />,
      );

      // After re-render: segments should be recalculated
      // segments.low.percentage = 20, so (20-20)/(80-20) = 0/60 = 0
      // segments.high.percentage = 80, so (80-20)/(80-20) = 60/60 = 1
      style = priceRangeContainer?.getAttribute('style');
      expect(style).toContain('--low: 0');
      expect(style).toContain('--high: 1');

      // Marker should still be rendered (percentage 50 is within range 20-80)
      expect(container.querySelector('.bpk-price-marker')).toBeInTheDocument();
    });
  });
});
