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
  /*
  Currently this test fails because the third-party library
  we're using doesn't pass down the ARIA props we add.
  We should investigate and fix this so we can reinstate the test.
  */
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <div>
        <label id="label" htmlFor="slider">
          Slider
        </label>
        <BpkSlider
          ariaLabelledby="label"
          id="slider"
          min={0}
          max={100}
          value={25}
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
          ariaLabelledby="range-label"
          id="range-slider"
          min={0}
          value={[20, 80]}
        />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
