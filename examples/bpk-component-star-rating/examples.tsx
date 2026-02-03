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
// @ts-nocheck



import BpkStarRating, {
  BpkInteractiveStarRating,
  BpkStar,
  withInteractiveStarRatingState,
  STAR_TYPES,
  ROUNDING_TYPES,
} from '../../packages/bpk-component-star-rating';
import {
  BpkTable,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHead,
  BpkTableHeadCell,
} from '../../packages/bpk-component-table';
import { action } from '../bpk-storybook-utils';

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
        <BpkTableHeadCell>Extra Large</BpkTableHeadCell>
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
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.EMPTY} extraLarge />
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
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.HALF} extraLarge />
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
        <BpkTableCell>
          <BpkStar type={STAR_TYPES.FULL} extraLarge />
        </BpkTableCell>
      </BpkTableRow>
    </BpkTableBody>
  </BpkTable>
);

const FullStarsExample = () => (
  <div>
    <StarRating rating={5} />
    <br />
    <StarRating rating={5} large />
    <br />
    <StarRating rating={5} extraLarge />
  </div>
);

const EmptyStarsExample = () => (
  <div>
    <StarRating rating={0} />
    <br />
    <StarRating rating={0} large />
    <br />
    <StarRating rating={0} extraLarge />
  </div>
);

const ThreeStarsExample = () => (
  <div>
    <StarRating rating={3} />
    <br />
    <StarRating rating={3} large />
    <br />
    <StarRating rating={3} extraLarge />
  </div>
);

const ThreeAndAHalfStarsExample = () => (
  <div>
    <StarRating rating={3.5} />
    <br />
    <StarRating rating={3.5} large />
    <br />
    <StarRating rating={3.5} extraLarge />
  </div>
);

const ThreePointThreeStarsExample = () => (
  <div>
    <StarRating rating={3.3} />
    <br />
    <StarRating rating={3.3} large />
    <br />
    <StarRating rating={3.3} extraLarge />
  </div>
);

const ThreePointEightStarsExample = () => (
  <div>
    <StarRating rating={3.8} />
    <br />
    <StarRating rating={3.8} large />
    <br />
    <StarRating rating={3.8} extraLarge />
  </div>
);

const ThreePointThreeStarsRoundedExample = () => (
  <div>
    <StarRating rating={3.3} rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.3} large rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.3} extraLarge rounding={ROUNDING_TYPES.nearest} />
  </div>
);

const ThreePointEightStarsRoundedExample = () => (
  <div>
    <StarRating rating={3.8} rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.8} large rounding={ROUNDING_TYPES.nearest} />
    <br />
    <StarRating rating={3.8} extraLarge rounding={ROUNDING_TYPES.nearest} />
  </div>
);

const InteractiveExample = () => (
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
    <br />
    <InteractiveStarRating
      id="extra-large-star-rating"
      getStarLabel={(rating, maxRating) =>
        `${rating} out of ${maxRating} stars`
      }
      onRatingSelect={action('extra large rating selected')}
      extraLarge
    />
  </div>
);

const MixedExample = () => (
  <div>
    <FullStarsExample />
    <EmptyStarsExample />
    <ThreeStarsExample />
    <ThreeAndAHalfStarsExample />
    <ThreePointThreeStarsExample />
    <ThreePointEightStarsExample />
    <ThreePointThreeStarsRoundedExample />
    <ThreePointEightStarsRoundedExample />
  </div>
);

export {
  FullExample,
  FullStarsExample,
  EmptyStarsExample,
  ThreeStarsExample,
  ThreeAndAHalfStarsExample,
  ThreePointThreeStarsExample,
  ThreePointEightStarsExample,
  ThreePointThreeStarsRoundedExample,
  ThreePointEightStarsRoundedExample,
  InteractiveExample,
  MixedExample,
};
