import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import BpkListItem from './BpkListItem';

describe('BpkListItem', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkListItem>List item</BpkListItem>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

