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
});

