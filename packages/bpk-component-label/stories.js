import {
  DefaultExample,
  RequiredExample,
  InvalidExample,
  DisabledExample,
  InvalidRequiredExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-label',
};

export const Example = DefaultExample;
export const Required = RequiredExample;
export const Invalid = InvalidExample;
export const Disabled = DisabledExample;
export const InvalidRequired = InvalidRequiredExample;

InvalidRequired.story = {
  name: 'Invalid required',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
