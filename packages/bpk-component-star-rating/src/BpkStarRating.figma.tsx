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

import figma from '@figma/code-connect';

import BpkStarRating from './BpkStarRating';

/**
 * Star rating
 */
figma.connect(
  BpkStarRating,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=4405%3A2',
  {
    props: {
      large: figma.enum('Size', {
        Large: true,
      }),
      rating: figma.enum('Rating', {
        '1 star': 1,
        '2 stars': 2,
        '3 stars': 3,
        '3.5 stars': 3.5,
        '4 stars': 4,
        '5 stars': 5,
      }),
      ratingLabel: figma.enum('Rating', {
        '1 star': 'Rated 1 star out of 5',
        '2 stars': 'Rated 2 stars out of 5',
        '3 stars': 'Rated 3 stars out of 5',
        '3.5 stars': 'Rated 3.5 stars out of 5',
        '4 stars': 'Rated 4 stars out of 5',
        '5 stars': 'Rated 5 stars out of 5',
      }),
    },
    example: ({ large, rating, ratingLabel }) => (
      <BpkStarRating ratingLabel={ratingLabel} large={large} rating={rating} />
    ),
  },
);

/**
 * Hotel star rating
 */
figma.connect(
  BpkStarRating,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=12346%3A12561',
  {
    props: {
      large: figma.enum('Size', {
        Large: true,
      }),
      hotelRating: figma.enum('Rating', {
        '1 star': 1,
        '2 star': 2,
        '3 star': 3,
        '4 star': 4,
        '5 star': 5,
      }),
      hotelRatingLabel: figma.enum('Rating', {
        '1 star': '1 star hotel',
        '2 star': '2 star hotel',
        '3 star': '3 star hotel',
        '4 star': '4 star hotel',
        '5 star': '5 star hotel',
      }),
    },
    example: ({ hotelRating, hotelRatingLabel, large }) => (
      <BpkStarRating
        ratingLabel={hotelRatingLabel}
        large={large}
        rating={hotelRating}
        maxRating={hotelRating}
      />
    ),
  },
);
