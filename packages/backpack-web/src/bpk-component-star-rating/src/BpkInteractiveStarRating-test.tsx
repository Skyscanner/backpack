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

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkInteractiveStarRating, {
  getTypeByRating,
} from './BpkInteractiveStarRating';
import { STAR_TYPES } from './BpkStar';

const getStarLabel = (rating: number, maxRating: number) =>
  `${rating} out of ${maxRating} stars`;

const filledCount = () =>
  document.querySelectorAll('.bpk-interactive-star .bpk-star--filled').length;

describe('BpkInteractiveStarRating', () => {
  it('caps the visual rating at maxRating', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={7}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(filledCount()).toBe(5);
  });

  it('renders all empty stars when rating is 0', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={0}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(filledCount()).toBe(0);
  });

  it('fills 3 stars for rating 3', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={3}
      />,
    );

    expect(filledCount()).toBe(3);
  });

  it('treats rating 3.5 the same as 3 (no half stars in interactive mode)', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={3.5}
      />,
    );

    expect(filledCount()).toBe(3);
  });

  it('fills all stars for rating 5', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={5}
      />,
    );

    expect(filledCount()).toBe(5);
  });

  it('applies the large modifier to every star', () => {
    const { container } = render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={5}
        large
      />,
    );

    expect(container.querySelectorAll('.bpk-star--large')).toHaveLength(5);
  });

  it('respects the maxRating prop', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={5}
        maxRating={8}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(8);
    expect(filledCount()).toBe(5);
  });

  it('uses hoverRating instead of rating when both are provided', () => {
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-rating"
        rating={3}
        hoverRating={4}
      />,
    );

    expect(filledCount()).toBe(4);
  });

  it('calls onRatingHover when a star is hovered', () => {
    const onRatingHover = jest.fn();
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-star-rating"
        onRatingHover={onRatingHover}
      />,
    );

    fireEvent.mouseEnter(screen.getByLabelText('1 out of 5 stars'));

    expect(onRatingHover).toHaveBeenCalledTimes(1);
    expect(onRatingHover).toHaveBeenCalledWith(1, expect.anything());
  });

  it('calls onRatingSelect when a star is clicked', () => {
    const onRatingSelect = jest.fn();
    render(
      <BpkInteractiveStarRating
        getStarLabel={getStarLabel}
        id="my-star-rating"
        onRatingSelect={onRatingSelect}
      />,
    );

    fireEvent.click(screen.getByLabelText('1 out of 5 stars'));

    expect(onRatingSelect).toHaveBeenCalledTimes(1);
    expect(onRatingSelect).toHaveBeenCalledWith(1, expect.anything());
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
