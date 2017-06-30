import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import BpkAutosuggest from './BpkAutosuggest';

const suggestions = ['Edinburgh', 'Glasgow', 'London'];
const onSuggestionsFetchRequested = () => null;
const onSuggestionsClearRequested = () => null;
const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => <span>{suggestion}</span>;
const inputProps = { value: 'Edinburgh', onChange: () => null };

describe('BpkAutosuggest', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "alwaysRenderSuggestions" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should set the input reference', () => {
    let inputRef;
    const storeAutosuggestReference = (autosuggest) => {
      if (autosuggest !== null) {
        inputRef = autosuggest.input;
      }
    };
    const tree = ReactTestUtils.renderIntoDocument(
      <BpkAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        ref={storeAutosuggestReference}
      />,
    );
    const input = ReactTestUtils.findRenderedDOMComponentWithTag(tree, 'input');
    expect(input).toEqual(inputRef);
  });
});
