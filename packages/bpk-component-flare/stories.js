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

storiesOf('bpk-component-flare', module)
  .add('BpkFlareBar - default', FlareBarExample)
  .add('BpkFlareBar - rounded', FlareBarRoundedExample)
  .add(
    'BpkContentBubble - Full width with background image',
    ContentBubbleFullWithImageExample,
  )
  .add(
    'BpkContentBubble - Full width with content',
    ContentBubbleFullWithContentExample,
  )
  .add('BpkContentBubble - standalone', ContentBubbleStandaloneExample)
  .add('BpkContentBubble - fixed height', ContentBubbleFixedHeightExample)
  .add('BpkContentBubble - pointer hidden', ContentBubblePointerHiddenExample)
  .add('Visual test', MixedExample);
