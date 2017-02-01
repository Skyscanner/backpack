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

BpkBreakpoint.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.oneOf(Object.keys(BREAKPOINTS).map(key => BREAKPOINTS[key])).isRequired,
};

export { BREAKPOINTS };
export default BpkBreakpoint;
