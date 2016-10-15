import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkStackedLogo from './BpkStackedLogo';

describe('BpkStackedLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkStackedLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkStackedLogo fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
