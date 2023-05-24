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
      suggestions: [],
    };

  }

  onInputValueChange = ({method, newValue}) => {
    logEvent('input-value-changed', newValue)
  }


  onSuggestionsFetchRequested = (value) => {
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
    const { suggestions } = this.state;

    const inputProps = {
      id: 'my-autosuggest',
      name: 'my-autosuggest',
      placeholder: 'Enter an office name',
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
          onInputValueChange={this.onInputValueChange}
        />
      </div>
    );
  }
}
```

## Props

*BpkAutosuggest:*


| Property                     | PropType                                           | Required | Default Value |
| ---------------------------- | -------------------------------------------------- | -------- | ------------- |
| ariaLabels                   | object                                             | true     | -             |
| ariaLabels.resultsList       | string                                             | false    | undefined             |
| getSuggestionValue           | function                                           | true     | -             |
| id                           | string                                             | true     | -             |
| inputProps                   | object                                             | true     | -             |
| onSuggestionsClearRequested  | function                                           | true     | -             |
| onSuggestionsFetchRequested  | function                                           | true     | -             |
| renderSuggestion             | function                                           | true     | -             |
| suggestions                  | array                                              | true     | -             |
| ref                  | `React.Ref<HTMLInputElement>`                                              | false     | null             |
| onSuggestionSelected         | function                                           | false    | undefined             |
| onInputValueChance         | function                                           | false    | undefined             |
| defaultValue                 | string                                             | false    | undefined |
| getA11yResultsMessage        | function                                           | false    | undefined             |
| theme                        | object                                             | false    | undefined             |
| highlightFirstSuggestion     | boolean                                            | false    | false             |
| shouldRenderSuggestions      | function                                           | false    | undefined             |
| multiSection                 | boolean                                            | false    | false             |
| getSectionSuggestions        | function                                           | false (true if multiSection)   | null             |
| renderSectionTitle           | function                                           | false (true if multiSection)   | null             |
| alwaysRenderSuggestions      | boolean                                            | false    | false             |
| onLoad      | function                                            | false    | undefined             |
| onClick      | function                                            | false    | undefined             |




**Note:** The `inputProps` object is passed directly to a [`BpkInput`](../bpk-component-input/README.md#props) component, so its prop types apply also. BpkAutosuggest is a forwardRef component which will pass the ref through to BpkInput via the ref prop.

*BpkAutosuggestSuggestion:*

| Property          | PropType             | Required | Default Value |
| ----------------- | -------------------- | -------- | ------------- |
| value             | string               | true     | -             |
| subHeading        | string               | false    | null          |
| tertiaryLabel     | string               | false    | null          |
| icon              | func                 | false    | null          |
| indent            | bool                 | false    | false         |
| className         | string               | false    | null          |
