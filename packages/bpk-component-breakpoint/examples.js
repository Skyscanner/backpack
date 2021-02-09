/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React, { type Node } from 'react';
import {
  spacingBase,
  colorMonteverde,
  colorSkyGrayTint06,
} from 'bpk-tokens/tokens/base.es6';

import BpkBreakpoint, { BREAKPOINTS } from './index';

const MediaQueryStatus = (props: { children: Node, isActive: boolean }) => {
  const { children, isActive } = props;

  const style = {
    padding: spacingBase,
    backgroundColor: isActive ? colorMonteverde : colorSkyGrayTint06,
  };

  return <div style={style}>{children}</div>;
};

const DefaultExample = () => (
  <div>
    <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
      {isActive => (
        <MediaQueryStatus isActive={isActive}>MOBILE</MediaQueryStatus>
      )}
    </BpkBreakpoint>
    <BpkBreakpoint query={BREAKPOINTS.TABLET}>
      {isActive => (
        <MediaQueryStatus isActive={isActive}>TABLET</MediaQueryStatus>
      )}
    </BpkBreakpoint>
    <BpkBreakpoint query={BREAKPOINTS.TABLET_ONLY}>
      {isActive => (
        <MediaQueryStatus isActive={isActive}>TABLET ONLY</MediaQueryStatus>
      )}
    </BpkBreakpoint>
    <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
      {isActive => (
        <MediaQueryStatus isActive={isActive}>ABOVE MOBILE</MediaQueryStatus>
      )}
    </BpkBreakpoint>
    <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
      {isActive => (
        <MediaQueryStatus isActive={isActive}>ABOVE TABLET</MediaQueryStatus>
      )}
    </BpkBreakpoint>
  </div>
);

export default DefaultExample;
