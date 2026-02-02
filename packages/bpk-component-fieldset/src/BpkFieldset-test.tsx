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

import { render } from '@testing-library/react';

import BpkCheckbox from '../../bpk-component-checkbox';
import BpkInput, { INPUT_TYPES } from '../../bpk-component-input';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkSelect from '../../bpk-component-select';

import BpkFieldset from './BpkFieldset';

describe('BpkFieldset', () => {
  it('should render correctly with input component', () => {
    const { asFragment } = render(
      <BpkFieldset label="Name" validationMessage="Please enter a name">
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with input component and "required" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
        required
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with input component and "valid" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset label="Name" validationMessage="Please enter a name">
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with input component and "valid" attribute equal to false', () => {
    const { asFragment } = render(
      <BpkFieldset label="Name" validationMessage="Please enter a name">
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid={false}
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled with input component and "valid" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset
        disabled
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid
          disabled
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled with input component and "valid" attribute equal to false', () => {
    const { asFragment } = render(
      <BpkFieldset
        disabled
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid={false}
          disabled
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with input component and "disabled" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset label="Name" validationMessage="Please enter a name">
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
          disabled
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as disabled when input component is disabled and required', () => {
    const { asFragment } = render(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
        disabled
        required
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with input component and "description" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
        description="Your full name exactly as stated in your passport."
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.text}
          placeholder="e.g. Joe Bloggs"
          value=""
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with select component', () => {
    const { asFragment } = render(
      <BpkFieldset label="Fruits" validationMessage="Please select a fruit">
        <BpkSelect id="fruits_select" name="fruits" value="">
          <option value="">Please select...</option>
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with select component and "required" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset
        label="Fruits"
        validationMessage="Please select a fruit"
        required
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
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as disabled when select component is disabled and required', () => {
    const { asFragment } = render(
      <BpkFieldset
        label="Fruits"
        validationMessage="Please select a fruit"
        disabled
        required
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
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with checkbox component', () => {
    const { asFragment } = render(
      <BpkFieldset
        isCheckbox
        validationMessage="You must accept the terms and conditions to continue"
      >
        <BpkCheckbox
          id="terms_and_conditions_checkbox"
          name="terms_and_conditions"
          label="I accept the terms and conditions"
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with checkbox component and "required" attribute', () => {
    const { asFragment } = render(
      <BpkFieldset
        isCheckbox
        validationMessage="You must accept the terms and conditions to continue"
        required
      >
        <BpkCheckbox
          id="terms_and_conditions_checkbox"
          name="terms_and_conditions"
          label="I accept the terms and conditions"
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as disabled when checkbox component is disabled and required', () => {
    const { asFragment } = render(
      <BpkFieldset
        isCheckbox
        validationMessage="You must accept the terms and conditions to continue"
        disabled
        required
      >
        <BpkCheckbox
          id="terms_and_conditions_checkbox"
          name="terms_and_conditions"
          label="I accept the terms and conditions"
        />
      </BpkFieldset>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
