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

import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkSlider from './BpkSlider';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkSlider form test', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      const [sliderValue, setSliderValue] = useState<number[]>([50]);
      return (
        <form data-testid="form">
          <BpkSlider
            id="slider"
            min={0}
            max={100}
            value={sliderValue}
            name="slider"
            ariaLabel={['slider']}
            ariaValuetext={['min', 'max']}
            data-testid="mySlider"
            onChange={(value) => setSliderValue(Array.isArray(value) ? value : [value])}
          />
        </form>
      );
    };

    render(<Wrap />);

    const sliderThumb = screen.getByLabelText('slider');
    expect(sliderThumb).toBeInTheDocument();
    await userEvent.click(sliderThumb);
    await userEvent.keyboard('{ArrowRight}');

    const form = screen.getByTestId('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(Object.fromEntries(formData.entries())).toEqual({
      slider: '51',
    });
  });

  it('should emit change event when slider value is changed', async () => {
    const handleChange = jest.fn();
    const Wrap = () => {
      const [sliderValue, setSliderValue] = useState<number[]>([100]);
      return (
        <form data-testid="form">
          <BpkSlider
            id="slider"
            min={0}
            max={100}
            name="slider"
            ariaLabel={['slider']}
            ariaValuetext={['min', 'max']}
            data-testid="mySlider"
            value={sliderValue}
            onChange={(value) => {
              handleChange(value);
              setSliderValue(Array.isArray(value) ? value : [value]);

            }}
          />
        </form>
      );
    };
    render(<Wrap />);

    const sliderThumb = screen.getByLabelText('slider');
    expect(sliderThumb).toBeInTheDocument();

    await userEvent.click(sliderThumb);
    await userEvent.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(51);
  });
});
