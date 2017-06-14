import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-badge.scss';

const getClassName = cssModules(STYLES);

const BpkBadge = (props) => {
  const { docked, centered, className, ...rest } = props;
  const classNames = [getClassName('bpk-badge')];

  if (docked === 'right') { classNames.push(getClassName('bpk-badge--docked-right')); }
  if (docked === 'left') { classNames.push(getClassName('bpk-badge--docked-left')); }
  if (centered) { classNames.push(getClassName('bpk-badge--centered')); }
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
