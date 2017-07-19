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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BpkInteractiveStarRating, { getTypeByRating } from './BpkInteractiveStarRating';
import { STAR_TYPES } from './BpkStar';

describe('BpkInteractiveStarRating', () => {
  it('should render correctly if you give it more than the max rating allowed', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating" rating={7}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 0 stars', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={0}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3 stars', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={3}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 3.5 stars', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={3.5}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with 5 stars', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={5}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={5} large
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with "maxRating" attribute', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={5} maxRating={8}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render 4 stars based on hoverRating as it has priority over rating', () => {
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-rating"
        rating={3}
        hoverRating={4}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call onRatingHover on mouseenter', () => {
    const onRatingHover = jest.fn();
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-star-rating"
        onRatingHover={onRatingHover}
      />,
    );

    expect(onRatingHover).not.toHaveBeenCalled();
    tree.childAt(0).prop('onMouseEnter')(1, {});
    expect(onRatingHover).toHaveBeenCalled();
  });

  it('should call onRatingSelect on click', () => {
    const onRatingSelect = jest.fn();
    const tree = shallow(
      <BpkInteractiveStarRating
        getStarLabel={(rating, maxRating) => `${rating} out of ${maxRating} stars`}
        id="my-star-rating"
        onRatingSelect={onRatingSelect}
      />,
    );

    expect(onRatingSelect).not.toHaveBeenCalled();
    tree.childAt(0).prop('onClick')(1, {});
    expect(onRatingSelect).toHaveBeenCalled();
  });

  describe('getTypeByRating()', () => {
    it('should be a function', () => {
      expect(typeof getTypeByRating === 'function').toBe(true);
    });

    it('should return EMPTY if the rating is smaller than the star number', () => {
      expect(getTypeByRating(1, 0)).toBe(STAR_TYPES.EMPTY);
      expect(getTypeByRating(1, 0.9)).toBe(STAR_TYPES.EMPTY);
    });

    it('should return FULL if the rating is higher than or equal to the star number', () => {
      expect(getTypeByRating(0, 1)).toBe(STAR_TYPES.FULL);
      expect(getTypeByRating(1, 1)).toBe(STAR_TYPES.FULL);
    });
  });
});
