import {
  DefaultExample,
  IndeterminateExample,
  InvalidExample,
  MultilineExample,
  WhiteExample,
  DisabledExample,
  RequiredExample,
  SmallLabelExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-checkbox',
};

export const Default = DefaultExample;
export const Indeterminate = IndeterminateExample;
export const Invalid = InvalidExample;
export const Multiline = MultilineExample;
export const White = WhiteExample;
export const Disabled = DisabledExample;
export const Required = RequiredExample;
export const SmallLabel = SmallLabelExample;

SmallLabel.story = {
  name: 'Small label',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
