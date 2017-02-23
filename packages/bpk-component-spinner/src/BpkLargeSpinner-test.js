import React from 'react';
import renderer from 'react-test-renderer';

import { colorBlue500 } from 'bpk-tokens/tokens/base.es6';
import BpkLargeSpinner from './BpkLargeSpinner';

describe('BpkLargeSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLargeSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner fill={colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
