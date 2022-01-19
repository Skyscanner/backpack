/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { render } from '@testing-library/react';
import {
  lineHeightSm,
  lineHeightBase,
  lineHeightLg,
  lineHeightXl,
  lineHeightXxl,
  iconSizeSm,
  iconSizeLg,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import withAlignment from './withAlignment';

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
    for (let l = 0; l < lineHeights.length; l += 1) {
      for (let i = 0; i < iconSizes.length; i += 1) {
        const MyComponent = (props) => (
          <div {...props}>
            test lineHeight {lineHeights[l]} and iconsSize {iconSizes[i]}
          </div>
        );
        const MyAlignedComponent = withAlignment(
          MyComponent,
          lineHeights[l],
          iconSizes[i],
        );

        const { asFragment } = render(<MyAlignedComponent />);
        expect(asFragment()).toMatchSnapshot();
      }
    }
  });

  it('should keep wrapped-component styling', () => {
    const FloatingComponent = (props) => (
      <div {...props}>
        test lineHeight {lineHeightLg} and iconsSize {iconSizeSm}
      </div>
    );
    const AlignedFloatingComponent = withAlignment(
      FloatingComponent,
      lineHeightLg,
      iconSizeSm,
    );

    const { asFragment } = render(
      <AlignedFloatingComponent style={{ float: 'right' }} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should wrap the component display name', () => {
    const AlignedComponent = withAlignment(
      (props) => <div {...props}>test</div>,
      lineHeightLg,
      iconSizeSm,
    );
    const Wrapper = () => (
      <div>
        <AlignedComponent />
      </div>
    );

    const { asFragment } = render(<Wrapper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
