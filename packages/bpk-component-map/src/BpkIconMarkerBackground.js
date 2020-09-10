/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import STYLES from './BpkIconMarkerBackground.scss';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="36"
        viewBox="4 3 30 36"
        className={classNames}
        {...rest}
      >
        <path d="M33.4996 17.7417H33.4995L33.4996 17.7482C33.5028 18.1006 33.4868 18.4513 33.4515 18.7976L33.4514 18.7976L33.4507 18.8063C33.2401 21.3013 32.3646 23.613 30.9958 25.573L30.9847 25.5888L30.9749 25.6055C28.1846 30.3437 23.5242 34.9988 19.8787 38.1729C19.3778 38.609 18.6222 38.609 18.1213 38.1729C14.4758 34.9988 9.81536 30.3437 7.02512 25.6055L7.0153 25.5888L7.00421 25.573C5.63543 23.613 4.7599 21.3013 4.54935 18.8064L4.54942 18.8064L4.54854 18.7976C4.51319 18.4513 4.49717 18.1006 4.50041 17.7481L4.50045 17.7481L4.50043 17.7416L4.5 17.6317C4.5 17.6314 4.5 17.6311 4.5 17.6308C4.50053 9.83812 10.9804 3.5 19 3.5C27.0196 3.5 33.4995 9.83814 33.5 17.6308C33.5 17.6311 33.5 17.6314 33.5 17.6317L33.4996 17.7417Z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="30"
      viewBox="4 3 24 30"
      className={classNames}
      {...rest}
    >
      <path d="M28 15.1931L27.9997 15.2863C28.0024 15.5952 27.9889 15.9028 27.9591 16.207C27.7845 18.362 27.0584 20.3581 25.9246 22.0494C23.6594 26.0562 19.8922 29.9707 16.9656 32.625C16.4143 33.125 15.5856 33.125 15.0344 32.625C12.1078 29.9707 8.34061 26.0562 6.07542 22.0494C4.94156 20.3581 4.21548 18.362 4.0409 16.207C4.01109 15.9028 3.99762 15.5952 4.00034 15.2863L4 15.1931C4 8.45904 9.37258 3 16 3C22.6274 3 28 8.45904 28 15.1931Z" />
    </svg>
  );
};

BpkIconMarkerBackground.defaultProps = {
  disabled: false,
  interactive: false,
  selected: false,
};

export default BpkIconMarkerBackground;
