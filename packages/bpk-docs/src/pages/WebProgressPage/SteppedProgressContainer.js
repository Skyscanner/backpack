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

import React, { Component } from 'react';
import BpkProgress from 'bpk-component-progress';
import BpkButton from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';

import STYLES from './progress-container.css';

const getClassName = cssModules(STYLES);

export default class SteppedProgressContainer extends Component {
  constructor() {
    super();

    this.state = {
      progress: 1,
    };
  }

  setProgress = progress => {
    if (progress >= 1 && progress <= 5) {
      this.setState({ progress });
    }
  };

  render() {
    return (
      <div>
        <BpkProgress min={0} max={5} value={this.state.progress} stepped />
        <br />
        <div className={getClassName('bpkdocs-progress-container__flex')}>
          <BpkButton
            secondary
            onClick={() => this.setProgress(this.state.progress - 1)}
            disabled={this.state.progress <= 1}
          >
            Back
          </BpkButton>
          <span>{`Step ${this.state.progress} of 5`}</span>
          <BpkButton
            onClick={() => this.setProgress(this.state.progress + 1)}
            disabled={this.state.progress === 5}
          >
            Continue
          </BpkButton>
        </div>
      </div>
    );
  }
}
