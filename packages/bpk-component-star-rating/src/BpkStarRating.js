import React from 'react';
import PropTypes from 'prop-types';

import BpkStar, { STAR_TYPES } from './BpkStar';
import './bpk-star-rating.scss';

const getTypeByRating = (starNumber, rating) => {
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
    maxRating,
    large,
    className,
    ...rest
  } = props;

  const stars = [];
  const classNames = ['bpk-star-rating'];

  const currentRating = rating > maxRating ? maxRating : rating;

  if (className) { classNames.push(className); }

  for (let starNumber = 1; starNumber <= maxRating; starNumber += 1) {
    const type = getTypeByRating(starNumber, currentRating);

    stars.push(
      <BpkStar
        key={`star${starNumber}`}
        type={type}
        large={large}
      />,
    );
  }

  return (
    <div
      {...rest}
      aria-label={`Rated ${rating} out of ${maxRating} stars`}
      className={classNames.join(' ')}
    >
      {stars}
    </div>
  );
};

BpkStarRating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  large: PropTypes.bool,
  className: PropTypes.string,
};

BpkStarRating.defaultProps = {
  rating: 0,
  maxRating: 5,
  large: false,
  className: null,
};

export default BpkStarRating;
