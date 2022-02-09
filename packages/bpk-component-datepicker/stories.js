import {
  DefaultExample,
  RangeExample,
  OpenOnRender,
  MinDateInPast,
  WithoutDateSet,
  PassingProps,
  DepartReturn,
  CustomComponent,
  InvalidExample,
  MultipleRangeInputExample,
  DefaultVisualExample,
  VisualRangeExample,
} from './examples';

export default {
  title: 'bpk-component-datepicker',
};

export const Default = DefaultExample;
export const Range = RangeExample;
export const OpenOnFirstRender = OpenOnRender;

OpenOnFirstRender.story = {
  name: 'Open on first render',
};

export const MinDateInThePast = MinDateInPast;

MinDateInThePast.story = {
  name: 'Min date in the past',
};

export const _WithoutDateSet = WithoutDateSet;

_WithoutDateSet.story = {
  name: 'Without date set',
};

export const PassingThroughPropsToUnderlyingInput = PassingProps;

PassingThroughPropsToUnderlyingInput.story = {
  name: 'Passing through props to underlying input',
};

export const _DepartReturn = DepartReturn;

_DepartReturn.story = {
  name: 'Depart & Return',
};

export const CustonCalendarComponent = CustomComponent;

CustonCalendarComponent.story = {
  name: 'Custon calendar component',
};

export const Invalid = InvalidExample;
export const RangeWithMultipleInputs = MultipleRangeInputExample;

RangeWithMultipleInputs.story = {
  name: 'Range with multiple inputs',
};

export const VisualTest = DefaultVisualExample;

VisualTest.story = {
  name: 'Visual test',
};

export const VisualTestRange = VisualRangeExample;

VisualTestRange.story = {
  name: 'Visual test range',
};
