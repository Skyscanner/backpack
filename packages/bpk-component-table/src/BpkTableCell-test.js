import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkTableCell from './BpkTableCell';

describe('BpkTableCell', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkTableCell>Tabular data</BpkTableCell>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
