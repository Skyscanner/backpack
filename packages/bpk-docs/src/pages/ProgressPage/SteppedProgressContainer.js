import React, { Component } from 'react';
import BpkProgress from 'bpk-component-progress';
import BpkButton from 'bpk-component-button';

export default class SteppedProgressContainer extends Component {
  constructor() {
    super();

    this.state = {
      progress: 1,
    };

    this.setProgress = this.setProgress.bind(this);
  }

  setProgress(progress) {
    if (progress >= 1 && progress <= 5) {
      this.setState({ progress });
    }
  }

  render() {
    return (
      <div>
        <BpkProgress
          min={0}
          max={5}
          value={this.state.progress}
          stepped
        />
        <br />
        <div className="bpkdocs-progress-page__flex">
          <BpkButton
            secondary
            onClick={() => this.setProgress(this.state.progress - 1)}
            disabled={this.state.progress <= 1}
          >
            Back
          </BpkButton>
          <span>{ `Step ${this.state.progress} of 5` }</span>
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
