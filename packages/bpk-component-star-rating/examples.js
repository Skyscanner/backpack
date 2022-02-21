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

import React from 'react';
import { action } from 'bpk-storybook-utils';
import {
  BpkTable,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHead,
  BpkTableHeadCell,
} from 'bpk-component-table';

import BpkInteractiveStarRating from './src/BpkInteractiveStarRating';
import withInteractiveStarRatingState from './src/withInteractiveStarRatingState';

import BpkStarRating, { BpkStar, STAR_TYPES, ROUNDING_TYPES } from './index';

const InteractiveStarRating = withInteractiveStarRatingState(
  BpkInteractiveStarRating,
);
const StarRating = (props) => (
  <BpkStarRating ratingLabel={(r, m) => `${r} out of ${m} stars`} {...props} />
);

const FullExample = () => (
  <BpkTable>
    <BpkTableHead>
      <BpkTableRow>
        <BpkTableHeadCell>State</BpkTableHeadCell>
        <BpkTableHeadCell>Small</BpkTableHeadCell>
        <BpkTableHeadCell>Large</BpkTableHeadCell>
      </BpkTableRow>
    </BpkTableHead>
    <BpkTableBody>
      <BpkTableRow>
        <BpkTableCell>Empty</BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.EMPTY} />
        </BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.EMPTY} large />
        </BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Half</BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.HALF} />
        </BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.HALF} large />
        </BpkTableCell>
      </BpkTableRow>
      <BpkTableRow>
        <BpkTableCell>Full</BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.FULL} />
        </BpkTableCell>
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.FULL} large />
        </BpkTableCell>
      </BpkTableRow>
    </BpkTableBody>
  </BpkTable>
);

const FullStars = () => (
  <div>
    <StarRating rating={5} />
    <br />
    <StarRating rating={5} large />
  </div>
);

const EmptyStars = () => (
  <div>
    <StarRating rating={0} />
    <br />
    <StarRating rating={0} large />
  </div>
);

const ThreeStars = () => (
  <div>
    <StarRating rating={3} />
    <br />
    <StarRating rating={3} large />
  </div>
);

const ThreeAndAHalfStars = () => (
  <div>
    <StarRating rating={3.5} />
    <br />
    <StarRating rating={3.5} large />
  </div>
);

const ThreePointThreeStars = () => (
  <div>
    <StarRating rating={3.3} />
    <br />
    <StarRating rating={3.3} large />
  </div>
);

const ThreePointEightStars = () => (
  <div>
    <StarRating rating={3.8} />
    <br />
    <StarRating rating={3.8} large />
  </div>
);

const ThreePointThreeStarsRounded = () => (
  <div>
    <StarRating rating={3.3} rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.3} large rounding={ROUNDING_TYPES.nearest} />
  </div>
);

const ThreePointEightStarsRounded = () => (
  <div>
    <StarRating rating={3.8} rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.8} large rounding={ROUNDING_TYPES.nearest} />
  </div>
);

const Interactive = () => (
  <div>
    <InteractiveStarRating
      id="small-star-rating"
      getStarLabel={(rating, maxRating) =>
        `${rating} out of ${maxRating} stars`
      }
      onRatingSelect={action('rating selected')}
    />
    <br />
    <InteractiveStarRating
      id="large-star-rating"
      getStarLabel={(rating, maxRating) =>
        `${rating} out of ${maxRating} stars`
      }
      onRatingSelect={action('large rating selected')}
      large
    />
  </div>
);

const MixedExample = () => (
  <div>
    <FullStars />
    <EmptyStars />
    <ThreeStars />
    <ThreeAndAHalfStars />
    <ThreePointThreeStars />
    <ThreePointEightStars />
    <ThreePointThreeStarsRounded />
    <ThreePointEightStarsRounded />
  </div>
);

export {
  FullExample,
  FullStars,
  EmptyStars,
  ThreeStars,
  ThreeAndAHalfStars,
  ThreePointThreeStars,
  ThreePointEightStars,
  ThreePointThreeStarsRounded,
  ThreePointEightStarsRounded,
  Interactive,
  MixedExample,
};
