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

CloseButtonText.storyName = 'Close button text';

export const LongTitle = LongTitleExample;

LongTitle.storyName = 'Long title';

export const NotFullScreenOnMobile = NotFullScreenOnMobileExample;

NotFullScreenOnMobile.storyName = 'Not full screen on mobile';

export const FullScreen = FullScreenExample;

FullScreen.storyName = 'Full screen';

export const FullScreenOverflowing = FullScreenOverflowingExample;

FullScreenOverflowing.storyName = 'Full screen overflowing';

export const Nested = NestedExample;
export const NoHeader = NoHeaderExample;

NoHeader.storyName = 'No header';

export const NoPadding = NoPaddingExample;

NoPadding.storyName = 'No padding';

export const WithAccessoryView = WithAccessoryViewExample;

WithAccessoryView.storyName = 'With accessory view';
