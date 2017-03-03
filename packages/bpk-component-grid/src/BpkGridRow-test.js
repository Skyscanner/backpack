import React from 'react';
import renderer from 'react-test-renderer';
import BpkGridRow from './BpkGridRow';

describe('BpkGridRow', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkGridRow>Contents</BpkGridRow>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "debug" attribute', () => {
    const tree = renderer.create(
      <BpkGridRow debug>Contents</BpkGridRow>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "className" attribute', () => {
    const tree = renderer.create(
      <BpkGridRow className="my-custom-class">Contents</BpkGridRow>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary attributes', () => {
    const tree = renderer.create(
      <BpkGridRow
        data-arbitrary-1="my-arbitrary-data"
        data-arbitrary-2="my-arbitrary-data"
      >
        Contents
      </BpkGridRow>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

