/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import ShallowRenderer from 'react-test-renderer/shallow';

import BpkStarRating from './BpkStarRating';

const commonTests = () => {
  let renderer = null;
  let accessibilityLabel = null;
  beforeEach(() => {
    renderer = new ShallowRenderer();
    accessibilityLabel = (rating, maxRating) =>
      `${rating} out of ${maxRating} stars`;
  });

  describe('BpkStarRating', () => {
    it('should render correctly', () => {
      renderer.render(
        <BpkStarRating rating={3} ratingLabel={accessibilityLabel} />,
      );
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });

    it('should render correctly with stars rounded down', () => {
      renderer.render(
        <BpkStarRating rating={3.3} ratingLabel={accessibilityLabel} />,
      );
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });

    it('should render correctly with stars rounded down to half star', () => {
      renderer.render(
        <BpkStarRating rating={3.7} ratingLabel={accessibilityLabel} />,
      );
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });

    it('should render correctly with custom `maxRating` attribute', () => {
      renderer.render(
        <BpkStarRating
          rating={3}
          maxRating={10}
          ratingLabel={accessibilityLabel}
        />,
      );
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
    it('should render correctly with ratingLabel passed as a string', () => {
      renderer.render(
        <BpkStarRating rating={3} maxRating={10} ratingLabel="Star rating" />,
      );
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
  });
};

export default commonTests;
