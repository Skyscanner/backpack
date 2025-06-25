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

/* @flow strict */

import { render } from '@testing-library/react';

import { STAR_TYPES } from './BpkStar';
import BpkStarRating, {
  getTypeByRating,
  ROUNDING_TYPES,
} from './BpkStarRating';

describe('BpkStarRating', () => {
  it('should render correctly if you give it more than the max rating allowed', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={7}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with 0 stars', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={0}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with 3 stars', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={3}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with 3.5 stars', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={3.5}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with 5 stars', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
        large
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "maxRating" attribute', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={5}
        maxRating={8}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "rounding" attribute', () => {
    const { asFragment } = render(
      <BpkStarRating
        ratingLabel={(r, m) => `Rated ${r} out of ${m} stars`}
        rating={3.4}
        rounding={ROUNDING_TYPES.nearest}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('getTypeByRating()', () => {
    it('should be a function', () => {
      expect(typeof getTypeByRating === 'function').toBe(true);
    });

    it('should return EMPTY if the star number is more than 0.5 higher than the rating', () => {
      expect(getTypeByRating(2, 0)).toBe(STAR_TYPES.EMPTY);
      expect(getTypeByRating(2, 0.9)).toBe(STAR_TYPES.EMPTY);
      expect(getTypeByRating(2, 1.4)).toBe(STAR_TYPES.EMPTY);
    });

    it('should return FULL if the rating is higher than or equal to the star number', () => {
      expect(getTypeByRating(0, 1)).toBe(STAR_TYPES.FULL);
      expect(getTypeByRating(1, 1)).toBe(STAR_TYPES.FULL);
    });

    it('should return HALF if the rating is up to 0.5 under the star number', () => {
      expect(getTypeByRating(1, 0)).not.toBe(STAR_TYPES.HALF);
      expect(getTypeByRating(1, 0.4)).not.toBe(STAR_TYPES.HALF);
      expect(getTypeByRating(1, 0.5)).toBe(STAR_TYPES.HALF);
      expect(getTypeByRating(1, 0.9)).toBe(STAR_TYPES.HALF);
      expect(getTypeByRating(1, 1)).not.toBe(STAR_TYPES.HALF);
    });
  });
});
