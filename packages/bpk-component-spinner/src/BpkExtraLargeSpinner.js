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

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import XlSpinner from 'bpk-svgs/dist/js/spinners/xl';

import STYLES from './bpk-spinner.css';
import SPINNER_TYPES from './spinnerTypes';

const getClassName = cssModules(STYLES);

const BpkExtraLargeSpinner = props => {
  const { type, className, ...rest } = props;
  const classNames = [
    'bpk-spinner',
    'bpk-spinner--extra-large',
    `bpk-spinner--${type}`,
  ].map(getClassName);

  if (className) {
    classNames.push(className);
  }

  return <XlSpinner className={classNames.join(' ')} {...rest} />;
};

BpkExtraLargeSpinner.propTypes = {
  type: PropTypes.oneOf(Object.keys(SPINNER_TYPES)),
  className: PropTypes.string,
};

BpkExtraLargeSpinner.defaultProps = {
  type: SPINNER_TYPES.dark,
  className: null,
};

export default BpkExtraLargeSpinner;
