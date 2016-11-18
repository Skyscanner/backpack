import React from 'react';
import renderer from 'react-test-renderer';
import BpkTableHeadCell from './BpkTableHeadCell';

describe('BpkTableHeadCell', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkTableHeadCell>Heading</BpkTableHeadCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
