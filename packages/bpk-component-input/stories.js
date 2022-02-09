import {
  TextExample,
  PlaceholderExample,
  ValidExample,
  InvalidExample,
  DisabledExample,
  ClearableExample,
  EmailInputExample,
  NumberInputExample,
  PasswordInputExample,
  TelephoneInputExample,
  LargeInputExample,
  DockedExample,
  ManuallyDockedExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-input',
};

export const TextValue = TextExample;

TextValue.story = {
  name: 'Text value',
};

export const Placeholder = PlaceholderExample;
export const Valid = ValidExample;
export const Invalid = InvalidExample;
export const Disabled = DisabledExample;
export const Clearable = ClearableExample;
export const Email = EmailInputExample;
export const Number = NumberInputExample;
export const Password = PasswordInputExample;
export const Telephone = TelephoneInputExample;
export const Large = LargeInputExample;
export const Docked = DockedExample;
export const ManuallyDocked = ManuallyDockedExample;

ManuallyDocked.story = {
  name: 'Manually docked',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
