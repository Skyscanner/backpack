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

import React, { Component } from 'react';
import BpkSlider from 'bpk-component-slider';
import { cssModules } from 'bpk-react-utils';

import STYLES from './slider-container.scss';

const getClassName = cssModules(STYLES);

export default class SliderContainer extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div className={getClassName('bpkdocs-slider-container')}>
        <BpkSlider
          min={0}
          max={100}
          value={value}
          {...this.props}
        />
      </div>
    );
  }
}
