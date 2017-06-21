import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from 'bpk-react-utils';
import BpkStar, { STAR_TYPES } from './BpkStar';

import STYLES from './bpk-star-rating.scss';

const getClassName = cssModules(STYLES);

export const getTypeByRating = (starNumber, rating) => {
  if (starNumber <= rating) {
    return STAR_TYPES.FULL;
  }

  const rest = rating - (starNumber - 1);
  if (rest >= 0.5 && rest < 1) {
    return STAR_TYPES.HALF;
  }

  return STAR_TYPES.EMPTY;
};

const BpkStarRating = (props) => {
  const {
    rating,
    ratingLabel,
    maxRating,
    large,
    className,
    ...rest
  } = props;

  const stars = [];
  const classNames = [getClassName('bpk-star-rating')];

  const currentRating = rating > maxRating ? maxRating : rating;

  if (className) { classNames.push(className); }

  for (let starNumber = 1; starNumber <= maxRating; starNumber += 1) {
    const type = getTypeByRating(starNumber, currentRating);

    stars.push(
      <BpkStar
        key={`star-${starNumber}`}
        type={type}
        large={large}
      />,
    );
  }

  const label = typeof ratingLabel === 'string' ? ratingLabel : ratingLabel(rating, maxRating);

  return (
    <div
      {...rest}
      aria-label={label}
      className={classNames.join(' ')}
    >
      {stars}
    </div>
  );
};

BpkStarRating.propTypes = {
  ratingLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
  maxRating: PropTypes.number,
  rating: PropTypes.number,
};

BpkStarRating.defaultProps = {
  className: null,
  large: false,
  maxRating: 5,
  rating: 0,
};

export default BpkStarRating;
