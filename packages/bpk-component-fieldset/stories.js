import {
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
} from './examples';

export default {
  title: 'bpk-component-fieldset',
};

export const Input = InputExample;
export const Select = SelectExample;
export const Checkbox = CheckboxExample;
export const Datepicker = DatepickerExample;
export const Textarea = TextareaExample;
export const Autosuggest = AutosuggestExample;
export const RequiredInput = RequiredInputExample;

RequiredInput.story = {
  name: 'Required input',
};

export const RequiredSelect = RequiredSelectExample;

RequiredSelect.story = {
  name: 'Required select',
};

export const RequiredCheckbox = RequiredCheckboxExample;

RequiredCheckbox.story = {
  name: 'Required checkbox',
};

export const DisabledInput = DisabledInputExample;

DisabledInput.story = {
  name: 'Disabled input',
};

export const DisabledSelect = DisabledSelectExample;

DisabledSelect.story = {
  name: 'Disabled select',
};

export const DisabledCheckbox = DisabledCheckboxExample;

DisabledCheckbox.story = {
  name: 'Disabled checkbox',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
