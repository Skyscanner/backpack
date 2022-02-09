import {
  Neutral,
  Primary,
  Success,
  SuccessLongMessage,
  Dismissable,
  SuccessExpandable,
  SuccessAnimateOnEnter,
  SuccessWithReactRenderedMessage,
  Warn,
  ErrorExample,
  Event,
  SuccessDismissableBehaviour,
  SuccessExpandableBehaviour,
  SuccessAutomaticallyDismissed,
  SuccessCustomIcon,
  DocsDefault,
} from './examples';

export default {
  title: 'bpk-component-banner-alert',
};

export const _DocsDefault = DocsDefault;

_DocsDefault.story = {
  name: 'Docs default',
};

export const _Neutral = Neutral;
export const _Primary = Primary;
export const _Success = Success;
export const _SuccessLongMessage = SuccessLongMessage;

_SuccessLongMessage.story = {
  name: 'Success (long message)',
};

export const SuccessDismissable = Dismissable;

SuccessDismissable.story = {
  name: 'Success (dismissable)',
};

export const _SuccessExpandable = SuccessExpandable;

_SuccessExpandable.story = {
  name: 'Success(expandable)',
};

export const _SuccessAnimateOnEnter = SuccessAnimateOnEnter;

_SuccessAnimateOnEnter.story = {
  name: 'Success (animate on enter)',
};

export const _SuccessWithReactRenderedMessage = SuccessWithReactRenderedMessage;

_SuccessWithReactRenderedMessage.story = {
  name: 'Success with React rendered message',
};

export const _Warn = Warn;
export const Error = ErrorExample;
export const _Event = Event;
export const _SuccessDismissableBehaviour = SuccessDismissableBehaviour;

_SuccessDismissableBehaviour.story = {
  name: 'Success (dismissable behaviour)',
};

export const _SuccessExpandableBehaviour = SuccessExpandableBehaviour;

_SuccessExpandableBehaviour.story = {
  name: 'Success (expandable behaviour)',
};

export const SuccessAutomaticallyDismissedAfter5Seconds =
  SuccessAutomaticallyDismissed;

SuccessAutomaticallyDismissedAfter5Seconds.story = {
  name: 'Success (automatically dismissed after 5 seconds)',
};

export const SuccessWithCustomIcon = SuccessCustomIcon;

SuccessWithCustomIcon.story = {
  name: 'Success with custom icon',
};

export const VisualTest = DocsDefault;

VisualTest.story = {
  name: 'Visual test',
};
