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

import PropTypes from 'prop-types';
import { Component } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkCheckbox from '../../packages/bpk-component-checkbox';
import BpkFormValidation from '../../packages/bpk-component-form-validation';
import BpkInput from '../../packages/bpk-component-input';
import BpkSelect from '../../packages/bpk-component-select';
import BpkTextarea from '../../packages/bpk-component-textarea';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const formClassName = getClassName('bpkdocs-forms-page__form');

class FormValidationContainer extends Component {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      expanded: true,
    };
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({
      // @ts-expect-error TS(2339) FIXME: Property 'expanded' does not exist on type 'Readon... Remove this comment to see the full error message
      expanded: !prevState.expanded,
    }));
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <BpkButton onClick={this.toggleExpanded}>Toggle</BpkButton>
        </div>
         {/* @ts-expect-error TS(2739) FIXME: Type '{ expanded: any; }' is missing the following... Remove this comment to see the full error message */}
        <BpkFormValidation expanded={this.state.expanded} {...this.props} />
      </div>
    );
  }
}

class InputContainer extends Component {
  constructor(props: any) {
    super(props);

    const valueProp = props.FormComponent === BpkCheckbox ? 'checked' : 'value';

    this.state = {
      value: props[valueProp],
    };
  }

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'FormComponent' does not exist on type 'R... Remove this comment to see the full error message
    const { FormComponent, ...rest } = this.props;

    let overrideProps = {};

    if (FormComponent === BpkCheckbox) {
      overrideProps = {
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        checked: this.state.value,
        onChange: (e: any) => this.setState({ value: e.target.checked }),
      };
    } else {
      overrideProps = {
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        value: this.state.value,
        onChange: (e: any) => this.setState({ value: e.target.value }),
      };
      if (FormComponent === BpkInput) {
        // @ts-expect-error TS(2339) FIXME: Property 'onClear' does not exist on type '{}'.
        overrideProps.onClear = () => this.setState({ value: '' });
      }
    }
    return <FormComponent {...rest} {...overrideProps} />;
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
InputContainer.propTypes = {
  FormComponent: PropTypes.elementType.isRequired,
};

const DefaultExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; id: string; }' is not as... Remove this comment to see the full error message
  <FormValidationContainer id="my-validation-message">
    A validation message
  </FormValidationContainer>
);

const FormsExample = () => (
  <div>
    <form className={formClassName}>
      <InputContainer
        // @ts-expect-error TS(2322) FIXME: Type '{ FormComponent: typeof BpkInput; id: string... Remove this comment to see the full error message
        FormComponent={BpkInput}
        id="input_invalid"
        name="input_invalid"
        value="Edinbrvgh"
        placeholder="Country, city or airport"
        onChange={() => null}
        valid={false}
      />
      <BpkFormValidation id="form_validation" expanded>
        Please enter a valid name
      </BpkFormValidation>
    </form>
    <form className={formClassName}>
       {/* @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; FormComponent: { (pro... Remove this comment to see the full error message */}
      <InputContainer
        FormComponent={BpkSelect}
        id="select_invalid"
        name="select_invalid"
        value=""
        onChange={() => null}
        valid={false}
      >
        <option value="" hidden>
          Please select...
        </option>
        <option value="economy">Economy</option>
        <option value="premium_economy">Premium Economy</option>
        <option value="business">Business class</option>
        <option value="first">First class</option>
      </InputContainer>
      <BpkFormValidation id="form_validation" expanded isCheckbox>
        This option is required
      </BpkFormValidation>
    </form>
    <form className={formClassName}>
      <InputContainer
        // @ts-expect-error TS(2322) FIXME: Type '{ FormComponent: (props: Props) => Element; ... Remove this comment to see the full error message
        FormComponent={BpkCheckbox}
        name="checkbox"
        label="Apples"
      />
      <BpkFormValidation id="form_validation" expanded isCheckbox>
        This checkbox is required
      </BpkFormValidation>
    </form>
    <form className={formClassName}>
      <InputContainer
        // @ts-expect-error TS(2322) FIXME: Type '{ FormComponent: { (props: Props): Element; ... Remove this comment to see the full error message
        FormComponent={BpkTextarea}
        id="textarea"
        name="textarea"
        value="@text 123 /}"
        placeholder="@text 123 /}"
        onChange={() => null}
        valid={false}
      />
      <BpkFormValidation id="form_validation" expanded>
        Please enter valid input
      </BpkFormValidation>
    </form>
  </div>
);

export { DefaultExample, FormsExample };
