import React from 'react';
import renderer from 'react-test-renderer';
import FlightIcon from 'bpk-component-icon/lg/flight';

import BpkAutosuggestSuggestion from './BpkAutosuggestSuggestion';

describe('BpkAutosuggestSuggestion', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "subHeading" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "tertiaryLabel" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
        tertiaryLabel="Scotland"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "tertiaryLabel" attribute but without a "subHeading" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        tertiaryLabel="Scotland"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "icon" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        icon={FlightIcon}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with an "indent" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        indent
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with all available attributes', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading="United Kingdom"
        tertiaryLabel="Scotland"
        icon={FlightIcon}
        indent
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion value="Edinburgh" className="custom-class-1 custom-class-2" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "value" attribute being an element', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value={<strong>Edinburgh</strong>}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "subHeading" attribute being an element', () => {
    const tree = renderer.create(
      <BpkAutosuggestSuggestion
        value="Edinburgh"
        subHeading={<strong>United Kingdom</strong>}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
