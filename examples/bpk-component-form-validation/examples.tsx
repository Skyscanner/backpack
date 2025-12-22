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

import { Component } from 'react';

import { BpkButtonV2 } from '../../packages/bpk-component-button';
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
    super();

    this.state = {
      expanded: true,
    };
  }

  toggleExpanded = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <BpkButtonV2 onClick={this.toggleExpanded}>Toggle</BpkButtonV2>
        </div>
        <BpkFormValidation expanded={this.state.expanded} {...this.props} />
      </div>
    );
  }
}

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
        onChange: (e) => this.setState({ value: e.target.checked }),
      };
    } else {
      overrideProps = {
        value: this.state.value,
        onChange: (e) => this.setState({ value: e.target.value }),
      };
      if (FormComponent === BpkInput) {
        overrideProps.onClear = () => this.setState({ value: '' });
      }
    }
    return <FormComponent {...rest} {...overrideProps} />;
  }
}

const DefaultExample = () => (
  <FormValidationContainer id="my-validation-message">
    A validation message
  </FormValidationContainer>
);

const FormsExample = () => (
  <div>
    <form className={formClassName}>
      <InputContainer
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
