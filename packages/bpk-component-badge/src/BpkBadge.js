import React, { PropTypes } from 'react';

import './bpk-badge.scss';

const BpkBadge = (props) => {
  const { docked, centered, className, ...rest } = props;
  const classNames = ['bpk-badge'];

  if (docked === 'right') { classNames.push('bpk-badge--docked-right'); }
  if (docked === 'left') { classNames.push('bpk-badge--docked-left'); }
  if (centered) { classNames.push('bpk-badge--centered'); }
  if (className) { classNames.push(className); }

  return <span className={classNames.join(' ')} {...rest} />;
};

BpkBadge.propTypes = {
  docked: PropTypes.oneOf(['right', 'left', null]),
  centered: PropTypes.bool,
  className: PropTypes.string,
};

BpkBadge.defaultProps = {
  docked: null,
  centered: false,
  className: null,
};

export default BpkBadge;
