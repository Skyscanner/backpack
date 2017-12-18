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
          <BpkButton onClick={this.toggleExpanded}>Toggle</BpkButton>
        </div>
        <BpkFormValidation expanded={this.state.expanded} {...this.props} />
      </div>
    );
  }
}

storiesOf('bpk-component-form-validation', module).add('Default', () => (
  <FormValidationContainer id="my-validation-message">
    A validation message
  </FormValidationContainer>
));
