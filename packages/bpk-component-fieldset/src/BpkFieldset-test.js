import React from 'react';
import renderer from 'react-test-renderer';

import BpkFieldset from './BpkFieldset';

describe('BpkFieldset', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkFieldset>
        TODO
      </BpkFieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
