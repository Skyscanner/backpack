import React from 'react';
import renderer from 'react-test-renderer';

import BpkTextarea from './BpkTextarea';

describe('BpkTextarea', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkTextarea
        id="test"
        name="test"
        value=""
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
