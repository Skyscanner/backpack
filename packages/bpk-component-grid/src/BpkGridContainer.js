import React, { PropTypes } from 'react';

import './bpk-grid.scss';

const BpkGridContainer = (props) => {
  const classNames = ['bpk-grid__container'];

  if (props.padded) { classNames.push('bpk-grid__container--padded'); }
  if (props.debug) { classNames.push('bpk-grid__container--debug'); }
  if (props.fullWidth) { classNames.push('bpk-grid__container--full-width'); }

  return <div className={classNames.join(' ')}>{props.children}</div>;
};

BpkGridContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  padded: PropTypes.bool,
  debug: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

BpkGridContainer.defaultProps = {
  padded: true,
  debug: false,
  fullWidth: false,
};

export default BpkGridContainer;
