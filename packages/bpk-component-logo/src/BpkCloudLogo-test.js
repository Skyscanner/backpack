import React from 'react';
import renderer from 'react-test-renderer';

import { colorBlue500 } from 'bpk-tokens/tokens/base.es6';
import BpkCloudLogo from './BpkCloudLogo';

describe('BpkCloudLogo', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCloudLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkCloudLogo fill={colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
