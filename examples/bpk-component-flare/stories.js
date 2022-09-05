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
  FlareBarExample,
  FlareBarRoundedExample,
  ContentBubbleFullWithImageExample,
  ContentBubbleFullWithContentExample,
  ContentBubbleStandaloneExample,
  ContentBubbleFixedHeightExample,
  ContentBubblePointerHiddenExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-flare',
};

export const BpkFlareBarDefault = FlareBarExample;

BpkFlareBarDefault.storyName = 'BpkFlareBar - default';

export const BpkFlareBarRounded = FlareBarRoundedExample;

BpkFlareBarRounded.storyName = 'BpkFlareBar - rounded';

export const BpkContentBubbleFullWidthWithBackgroundImage =
  ContentBubbleFullWithImageExample;

BpkContentBubbleFullWidthWithBackgroundImage.storyName = 'BpkContentBubble - Full width with background image';

export const BpkContentBubbleFullWidthWithContent =
  ContentBubbleFullWithContentExample;

BpkContentBubbleFullWidthWithContent.storyName = 'BpkContentBubble - Full width with content';

export const BpkContentBubbleStandalone = ContentBubbleStandaloneExample;

BpkContentBubbleStandalone.storyName = 'BpkContentBubble - standalone';

export const BpkContentBubbleFixedHeight = ContentBubbleFixedHeightExample;

BpkContentBubbleFixedHeight.storyName = 'BpkContentBubble - fixed height';

export const BpkContentBubblePointerHidden = ContentBubblePointerHiddenExample;

BpkContentBubblePointerHidden.storyName = 'BpkContentBubble - pointer hidden';

export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
