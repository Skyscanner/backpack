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

import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import BpkStar, { STAR_TYPES } from './BpkStar';

import STYLES from './BpkStarRating.module.scss';

const getClassName = cssModules(STYLES);

export const getTypeByRating = (starNumber: number, rating: number) => {
  if (starNumber <= rating) {
    return STAR_TYPES.FULL;
  }

  const rest = rating - (starNumber - 1);
  if (rest >= 0.5 && rest < 1) {
    return STAR_TYPES.HALF;
  }

  return STAR_TYPES.EMPTY;
};

export const ROUNDING_TYPES = {
  down: (n: number) => Math.floor(n * 2) / 2,
  up: (n: number) => Math.ceil(n * 2) / 2,
  nearest: (n: number) => Math.round(n * 2) / 2,
};

type RoundingFunction = (n: number) => number;

type Props = {
  ratingLabel: string | ((rating: number, maxRating: number) => string);
  className?: string | null;
  large?: boolean;
  extraLarge?: boolean;
  maxRating?: number;
  rating?: number;
  rounding?: RoundingFunction;
  [key: string]: unknown;
};

const BpkStarRating = ({
  className = null,
  extraLarge = false,
  large = false,
  maxRating = 5,
  rating = 0,
  ratingLabel,
  rounding = ROUNDING_TYPES.down,
  ...rest
}: Props) => {

  const stars = [];
  const classNames = [getClassName('bpk-star-rating')];

  const currentRating = rating > maxRating ? maxRating : rating;

  if (className) {
    classNames.push(className);
  }

  for (let starNumber = 1; starNumber <= maxRating; starNumber += 1) {
    const type = getTypeByRating(starNumber, rounding(currentRating));

    stars.push(
      <BpkStar key={`star-${starNumber}`} type={type} large={large} extraLarge={extraLarge} />,
    );
  }

  const label =
    typeof ratingLabel === 'string'
      ? ratingLabel
      : ratingLabel(rating, maxRating);

  return (
    <div
      {...rest}
      role="img"
      aria-label={label}
      className={classNames.join(' ')}
    >
      {stars}
    </div>
  );
};

BpkStarRating.propTypes = {
  ratingLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
  maxRating: PropTypes.number,
  rating: PropTypes.number,
  rounding: PropTypes.oneOf([
    ROUNDING_TYPES.down,
    ROUNDING_TYPES.up,
    ROUNDING_TYPES.nearest,
  ]),
};

export default BpkStarRating;
