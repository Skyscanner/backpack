/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import withAlignment from './withAlignment';
import {
  lineHeightSm,
  lineHeightBase,
  lineHeightLg,
  lineHeightXl,
  lineHeightXxl,
  iconSizeSm,
  iconSizeBase,
  iconSizeLg,
  iconSizeXl,
  iconSizeXxl,
} from 'bpk-tokens/tokens/base.es6';

describe('withAlignment', () => {
  const lineHeights = [
    lineHeightSm,
    lineHeightBase,
    lineHeightLg,
    lineHeightXl,
    lineHeightXxl,
  ];
  const iconSizes = [iconSizeSm, iconSizeLg];

  it('should render correctly', () => {
    for (var l = 0; l < lineHeights.length; l++) {
      for (var i = 0; i < iconSizes.length; i++) {
        const MyComponent = props => (
          <div {...props}>
            test lineHeight {lineHeights[l]} and iconsSize {iconSizes[i]}
          </div>
        );
        const MyAlignedComponent = withAlignment(
          MyComponent,
          lineHeights[l],
          iconSizes[i],
        );

        const tree = renderer.create(<MyAlignedComponent />).toJSON();
        expect(tree).toMatchSnapshot();
      }
    }
  });

  it('should keep wrapped-component styling', () => {
    const FloatingComponent = props => (
      <div {...props}>
        test lineHeight {lineHeightLg} and iconsSize {iconSizeSm}
      </div>
    );
    const AlignedFloatingComponent = withAlignment(
      FloatingComponent,
      lineHeightLg,
      iconSizeSm,
    );

    const tree = renderer
      .create(<AlignedFloatingComponent style={{ float: 'right' }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should wrap the component display name', () => {
    const shallowRenderer = new ReactShallowRenderer();
    const AlignedComponent = withAlignment(
      props => <div {...props}>test</div>,
      lineHeightLg,
      iconSizeSm,
    );
    const Wrapper = () => (
      <div>
        <AlignedComponent />
      </div>
    );

    const tree = shallowRenderer.render(<Wrapper />);
    expect(tree).toMatchSnapshot();
  });
});
