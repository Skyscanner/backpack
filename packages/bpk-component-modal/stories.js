import {
  DefaultExample,
  WideExample,
  OverflowingExample,
  CloseButtonTextExample,
  LongTitleExample,
  NotFullScreenOnMobileExample,
  FullScreenExample,
  FullScreenOverflowingExample,
  NestedExample,
  NoHeaderExample,
  NoPaddingExample,
  WithAccessoryViewExample,
} from './examples';

export default {
  title: 'bpk-component-modal',
};

export const Default = DefaultExample;
export const Wide = WideExample;
export const Overflowing = OverflowingExample;
export const CloseButtonText = CloseButtonTextExample;

CloseButtonText.story = {
  name: 'Close button text',
};

export const LongTitle = LongTitleExample;

LongTitle.story = {
  name: 'Long title',
};

export const NotFullScreenOnMobile = NotFullScreenOnMobileExample;

NotFullScreenOnMobile.story = {
  name: 'Not full screen on mobile',
};

export const FullScreen = FullScreenExample;

FullScreen.story = {
  name: 'Full screen',
};

export const FullScreenOverflowing = FullScreenOverflowingExample;

FullScreenOverflowing.story = {
  name: 'Full screen overflowing',
};

export const Nested = NestedExample;
export const NoHeader = NoHeaderExample;

NoHeader.story = {
  name: 'No header',
};

export const NoPadding = NoPaddingExample;

NoPadding.story = {
  name: 'No padding',
};

export const WithAccessoryView = WithAccessoryViewExample;

WithAccessoryView.story = {
  name: 'With accessory view',
};
