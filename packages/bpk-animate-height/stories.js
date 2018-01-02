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

import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnimateHeight from './index';

class AnimateHeightContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: this.props.fromHeight,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => {
      const height =
        prevState.height !== this.props.fromHeight
          ? this.props.fromHeight
          : this.props.toHeight;

      return { height };
    });
  }

  render() {
    const { fromHeight, toHeight, ...rest } = this.props;
    return (
      <div>
        <AnimateHeight {...rest} height={this.state.height} />
        <br />
        <BpkButton onClick={this.onClick}>Toggle height!</BpkButton>
      </div>
    );
  }
}

AnimateHeightContainer.propTypes = {
  fromHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  toHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

storiesOf('bpk-animate-height', module).add('Example', () => (
  <AnimateHeightContainer fromHeight="auto" toHeight={0} duration={300}>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus.
  </AnimateHeightContainer>
));
