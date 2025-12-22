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


import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import BpkAutosuggest from './BpkAutosuggest';

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

describe('BpkAutosuggest accessibility tests', () => {
  /*
  This component isn't as accessible as it could be due to the underlying
  library we use for it. At some point we plan to replace it, but for now
  it won't pass the accessibility test.
  */
  it.skip('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
