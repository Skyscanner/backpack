import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import BpkTableRow from './BpkTableRow';

describe('BpkTableRow', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTableRow>
        <td />
      </BpkTableRow>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
