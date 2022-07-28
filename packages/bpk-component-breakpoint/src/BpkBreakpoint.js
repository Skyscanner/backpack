/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import MediaQuery from 'react-responsive';
import TOKENS from '@skyscanner/bpk-foundations-web/tokens/breakpoints.common';

const BREAKPOINTS = {
  SMALL_MOBILE: TOKENS.breakpointQuerySmallMobile,
  MOBILE: TOKENS.breakpointQueryMobile,
  SMALL_TABLET: TOKENS.breakpointQuerySmallTablet,
  SMALL_TABLET_ONLY: TOKENS.breakpointQuerySmallTabletOnly,
  TABLET: TOKENS.breakpointQueryTablet,
  TABLET_ONLY: TOKENS.breakpointQueryTabletOnly,
  ABOVE_MOBILE: TOKENS.breakpointQueryAboveMobile,
  ABOVE_TABLET: TOKENS.breakpointQueryAboveTablet,
};

type Props = {
  children: Node | ((matches: boolean) => mixed),
  query: string | $Values<typeof BREAKPOINTS>,
  legacy: boolean,
};

const BpkBreakpoint = (props: Props) => {
  const { children, query } = props;
  return <MediaQuery query={query}>{children}</MediaQuery>;
};

const queryValidator = (props: Props, ...rest) => {
  if (!props.legacy) {
    return PropTypes.oneOf(
      Object.keys(BREAKPOINTS).map((key) => BREAKPOINTS[key]),
    ).isRequired(props, ...rest);
  }
  return PropTypes.string.isRequired(props, ...rest);
};

BpkBreakpoint.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  query: queryValidator, // eslint-disable-line react/require-default-props
  legacy: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

BpkBreakpoint.defaultProps = {
  legacy: false,
};

export { BREAKPOINTS };
export default BpkBreakpoint;
