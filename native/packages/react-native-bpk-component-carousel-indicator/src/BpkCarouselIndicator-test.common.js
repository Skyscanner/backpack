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
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import BpkCarouselIndicator from './BpkCarouselIndicator';

const commonTests = () => {
  describe('BpkCarouselIndicator', () => {
    it(`should render correctly`, () => {
      const tree = renderer
        .create(<BpkCarouselIndicator pageCount={5} selectedIndex={2} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with a page count > 5`, () => {
      const tree = renderer
        .create(<BpkCarouselIndicator pageCount={6} selectedIndex={2} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with a page count equal to 11 and selected index equal to 9`, () => {
      const tree = renderer
        .create(<BpkCarouselIndicator pageCount={11} selectedIndex={9} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with custom styles`, () => {
      const tree = renderer
        .create(
          <BpkCarouselIndicator
            pageCount={5}
            selectedIndex={0}
            style={{ marginTop: spacingSm }}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with arbitrary props`, () => {
      const tree = renderer
        .create(
          <BpkCarouselIndicator
            pageCount={5}
            selectedIndex={0}
            testID="123" // Arbitrary prop.
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
export default commonTests;
