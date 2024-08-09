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
            onValueChange={(v) => setNudgerValue(v)}
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

    const numInput = screen.getByTestId('myNudger');
    expect(numInput).toHaveValue(5);

    await userEvent.click(minusButton);

    expect(numInput).toHaveValue(4);

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
            onValueChange={(v) => setNudgerValue(v)}
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

    const numInput = screen.getByTestId('myNudger');
    expect(numInput).toHaveValue(5);
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(minusButton);

    expect(numInput).toHaveValue(4);

    expect(formValidation).toHaveBeenCalledTimes(1);
  });

  it('should emit change event when nudger value is manually changed', async () => {
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
            onValueChange={(v) => setNudgerValue(v)}
            decreaseButtonLabel="Decrease"
            increaseButtonLabel="Increase"
            data-testid="myNudger"
          />
          ,<button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const numInput = screen.getByTestId('myNudger');
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(numInput).toHaveValue(5);
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.clear(numInput);
    await userEvent.type(numInput, '4');
    await button.focus();
    
    expect(numInput).toHaveValue(4);

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
