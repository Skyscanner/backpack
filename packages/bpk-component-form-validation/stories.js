import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@kadira/storybook';

import BpkFormValidation from './index';

class FormValidationContainer extends Component {
  constructor() {
    super();

    this.state = {
      expand: true,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    this.setState(prevState => ({
      expand: !prevState.expand,
    }));
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <BpkButton onClick={this.toggleExpand}>
            Toggle
          </BpkButton>
        </div>
        <BpkFormValidation expand={this.state.expand} {...this.props} />
      </div>
    );
  }
}

storiesOf('bpk-component-form-validation', module)
  .add('Default', () => (
    <FormValidationContainer id="my-validation-message">
      A validation message
    </FormValidationContainer>
  ));
