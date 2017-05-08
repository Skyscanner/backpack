import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkRadio from 'bpk-component-radio';

class RadioContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render() {
    const { ...rest } = this.props;
    delete rest.value;

    return (
      <form className="bpkdocs-forms-page__form">
        <BpkRadio
          name="radio_fruit"
          value="apples"
          label="Apples"
          onChange={() => this.setState({ value: 'apples' })}
          checked={this.state.value === 'apples'}
          {...rest}
        />
        <br />
        <BpkRadio
          name="radio_fruit"
          value="bananas"
          label="Bananas"
          onChange={() => this.setState({ value: 'bananas' })}
          checked={this.state.value === 'bananas'}
          {...rest}
        />
        <br />
        <BpkRadio
          name="radio_fruit"
          value="strawberries"
          label="Strawberries"
          onChange={() => this.setState({ value: 'strawberries' })}
          checked={this.state.value === 'strawberries'}
          {...rest}
        />
      </form>
    );
  }
}

RadioContainer.propTypes = {
  value: PropTypes.string.isRequired,
};

export default RadioContainer;
