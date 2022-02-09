import {
  DefaultExample,
  LargeExample,
  WithValidationExample,
  WithDialingCodeMaskExample,
  DisabledExample,
  RequiredExample,
  DoubleLengthLabelExamples,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-phone-input',
};

export const Default = DefaultExample;
export const Large = LargeExample;
export const WithValidation = WithValidationExample;
export const WithDialingCodeMask = WithDialingCodeMaskExample;

WithDialingCodeMask.story = {
  name: 'With dialing code mask',
};

export const Disabled = DisabledExample;
export const Required = RequiredExample;
export const DoubleLengthLabels = DoubleLengthLabelExamples;

DoubleLengthLabels.story = {
  name: 'Double length labels',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
