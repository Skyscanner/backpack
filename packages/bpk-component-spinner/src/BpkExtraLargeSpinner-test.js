import React from 'react';
import renderer from 'react-test-renderer';

import BpkExtraLargeSpinner from './BpkExtraLargeSpinner';

describe('BpkExtraLargeSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkExtraLargeSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkExtraLargeSpinner className="my-custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
