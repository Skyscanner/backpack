import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkList from './BpkList';

describe('BpkList', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkList>
        <li>list item</li>
      </BpkList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "ordered" attribute', () => {
    const tree = renderer.create(
      <BpkList ordered>
        <li>list item</li>
      </BpkList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
