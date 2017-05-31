import React from 'react';
import renderer from 'react-test-renderer';
import BpkBarchartDefs from './BpkBarchartDefs';

describe('BpkBarchartDefs', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkBarchartDefs />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
