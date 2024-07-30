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

import { useEffect } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkSelect from './BpkSelect';

describe('BpkSelect form test', () => {
  it('should work as a form component in a form', async () => {
    render(
      <form data-testid="form">
        <BpkSelect
          id="fruits"
          name="fruits"
          defaultValue="apples"
          data-testid="myselect"
        >
          <option value="apples">Apples</option>
          <option data-testid="select-option" value="oranges">
            Oranges
          </option>
          <option value="pears">Pears</option>
          <option value="tomatoes">Tomatoes</option>
        </BpkSelect>
        <button type="submit">Submit</button>
      </form>,
    );

    const select = screen.getByTestId('myselect');
    const option = screen.getByTestId('select-option');

    expect(select.options.selectedIndex).toEqual(0);

    expect(screen.getByText('Apples').selected).toBeTruthy();

    await userEvent.selectOptions(select, option);

    expect(option.selected).toBeTruthy();
    expect(screen.getByText('Apples').selected).toBeFalsy();

    const formData = new FormData(screen.getByTestId('form'));

    expect(Object.fromEntries(formData.entries())).toEqual({
      fruits: 'oranges',
    });
  });

  it('should emit change event on option selection that calls formValidation', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      useEffect(() => {
        document.addEventListener('change', formValidation);
      }, []);
      return (
        <form data-testid="form">
          <BpkSelect
            id="fruits"
            name="fruits"
            defaultValue="apples"
            data-testid="myselect"
          >
            <option value="apples">Apples</option>
            <option data-testid="select-option" value="oranges">
              Oranges
            </option>
            <option value="pears">Pears</option>
            <option value="tomatoes">Tomatoes</option>
          </BpkSelect>
          <button type="submit">Submit</button>
        </form>
      );
    };
    render(<Wrap />);

    const select = screen.getByTestId('myselect');

    expect(select.options.selectedIndex).toEqual(0);
    expect(screen.getByText('Apples').selected).toBeTruthy();

    await userEvent.selectOptions(select, 'oranges');

    expect(screen.getByText('Apples').selected).toBeFalsy();
    expect(screen.getByText('Oranges').selected).toBeTruthy();

    expect(formValidation).toHaveBeenCalledTimes(1);

    await userEvent.selectOptions(select, 'pears');

    expect(screen.getByText('Oranges').selected).toBeFalsy();
    expect(screen.getByText('Pears').selected).toBeTruthy();
    expect(formValidation).toHaveBeenCalledTimes(2);
  });
});
