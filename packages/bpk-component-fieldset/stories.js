/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
/* @flow strict */

import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import { storiesOf } from '@storybook/react';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import BpkDatepicker from 'bpk-component-datepicker';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';

import BpkFieldset, {
  type BpkFieldsetProps,
  propTypes,
  defaultProps,
} from './index';

const formatDate = date => format(date, 'DD/MM/YYYY');

type Props = {
  ...$Exact<BpkFieldsetProps>,
  validValue: string | boolean,
  isDate: boolean,
};

type State = {
  value: string,
  checked: boolean,
  valueDate: ?Date,
};

class FieldsetContainer extends Component<Props, State> {
  static propTypes = {
    ...propTypes,
    validValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired,
    isDate: PropTypes.bool,
  };

  static defaultProps = {
    ...defaultProps,
    isCheckbox: false,
    isDate: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.children.props.value,
      checked: false,
      valueDate: null,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
      checked: e.target.checked,
    });
  };

  onDateSelect = dt => {
    this.setState({
      valueDate: dt,
    });
  };

  render() {
    const { children, validValue, isCheckbox, isDate, ...rest } = this.props;

    let isValid;
    if (isCheckbox) {
      isValid = this.state.checked === validValue;
    } else if (isDate) {
      isValid = this.state.valueDate
        ? formatDate(this.state.valueDate) === validValue
        : undefined;
    } else {
      isValid =
        this.state.value === '' ? undefined : this.state.value === validValue;
    }

    const dynamicChildrenProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value, date: this.state.valueDate, valid: isValid };

    const dynamicFieldsetProps = isCheckbox ? { valid: isValid } : {};

    const clonedChildren = cloneElement(children, {
      onChange: this.onChange,
      onDateSelect: this.onDateSelect,
      ...dynamicChildrenProps,
    });

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <BpkFieldset isCheckbox={isCheckbox} {...rest} {...dynamicFieldsetProps}>
        {clonedChildren}
      </BpkFieldset>
    );
  }
}

storiesOf('bpk-component-fieldset', module)
  .add('Input', () => (
    <FieldsetContainer
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
    >
      <BpkInput
        id="name_input"
        name="name"
        type={INPUT_TYPES.text}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Input with description', () => (
    <FieldsetContainer
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
      description="Your full name exactly as stated in your passport."
    >
      <BpkInput
        id="name_input"
        name="name"
        type={INPUT_TYPES.text}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Select', () => (
    <FieldsetContainer
      label="Fruits"
      validationMessage="Please select a fruit (Orange is correct!)"
      validValue="oranges"
      description="Select your favourite"
    >
      <BpkSelect id="fruits_select" name="fruits" value="">
        <option value="">Please select...</option>
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
    </FieldsetContainer>
  ))
  .add('Checkbox', () => (
    <FieldsetContainer
      validationMessage="Please check this"
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
  .add('DatePicker', () => {
    const inputProps = { placeholder: 'Select the 10th' };
    return (
      <FieldsetContainer
        label="Date"
        validationMessage="Please select the 10th"
        isDate
        validValue="10/02/2010"
      >
        <BpkDatepicker
          id="date_input"
          name="date"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Date"
          weekStartsOn={1}
          getApplicationElement={() => document.createElement('div')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={inputProps}
          minDate={new Date(2010, 1, 8)}
          maxDate={new Date(2010, 1, 28)}
        />
      </FieldsetContainer>
    );
  })
  .add('Required input', () => (
    <FieldsetContainer
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
      required
    >
      <BpkInput
        id="required_name_input"
        name="name"
        type={INPUT_TYPES.text}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Required select', () => (
    <FieldsetContainer
      label="Fruits"
      validationMessage="Please select a fruit (Orange is correct!)"
      validValue="oranges"
      required
    >
      <BpkSelect id="required_select" name="fruits" value="">
        <option value="">Please select...</option>
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
    </FieldsetContainer>
  ))
  .add('Required checkbox', () => (
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
  ))
  .add('Disabled input', () => (
    <FieldsetContainer
      label="Name"
      validationMessage="Please enter a name (Joe Bloggs is correct!)"
      validValue="Joe Bloggs"
      disabled
    >
      <BpkInput
        id="name_input"
        name="name"
        type={INPUT_TYPES.text}
        placeholder="e.g. Joe Bloggs"
        value=""
      />
    </FieldsetContainer>
  ))
  .add('Disabled select', () => (
    <FieldsetContainer
      label="Fruits"
      validationMessage="Please select a fruit (Orange is correct!)"
      validValue="oranges"
      disabled
    >
      <BpkSelect id="fruits_select" name="fruits" value="">
        <option value="">Please select...</option>
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
    </FieldsetContainer>
  ))
  .add('Disabled checkbox', () => (
    <FieldsetContainer
      validationMessage="Please check this"
      validValue
      isCheckbox
      disabled
    >
      <BpkCheckbox
        id="prefer_directs_checkbox"
        name="prefer_directs"
        label="Prefer directs"
      />
    </FieldsetContainer>
  ));
