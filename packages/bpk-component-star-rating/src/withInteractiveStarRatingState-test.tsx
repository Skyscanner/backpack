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

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkInteractiveStarRating from './BpkInteractiveStarRating';
import withInteractiveStarRatingState from './withInteractiveStarRatingState';

const InteractiveStarRating = withInteractiveStarRatingState(
  BpkInteractiveStarRating,
);

describe('withInteractiveStarRatingState', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={() => 'my-label'}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "large" attribute', () => {
    const { asFragment } = render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={() => 'my-label'}
        large
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when selecting 3rd star', async () => {
    const { asFragment } = render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={(rating, maxRating) =>
          `${rating} out of ${maxRating} stars`
        }
      />,
    );

    const star = screen.getByLabelText('3 out of 5 stars');
    await fireEvent.click(star);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when hovering over 4th star', async () => {
    const { asFragment } = render(
      <InteractiveStarRating
        id="my-star-rating"
        getStarLabel={(rating, maxRating) =>
          `${rating} out of ${maxRating} stars`
        }
      />,
    );

    const star = screen.getByLabelText('4 out of 5 stars');

    await fireEvent.mouseOver(star);

    expect(asFragment()).toMatchSnapshot();
  });
});
