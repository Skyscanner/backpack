import React from 'react';
import renderer from 'react-test-renderer';

import BpkFormValidation from './BpkFormValidation';

describe('BpkFieldset', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkFormValidation />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
