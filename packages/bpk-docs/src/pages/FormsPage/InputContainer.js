import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkCheckbox from 'bpk-component-checkbox';

class InputContainer extends Component {
  constructor(props) {
    super(props);

    const valueProp = props.FormComponent === BpkCheckbox ? 'checked' : 'value';

    this.state = {
      value: props[valueProp],
    };
  }

  render() {
    const { FormComponent, ...rest } = this.props;

    let overrideProps = {};

    if (FormComponent === BpkCheckbox) {
      overrideProps = {
        checked: this.state.value,
        onChange: e => this.setState({ value: e.target.checked }),
      };
    } else {
      overrideProps = {
        value: this.state.value,
        onChange: e => this.setState({ value: e.target.value }),
      };
    }
    return (
      <FormComponent
        {...rest}
        {...overrideProps}
      />
    );
  }
}

InputContainer.propTypes = {
  FormComponent: PropTypes.func.isRequired,
};

export default InputContainer;
