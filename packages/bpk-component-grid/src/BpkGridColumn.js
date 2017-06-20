import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-grid-column.scss';

const getClassName = cssModules(STYLES);

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

  const classNames = ['bpk-grid__column', `bpk-grid__column--${width}`].map(getClassName);

  if (isNumeric(mobileWidth)) { classNames.push(getClassName(`bpk-grid__column--mobile-${mobileWidth}`)); }
  if (isNumeric(tabletWidth)) { classNames.push(getClassName(`bpk-grid__column--tablet-${tabletWidth}`)); }
  if (isNumeric(offset)) { classNames.push(getClassName(`bpk-grid__column--offset-${offset}`)); }
  if (isNumeric(mobileOffset)) { classNames.push(getClassName(`bpk-grid__column--offset-mobile-${mobileOffset}`)); }
  if (isNumeric(tabletOffset)) { classNames.push(getClassName(`bpk-grid__column--offset-tablet-${tabletOffset}`)); }
  if (padded) { classNames.push(getClassName('bpk-grid__column--padded')); }
  if (debug) { classNames.push(getClassName('bpk-grid__column--debug')); }
  if (className) { classNames.push(className); }

  return (
    <div className={classNames.join(' ')} {...rest}>
      {debug ? <div className={getClassName('bpk-grid__column-debugger')}>{children}</div> : children}
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
