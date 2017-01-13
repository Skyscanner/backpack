import React from 'react';
import renderer from 'react-test-renderer';

import BpkCloseButton from './BpkCloseButton';

describe('BpkCloseButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkCloseButton label="Close" onClick={() => null} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
