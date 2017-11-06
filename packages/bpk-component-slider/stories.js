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
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import BpkSlider from './index';

class SliderContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value || 50,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const valueComponent = (min, max) => <p>{min} - {max}</p>;
    const min = this.props.min || 0;
    return (
      <div>
        {this.state.value.length
          ? valueComponent(this.state.value[0], this.state.value[1])
          : valueComponent(min, this.state.value)}
        <BpkSlider
          min={min}
          max={100}
          step={1}
          className="bpk-slider"
          onChange={this.handleChange}
          {...this.props}
          value={this.state.value}
        />
        <br />
      </div>
    );
  }
}

const EnhancedSlider = updateOnDirectionChange(SliderContainer);

storiesOf('bpk-component-slider', module)
  .add('Simple slider', () => (
    <EnhancedSlider
      min={0}
      value={50}
    />
  ))
  .add('Simple large slider', () => (
    <EnhancedSlider
      min={0}
      value={50}
      large
    />
  ))
  .add('Simple slider with steps', () => (
    <EnhancedSlider
      min={0}
      value={50}
      step={10}
    />
  ))
  .add('Range slider', () => (
    <EnhancedSlider
      min={0}
      value={[20, 80]}
    />
  ))
  .add('Range slider with minimum distance', () => (
    <EnhancedSlider
      min={0}
      value={[20, 80]}
      minDistance={10}
    />
  ));

SliderContainer.propTypes = {
  min: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]).isRequired,
};
