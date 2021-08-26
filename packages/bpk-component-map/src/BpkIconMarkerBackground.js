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

import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkIconMarkerBackground.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  disabled: boolean,
  interactive: boolean,
  selected: boolean,
};

const BpkIconMarkerBackground = (props: Props) => {
  const { disabled, interactive, selected, ...rest } = props;

  const classNames = getClassName(
    'bpk-icon-marker-background',
    interactive && 'bpk-icon-marker-background--interactive',
    disabled && 'bpk-icon-marker-background--disabled',
    selected && 'bpk-icon-marker-background--selected',
  );

  if (selected) {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="48"
        viewBox="0 0 40 48"
        className={classNames}
        {...rest}
      >
        <path d="M40,19.509 L39.9994003,19.6581 C40.0040003,20.1523 39.9815003,20.6445 39.9318003,21.1312 C39.6409003,24.5791 38.4307003,27.7729 36.5410003,30.479 C32.7657003,36.89 26.4870003,43.1531 21.6094003,47.4 C20.6906003,48.2 19.3094003,48.2 18.3906003,47.4 C13.5130003,43.1531 7.23430031,36.89 3.45904031,30.479 C1.56926031,27.773 0.359130306,24.5791 0.0681603056,21.1312 C0.0184903056,20.6445 -0.00395969437,20.1523 0.000570305633,19.6581 L0,19.509 C0,8.7345 8.95430031,0 20,0 C31.0457003,0 40,8.7345 40,19.509 Z" />
      </svg>
    );
  }
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="40"
      viewBox="0 0 32 40"
      className={classNames}
      {...rest}
    >
      <path d="M32,16.2575 L31.9995,16.3817 C32.0032,16.7936 31.9852,17.2038 31.9455,17.6093 C31.7127,20.4826 30.7446,23.1441 29.2328,25.3991 C26.2125,30.7416 21.1896,35.9609 17.2875,39.5 C16.5525,40.1667 15.4475,40.1667 14.7125,39.5 C10.8104,35.9609 5.78747,30.7416 2.76723,25.3991 C1.25541,23.1441 0.2873,20.4826 0.05453,17.6093 C0.01479,17.2038 -0.00317,16.7936 0.00046,16.3817 L0,16.2575 C0,7.2787 7.1634,0 16,0 C24.8366,0 32,7.2787 32,16.2575 Z" />
    </svg>
  );
};

BpkIconMarkerBackground.defaultProps = {
  disabled: false,
  interactive: false,
  selected: false,
};

export default BpkIconMarkerBackground;
