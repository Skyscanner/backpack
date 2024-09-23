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

/* @flow strict */

import { useEffect, useState } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AutosuggestWrapper from './BpkAutosuggest';

const suggestions = ['Edinburgh', 'Glasgow', 'London'];
const onSuggestionsFetchRequested = () => null;
const onSuggestionsClearRequested = () => null;
const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => <span>{suggestion}</span>;
const inputProps = {
  id: 'origin',
  name: 'value',
  value: '',
  onChange: jest.fn(),
};

describe('AutosuggestWrapper', () => {
  it('should extract form data from bpk autosuggest', async () => {
    const Wrap = () => {
      const [inputValue, setInputValue] = useState('');

      const inputPropsWithState = {
        ...inputProps,
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value)
      };
      return (
        <form data-testid="form">
          <AutosuggestWrapper
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputPropsWithState}
          />
        </form>
      );
    }
    render(<Wrap />);

    const inputField = screen.getByRole('textbox');
    await userEvent.type(inputField, 'Edi');
    fireEvent.keyDown(inputField, { key: 'Enter' });

    await userEvent.click(document.body);

    const formData = new FormData(screen.getByTestId('form'));
    expect(Object.fromEntries(formData.entries())).toEqual({ value: 'Edinburgh (EDI)' });
  });

  it('should emit change event when input value is entered', async () => {
    const formValidation = jest.fn();
    const Wrap = () => {
      const [inputValue, setInputValue] = useState('');
      useEffect(() => {
        document.addEventListener('change', formValidation);
      }, []);
      const inputPropsWithState = {
        ...inputProps,
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value)
      };
      return (
        <form data-testid="form">
          <AutosuggestWrapper
            data-testid="myInput"
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputPropsWithState}
          />
        </form>
      );
    }
    render(<Wrap />);

    const inputField = screen.getByRole('textbox');
    const form = screen.getByTestId('form');
    await userEvent.type(inputField, 'edi');
    fireEvent.keyDown(inputField, { key: 'ArrowDown' });
    fireEvent.keyDown(inputField, { key: 'Enter' });

    await userEvent.click(form);

    expect(formValidation).toHaveBeenCalledTimes(1);
  });
});
