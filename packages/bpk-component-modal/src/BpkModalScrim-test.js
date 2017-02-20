import React from 'react';
import renderer from 'react-test-renderer';
import BpkModalScrim from './BpkModalScrim';

describe('BpkModalScrim', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkModalScrim />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
