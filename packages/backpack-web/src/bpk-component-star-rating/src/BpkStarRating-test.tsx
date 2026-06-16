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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { STAR_TYPES } from './BpkStar';
import BpkStarRating, {
  getTypeByRating,
  ROUNDING_TYPES,
} from './BpkStarRating';

const ratingLabel = (rating: number, maxRating: number) =>
  `Rated ${rating} out of ${maxRating} stars`;

const countStarsByType = (container: HTMLElement) => ({
  full: container.querySelectorAll('.bpk-star--filled:not(.bpk-star--half)')
    .length,
  half: container.querySelectorAll('.bpk-star__container--half-star').length,
  empty: container.querySelectorAll(
    '.bpk-star:not(.bpk-star--filled):not(.bpk-star--half)',
  ).length,
});

describe('BpkStarRating', () => {
  it('caps the visual rating at maxRating but keeps the raw rating in the label', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={7} />,
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'Rated 7 out of 5 stars',
    );
    expect(countStarsByType(container)).toEqual({ full: 5, half: 0, empty: 0 });
  });

  it('renders all empty stars when rating is 0', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={0} />,
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'aria-label',
      'Rated 0 out of 5 stars',
    );
    expect(countStarsByType(container)).toEqual({ full: 0, half: 0, empty: 5 });
  });

  it('renders 3 full and 2 empty stars for rating 3', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={3} />,
    );

    expect(countStarsByType(container)).toEqual({ full: 3, half: 0, empty: 2 });
  });

  it('renders 3 full, 1 half and 1 empty star for rating 3.5', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={3.5} />,
    );

    expect(countStarsByType(container)).toEqual({ full: 3, half: 1, empty: 1 });
  });

  it('renders all full stars for rating 5', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={5} />,
    );

    expect(countStarsByType(container)).toEqual({ full: 5, half: 0, empty: 0 });
  });

  it('applies the large modifier to every star', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={5} large />,
    );

    expect(container.querySelectorAll('.bpk-star--large')).toHaveLength(5);
  });

  it('respects the maxRating prop', () => {
    const { container } = render(
      <BpkStarRating ratingLabel={ratingLabel} rating={5} maxRating={8} />,
    );

    const counts = countStarsByType(container);
    expect(counts.full + counts.half + counts.empty).toBe(8);
    expect(counts).toEqual({ full: 5, half: 0, empty: 3 });
  });

  it('rounds 3.4 up to 3.5 stars when using ROUNDING_TYPES.nearest', () => {
    const { container } = render(
      <BpkStarRating
        ratingLabel={ratingLabel}
        rating={3.4}
        rounding={ROUNDING_TYPES.nearest}
      />,
    );

    expect(countStarsByType(container)).toEqual({ full: 3, half: 1, empty: 1 });
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
