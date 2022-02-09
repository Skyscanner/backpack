import {
  DefaultExample,
  SmallExample,
  SteppedExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-progress',
};

export const Default = DefaultExample;
export const Small = SmallExample;
export const Stepped = SteppedExample;
export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
