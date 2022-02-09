import {
  LinkExample,
  ButtonLinkExample,
  LinkAlternativeExample,
  ButtonLinkAlternativeExample,
  CombinedExample,
  CombinedAlternativeExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-link',
};

export const Example = LinkExample;
export const ExampleButtons = ButtonLinkExample;

ExampleButtons.story = {
  name: 'Example (buttons)',
};

export const ExampleAlternate = LinkAlternativeExample;

ExampleAlternate.story = {
  name: 'Example (alternate)',
};

export const ExampleAlternateButtons = ButtonLinkAlternativeExample;

ExampleAlternateButtons.story = {
  name: 'Example (alternate + buttons)',
};

export const _CombinedExample = CombinedExample;
export const CombinedExampleAlternate = CombinedAlternativeExample;

CombinedExampleAlternate.story = {
  name: 'Combined Example (alternate)',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
