import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkLargeSpinner from './BpkLargeSpinner';

describe('BpkLargeSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkLargeSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkLargeSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
