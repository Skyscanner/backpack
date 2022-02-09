import {
  DefaultExample,
  WithLabelAsTitleExample,
  AlongsideInputExample,
  CloseProgrammaticallyExample,
  WithLabelAsTitleAndTextCloseButtonExample,
  OnTheSideExample,
  AttachToExternalExample,
  NoRenderWhenNoExternalElementExample,
  RepositioningExample,
  PopperModifiersExample,
  InputTriggerExample,
} from './examples';

export default {
  title: 'bpk-component-popover',
};

export const Default = DefaultExample;
export const WithLabelAsTitle = WithLabelAsTitleExample;

WithLabelAsTitle.story = {
  name: 'With label as title',
};

export const AlongsideInput = AlongsideInputExample;

AlongsideInput.story = {
  name: 'Alongside input',
};

export const CloseProgrammatically = CloseProgrammaticallyExample;

CloseProgrammatically.story = {
  name: 'Close programmatically',
};

export const WithLabelAsTitleButCloseButtonText =
  WithLabelAsTitleAndTextCloseButtonExample;

WithLabelAsTitleButCloseButtonText.story = {
  name: 'With label as title but close button text',
};

export const OnTheSide = OnTheSideExample;

OnTheSide.story = {
  name: 'On the side',
};

export const AttachToExternalElement = AttachToExternalExample;

AttachToExternalElement.story = {
  name: 'Attach to external element',
};

export const NotRenderingIfExternalElementDoesNotExist =
  NoRenderWhenNoExternalElementExample;

NotRenderingIfExternalElementDoesNotExist.story = {
  name: 'Not rendering if external element does not exist',
};

export const Repositioning = RepositioningExample;
export const PopperModifiers = PopperModifiersExample;

PopperModifiers.story = {
  name: 'Popper modifiers',
};

export const TriggeredByInput = InputTriggerExample;

TriggeredByInput.story = {
  name: 'Triggered by input',
};
