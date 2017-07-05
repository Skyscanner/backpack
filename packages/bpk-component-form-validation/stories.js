import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';

import BpkFormValidation from './index';

class FormValidationContainer extends Component {
  constructor() {
    super();

    this.state = {
      expanded: true,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <BpkButton onClick={this.toggleExpanded}>
            Toggle
          </BpkButton>
        </div>
        <BpkFormValidation expanded={this.state.expanded} {...this.props} />
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
