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

import React from 'react';

import { cssModules } from '../../bpk-react-utils';

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
        width="32"
        height="40"
        viewBox="0 0 32 40"
        className={classNames}
        {...rest}
      >
        <path d="M32,16.2575 L31.9995,16.3817 C32.0032,16.7936 31.9852,17.2038 31.9455,17.6093 C31.7127,20.4826 30.7446,23.1441 29.2328,25.3991 C26.2125,30.7416 21.1896,35.9609 17.2875,39.5 C16.5525,40.1667 15.4475,40.1667 14.7125,39.5 C10.8104,35.9609 5.78747,30.7416 2.76723,25.3991 C1.25541,23.1441 0.2873,20.4826 0.05453,17.6093 C0.01479,17.2038 -0.00317,16.7936 0.00046,16.3817 L0,16.2575 C0,7.2787 7.1634,0 16,0 C24.8366,0 32,7.2787 32,16.2575 Z" />
      </svg>
    );
  }
  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="32"
      viewBox="0 0 26 32"
      className={classNames}
      {...rest}
    >
      <path d="M26,13.006 L25.9996018,13.1054 C26.0026018,13.4349 25.9880018,13.763 25.9557018,14.0875 C25.7666018,16.3861 24.9800018,18.5153 23.7516018,20.3193 C21.2977018,24.5933 17.2166018,28.7687 14.0461018,31.6 C13.4489018,32.1333 12.5511018,32.1333 11.9539018,31.6 C8.78340182,28.7687 4.70232182,24.5933 2.24837182,20.3193 C1.02002182,18.5153 0.233431825,16.3861 0.0443018246,14.0875 C0.0120218246,13.763 -0.00257817543,13.4348 0.000371824568,13.1054 L-4.4408921e-16,13.006 C-4.4408921e-16,5.82298 5.82030182,0 13,0 C20.1797018,0 26,5.82298 26,13.006 Z" />
    </svg>
  );
};

BpkIconMarkerBackground.defaultProps = {
  disabled: false,
  interactive: false,
  selected: false,
};

export default BpkIconMarkerBackground;
