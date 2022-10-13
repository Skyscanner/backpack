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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BpkInput from '../../bpk-component-input';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkInputField.module.scss';

const getClassName = cssModules(STYLES);

class BpkInputField extends Component {
  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    if (prevProps.focus !== focus && this.input && focus) {
      this.input.focus();
      this.input.select();
    }
  }

  render() {
    const { focus, id, index, label, value, ...rest } = this.props;
    return (
      <div key={index} className={getClassName('bpk-input-field')}>
        <BpkInput
          id={id}
          autoComplete="off"
          maxLength="1"
          aria-label={`${label} ${index}`}
          inputRef={(input) => {
            this.input = input;
          }}
          value={value || ''}
          {...rest}
        />
      </div>
    );
  }
}

BpkInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

BpkInputField.defaultProps = {
  value: '',
};

export default BpkInputField;
