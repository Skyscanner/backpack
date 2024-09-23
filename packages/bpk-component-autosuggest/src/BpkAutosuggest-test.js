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

import { render } from '@testing-library/react';

import AutosuggestWrapper from './BpkAutosuggest';

const suggestions = ['Edinburgh', 'Glasgow', 'London'];
const onSuggestionsFetchRequested = () => null;
const onSuggestionsClearRequested = () => null;
const getSuggestionValue = (suggestion) => suggestion;
const renderSuggestion = (suggestion) => <span>{suggestion}</span>;
const inputProps = {
  id: 'origin',
  name: 'Origin',
  value: 'Edinburgh',
  onChange: () => null,
};

describe('AutosuggestWrapper', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <AutosuggestWrapper
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "alwaysRenderSuggestions" attribute', () => {
    const { asFragment } = render(
      <AutosuggestWrapper
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set the input reference', () => {
    let inputRef;

    const storeAutosuggestReference = (ref) => {
      inputRef = ref;
    };

    const { container } = render(
      <AutosuggestWrapper
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{ inputRef: storeAutosuggestReference, ...inputProps }}
      />,
    );

    const input = container.querySelector('input');
    expect(input).toEqual(inputRef);
  });

  it('should default autocomplete to off', () => {
    const { container } = render(
      <AutosuggestWrapper
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />,
    );

    const input = container.querySelector('input');
    expect(input.autocomplete).toEqual('off');
  });

  it('should allow a consumer to override autocomplete', () => {
    const { container } = render(
      <AutosuggestWrapper
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{ autoComplete: 'on', ...inputProps }}
      />,
    );

    const input = container.querySelector('input');
    expect(input.autocomplete).toEqual('on');
  });
});
