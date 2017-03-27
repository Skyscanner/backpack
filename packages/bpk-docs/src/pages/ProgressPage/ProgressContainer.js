import React, { Component } from 'react';
import BpkProgress from 'bpk-component-progress';
import BpkButton from 'bpk-component-button';

export default class ProgressContainer extends Component {
  constructor() {
    super();

    this.state = {
      progress: 0,
    };
  }

  render() {
    const { progress } = this.state;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <div style={{ flexGrow: '1' }}>
          <BpkProgress
            min={0}
            max={100}
            value={progress}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
