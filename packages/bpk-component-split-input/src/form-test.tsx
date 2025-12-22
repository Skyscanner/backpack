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

import BpkSplitInput from './BpkSplitInput';

describe('BpkSplitInput', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      const [inputTest, setInputTest] = useState('');

      return (
        <form data-testid="form">
          <BpkSplitInput
            id="test"
            data-testid="mySplitInput"
            name="test"
            inputLength={4}
            label="Enter code"
            placeholder='Enter code'
            onInputChange={(value) => setInputTest(inputTest)}
            onSubmit={(value) => setInputTest(inputTest)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const splitInputs = screen.getAllByTestId('mySplitInput');

    /* eslint-disable no-await-in-loop */
    for (const input of splitInputs) {
      await userEvent.click(input);
      await userEvent.keyboard('1'); }
    /* eslint-enable no-await-in-loop */

    const form = screen.getByTestId('form') as HTMLFormElement;

    const formData = new FormData(form);
    expect(Object.fromEntries(formData.entries())).toEqual({
      'test-0': '1',
      'test-1': '1',
      'test-2': '1',
      'test-3': '1',
    });
  });

it('should emit change event when text has been entered and blurred', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      const [inputTest, setInputTest] = useState('');
      return (
        <form data-testid="form">
          <BpkSplitInput
            id="test"
            data-testid="mySplitInput"
            name="test"
            inputLength={4}
            label="Enter code"
            placeholder='Enter code'
            onInputChange={(value) => setInputTest(inputTest)}
            onSubmit={(value) => setInputTest(inputTest)}
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);
    document.addEventListener('change', formValidation);

    const splitInputs = screen.getAllByTestId('mySplitInput');
    const form = screen.getByTestId('form');

    expect(formValidation).not.toHaveBeenCalled();

  /* eslint-disable no-await-in-loop */
    for (const input of splitInputs) {
      await userEvent.click(input);
      await userEvent.keyboard('1');
    }
  /* eslint-enable no-await-in-loop */

    await userEvent.click(form); // change event emitted on blur

    expect(formValidation).toHaveBeenCalledTimes(4);
  });
});
