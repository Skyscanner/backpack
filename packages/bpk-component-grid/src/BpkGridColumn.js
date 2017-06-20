import PropTypes from 'prop-types';
import React from 'react';

import './bpk-grid.scss';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const BpkGridColumn = (props) => {
  const {
    children,
    width,
    mobileWidth,
    tabletWidth,
    offset,
    mobileOffset,
    tabletOffset,
    padded,
    debug,
    className,
    ...rest
  } = props;

  const classNames = ['bpk-grid__column', `bpk-grid__column--${width}`];

  if (isNumeric(mobileWidth)) { classNames.push(`bpk-grid__column--mobile-${mobileWidth}`); }
  if (isNumeric(tabletWidth)) { classNames.push(`bpk-grid__column--tablet-${tabletWidth}`); }
  if (isNumeric(offset)) { classNames.push(`bpk-grid__column--offset-${offset}`); }
  if (isNumeric(mobileOffset)) { classNames.push(`bpk-grid__column--offset-mobile-${mobileOffset}`); }
  if (isNumeric(tabletOffset)) { classNames.push(`bpk-grid__column--offset-tablet-${tabletOffset}`); }
  if (padded) { classNames.push('bpk-grid__column--padded'); }
  if (debug) { classNames.push('bpk-grid__column--debug'); }
  if (className) { classNames.push(className); }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {debug ? <div className="bpk-grid__column-debugger">{children}</div> : children}
    </div>
  );
};

BpkGridColumn.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  mobileWidth: PropTypes.number,
  tabletWidth: PropTypes.number,
  offset: PropTypes.number,
  mobileOffset: PropTypes.number,
  tabletOffset: PropTypes.number,
  padded: PropTypes.bool,
  debug: PropTypes.bool,
  className: PropTypes.string,
};

BpkGridColumn.defaultProps = {
  mobileWidth: null,
  tabletWidth: null,
  offset: null,
  mobileOffset: null,
  tabletOffset: null,
  padded: true,
  debug: false,
  className: null,
};

export default BpkGridColumn;
