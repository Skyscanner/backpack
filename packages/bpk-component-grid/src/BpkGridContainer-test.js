import React from 'react';
import renderer from 'react-test-renderer';
import BpkGridContainer from './BpkGridContainer';

describe('BpkGridContainer', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkGridContainer>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "debug" attribute', () => {
    const tree = renderer.create(
      <BpkGridContainer debug>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "fullWidth" attribute', () => {
    const tree = renderer.create(
      <BpkGridContainer fullWidth>Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkGridContainer className="my-custom-class">Contents</BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer.create(
      <BpkGridContainer
        data-arbitrary-1="my-arbitrary-data"
        data-arbitrary-2="my-arbitrary-data"
      >
        Contents
      </BpkGridContainer>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

