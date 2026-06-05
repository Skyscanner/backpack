# bpk-component-autosuggest

> Backpack autosuggest component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkLabel from '@skyscanner/backpack-web/bpk-component-label';
import { withRtlSupport } from '@skyscanner/backpack-web/bpk-component-icon';
import FlightIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/flight';
import { BpkAutosuggestLegacy, BpkAutosuggestSuggestion } from '@skyscanner/backpack-web/bpk-component-autosuggest';

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
        <BpkAutosuggestLegacy
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

## AutosuggestV2

The default export is now **BpkAutosuggest** (V2):

```js
import BpkAutosuggest from '@skyscanner/backpack-web/bpk-component-autosuggest';
```

The legacy implementation is still available as a named export:

```js
import { BpkAutosuggestLegacy } from '@skyscanner/backpack-web/bpk-component-autosuggest';
```

- **Migration guide**: see `docs/migrating-from-v1-to-v2.md`.
- **Note**: `BpkAutosuggestLegacy` is the legacy implementation (based on `react-autosuggest`).

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/autosuggest/web-1dnVX8RX#section-props-01).
