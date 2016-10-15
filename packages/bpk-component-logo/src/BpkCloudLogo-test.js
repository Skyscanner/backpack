import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import TOKENS from 'bpk-tokens/tokens/base.common';
import BpkCloudLogo from './BpkCloudLogo';

describe('BpkCloudLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCloudLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkCloudLogo fill={TOKENS.colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
