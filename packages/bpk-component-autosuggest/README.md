# bpk-component-autosuggest

> Backpack autosuggest component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import FlightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight';
import BpkAutosuggest, { BpkAutosuggestSuggestion } from '@skyscanner/backpack-web/bpk-component-autosuggest';

const BpkFlightIcon = withRtlSupport(FlightIcon);

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
  },
  ...
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : offices.filter(office =>
    office.name.toLowerCase().indexOf(inputValue) !== -1,
  );
};

const getSuggestionValue = ({ name, code }) => `${name} (${code})`;

const renderSuggestion = suggestion => (
  <BpkAutosuggestSuggestion
    value={getSuggestionValue(suggestion)}
    subHeading={suggestion.country}
    tertiaryLabel="Airport"
    indent={suggestion.indent}
    icon={BpkFlightIcon}
  />
);

class MyComponent extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };

  }

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'my-autosuggest',
      placeholder: 'Enter an office name',
      value,
      onChange: this.onChange,
    };

    return (
      <div>
        <BpkLabel htmlFor="my-autosuggest">Office</BpkLabel>
        <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
```

## Props

*BpkAutosuggest:*

[Please refer to `react-autosuggest`'s documentation for a full list of props](https://github.com/moroshko/react-autosuggest#props).

**Note:** The `inputProps` object is passed directly to a [`BpkInput`](https://backpack.github.io/components/text-input?platform=web) component, so its prop types apply also.

*BpkAutosuggestSuggestion:*

| Property          | PropType             | Required | Default Value |
| ----------------- | -------------------- | -------- | ------------- |
| value             | string               | true     | -             |
| subHeading        | string               | false    | null          |
| tertiaryLabel     | string               | false    | null          |
| icon              | func                 | false    | null          |
| indent            | bool                 | false    | false         |
| className         | string               | false    | null          |
