import React from 'react';
import PropTypes from 'prop-types';
import SmallIcon from 'bpk-component-icon/sm/star';
import LargeIcon from 'bpk-component-icon/lg/star';
import HalfSmallIcon from 'bpk-component-icon/sm/star-half';
import HalfLargeIcon from 'bpk-component-icon/lg/star-half';
import { withRtlSupport } from 'bpk-component-icon';

import './bpk-star.scss';

export const STAR_TYPES = {
  EMPTY: 'empty',
  HALF: 'half',
  FULL: 'full',
};

const BpkStar = (props) => {
  const { type, large, className, ...rest } = props;
  const iconClassNames = ['bpk-star'];
  const containerClassNames = ['bpk-star__container bpk-star__container--half-star'];
  const halfIconClassNamesLeft = ['bpk-star bpk-star--half bpk-star--filled'];
  const halfIconClassNamesRight = ['bpk-star bpk-star--half-flipped'];

  let Icon = SmallIcon;
  let HalfIcon = HalfSmallIcon;

  if (large) {
    Icon = LargeIcon;
    HalfIcon = HalfLargeIcon;
    iconClassNames.push('bpk-star--large');
    containerClassNames.push('bpk-star__container--large');
  }

  if (type === STAR_TYPES.HALF) {
    if (className) { containerClassNames.push(className); }
    return (
      <span className={containerClassNames.join(' ')} {...rest}>
        <HalfIcon className={halfIconClassNamesLeft.join(' ')} />
        <HalfIcon className={halfIconClassNamesRight.join(' ')} />
      </span>
    );
  }

  if (type === STAR_TYPES.FULL) {
    iconClassNames.push('bpk-star--filled');
  }

  if (className) { iconClassNames.push(className); }

  return <Icon className={iconClassNames.join(' ')} {...rest} />;
};

BpkStar.propTypes = {
  type: PropTypes.oneOf([
    STAR_TYPES.EMPTY,
    STAR_TYPES.HALF,
    STAR_TYPES.FULL,
  ]).isRequired,
  className: PropTypes.string,
  large: PropTypes.bool,
};

BpkStar.defaultProps = {
  className: null,
  large: false,
};

export default withRtlSupport(BpkStar);
