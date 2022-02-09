import {
  DefaultExample,
  PlaceholderExample,
  DisabledExample,
  InvalidExample,
  LargeExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-textarea',
};

export const Default = DefaultExample;
export const Placeholder = PlaceholderExample;
export const Disabled = DisabledExample;
export const Invalid = InvalidExample;
export const Large = LargeExample;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
