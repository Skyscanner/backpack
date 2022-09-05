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

import { storiesOf } from '@storybook/react';

import {
  SmallIconsExample,
  LargeIconsExample,
  AlignToBaseTextExample,
  AlignToLargeTextExample,
  AlignSmallTextToIconExample,
  AlignTextToIconExample,
  AlignToButtonExample,
  AlignToLargeButtonExample,
  AlignToLargeButtonRTLExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-icon',
};

export const SmallIcons = SmallIconsExample;

SmallIcons.storyName = 'Small icons';

export const LargeIcons = LargeIconsExample;

LargeIcons.storyName = 'Large icons';

export const AlignToTextBase = AlignToBaseTextExample;

AlignToTextBase.storyName = 'Align to text base';

export const AlignToLargeText = AlignToLargeTextExample;

AlignToLargeText.storyName = 'Align to large text';

export const AlignSmallTextToIcon = AlignSmallTextToIconExample;

AlignSmallTextToIcon.storyName = 'Align small text to icon';

export const AlignTextToIcon = AlignTextToIconExample;

AlignTextToIcon.storyName = 'Align text to icon';

export const AlignToButton = AlignToButtonExample;

AlignToButton.storyName = 'Align to button';

export const AlignToLargeButton = AlignToLargeButtonExample;

AlignToLargeButton.storyName = 'Align to large button';

export const AlignToLargeButtonRtlSupport = AlignToLargeButtonRTLExample;

AlignToLargeButtonRtlSupport.storyName = 'Align to large button (RTL support)';

export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
