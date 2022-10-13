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
import React from 'react';
import LgSpinner from '@skyscanner/bpk-svgs/dist/js/spinners/lg';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSpinner.module.scss';
import SPINNER_TYPES from './spinnerTypes';

const getClassName = cssModules(STYLES);

type Props = {
  type: $Keys<typeof SPINNER_TYPES>,
  className: ?string,
  alignToButton: boolean,
};

const BpkLargeSpinner = (props: Props) => {
  const { alignToButton, className, type, ...rest } = props;

  const classNames = getClassName(
    'bpk-spinner',
    'bpk-spinner--large',
    `bpk-spinner--${type}`,
    alignToButton && 'bpk-spinner--align-to-large-button',
    className,
  );

  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  return <LgSpinner className={classNames} {...rest} />;
};

BpkLargeSpinner.propTypes = {
  type: PropTypes.oneOf(Object.keys(SPINNER_TYPES)),
  className: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkLargeSpinner.defaultProps = {
  type: SPINNER_TYPES.dark,
  className: null,
  alignToButton: false,
};

export default BpkLargeSpinner;
