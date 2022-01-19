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

import { storiesOf } from '@storybook/react';

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

storiesOf('bpk-component-banner-alert', module)
  .add('Docs default', DocsDefault)
  .add('Neutral', Neutral)
  .add('Primary', Primary)
  .add('Success', Success)
  .add('Success (long message)', SuccessLongMessage)
  .add('Success (dismissable)', Dismissable)
  .add('Success(expandable)', SuccessExpandable)
  .add('Success (animate on enter)', SuccessAnimateOnEnter)
  .add('Success with React rendered message', SuccessWithReactRenderedMessage)
  .add('Warn', Warn)
  .add('Error', ErrorExample)
  .add('Event', Event)
  .add('Success (dismissable behaviour)', SuccessDismissableBehaviour)
  .add('Success (expandable behaviour)', SuccessExpandableBehaviour)
  .add(
    'Success (automatically dismissed after 5 seconds)',
    SuccessAutomaticallyDismissed,
  )
  .add('Success with custom icon', SuccessCustomIcon)
  .add('Visual test', DocsDefault);
