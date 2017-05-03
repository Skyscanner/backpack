import React from 'react';
import renderer from 'react-test-renderer';

import BpkLargeSpinner from './BpkLargeSpinner';

describe('BpkLargeSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLargeSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "className" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner className="my-custom-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
