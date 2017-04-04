import React, { PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import TOKENS from 'bpk-tokens/tokens/breakpoints.common';

const BREAKPOINTS = {
  MOBILE: TOKENS.breakpointQueryMobile,
  TABLET: TOKENS.breakpointQueryTablet,
  TABLET_ONLY: TOKENS.breakpointQueryTabletOnly,
  ABOVE_MOBILE: TOKENS.breakpointQueryAboveMobile,
  ABOVE_TABLET: TOKENS.breakpointQueryAboveTablet,
};

const BpkBreakpoint = props => <MediaQuery query={props.query}>{props.children}</MediaQuery>;

const queryValidator = (props, ...rest) => {
  if (!props.legacy) {
    return PropTypes.oneOf(
      Object.keys(BREAKPOINTS).map(key => BREAKPOINTS[key]),
    ).isRequired(props, ...rest);
  }
  return PropTypes.string.isRequired(props, ...rest);
};

BpkBreakpoint.propTypes = {
  children: PropTypes.func.isRequired,
  query: queryValidator, // eslint-disable-line react/require-default-props
  legacy: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

BpkBreakpoint.defaultProps = {
  legacy: false,
};

export { BREAKPOINTS };
export default BpkBreakpoint;
