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

import BpkSlider from './BpkSlider';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkSlider accessibility tests', () => {
    const defaultProps = {
    min: 0,
    max: 100,
    value: 25,
    step: 10,
    onChange: jest.fn(),
    onAfterChange: jest.fn(),
  }
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        <label id="label" htmlFor="slider">
          Slider
        </label>
        <BpkSlider
          {...defaultProps}
          ariaLabelledby="label"
          id="slider"
          ariaLabel={['time']}
          ariaValuetext={['25']}
        />
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when using a range slider', async () => {
    const { container } = render(
      <div>
        <label id="range-label" htmlFor="range-slider">
          Range Slider
        </label>
        <BpkSlider
          {...defaultProps}
          ariaLabelledby="range-label"
          id="range-slider"
          value={[0, 1290]}
          ariaLabel={['from', 'to']}
          ariaValuetext={['00:00', '21:30']}
        />
      </div>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
