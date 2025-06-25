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

import BpkPriceRange from './BpkPriceRange';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkPriceRange', () => {
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

  it('should render low price indicator correctly', () => {
    const { container } = render(
      <BpkPriceRange
        marker={{ price: '£50', percentage: 10 }}
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

  it('should render medium price indicator correctly', () => {
    const { container } = render(
      <BpkPriceRange
        marker={{ price: '£150', percentage: 50 }}
        segments={segments}
      />,
    );

    expect(container.querySelector('.bpk-price-marker')).toHaveClass(
      'bpk-price-marker--medium',
    );
  });

  it('should render high price indicator correctly', () => {
    const { container } = render(
      <BpkPriceRange
        marker={{ price: '£300', percentage: 90 }}
        segments={segments}
      />,
    );

    expect(container.querySelector('.bpk-price-marker')).toHaveClass(
      'bpk-price-marker--high',
    );
  });

  it('should render correctly when hide price marker', () => {
    const { container } = render(
      <BpkPriceRange
        showPriceIndicator={false}
        marker={{ price: '£50', percentage: 10 }}
        segments={segments}
      />,
    );

    expect(
      container.querySelector('.bpk-price-range__marker'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.bpk-price-range__line--dot'),
    ).toBeInTheDocument();
  });

  it('should not support custom class names', () => {
    const { container } = render(
      <BpkPriceRange
        // @ts-expect-error TS(2322) FIXME: Type '{ className: string; marker: { price: string... Remove this comment to see the full error message
        className="custom-classname"
        marker={{ price: '£50', percentage: 10 }}
        segments={segments}
      />,
    );

    expect(container.className).not.toContain('custom-classname');
  });
});
