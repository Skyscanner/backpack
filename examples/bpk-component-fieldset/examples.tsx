/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { cloneElement, Component } from 'react';

import BpkAutosuggest, {
  BpkAutosuggestSuggestion,
} from '../../packages/bpk-component-autosuggest';
import BpkButton from '../../packages/bpk-component-button';
import { format } from '../../packages/bpk-component-calendar/src/date-utils';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from '../../packages/bpk-component-calendar/test-utils';
import BpkCheckbox from '../../packages/bpk-component-checkbox';
import BpkDatepicker from '../../packages/bpk-component-datepicker';
import BpkFieldset, {
  type BpkFieldsetProps,
  propTypes,
  defaultProps,
} from '../../packages/bpk-component-fieldset';
import BpkInput, { INPUT_TYPES } from '../../packages/bpk-component-input';
import BpkSelect from '../../packages/bpk-component-select';
import BpkSplitInput from '../../packages/bpk-component-split-input';
import BpkTextarea from '../../packages/bpk-component-textarea';
import { cssModules } from '../../packages/bpk-react-utils';
import { action } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

// @ts-expect-error TS(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
const formatDate = (date) => format(date, 'dd/MM/yyyy');

const offices = [
  {
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
  },
  {
    name: 'Beijing',
    code: 'Any',
    country: 'China',
  },
  {
    name: 'Budapest',
    code: 'BUD',
    country: 'Hungary',
  },
  {
    name: 'Edinburgh',
    code: 'EDI',
    country: 'United Kingdom',
  },
  {
    name: 'Glasgow',
    code: 'Any',
    country: 'United Kingdom',
    indent: true,
  },
  {
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
  },
  {
    name: 'Miami, FL',
    code: 'Any',
    country: 'United States',
  },
  {
    name: "Shenzhen Bao'an International",
    code: 'SZX',
    country: 'China',
  },
  {
    name: 'Singapore Changi',
    code: 'SIN',
    country: 'Singapore',
  },
  {
    name: 'Sofia',
    code: 'SOF',
    country: 'Bulgaria',
  },
];

// @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : offices.filter(
        (office) => office.name.toLowerCase().indexOf(inputValue) !== -1,
      );
};

// @ts-expect-error TS(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
const getSuggestionValue = (suggestion) =>
  `${suggestion.name} (${suggestion.code})`;

let instances = 0;

type AutosuggestState = {
  value: string,
  suggestions: Array<any>,
};

class Autosuggest extends Component<{}, AutosuggestState> {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    instances += instances;

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'SyntheticInputEvent'.
    e: SyntheticInputEvent<HTMLElement>,
    { newValue }: { newValue: string },
  ) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { suggestions, value } = this.state;

    const inputProps = {
      id: 'carhire-search-controls-location-pick-up',
      name: 'my_autosuggest',
      value,
      placeholder: 'Enter a destination name',
      onChange: this.onChange,
    };

    return (
      // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
      <FieldsetContainer
        label="Destination"
        validationMessage="Please select a destination."
        validStates={[true, false]}
        description="The final price will be adjusted based on your selection"
      >
        <BpkAutosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          // @ts-expect-error TS(7006) FIXME: Parameter 'suggestion' implicitly has an 'any' typ... Remove this comment to see the full error message
          renderSuggestion={(suggestion) => (
            <BpkAutosuggestSuggestion
              value={getSuggestionValue(suggestion)}
              indent={suggestion.indent}
            />
          )}
          inputProps={inputProps}
        />
      </FieldsetContainer>
    );
  }
}

type FieldsetProps = {
  // @ts-expect-error TS(7010) FIXME: '$Exact', which lacks return-type annotation, impl... Remove this comment to see the full error message
  ...$Exact<BpkFieldsetProps>,
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
  validStates: Array<mixed>,
};

type FieldsetState = {
  value: string,
  checked: boolean,
  validState: any,
  valueDate: ?Date,
};

class FieldsetContainer extends Component<FieldsetProps, FieldsetState> {
  static propTypes = {
    ...propTypes,
    validStates: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    ...defaultProps,
    isCheckbox: false,
    disabled: false,
  };

  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      value: '',
      checked: false,
      validState: 0,
      valueDate: null,
    };
  }

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'SyntheticInputEvent'.
  onChange = (e: SyntheticInputEvent<HTMLElement>) => {
    this.setState({
      value: e.target.value,
      checked: e.target.checked,
    });
  };

  onDateSelect = (dt: Date) => {
    this.setState({
      valueDate: dt,
    });
  };

  toggleStates = () => {
    this.setState((prevState) => {
      let nextValidState = prevState.validState + 1;
      let isChecked = prevState.checked;

      if (nextValidState > this.props.validStates.length - 1) {
        nextValidState = 0;
      }

      // @ts-expect-error TS(2339) FIXME: Property 'isCheckbox' does not exist on type 'Read... Remove this comment to see the full error message
      if (this.props.isCheckbox) {
        if (prevState.checked === false && nextValidState === 1) {
          isChecked = true;
        } else {
          isChecked = false;
        }
      }

      return {
        validState: nextValidState,
        checked: isChecked,
      };
    });
  };

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'children' does not exist on type 'Readon... Remove this comment to see the full error message
    const { children, className, isCheckbox, validStates, ...rest } =
      this.props;
    const valid = validStates[this.state.validState];

    const dynamicProps = isCheckbox
      ? { checked: this.state.checked }
      : { value: this.state.value, date: this.state.valueDate, valid };

    const dynamicFieldsetProps = isCheckbox ? { valid } : {};

    const clonedChildren = cloneElement(children, {
      onChange: this.onChange,
      onDateSelect: this.onDateSelect,
      ...dynamicProps,
    });

    const classNames = getClassName('bpk-fieldsets__fieldset', className);
    return (
      <div className={getClassName('bpk-fieldsets__container')}>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkFieldset
          className={classNames}
          isCheckbox={isCheckbox}
          valid={valid}
          {...rest}
          {...dynamicFieldsetProps}
        >
          {clonedChildren}
        </BpkFieldset>
        // @ts-expect-error TS(2339): Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
        {!this.props.disabled && (
          <div className={getClassName('bpk-fieldsets__toggle')}>
            <BpkButton onClick={this.toggleStates}>Toggle states</BpkButton>
          </div>
        )}
      </div>
    );
  }
}

const InputExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    label="Name"
    validationMessage="Please enter your full name."
    validStates={[null, true, false]}
    description="Your full name exactly as stated in your passport"
  >
    <BpkInput
      id="name_input"
      name="name"
      value=""
      placeholder="E.g Joe Bloggs"
      type={INPUT_TYPES.text}
    />
  </FieldsetContainer>
);

const SelectExample = () => (
  // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
  <FieldsetContainer
    label="Cabin class"
    validationMessage="Please select a cabin class."
    validStates={[true, false]}
    description="The final price will be adjusted based on your selection"
  >
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    <BpkSelect id="cabin_class_select" name="cabin_class" value="">
      <option value="">Please select...</option>
      <option value="economy">Economy</option>
      <option value="premium_economy">Premium Economy</option>
      <option value="business">Business class</option>
      <option value="first">First</option>
    </BpkSelect>
  </FieldsetContainer>
);

const CheckboxExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    validationMessage="Please accept our terms & conditions to continue."
    validStates={[null, true, false]}
    isCheckbox
  >
    <BpkCheckbox
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; }... Remove this comment to see the full error message
      id="terms_conditions_checkbox"
      name="terms_conditions"
      label="I accept the terms & conditions"
    />
  </FieldsetContainer>
);

const DatepickerExample = () => {
  const inputProps = { placeholder: 'Select the 10th' };
  return (
    // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
    <FieldsetContainer
      label="Date"
      validationMessage="Please select the 10th"
      validStates={[null, true, false]}
    >
      <BpkDatepicker
        id="date_input"
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; closeButtonText:... Remove this comment to see the full error message
        name="date"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
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
};

const TextareaExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    label="Additional Information"
    validationMessage="Please enter any other details you may need."
    validStates={[true, false]}
    description="Please ensure if you have additional requirements they are entered here"
  >
    <BpkTextarea
      id="textarea"
      name="textarea"
      value=""
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; value: string; p... Remove this comment to see the full error message
      placeholder={null}
      onChange={() => null}
    />
  </FieldsetContainer>
);

const AutosuggestExample = () => <Autosuggest />;

const RequiredInputExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    label="Name"
    validationMessage="Please enter your full name."
    validStates={[null, true, false]}
    description="Your full name exactly as stated in your passport"
    required
  >
    <BpkInput
      id="name_input"
      name="name"
      value=""
      placeholder="E.g Joe Bloggs"
      type={INPUT_TYPES.text}
    />
  </FieldsetContainer>
);

const RequiredSelectExample = () => (
  // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
  <FieldsetContainer
    label="Cabin class"
    validationMessage="Please select a cabin class."
    validStates={[true, false]}
    description="The final price will be adjusted based on your selection"
    required
  >
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    <BpkSelect id="cabin_class_select" name="cabin_class" value="">
      <option value="">Please select...</option>
      <option value="economy">Economy</option>
      <option value="premium_economy">Premium Economy</option>
      <option value="business">Business class</option>
      <option value="first">First</option>
    </BpkSelect>
  </FieldsetContainer>
);

const RequiredCheckboxExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    validationMessage="Please accept our terms & conditions to continue."
    validStates={[false, true]}
    isCheckbox
    required
  >
    <BpkCheckbox
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; }... Remove this comment to see the full error message
      id="terms_conditions_checkbox"
      name="terms_conditions"
      label="I accept the terms & conditions"
    />
  </FieldsetContainer>
);

const DisabledInputExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    label="Name"
    validationMessage="Please enter your full name."
    validStates={[]}
    disabled
  >
    <BpkInput
      id="name_input"
      name="name"
      value=""
      placeholder="E.g Joe Bloggs"
      type={INPUT_TYPES.text}
    />
  </FieldsetContainer>
);

const DisabledSelectExample = () => (
  // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
  <FieldsetContainer
    label="Cabin class"
    validationMessage="Please select a cabin class."
    validStates={[]}
    disabled
  >
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; id: string; name: str... Remove this comment to see the full error message
    <BpkSelect id="cabin_class_select" name="cabin_class" value="">
      <option value="">Please select...</option>
      <option value="economy">Economy</option>
      <option value="premium_economy">Premium Economy</option>
      <option value="business">Business class</option>
      <option value="first">First</option>
    </BpkSelect>
  </FieldsetContainer>
);

const DisabledCheckboxExample = () => (
  // @ts-expect-error TS(2741) FIXME: Property '$Exact' is missing in type '{ children: ... Remove this comment to see the full error message
  <FieldsetContainer
    validationMessage="Please accept our terms & conditions to continue."
    validStates={[]}
    isCheckbox
    disabled
  >
    <BpkCheckbox
      // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; }... Remove this comment to see the full error message
      id="terms_conditions_checkbox"
      name="terms_conditions"
      label="I accept the terms & conditions"
    />
  </FieldsetContainer>
);

const MixedExample = () => (
  <div>
    <InputExample />
    <SelectExample />
    <CheckboxExample />
    <TextareaExample />
    <SplitInputExample />
  </div>
);

const SplitInputExample = () => (
  <BpkSplitInput
    type={INPUT_TYPES.number}
    name="otpInput"
    id="otpInput"
    label="otp input"
    onInputChange={action('On Input Change')}
    onSubmit={action('On Submit')}
    inputLength={4}
  />
);

export {
  InputExample,
  SelectExample,
  CheckboxExample,
  DatepickerExample,
  TextareaExample,
  AutosuggestExample,
  RequiredInputExample,
  RequiredSelectExample,
  RequiredCheckboxExample,
  DisabledInputExample,
  DisabledSelectExample,
  DisabledCheckboxExample,
  MixedExample,
  SplitInputExample,
};
