import React, { PropTypes, Component } from 'react';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import { storiesOf } from '@kadira/storybook';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import BpkFieldset from './index';

class FieldsetContainer extends Component {
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
    const { validValue, isCheckbox, ...rest } = this.props;

    const valueProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value };

    let isValid;
    if (isCheckbox) {
      isValid = this.state.checked === validValue;
    } else {
      isValid = this.state.value === ''
        ? undefined
        : this.state.value === validValue;
    }

    return (
      <BpkFieldset
        valid={isValid}
        isCheckbox={isCheckbox}
        onChange={this.onChange}
        {...rest}
        {...valueProps}
      />
    );
  }
}

FieldsetContainer.propTypes = {
  validValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  isCheckbox: PropTypes.bool,
};

FieldsetContainer.defaultProps = {
  isCheckbox: false,
};

storiesOf('bpk-component-fieldset', module)
  .add('Input example', () => (
    <FieldsetContainer
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
    <FieldsetContainer
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
    </FieldsetContainer>
  ))
  .add('Checkbox example', () => (
    <FieldsetContainer
      id="prefer_directs_checkbox"
      name="prefer_directs"
      label="Prefer directs"
      control={BpkCheckbox}
      validationMessage="Required"
      validValue
      isCheckbox
    />
  ));
