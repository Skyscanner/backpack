/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import STYLES from './bpk-checkbox.scss';

const getClassName = cssModules(STYLES);

const BpkCheckbox = (props) => {
  const classNames = [getClassName('bpk-checkbox')];
  const labelClassNames = [getClassName('bpk-checkbox__label')];
  const {
    name, label, required, disabled, white, className, smallLabel, ...rest
  } = props;

  if (white) { classNames.push(getClassName('bpk-checkbox--white')); }
  if (disabled) { classNames.push(getClassName('bpk-checkbox--disabled')); }
  if (smallLabel) { labelClassNames.push(getClassName('bpk-checkbox__label--small')); }
  if (className) { classNames.push(className); }

  // This is awkward because the label-has-for rule enforces an 'id' / 'for' pairing
  // when it's not really necessary for nested inputs.
  // See https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51.
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <label className={classNames.join(' ')}>
      <input
        type="checkbox"
        className={getClassName('bpk-checkbox__input')}
        name={name}
        disabled={disabled}
        {...rest}
      />
      <span className={labelClassNames.join(' ')}>
        {label}
        {required && (
          <span className={getClassName('bpk-checkbox__asterisk')}>*</span>
        )}
      </span>
    </label>
  );
  /* eslint-enable */
};

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
  smallLabel: PropTypes.bool,
};

BpkCheckbox.defaultProps = {
  required: false,
  disabled: false,
  white: false,
  className: null,
  smallLabel: false,
};

export default BpkCheckbox;
