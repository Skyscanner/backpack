import React from 'react';
import renderer from 'react-test-renderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkSpinner from './BpkSpinner';

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkSpinner fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
