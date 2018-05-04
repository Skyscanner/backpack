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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkButton from 'bpk-component-button';
import BpkProgress from './index';

class ProgressContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      progress: props.initialValue,
    };
  }

  handleChange = progress => {
    this.setState({ progress });
  };

  render() {
    const { steps, ...rest } = this.props;

    delete rest.initialValue;

    return (
      <div>
        <BpkProgress
          min={0}
          max={100}
          value={this.state.progress}
          onComplete={action('completed')}
          {...rest}
        />
        <br />
        <BpkProgress
          min={0}
          max={100}
          value={this.state.progress}
          small
          {...rest}
        />
        <br />
        {steps.map(step => (
          <BpkButton
            key={step}
            secondary
            onClick={() => this.handleChange(step)}
            selected={step === this.state.progress}
            style={{ marginRight: '1rem' }}
          >
            {step}
          </BpkButton>
        ))}
      </div>
    );
  }
}

ProgressContainer.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.number).isRequired,
  initialValue: PropTypes.number.isRequired,
};

storiesOf('bpk-component-progress', module)
  .add('Default', () => (
    <ProgressContainer
      min={0}
      max={100}
      initialValue={25}
      steps={[0, 25, 50, 75, 100]}
    />
  ))
  .add('Stepped', () => (
    <ProgressContainer
      min={0}
      max={5}
      initialValue={2}
      steps={[0, 1, 2, 3, 4, 5]}
      stepped
      getValueText={(value, min, max) => `Step ${value} of ${max}`}
    />
  ));
