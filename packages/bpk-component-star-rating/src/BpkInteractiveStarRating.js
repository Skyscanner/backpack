import React from 'react';
import PropTypes from 'prop-types';

import { STAR_TYPES } from './BpkStar';
import BpkInteractiveStar from './BpkInteractiveStar';
import './bpk-star-rating.scss';

const getTypeByRating = (starNumber, rating) => {
  if (starNumber > rating) {
    return STAR_TYPES.EMPTY;
  }

  return STAR_TYPES.FULL;
};

const BpkStarRating = (props) => {
  const {
    className,
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
  const classNames = ['bpk-star-rating'];
  const displayRating = hoverRating || rating;

  const currentRating = displayRating > maxRating ? maxRating : displayRating;

  if (className) { classNames.push(className); }

  for (let starNumber = 1; starNumber <= maxRating; starNumber += 1) {
    const type = getTypeByRating(starNumber, currentRating);

    stars.push(
      <BpkInteractiveStar
        key={`star${starNumber}`}
        onChange={event => onRatingSelect(starNumber, event)}
        type={type}
        large={large}
        onMouseEnter={() => onRatingHover(starNumber)}
        selected={rating === starNumber}
        label={getStarLabel(starNumber, maxRating)}
        name={`${id}_rating`}
        value={starNumber}
      />,
    );
  }

  return (
    <div
      {...rest}
      className={classNames.join(' ')}
      onMouseLeave={onMouseLeave}
    >
      {stars}
    </div>
  );
};

BpkStarRating.propTypes = {
  id: PropTypes.string.isRequired,
  getStarLabel: PropTypes.func.isRequired,
  rating: PropTypes.number,
  hoverRating: PropTypes.number,
  maxRating: PropTypes.number,
  large: PropTypes.bool,
  onRatingHover: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onRatingSelect: PropTypes.func,
  className: PropTypes.string,
};

BpkStarRating.defaultProps = {
  rating: 0,
  hoverRating: 0,
  maxRating: 5,
  large: false,
  onRatingHover: () => null,
  onMouseLeave: () => null,
  onRatingSelect: () => null,
  className: null,
};

export default BpkStarRating;
