import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-grid-container.scss';

const getClassName = cssModules(STYLES);

const BpkGridContainer = (props) => {
  const { children, className, debug, fullWidth, ...rest } = props;
  const classNames = [getClassName('bpk-grid__container')];

  if (debug) { classNames.push(getClassName('bpk-grid__container--debug')); }
  if (fullWidth) { classNames.push(getClassName('bpk-grid__container--full-width')); }
  if (className) { classNames.push(className); }

  return <div className={classNames.join(' ')} {...rest}>{children}</div>;
};

BpkGridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  debug: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridContainer.defaultProps = {
  debug: false,
  fullWidth: false,
  className: null,
};

export default BpkGridContainer;
