import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkTableBody from './BpkTableBody';

describe('BpkTableBody', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTableBody>
        <tr />
      </BpkTableBody>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
