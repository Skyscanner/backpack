import React from 'react';
import renderer from 'react-test-renderer';

import { colorBlue500 } from 'bpk-tokens/tokens/base.es6';
import BpkSpinner from './BpkSpinner';

describe('BpkSpinner', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "fill" attribute', () => {
    const tree = renderer.create(<BpkSpinner fill={colorBlue500} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "alignToButton" attribute', () => {
    const tree = renderer.create(<BpkSpinner alignToButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
