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

import BpkInteractiveStarRating from './BpkInteractiveStarRating';
import withInteractiveStarRatingState from './withInteractiveStarRatingState';

const InteractiveStarRating = withInteractiveStarRatingState(
  BpkInteractiveStarRating,
);

const getStarLabel = (rating: number, maxRating: number) =>
  `${rating} out of ${maxRating} stars`;

const filledCount = () =>
  document.querySelectorAll('.bpk-interactive-star .bpk-star--filled').length;

describe('withInteractiveStarRatingState', () => {
  it('starts with an unselected rating of 0', () => {
    render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={() => 'my-label'}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(filledCount()).toBe(0);
  });

  it('passes the large prop through to the wrapped component', () => {
    const { container } = render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={() => 'my-label'}
        large
      />,
    );

    expect(container.querySelectorAll('.bpk-star--large')).toHaveLength(5);
  });

  it('selects up to and including the clicked star and marks it as pressed', () => {
    render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={getStarLabel}
      />,
    );

    fireEvent.click(screen.getByLabelText('3 out of 5 stars'));

    expect(filledCount()).toBe(3);
    expect(screen.getByLabelText('3 out of 5 stars')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('4 out of 5 stars')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('previews up to and including the hovered star without selecting it', () => {
    render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={getStarLabel}
      />,
    );

    fireEvent.mouseOver(screen.getByLabelText('4 out of 5 stars'));

    expect(filledCount()).toBe(4);
    // Hovering must not change the selected/pressed state.
    expect(screen.getByLabelText('4 out of 5 stars')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
