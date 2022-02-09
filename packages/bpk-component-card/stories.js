import {
  DefaultExample,
  WithHrefExample,
  WithoutPaddingExample,
  NonAtomicExample,
  NonAtomicHrefExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-card',
};

export const Default = DefaultExample;
export const WithHref = WithHrefExample;

WithHref.story = {
  name: 'With href',
};

export const WithoutPadding = WithoutPaddingExample;

WithoutPadding.story = {
  name: 'Without padding',
};

export const NonAtomic = NonAtomicExample;

NonAtomic.story = {
  name: 'Non-atomic',
};

export const NonAtomicWithHref = NonAtomicHrefExample;

NonAtomicWithHref.story = {
  name: 'Non-atomic with href',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
