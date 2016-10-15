import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkTableHeadCell from './BpkTableHeadCell';

describe('BpkTableHeadCell', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkTableHeadCell>Heading</BpkTableHeadCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
