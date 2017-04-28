import React from 'react';
import renderer from 'react-test-renderer';
import BpkCheckbox from './BpkCheckbox';

describe('BpkCheckbox', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with id attribute', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        id="checkbox"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with checked attribute', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        checked
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        disabled
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        white
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with value attribute', () => {
    const tree = renderer.create(
      <BpkCheckbox
        name="checkbox"
        label="Prefer directs"
        value="my-value"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

