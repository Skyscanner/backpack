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



import BpkContentBubble from '../../packages/bpk-component-flare/src/BpkContentBubble';
import BpkFlareBar from '../../packages/bpk-component-flare/src/BpkFlareBar';

import {
  FlareBarExample,
  ContentBubbleFullWithImageExample,
  ContentBubbleFullWithContentExample,
  ContentBubbleRoundedExample,
  ContentBubbleStandaloneExample,
  ContentBubbleFixedHeightExample,
  ContentBubblePointerHiddenRoundedExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-flare',
  component: BpkContentBubble,
  subcomponents: {
    BpkFlareBar,
  },
};

export const BpkFlareBarDefault = FlareBarExample;

export const BpkContentBubbleFullWidthWithBackgroundImage =
  ContentBubbleFullWithImageExample;

export const BpkContentBubbleFullWidthWithContent =
  ContentBubbleFullWithContentExample;

export const BpkContentBubbleRounded = ContentBubbleRoundedExample;

export const BpkContentBubbleStandalone = ContentBubbleStandaloneExample;

export const BpkContentBubbleFixedHeight = ContentBubbleFixedHeightExample;

export const BpkContentBubblePointerHiddenRounded = ContentBubblePointerHiddenRoundedExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
