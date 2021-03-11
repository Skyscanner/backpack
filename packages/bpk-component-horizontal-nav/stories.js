/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
} from './examples';

storiesOf('bpk-component-horizontal-nav', module)
  .add('Example', DefaultExample)
  .add('Scroll to selected element', ScrollToSelectedExample)
  .add('Not underlined', NotUnderlinedExample)
  .add('Light appearance', LightAppearanceExample)
  .add('Using custom scroll colors', UsingCustomScrollColors)
  .add('Anchor tags', AnchorTagsExample)
  .add('Extreme example', ExtremeExample)
  .add('Space around', SpacedAroundExample)
  .add('Disabled item', DisabledItemExample)
  .add('Separators', SeparatorsExample);
