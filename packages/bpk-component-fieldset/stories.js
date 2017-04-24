import React, { PropTypes, Component } from 'react';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import { storiesOf } from '@kadira/storybook';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import BpkFieldset from './index';

class ValidationContainer extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      checked: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      checked: e.target.checked,
    });
  }

  render() {
    const { ...rest } = this.props;

    delete rest.value;
    delete rest.valid;
    delete rest.validValue;
    delete rest.onChange;

    const isCheckbox = rest.control.name === 'BpkCheckbox';

    const valueProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value };

    let isValid;
    if (isCheckbox) {
      isValid = this.state.checked === this.props.validValue;
    } else {
      isValid = this.state.value === ''
        ? undefined
        : this.state.value === this.props.validValue;
    }

    return (
      <BpkFieldset
        valid={isValid}
        onChange={this.onChange}
        {...rest}
        {...valueProps}
      />
    );
  }
}

ValidationContainer.propTypes = {
  validValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

storiesOf('bpk-component-fieldset', module)
  .add('Input example', () => (
    <ValidationContainer
      id="name_input"
      name="name"
      label="Name"
      control={BpkInput}
      type={INPUT_TYPES.TEXT}
      placeholder="e.g. Joe Bloggs"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
    />
  ))
  .add('Select example', () => (
    <ValidationContainer
      id="fruits_select"
      name="fruits"
      label="Fruits"
      control={BpkSelect}
      validationMessage="Please select a fruit (Orange is correct!)"
      validValue="oranges"
    >
      <option value="">Please select...</option>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>Tomato</option>
    </ValidationContainer>
  ))
  .add('Checkbox example', () => (
    <ValidationContainer
      id="prefer_directs_checkbox"
      name="prefer_directs"
      label="Prefer directs"
      control={BpkCheckbox}
      validationMessage="Required"
      validValue
    />
  ));
