import React from 'react';
import renderer from 'react-test-renderer';
import BpkInput, { INPUT_TYPES } from './BpkInput';

describe('BpkInput', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with additional props', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        placeholder="Enter a country, city or airport"
        onChange={() => null}
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
        docked
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedFirst" attribute', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        dockedFirst
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedMiddle" attribute', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        dockedMiddle
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "dockedLast" attribute', () => {
    const tree = renderer.create(
      <BpkInput
        id="test"
        name="test"
        value=""
        dockedLast
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
