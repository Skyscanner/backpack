import React, { Component, PropTypes } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BpkButton from 'bpk-component-button';
import BpkProgress from './index';

class ProgressContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      progress: props.initialValue,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(progress) {
    this.setState({ progress });
  }

  render() {
    const { steps, ...rest } = this.props;

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
        { steps.map(step => (
          <BpkButton
            secondary
            onClick={() => this.handleChange(step)}
            selected={step === this.state.progress}
            style={{ marginRight: '1rem' }}
          >
            { step }
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
