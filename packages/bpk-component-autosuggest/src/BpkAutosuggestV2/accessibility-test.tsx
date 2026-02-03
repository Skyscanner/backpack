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
// @ts-nocheck

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkAutosuggest from './BpkAutosuggest';

type Suggestion = { placeId: string; placeName: string };

const suggestions: Suggestion[] = [
  { placeId: '1', placeName: 'London' },
  { placeId: '2', placeName: 'Paris' },
];

const renderSuggestion = (s: Suggestion) => <div>{s.placeName}</div>;
const getSuggestionValue = (s: Suggestion) => s.placeName;

const getBaseProps = () => ({
  id: 'bpk-autosuggest',
  suggestions,
  getSuggestionValue,
  renderSuggestion,
  inputProps: { placeholder: 'Search here...' },
  ariaLabels: {
    label: 'Search input',
    resultsList: 'Suggestions list',
    clearButton: 'Clear',
    noResults: 'No results',
  },
  onSuggestionsFetchRequested: jest.fn(),
  onSuggestionsClearRequested: jest.fn(),
  onSuggestionSelected: jest.fn(),
  getA11yResultsMessage: (count: number) =>
    `${count} result${count === 1 ? '' : 's'}`,
});

describe('BpkAutosuggestV2 accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(<BpkAutosuggest {...getBaseProps()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
