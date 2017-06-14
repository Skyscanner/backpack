import React from 'react';
import PropTypes from 'prop-types';
import SmallIcon from 'bpk-component-icon/sm/star';
import LargeIcon from 'bpk-component-icon/lg/star';
import HalfSmallIcon from 'bpk-component-icon/sm/star-half';
import HalfLargeIcon from 'bpk-component-icon/lg/star-half';

import './bpk-star-rating.scss';

export const STAR_TYPES = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
  INTERACTIVE: 'interactive',
};

const BpkStar = (props) => {
  const { type, large, selected, ...rest } = props;
  const iconClassNames = ['bpk-star-rating__star'];
  const containerClassNames = ['bpk-star-rating__star-container'];
  const halfIconClassNamesLeft = ['bpk-star-rating__star bpk-star-rating__star--half bpk-star-rating__star--filled'];
  const halfIconClassNamesRight = ['bpk-star-rating__star bpk-star-rating__star--half-flipped'];

  let Icon = SmallIcon;
  let HalfIcon = HalfSmallIcon;

  if (large) {
    Icon = LargeIcon;
    HalfIcon = HalfLargeIcon;
    iconClassNames.push('bpk-star-rating__star--large');
    containerClassNames.push('bpk-star-rating__star-container--large');
  }

  if (selected) { iconClassNames.push('bpk-star-rating__star--selected'); }

  if (type === STAR_TYPES.HALF) {
    return (
      <span className={containerClassNames.join(' ')} {...rest}>
        <HalfIcon className={halfIconClassNamesLeft.join(' ')} />
        <HalfIcon className={halfIconClassNamesRight.join(' ')} />
      </span>
    );
  }

  if (type === STAR_TYPES.INTERACTIVE) {
    iconClassNames.push('bpk-star-rating__star--filled');
    iconClassNames.push('bpk-star-rating__star--interactive');
  }

  if (type === STAR_TYPES.FULL) {
    iconClassNames.push('bpk-star-rating__star--filled');
  }

  return <Icon className={iconClassNames.join(' ')} {...rest} />;
};

BpkStar.propTypes = {
  type: PropTypes.oneOf([
    STAR_TYPES.EMPTY,
    STAR_TYPES.HALF,
    STAR_TYPES.FULL,
    STAR_TYPES.INTERACTIVE,
  ]).isRequired,
  large: PropTypes.bool,
  selected: PropTypes.bool,
};

BpkStar.defaultProps = {
  large: false,
  selected: false,
};

export default BpkStar;
