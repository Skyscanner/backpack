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

import { Component } from 'react';

import {
  BpkAutosuggestLegacy,
  BpkAutosuggestSuggestion,
} from '../../packages/bpk-component-autosuggest';
import { withRtlSupport } from '../../packages/bpk-component-icon';
import FlightIcon from '../../packages/bpk-component-icon/lg/flight';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true,
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: "Shenzhen Bao'an International",
    code: 'SZX',
    country: 'China',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore',
    tertiaryLabel: 'Tertiary label',
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria',
    tertiaryLabel: 'Tertiary label',
  },
];

const dataHanzi = [
  {
    name: '深圳寶安國際 (Shenzhen)',
    code: 'SZX',
    country: '中國',
    tertiaryLabel: '三級標籤',
  },
];

const getSuggestions = (value, hanzi) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const data = hanzi ? dataHanzi : offices;

  return inputLength === 0
    ? []
    : data.filter(
        (office) => office.name.toLowerCase().indexOf(inputValue) !== -1,
      );
};

const getSuggestionValue = (suggestion) =>
  `${suggestion.name} (${suggestion.code})`;

type State = {
  value: string,
  suggestions: Array<any>,
};

type Props = {
  hanzi: boolean,
  includeIcon: boolean,
  includeSubheading: boolean,
  includeTertiaryLabel: boolean,
  alwaysRenderSuggestions: boolean,
};

class AutosuggestExample extends Component<Props, State> {
  static defaultProps = {
    hanzi: false,
    includeIcon: false,
    includeSubheading: false,
    includeTertiaryLabel: false,
    alwaysRenderSuggestions: false,
  };

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: offices,
    };
  }

  onChange = (e: SyntheticEvent<any>, { newValue }: { newValue: string }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.hanzi),
    });
  };

  render() {
    const { suggestions, value } = this.state;

    const { includeIcon, includeSubheading, includeTertiaryLabel } = this.props;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'my_autosuggest',
      value,
      placeholder: 'Enter an office name',
      onChange: this.onChange,
    };

    return (
      <BpkAutosuggestLegacy
        alwaysRenderSuggestions={this.props.alwaysRenderSuggestions}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => (
          <BpkAutosuggestSuggestion
            value={getSuggestionValue(suggestion)}
            indent={suggestion.indent}
            icon={includeIcon ? BpkFlightIcon : null}
            subHeading={includeSubheading ? suggestion.country : null}
            tertiaryLabel={
              includeTertiaryLabel ? suggestion.tertiaryLabel : null
            }
          />
        )}
        inputProps={inputProps}
      />
    );
  }
}

export default AutosuggestExample;
