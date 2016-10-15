import BpkLabel from 'bpk-component-label';
import BpkButton from 'bpk-component-button';
import TOKENS from 'bpk-tokens/tokens/base.common';
import React, { PropTypes, Component } from 'react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

const FormFieldExample = props => (
  <div style={{ marginBottom: TOKENS.spacingSm, maxWidth: `calc(${TOKENS.spacingXxl} * 6)` }}>
    {props.children}
  </div>
);

FormFieldExample.propTypes = {
  children: PropTypes.node.isRequired,
};

class LoginFormExample extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <form action="#">
        <FormFieldExample>
          <BpkLabel label="Username" htmlFor="username" />
          <BpkInput
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            placeholder="Enter your username"
          />
        </FormFieldExample>
        <FormFieldExample>
          <BpkLabel label="Password" htmlFor="password" />
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
