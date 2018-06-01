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

import BpkCarouselIndicatorDot, {
  INDICATOR_SIZES,
} from './BpkCarouselIndicatorDot';

const commonTests = () => {
  describe('BpkCarouselIndicator', () => {
    it(`should render correctly`, () => {
      const tree = renderer.create(<BpkCarouselIndicatorDot />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`should render correctly with selected`, () => {
      const tree = renderer
        .create(<BpkCarouselIndicatorDot selected />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    Object.keys(INDICATOR_SIZES).forEach(indicatorSize => {
      it(`should render correctly with size=${indicatorSize}`, () => {
        const tree = renderer
          .create(<BpkCarouselIndicatorDot size={indicatorSize} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
};
export default commonTests;
