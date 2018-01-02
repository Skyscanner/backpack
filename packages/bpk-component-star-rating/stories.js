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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  BpkTable,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHead,
  BpkTableHeadCell,
} from 'bpk-component-table';

import BpkStarRating, { BpkStar, STAR_TYPES } from './index';
import BpkInteractiveStarRating from './src/BpkInteractiveStarRating';
import withInteractiveStarRatingState from './src/withInteractiveStarRatingState';

const InteractiveStarRating = withInteractiveStarRatingState(
  BpkInteractiveStarRating,
);
const StarRating = props => (
  <BpkStarRating ratingLabel={(r, m) => `${r} out of ${m} stars`} {...props} />
);

storiesOf('bpk-component-star-rating', module)
  .add('BpkStar examples', () => (
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
  ))
  .add('Full Stars', () => (
    <div>
      <StarRating rating={5} />
      <br />
      <StarRating rating={5} large />
    </div>
  ))
  .add('Empty Stars', () => (
    <div>
      <StarRating rating={0} />
      <br />
      <StarRating rating={0} large />
    </div>
  ))
  .add('3 Stars Rating', () => (
    <div>
      <StarRating rating={3} />
      <br />
      <StarRating rating={3} large />
    </div>
  ))
  .add('3 1/2 Stars Rating', () => (
    <div>
      <StarRating rating={3.5} />
      <br />
      <StarRating rating={3.5} large />
    </div>
  ))
  .add('3.3 Stars', () => (
    <div>
      <StarRating rating={3.3} />
      <br />
      <StarRating rating={3.3} large />
    </div>
  ))
  .add('3.7 Stars', () => (
    <div>
      <StarRating rating={3.7} />
      <br />
      <StarRating rating={3.7} large />
    </div>
  ))
  .add('Interactive', () => (
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
  ));
