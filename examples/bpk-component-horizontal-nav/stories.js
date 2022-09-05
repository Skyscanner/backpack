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
  DefaultExample,
  ScrollToSelectedExample,
  NotUnderlinedExample,
  LightAppearanceExample,
  UsingCustomScrollColors,
  AnchorTagsExample,
  ExtremeExample,
  SpacedAroundExample,
  DisabledItemExample,
  SeparatorsExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-horizontal-nav',
};

export const Example = DefaultExample;
export const ScrollToSelectedElement = ScrollToSelectedExample;

ScrollToSelectedElement.storyName = 'Scroll to selected element';

export const NotUnderlined = NotUnderlinedExample;

NotUnderlined.storyName = 'Not underlined';

export const LightAppearance = LightAppearanceExample;

LightAppearance.storyName = 'Light appearance';

export const _UsingCustomScrollColors = UsingCustomScrollColors;

_UsingCustomScrollColors.storyName = 'Using custom scroll colors';

export const AnchorTags = AnchorTagsExample;

AnchorTags.storyName = 'Anchor tags';

export const _ExtremeExample = ExtremeExample;

_ExtremeExample.storyName = 'Extreme example';

export const SpaceAround = SpacedAroundExample;

SpaceAround.storyName = 'Space around';

export const DisabledItem = DisabledItemExample;

DisabledItem.storyName = 'Disabled item';

export const Separators = SeparatorsExample;
export const VisualTest = MixedExample;

VisualTest.storyName = 'Visual test';
