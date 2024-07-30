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

import { useEffect, useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkInput from './BpkInput';

describe('BpkInput', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [inputTest, setInputTest] = useState('');
      return (
        <form data-testid="form">
          <BpkInput
            id="test"
            data-testid="myInput"
            name="test"
            value={inputTest}
            placeholder="Enter a country, city or airport"
            onChange={(e) => setInputTest(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const textInput = screen.getByTestId('myInput');
    expect(textInput).toHaveValue('');

    await userEvent.click(textInput);
    await userEvent.keyboard('value');

    expect(textInput).toHaveValue('value');

    const formData = new FormData(
      screen.getByTestId('form') as HTMLFormElement,
    );
    expect(Object.fromEntries(formData.entries())).toEqual({ test: 'value' });
  });

  it('should emit change event when text has been entered and blurred', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [inputTest, setInputTest] = useState('');
      useEffect(() => {
        document.addEventListener('change', formValidation);
      }, []);
      return (
        <form data-testid="form">
          <BpkInput
            id="test"
            data-testid="myInput"
            name="test"
            value={inputTest}
            placeholder="Enter a country, city or airport"
            onChange={(e) => setInputTest(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const textInput = screen.getByTestId('myInput');
    const form = screen.getByTestId('form');

    expect(textInput).toHaveValue('');
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(textInput);
    await userEvent.keyboard('value');
    await userEvent.click(form); // change event emitted on blur
    expect(textInput).toHaveValue('value');

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
