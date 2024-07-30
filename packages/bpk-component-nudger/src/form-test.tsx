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

import BpkNudger from './BpkNudger';

describe('BpkNudger form test', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [nudgerValue, setNudgerValue] = useState(5);
      return (
        <form data-testid="form">
          <BpkNudger
            id="nudger"
            min={1}
            max={9}
            value={nudgerValue}
            name="test-nudger"
            onChange={(v) => setNudgerValue(v)}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            data-testid="myNudger"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const minusButton = screen.getByRole('button', { name: 'Decrease' });

    const textInput = screen.getByTestId('myNudger');
    expect(textInput).toHaveValue('5');

    await userEvent.click(minusButton);

    expect(textInput).toHaveValue('4');

    const formData = new FormData(
      screen.getByTestId('form') as HTMLFormElement,
    );
    expect(Object.fromEntries(formData.entries())).toEqual({
      'test-nudger': '4',
    });
  });

  it('should emit change event when nudger value is decreased', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [nudgerValue, setNudgerValue] = useState(5);
      useEffect(() => {
        document.addEventListener('change', formValidation);
      }, []);
      return (
        <form data-testid="form">
          <BpkNudger
            id="nudger"
            min={1}
            max={9}
            value={nudgerValue}
            name="test-nudger"
            onChange={(v) => setNudgerValue(v)}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            data-testid="myNudger"
          />
          ,<button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const minusButton = screen.getByRole('button', { name: 'Decrease' });

    const textInput = screen.getByTestId('myNudger');
    expect(textInput).toHaveValue('5');
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(minusButton);

    expect(textInput).toHaveValue('4');

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
