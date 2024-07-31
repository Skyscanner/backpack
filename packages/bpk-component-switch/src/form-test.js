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

import { useState, useEffect } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkSwitch from './BpkSwitch';

describe('BpkSwitch form test', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [isChecked, setIsChecked] = useState(false);
      return (
        <form data-testid="form">
          <BpkSwitch
            name="switch"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            data-testid="myswitch"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    render(<Wrap />);

    const mySwitch = screen.getByTestId('myswitch');
    expect(mySwitch).not.toBeChecked();

    await userEvent.click(mySwitch);
    expect(mySwitch).toBeChecked();

    const formData = new FormData(screen.getByTestId('form'));
    expect(Object.fromEntries(formData.entries())).toEqual({ switch: 'on' });
  });

  it('should emit change event when toggled', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [isChecked, setIsChecked] = useState(false);
      useEffect(() => {
        document.addEventListener('change', formValidation);
      }, []);
      return (
        <form data-testid="form">
          <BpkSwitch
            name="switch"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            data-testid="myswitch"
          />
          <button type="submit">Submit</button>
        </form>
      );
    };
    render(<Wrap />);

    const mySwitch = screen.getByTestId('myswitch');
    expect(mySwitch).not.toBeChecked();
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(mySwitch);
    expect(mySwitch).toBeChecked();

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
