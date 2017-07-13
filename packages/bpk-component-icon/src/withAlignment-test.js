import React from 'react';
import renderer from 'react-test-renderer';
import withAlignment from './withAlignment';
import {
  lineHeightSm, lineHeightBase, lineHeightLg, lineHeightXl, lineHeightXxl,
  iconSizeSm, iconSizeBase, iconSizeLg, iconSizeXl, iconSizeXxl
} from 'bpk-tokens/tokens/base.es6';

describe('withAlignment', () => {
  const lineHeights = [lineHeightSm, lineHeightBase, lineHeightLg, lineHeightXl, lineHeightXxl];
  const iconSizes = [iconSizeSm, iconSizeLg];

  it('should render correctly', () => {
    for (var l = 0; l < lineHeights.length; l++) {
      for (var i = 0; i < iconSizes.length; i++) {
        const MyComponent = props => <div {...props}>test lineHeight {lineHeights[l]} and iconsSize {iconSizes[i]}</div>;
        const MyAlignedComponent = withAlignment(MyComponent, lineHeights[l], iconSizes[i]);

        const tree = renderer.create(<MyAlignedComponent />).toJSON();
        expect(tree).toMatchSnapshot();
      }
    }
  });
});
