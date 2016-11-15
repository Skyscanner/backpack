import React, { PropTypes } from 'react';

import './bpk-grid.scss';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const BpkGridColumn = (props) => {
  const classNames = ['bpk-grid__column', `bpk-grid__column--${props.width}`];

  if (isNumeric(props.mobileWidth)) { classNames.push(`bpk-grid__column--mobile-${props.mobileWidth}`); }
  if (isNumeric(props.tabletWidth)) { classNames.push(`bpk-grid__column--tablet-${props.tabletWidth}`); }
  if (isNumeric(props.offset)) { classNames.push(`bpk-grid__column--offset-${props.offset}`); }
  if (isNumeric(props.mobileOffset)) { classNames.push(`bpk-grid__column--offset-mobile-${props.mobileOffset}`); }
  if (isNumeric(props.tabletOffset)) { classNames.push(`bpk-grid__column--offset-tablet-${props.tabletOffset}`); }
  if (props.debug) { classNames.push('bpk-grid__column--debug'); }

  return (
    <div className={classNames.join(' ')}>
      {props.debug
        ? <div className="bpk-grid__column-debugger">{props.children}</div>
        : props.children
      }
    </div>
  );
};

BpkGridColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.number.isRequired,
  mobileWidth: PropTypes.number,
  tabletWidth: PropTypes.number,
  offset: PropTypes.number,
  mobileOffset: PropTypes.number,
  tabletOffset: PropTypes.number,
  debug: PropTypes.bool,
};

BpkGridColumn.defaultProps = {
  mobileWidth: null,
  tabletWidth: null,
  offset: null,
  mobileOffset: null,
  tabletOffset: null,
  debug: false,
};

export default BpkGridColumn;
