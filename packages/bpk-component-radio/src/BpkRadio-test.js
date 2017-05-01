import React from 'react';
import renderer from 'react-test-renderer';
import BpkRadio from './BpkRadio';

describe('BpkRadio', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkRadio
        name="radio"
        label="Direct"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with id attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        id="radio"
        name="radio"
        label="Direct"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with checked attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name="radio"
        label="Direct"
        checked
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with disabled attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name="radio"
        label="Direct"
        disabled
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with white attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name="radio"
        label="Direct"
        white
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with value attribute', () => {
    const tree = renderer.create(
      <BpkRadio
        name="radio"
        label="Direct"
        value="my-value"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

