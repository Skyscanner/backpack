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
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkInput from 'bpk-component-input';

class InputContainer extends Component {
  constructor(props) {
    super(props);

    const valueProp = props.FormComponent === BpkCheckbox ? 'checked' : 'value';

    this.state = {
      value: props[valueProp],
    };
  }

  render() {
    const { FormComponent, ...rest } = this.props;

    let overrideProps = {};

    if (FormComponent === BpkCheckbox) {
      overrideProps = {
        checked: this.state.value,
        onChange: e => this.setState({ value: e.target.checked }),
      };
    } else {
      overrideProps = {
        value: this.state.value,
        onChange: e => this.setState({ value: e.target.value }),
      };
      if (FormComponent === BpkInput) {
        overrideProps.onClear = () => this.setState({ value: '' });
      }
    }
    return <FormComponent {...rest} {...overrideProps} />;
  }
}

InputContainer.propTypes = {
  FormComponent: PropTypes.func.isRequired,
};

export default InputContainer;
