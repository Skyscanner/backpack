import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkInput, { INPUT_TYPES } from './BpkInput';

describe('BpkInput', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with value', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value="My value"
        onChange={() => null}
        placeholder="Enter a country, city or airport"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "true"', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
        valid
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with valid attribute set to "false"', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
        valid={false}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with type attribute', () => {
    const tree = renderer.create(
      <BpkInput
        type={INPUT_TYPES.PASSWORD}
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
        large
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "docked" attribute', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        onChange={() => null}
        placeholder="Enter a country, city or airport"
        docked
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

