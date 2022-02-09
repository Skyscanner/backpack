import {
  DefaultExample,
  Multiline,
  Invalid,
  White,
  DisabledChecked,
  DisabledUnchecked,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-radio',
};

export const Default = DefaultExample;
export const MultiLine = Multiline;

MultiLine.story = {
  name: 'Multi line',
};

export const _Invalid = Invalid;
export const _White = White;
export const _DisabledChecked = DisabledChecked;

_DisabledChecked.story = {
  name: 'Disabled (Checked)',
};

export const _DisabledUnchecked = DisabledUnchecked;

_DisabledUnchecked.story = {
  name: 'Disabled (Unchecked)',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
