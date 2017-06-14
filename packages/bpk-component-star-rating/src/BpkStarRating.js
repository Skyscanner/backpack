import React from 'react';
import PropTypes from 'prop-types';

import './bpk-star-rating.scss';
import BpkStar, { STAR_TYPES } from './BpkStar';

const getTypeByRating = (currentRating) => {
  if (currentRating < 0.5) {
    return STAR_TYPES.EMPTY;
  } else if (currentRating >= 0.5 && currentRating < 1) {
    return STAR_TYPES.HALF;
  }
  return STAR_TYPES.FULL;
};

const BpkStarRating = (props) => {
  const {
    rating,
    hoverRating,
    maxRating,
    large,
    interactive,
    className,
    onRatingSelect,
    onRatingHover,
    onMouseLeave,
    ...rest
  } = props;

  const stars = [];
  const classNames = ['bpk-star-rating'];
  const displayRating = hoverRating || rating;

  let currentRating = displayRating > maxRating ? maxRating : displayRating;

  if (className) { classNames.push(className); }

  for (let i = 1; i < maxRating + 1; i += 1) {
    const type = (interactive && hoverRating >= i)
      ? STAR_TYPES.INTERACTIVE
      : getTypeByRating(currentRating);

    stars.push(
      <BpkStar
        key={`star${i}`}
        onClick={() => onRatingSelect(i)}
        type={type}
        large={large}
        onMouseEnter={() => onRatingHover(i)}
        selected={interactive ? rating === i : false}
      />,
    );

    currentRating -= 1;
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
  rating: PropTypes.number,
  hoverRating: PropTypes.number,
  maxRating: PropTypes.number,
  large: PropTypes.bool,
  interactive: PropTypes.bool,
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
  interactive: false,
  onRatingHover: () => null,
  onMouseLeave: () => null,
  onRatingSelect: () => null,
  className: null,
};

export default BpkStarRating;
