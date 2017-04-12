import React from 'react';
import renderer from 'react-test-renderer';
import BpkHorizontalNavItem from './BpkHorizontalNavItem';

describe('BpkHorizontalNavItem', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkHorizontalNavItem>
        My nav item content
      </BpkHorizontalNavItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
