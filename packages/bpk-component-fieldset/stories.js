import React, { cloneElement, PropTypes, Component } from 'react';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import { storiesOf } from '@kadira/storybook';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import BpkFieldset from './index';

class FieldsetContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.children.props.value,
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
    const { children, validValue, isCheckbox, ...rest } = this.props;

    let isValid;
    if (isCheckbox) {
      isValid = this.state.checked === validValue;
    } else {
      isValid = this.state.value === ''
        ? undefined
        : this.state.value === validValue;
    }

    const dynamicChildrenProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value, valid: isValid };

    const dynamicFieldsetProps = isCheckbox
      ? { valid: isValid }
      : {};

    const clonedChildren = cloneElement(children, {
      onChange: this.onChange,
      ...dynamicChildrenProps,
    });

    return (
      <BpkFieldset
        isCheckbox={isCheckbox}
        {...rest}
        {...dynamicFieldsetProps}
      >
        {clonedChildren}
      </BpkFieldset>
    );
  }
}

FieldsetContainer.propTypes = {
  children: PropTypes.node.isRequired,
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
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
    >
      <BpkInput
        id="name_input"
        name="name"
        type={INPUT_TYPES.TEXT}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Select example', () => (
    <FieldsetContainer
      label="Fruits"
      validationMessage="Please select a fruit (Orange is correct!)"
      validValue="oranges"
    >
      <BpkSelect
        id="fruits_select"
        name="fruits"
        value=""
      >
        <option value="">Please select...</option>
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>Tomato</option>
      </BpkSelect>
    </FieldsetContainer>
  ))
  .add('Checkbox example', () => (
    <FieldsetContainer
      validationMessage="Required"
      validValue
      isCheckbox
    >
      <BpkCheckbox
        id="prefer_directs_checkbox"
        name="prefer_directs"
        label="Prefer directs"
      />
    </FieldsetContainer>
  ))
  .add('Required input example', () => (
    <FieldsetContainer
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
      required
    >
      <BpkInput
        id="required_name_input"
        name="name"
        type={INPUT_TYPES.TEXT}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Required checkbox example', () => (
    <FieldsetContainer
      validationMessage="Please accept the terms &amp; conditions to continue"
      validValue
      isCheckbox
      required
    >
      <BpkCheckbox
        id="required_checkbox"
        name="required_checkbox"
        label="I accept the terms and conditions"
      />
    </FieldsetContainer>
  ));
