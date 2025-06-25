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

import BpkPhoneInput from './BpkPhoneInput';

const dialingCodeProps = {
  id: 'dialing-code',
  name: 'dialing_code',
  label: 'Dialing code',
  className: 'dialing-code',
  wrapperClassName: 'dialing-wrapper',
};

const dialingCodes = [
  { code: '44', description: '+44', numberPrefix: '+44' },
  { code: '55', description: '+55', numberPrefix: '+55' },
];

const defaultProps = {
  id: 'phone-input-id',
  name: 'telephone_input',
  label: 'Telephone number',
  value: '1234',
  dialingCode: '44',
  className: 'fancy-input',
  onChange: () => {},
  onDialingCodeChange: () => {},
  dialingCodes,
  dialingCodeProps,
};

describe('BpkPhoneInput form test', () => {
  it('should work as a form component in a form', async () => {
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [inputValue, setInputValue] = useState('');
      return (
        // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        <form data-testid="form">
          // @ts-expect-error TS(2365) FIXME: Operator '<' cannot be applied to types 'string' a... Remove this comment to see the full error message
          // @ts-expect-error TS(2741): Property 'mixed' is missing in type '{ "data-testi... Remove this comment to see the full error message
          <BpkPhoneInput
            // @ts-expect-error TS(2609) FIXME: JSX spread child must be an array type.
            {...defaultProps}
            data-testid="myInput"
            value={inputValue}
            // @ts-expect-error TS(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);

    const textInput = screen.getByTestId('myInput');
    expect(textInput).toHaveValue('');

    await userEvent.click(textInput);
    await userEvent.keyboard('555 5555');

    expect(textInput).toHaveValue('555 5555');

    // @ts-expect-error TS(2345) FIXME: Argument of type 'HTMLElement' is not assignable t... Remove this comment to see the full error message
    const formData = new FormData(screen.getByTestId('form'));
    expect(Object.fromEntries(formData.entries())).toEqual({
      telephone_input: '555 5555',
      dialing_code: '44',
    });
  });

  it('should emit change event when text has been entered and blurred', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      // state is required to force react to update and re-render the component.
      const [inputValue, setInputValue] = useState('');
      return (
        // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        <form data-testid="form">
          // @ts-expect-error TS(2365) FIXME: Operator '<' cannot be applied to types 'string' a... Remove this comment to see the full error message
          // @ts-expect-error TS(2741): Property 'mixed' is missing in type '{ "data-testi... Remove this comment to see the full error message
          <BpkPhoneInput
            // @ts-expect-error TS(2609) FIXME: JSX spread child must be an array type.
            {...defaultProps}
            data-testid="myInput"
            value={inputValue}
            // @ts-expect-error TS(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<Wrap />);
    document.addEventListener('change', formValidation);

    const phoneInput = screen.getByTestId('myInput');
    const form = screen.getByTestId('form');

    expect(phoneInput).toHaveValue('');
    expect(formValidation).not.toHaveBeenCalled();

    await userEvent.click(phoneInput);
    await userEvent.keyboard('555 5555');
    await userEvent.click(form); // change event emitted on blur
    expect(phoneInput).toHaveValue('555 5555');

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
