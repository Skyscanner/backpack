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

import STYLES from './BpkRadio.css';

const getClassName = cssModules(STYLES);

const BpkRadio = props => {
  const classNames = [getClassName('bpk-radio')];
  const { name, label, disabled, white, className, ...rest } = props;

  if (white) {
    classNames.push(getClassName('bpk-radio--white'));
  }
  if (disabled) {
    classNames.push(getClassName('bpk-radio--disabled'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <label className={classNames.join(' ')}>
      <input
        type="radio"
        className={getClassName('bpk-radio__input')}
        name={name}
        disabled={disabled}
        {...rest}
      />
      <div className={getClassName('bpk-radio__circle')} />
      {label}
    </label>
  );
};

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
};

BpkRadio.defaultProps = {
  disabled: false,
  white: false,
  className: null,
};

export default BpkRadio;
