import {
  DefaultExample,
  LowerBoundExample,
  UpperBoundsExample,
  StatefulExample,
  ConfigurableExample,
  OutlineExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-nudger',
};

export const Default = DefaultExample;
export const LowerBounds = LowerBoundExample;

LowerBounds.story = {
  name: 'Lower bounds',
};

export const UpperBounds = UpperBoundsExample;

UpperBounds.story = {
  name: 'Upper bounds',
};

export const _StatefulExample = StatefulExample;

_StatefulExample.story = {
  name: 'Stateful example',
};

export const ConfigurableNudger = ConfigurableExample;

ConfigurableNudger.story = {
  name: 'Configurable nudger',
};

export const OutlineNudger = OutlineExample;

OutlineNudger.story = {
  name: 'Outline nudger',
};

export const VisualTest = MixedExample;

VisualTest.story = {
  name: 'Visual test',
};
