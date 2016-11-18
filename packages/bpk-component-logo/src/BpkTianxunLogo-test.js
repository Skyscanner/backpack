import React from 'react';
import renderer from 'react-test-renderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkTianxunLogo from './BpkTianxunLogo';

describe('BpkTianxunLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkTianxunLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkTianxunLogo fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
