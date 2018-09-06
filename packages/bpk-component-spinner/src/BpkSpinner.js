/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import SmSpinner from 'bpk-svgs/dist/js/spinners/sm';

import STYLES from './bpk-spinner.css';
import SPINNER_TYPES from './spinnerTypes';

const getClassName = cssModules(STYLES);

const BpkSpinner = props => {
  const { type, className, alignToButton, ...rest } = props;

  const classNames = ['bpk-spinner', `bpk-spinner--${type}`].map(getClassName);

  if (alignToButton) {
    classNames.push(getClassName('bpk-spinner--align-to-button'));
  }
  if (className) {
    classNames.push(className);
  }

  return <SmSpinner className={classNames.join(' ')} {...rest} />;
};

BpkSpinner.propTypes = {
  type: PropTypes.oneOf(Object.keys(SPINNER_TYPES)),
  className: PropTypes.string,
  alignToButton: PropTypes.bool,
};

BpkSpinner.defaultProps = {
  type: SPINNER_TYPES.dark,
  className: null,
  alignToButton: false,
};

export default BpkSpinner;
