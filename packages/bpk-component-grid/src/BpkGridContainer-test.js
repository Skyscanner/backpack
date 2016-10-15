import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkGridContainer from './BpkGridContainer';

describe('BpkGridContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkGridContainer>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "padded" attribute equal to false', () => {
    const tree = renderer.create(
      <BpkGridContainer padded={false}>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "debug" attribute', () => {
    const tree = renderer.create(
      <BpkGridContainer debug>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

