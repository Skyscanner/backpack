import React, { PropTypes } from 'react';

import './bpk-grid.scss';

const BpkGridRow = (props) => {
  const classNames = ['bpk-grid__row'];
  const { children, padded, className, ...rest } = props;

  if (padded) { classNames.push('bpk-grid__row--padded'); }
  if (className) { classNames.push(className); }

  return <div className={classNames.join(' ')} {...rest}>{children}</div>;
};

BpkGridRow.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridRow.defaultProps = {
  padded: true,
  className: null,
};

export default BpkGridRow;
