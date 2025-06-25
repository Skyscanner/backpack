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

import { Component } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkProgress from '../../packages/bpk-component-progress';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

class ProgressContainer extends Component<{}, { progress: number }> {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      progress: 0,
    };
  }

  render() {
    const { progress } = this.state;
    return (
      <div className={getClassName('bpkdocs-progress-container__flex')}>
        <BpkButton
          secondary
          onClick={() => this.setState({ progress: 0 })}
          disabled={progress === 0}
        >
          Reset
        </BpkButton>
        &nbsp;
        <BpkButton
          onClick={() => this.setState({ progress: progress + 50 })}
          disabled={progress === 100}
        >
          Go!
        </BpkButton>
        &nbsp;
        <div className={getClassName('bpkdocs-progress-container__flex-grow')}>
          {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
          // @ts-expect-error TS(2769): No overload matches this call.
          // @ts-expect-error TS(2769) FIXME: No overload matches this call.
          <BpkProgress min={0} max={100} value={progress} {...this.props} />
        </div>
      </div>
    );
  }
}

class SteppedProgressContainer extends Component<{}, { progress: number }> {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      progress: 1,
    };
  }

  setProgress = (progress: number) => {
    if (progress >= 1 && progress <= 5) {
      this.setState({ progress });
    }
  };

  render() {
    return (
      <div>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        // @ts-expect-error TS(2769): No overload matches this call.
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        <BpkProgress
          min={0}
          max={5}
          value={this.state.progress}
          stepped
          {...this.props}
        />
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

const DefaultExample = () => <ProgressContainer />;

// @ts-expect-error TS(2322) FIXME: Type '{ small: true; }' is not assignable to type ... Remove this comment to see the full error message
const SmallExample = () => <ProgressContainer small />;

const SteppedExample = () => <SteppedProgressContainer />;

const MixedExample = () => (
  <div>
    <DefaultExample />
    <SmallExample />
    <SteppedExample />
  </div>
);

export { DefaultExample, SmallExample, SteppedExample, MixedExample };
