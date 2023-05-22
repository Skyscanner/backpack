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

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import BpkAutosuggest from './BpkAutosuggest';

const suggestions = ['Edinburgh', 'Glasgow', 'London'];
const onSuggestionsFetchRequested = () => null;
const onSuggestionsClearRequested = () => null;
const getSuggestionValue = (suggestion: any) => suggestion;
const renderSuggestion = (suggestion: any) => <span>{suggestion}</span>;

const getRequiredProps = () => ({
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  getSuggestionValue,
  renderSuggestion,
  inputProps: {
    name: 'Origin',
    value: 'Edinburgh',
    placeholder: 'Choose where to fly from',
  },
  ariaLabels: {
    resultsList: 'suggestions list',
  },
  id: 'origin',
});

describe('BpkAutosuggest', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<BpkAutosuggest {...getRequiredProps()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with an "alwaysRenderSuggestions" attribute', () => {
    const { asFragment } = render(
      <BpkAutosuggest {...getRequiredProps()} alwaysRenderSuggestions />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should set the input reference', () => {
    const inputRef = createRef<HTMLInputElement>();

    render(<BpkAutosuggest ref={inputRef} {...getRequiredProps()} />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      'Choose where to fly from',
    );
    expect(input).toEqual(inputRef.current);
  });

  it('should default autocomplete to off', () => {
    render(<BpkAutosuggest {...getRequiredProps()} />);

    const input: HTMLInputElement = screen.getByPlaceholderText(
      'Choose where to fly from',
    );
    expect(input.autocomplete).toEqual('off');
  });

  it('should allow a consumer to override autocomplete', () => {
    render(
      <BpkAutosuggest
        {...getRequiredProps()}
        inputProps={{ autoComplete: 'on', ...getRequiredProps().inputProps }}
      />,
    );

    const input: HTMLInputElement = screen.getByPlaceholderText(
      'Choose where to fly from',
    );
    expect(input.autocomplete).toEqual('on');
  });
});
