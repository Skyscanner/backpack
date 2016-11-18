import React from 'react';
import renderer from 'react-test-renderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkTianxunStackedLogo from './BpkTianxunStackedLogo';

describe('BpkTianxunStackedLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkTianxunStackedLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkTianxunStackedLogo fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
