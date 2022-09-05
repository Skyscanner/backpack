/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow strict */
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

_DocsDefault.storyName = 'Docs default';

export const _Neutral = Neutral;
export const _Primary = Primary;
export const _Success = Success;
export const _SuccessLongMessage = SuccessLongMessage;

_SuccessLongMessage.storyName = 'Success (long message)';

export const SuccessDismissable = Dismissable;

SuccessDismissable.storyName = 'Success (dismissable)';

export const _SuccessExpandable = SuccessExpandable;

_SuccessExpandable.storyName = 'Success(expandable)';

export const _SuccessAnimateOnEnter = SuccessAnimateOnEnter;

_SuccessAnimateOnEnter.storyName = 'Success (animate on enter)';

export const _SuccessWithReactRenderedMessage = SuccessWithReactRenderedMessage;

_SuccessWithReactRenderedMessage.storyName = 'Success with React rendered message';

export const _Warn = Warn;
export const Error = ErrorExample;
export const _Event = Event;
export const _SuccessDismissableBehaviour = SuccessDismissableBehaviour;

_SuccessDismissableBehaviour.storyName = 'Success (dismissable behaviour)';

export const _SuccessExpandableBehaviour = SuccessExpandableBehaviour;

_SuccessExpandableBehaviour.storyName = 'Success (expandable behaviour)';

export const SuccessAutomaticallyDismissedAfter5Seconds =
  SuccessAutomaticallyDismissed;

SuccessAutomaticallyDismissedAfter5Seconds.storyName = 'Success (automatically dismissed after 5 seconds)';

export const SuccessWithCustomIcon = SuccessCustomIcon;

SuccessWithCustomIcon.storyName = 'Success with custom icon';

export const VisualTest = DocsDefault;

VisualTest.storyName = 'Visual test';
