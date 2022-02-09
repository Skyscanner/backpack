import {
  DefaultExample,
  WithVisibleScrollbarExample,
  SettingLeadingAndTrailingIndicatorClassNameExample,
} from './examples';

export default {
  title: 'bpk-component-mobile-scroll-container',
};

export const Default = DefaultExample;
export const WithVisibleScrollbar = WithVisibleScrollbarExample;

WithVisibleScrollbar.story = {
  name: 'With visible scrollbar',
};

export const SettingLeadingIndicatorClassNameAndTrailingIndicatorClassName =
  SettingLeadingAndTrailingIndicatorClassNameExample;

SettingLeadingIndicatorClassNameAndTrailingIndicatorClassName.story = {
  name: 'Setting leadingIndicatorClassName and trailingIndicatorClassName',
};
