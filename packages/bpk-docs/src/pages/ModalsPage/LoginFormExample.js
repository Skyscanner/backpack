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

/* @flow */

import BpkLabel from 'bpk-component-label';
import BpkButton from 'bpk-component-button';
import React, { Component, type Node } from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { spacingSm, spacingXxl } from 'bpk-tokens/tokens/base.es6';

const FormFieldExample = (props: { children: Node }) => (
  <div style={{ marginBottom: spacingSm, maxWidth: `calc(${spacingXxl} * 6)` }}>
    {props.children}
  </div>
);

type State = {
  username: string,
  password: string,
};

class LoginFormExample extends Component<{}, State> {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      username: event.currentTarget.value,
    });
  };

  onPasswordChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      password: event.currentTarget.value,
    });
  };

  render() {
    return (
      <form action="#">
        <FormFieldExample>
          <BpkLabel htmlFor="username">Username</BpkLabel>
          <BpkInput
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            placeholder="Enter your username"
          />
        </FormFieldExample>
        <FormFieldExample>
          <BpkLabel htmlFor="password">Password</BpkLabel>
          <BpkInput
            id="password"
            name="password"
            value={this.state.password}
            type={INPUT_TYPES.PASSWORD}
            onChange={this.onPasswordChange}
            placeholder="Enter your password"
          />
        </FormFieldExample>
        <FormFieldExample>
          <BpkButton>Login</BpkButton>
        </FormFieldExample>
      </form>
    );
  }
}

export default LoginFormExample;
