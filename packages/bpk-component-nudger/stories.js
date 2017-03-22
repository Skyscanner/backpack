import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import BpkNudger from './index';

class NudgerContainer extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 2,
    };
  }
  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <BpkNudger
        min={1}
        max={10}
        value={this.state.value}
        onChange={this.handleChange}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
      />
    );
  }
}

storiesOf('bpk-component-nudger', module)
  .add('Default', () => (
    <BpkNudger
      min={1}
      max={99}
      value={3}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Lower bounds', () => (
    <BpkNudger
      min={3}
      max={99}
      value={3}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Upper bounds', () => (
    <BpkNudger
      min={1}
      max={99}
      value={99}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Stateful example', () => (
    <NudgerContainer />
  ));
