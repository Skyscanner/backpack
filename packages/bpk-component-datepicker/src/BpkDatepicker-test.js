import React from 'react';
import renderer from 'react-test-renderer';

import BpkDatepicker from './BpkDatepicker';

describe('BpkDatepicker', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkDatepicker />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
