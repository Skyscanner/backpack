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

import BpkInteractiveStar from './BpkInteractiveStar';
import { STAR_TYPES } from './BpkStar';


import STYLES from './BpkStarRating.module.scss';

const getClassName = cssModules(STYLES);

export const getTypeByRating = (starNumber: number, rating: number) => {
  if (starNumber > rating) {
    return STAR_TYPES.EMPTY;
  }

  return STAR_TYPES.FULL;
};

type Props = {
  // @ts-expect-error TS(2300): Duplicate identifier 'number'.
  getStarLabel: (number, number) => string,
  id: string,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
  hoverRating: number,
  large: boolean,
  extraLarge: boolean,
  maxRating: number,
  // @ts-expect-error TS(2304): Cannot find name 'mixed'.
  onMouseLeave: () => mixed,
  // @ts-expect-error TS(7051): Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  onRatingHover: (number, any) => mixed,
  // @ts-expect-error TS(7051): Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  onRatingSelect: (number, any) => mixed,
  rating: number,
};

const BpkInteractiveStarRating = (props: Props) => {
  const {
    className,
    extraLarge,
    getStarLabel,
    hoverRating,
    id,
    large,
    maxRating,
    onMouseLeave,
    onRatingHover,
    onRatingSelect,
    rating,
    ...rest
  } = props;

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
        // @ts-expect-error TS(2322): Type '(event: any) => mixed' is not assignable to ... Remove this comment to see the full error message
        onClick={(event) => onRatingSelect(starNumber, event)}
        type={type}
        large={large}
        extraLarge={extraLarge}
        // @ts-expect-error TS(2322): Type '(event: any) => mixed' is not assignable to ... Remove this comment to see the full error message
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

BpkInteractiveStarRating.propTypes = {
  getStarLabel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  hoverRating: PropTypes.number,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
  maxRating: PropTypes.number,
  onMouseLeave: PropTypes.func,
  onRatingHover: PropTypes.func,
  onRatingSelect: PropTypes.func,
  rating: PropTypes.number,
};

BpkInteractiveStarRating.defaultProps = {
  className: null,
  hoverRating: 0,
  large: false,
  extraLarge: false,
  maxRating: 5,
  onMouseLeave: () => null,
  onRatingHover: () => null,
  onRatingSelect: () => null,
  rating: 0,
};

export default BpkInteractiveStarRating;
