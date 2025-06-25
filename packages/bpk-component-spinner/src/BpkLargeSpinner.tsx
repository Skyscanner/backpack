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


import { cssModules } from '../../bpk-react-utils';

import SPINNER_TYPES from './spinnerTypes';
import LgSpinner from './spinners/lg';

import type { SpinnerTypes } from './spinnerTypes';

// @ts-expect-error TS(2307): Cannot find module './BpkSpinner.module.scss' or i... Remove this comment to see the full error message
import STYLES from './BpkSpinner.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  type?: SpinnerTypes,
  className?: string | null,
  alignToButton?: boolean,
  [rest: string]: any,
};

const BpkLargeSpinner = ({
  alignToButton = false,
  className = null,
  type = SPINNER_TYPES.dark,
  ...rest
}: Props) => {

  const classNames = getClassName(
    'bpk-spinner',
    'bpk-spinner--large',
    `bpk-spinner--${type}`,
    alignToButton && 'bpk-spinner--align-to-large-button',
    className,
  );

  return (
    <span className={classNames}>
      <LgSpinner
        {...rest}
      />
    </span>

  );
};

export default BpkLargeSpinner;
