import React from 'react';
import renderer from 'react-test-renderer';
import BpkHorizontalNav from './BpkHorizontalNav';

describe('BpkHorizontalNav', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkHorizontalNav>
        My nav content.
      </BpkHorizontalNav>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
