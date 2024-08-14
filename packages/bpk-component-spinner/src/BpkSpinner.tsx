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

import SmSpinner from '@skyscanner/bpk-svgs/dist/js/spinners/sm';

import { cssModules } from '../../bpk-react-utils';

import SPINNER_TYPES from './spinnerTypes';

import type { SpinnerTypes } from './spinnerTypes';

import STYLES from './BpkSpinner.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  type?: SpinnerTypes;
  className?: string | null;
  alignToButton?: boolean;
  [rest: string]: any;
};

const BpkSpinner = ({
  alignToButton = false,
  className = null,
  type = SPINNER_TYPES.dark,
  ...rest
}: Props) => {
  const classNames = getClassName(
    'bpk-spinner',
    `bpk-spinner--${type}`,
    alignToButton && 'bpk-spinner--align-to-button',
    className,
  );

  return (
    <span className={classNames}>
      <SmSpinner {...rest} />
    </span>
  );
};

export default BpkSpinner;
