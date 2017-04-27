import React from 'react';
import renderer from 'react-test-renderer';
import BpkSelect from 'bpk-component-select';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';

import BpkFieldset from './BpkFieldset';

describe('BpkFieldset', () => {
  it('should render correctly with input component', () => {
    const tree = renderer.create(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.TEXT}
          placeholder="e.g. Joe Bloggs"
          value=""
        />
      </BpkFieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with input component and "valid" attribute', () => {
    const tree = renderer.create(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.TEXT}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid
        />
      </BpkFieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with input component and "valid" attribute equal to false', () => {
    const tree = renderer.create(
      <BpkFieldset
        label="Name"
        validationMessage="Please enter a name"
      >
        <BpkInput
          id="name_input"
          name="name"
          type={INPUT_TYPES.TEXT}
          placeholder="e.g. Joe Bloggs"
          value=""
          valid={false}
        />
      </BpkFieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with select component', () => {
    const tree = renderer.create(
      <BpkFieldset
        label="Fruits"
        validationMessage="Please select a fruit"
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
      </BpkFieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with checkbox component', () => {
    const tree = renderer.create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
