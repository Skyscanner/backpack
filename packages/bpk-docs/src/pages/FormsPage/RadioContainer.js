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
import BpkRadio from 'bpk-component-radio';
import { cssModules } from 'bpk-react-utils';

import STYLES from './forms-page.css';

const getClassName = cssModules(STYLES);

class RadioContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render() {
    const { ...rest } = this.props;
    delete rest.value;

    return (
      <form className={getClassName('bpkdocs-forms-page__form')}>
        <BpkRadio
          name="radio_fruit"
          value="apples"
          label="Apples"
          onChange={() => this.setState({ value: 'apples' })}
          checked={this.state.value === 'apples'}
          {...rest}
        />
        <br />
        <BpkRadio
          name="radio_fruit"
          value="bananas"
          label="Bananas"
          onChange={() => this.setState({ value: 'bananas' })}
          checked={this.state.value === 'bananas'}
          {...rest}
        />
        <br />
        <BpkRadio
          name="radio_fruit"
          value="strawberries"
          label="Strawberries"
          onChange={() => this.setState({ value: 'strawberries' })}
          checked={this.state.value === 'strawberries'}
          {...rest}
        />
      </form>
    );
  }
}

RadioContainer.propTypes = {
  value: PropTypes.string.isRequired,
};

export default RadioContainer;
