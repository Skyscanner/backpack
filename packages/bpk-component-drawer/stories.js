import {
  DefaultExample,
  OverflowingExamples,
  CloseButtonTextExample,
  WithVisuallyHiddenTitleExample,
  WithFullHeightContentExample,
} from './examples';

export default {
  title: 'bpk-component-drawer',
};

export const Default = DefaultExample;
export const Overflowing = OverflowingExamples;
export const CloseButtonText = CloseButtonTextExample;

CloseButtonText.story = {
  name: 'Close button text',
};

export const WithVisuallyHiddenTitle = WithVisuallyHiddenTitleExample;

WithVisuallyHiddenTitle.story = {
  name: 'With visually hidden title',
};

export const WithFullHeightContent = WithFullHeightContentExample;

WithFullHeightContent.story = {
  name: 'With full height content',
};
