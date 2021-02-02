/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';
import { withRtlSupport } from 'bpk-component-icon';
import FlightIcon from 'bpk-component-icon/lg/flight';

import BpkAutosuggest, { BpkAutosuggestSuggestion } from './index';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China',
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary',
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom',
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true,
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States',
  },
  {
    name: "Shenzhen Bao'an International",
    code: 'SZX',
    country: 'China',
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore',
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria',
  },
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : offices.filter(
        office => office.name.toLowerCase().indexOf(inputValue) !== -1,
      );
};

const getSuggestionValue = suggestion =>
  `${suggestion.name} (${suggestion.code})`;

type State = {
  value: string,
  suggestions: Array<any>,
};

type Props = {
  includeIcon: boolean,
  includeSubheading: boolean,
  includeTertiaryLabel: boolean,
};

class AutosuggestExample extends React.Component<Props, State> {
  static defaultProps = {
    includeIcon: false,
    includeSubheading: false,
    includeTertiaryLabel: false,
  };

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (e: SyntheticEvent<any>, { newValue }: { newValue: string }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const { includeIcon, includeSubheading, includeTertiaryLabel } = this.props;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'my_autosuggest',
      value,
      placeholder: 'Enter an office name',
      onChange: this.onChange,
    };

    return (
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={suggestion => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            indent={suggestion.indent}
            icon={includeIcon ? BpkFlightIcon : null}
            subHeading={includeSubheading ? suggestion.country : null}
            tertiaryLabel={includeTertiaryLabel ? 'Tertiary label' : null}
          />
        )}
        inputProps={inputProps}
      />
    );
  }
}

export default AutosuggestExample;
