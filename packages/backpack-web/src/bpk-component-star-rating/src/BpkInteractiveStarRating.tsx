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

import type { HTMLAttributes, MouseEvent } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkInteractiveStar from './BpkInteractiveStar';
import { STAR_TYPES } from './BpkStar';

import STYLES from './BpkStarRating.module.scss';

const getClassName = cssModules(STYLES);

const noop = () => null;

export const getTypeByRating = (starNumber: number, rating: number) => {
  if (starNumber > rating) {
    return STAR_TYPES.EMPTY;
  }

  return STAR_TYPES.FULL;
};

type StarLabel = (rating: number, maxRating: number) => string;

type RatingHandler = (
  rating: number,
  event: MouseEvent<HTMLButtonElement>,
) => unknown;

type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export type Props = Omit<NativeDivProps, 'className' | 'id' | 'onMouseLeave'> & {
  getStarLabel: StarLabel;
  id: string;
  className?: string | null;
  hoverRating?: number;
  large?: boolean;
  extraLarge?: boolean;
  maxRating?: number;
  onMouseLeave?: () => unknown;
  onRatingHover?: RatingHandler;
  onRatingSelect?: RatingHandler;
  rating?: number;
};

const BpkInteractiveStarRating = ({
  className = null,
  extraLarge = false,
  getStarLabel,
  hoverRating = 0,
  id,
  large = false,
  maxRating = 5,
  onMouseLeave = noop,
  onRatingHover = noop,
  onRatingSelect = noop,
  rating = 0,
  ...rest
}: Props) => {
  const stars = [];
  const classNames = [getClassName('bpk-star-rating')];
  const displayRating = hoverRating || rating;

  const currentRating = displayRating > maxRating ? maxRating : displayRating;

  if (className) {
    classNames.push(className);
  }

  for (let starNumber = 1; starNumber <= maxRating; starNumber += 1) {
    const type = getTypeByRating(starNumber, currentRating);

    stars.push(
      <BpkInteractiveStar
        key={`star-${starNumber}`}
        onClick={(event) => onRatingSelect(starNumber, event)}
        type={type}
        large={large}
        extraLarge={extraLarge}
        onMouseEnter={(event) => onRatingHover(starNumber, event)}
        selected={rating === starNumber}
        label={getStarLabel(starNumber, maxRating)}
        name={`${id}_rating`}
        value={starNumber}
      />,
    );
  }

  return (
    <div {...rest} className={classNames.join(' ')} onMouseLeave={onMouseLeave}>
      {stars}
    </div>
  );
};

export default BpkInteractiveStarRating;
