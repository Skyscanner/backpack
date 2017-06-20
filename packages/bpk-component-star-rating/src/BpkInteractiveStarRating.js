import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from 'bpk-react-utils';
import { STAR_TYPES } from './BpkStar';
import BpkInteractiveStar from './BpkInteractiveStar';

import STYLES from './bpk-star-rating.scss';

const getClassName = cssModules(STYLES);

const getTypeByRating = (starNumber, rating) => {
  if (starNumber > rating) {
    return STAR_TYPES.EMPTY;
  }

  return STAR_TYPES.FULL;
};

const BpkInteractiveStarRating = (props) => {
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
  const classNames = [getClassName('bpk-star-rating')];
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

BpkInteractiveStarRating.propTypes = {
  getStarLabel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  hoverRating: PropTypes.number,
  large: PropTypes.bool,
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
  maxRating: 5,
  onMouseLeave: () => null,
  onRatingHover: () => null,
  onRatingSelect: () => null,
  rating: 0,
};

export default BpkInteractiveStarRating;
