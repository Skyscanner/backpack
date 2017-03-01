import React, { PropTypes } from 'react';

import './bpk-grid.scss';

const BpkGridContainer = (props) => {
  const { children, className, debug, fullWidth, ...rest } = props;
  const classNames = ['bpk-grid__container'];

  if (debug) { classNames.push('bpk-grid__container--debug'); }
  if (fullWidth) { classNames.push('bpk-grid__container--full-width'); }
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
