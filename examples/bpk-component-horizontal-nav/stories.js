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

import {
  DefaultExample,
  ScrollToSelectedExample,
  NotUnderlinedExample,
  LightAppearanceExample,
  UsingCustomScrollColorsExample,
  AnchorTagsExample,
  ExtremeExample,
  SpacedAroundExample,
  DisabledItemExample,
  SeparatorsExample,
  InteractiveTabsExample,
  MixedExample,
} from './examples';

import BpkHorizontalNav from '@backpack/bpk-component-horizontal-nav';
import BpkHorizontalNavItem from '@backpack/bpk-component-horizontal-nav';


export default {
  title: 'bpk-component-horizontal-nav',
  component: BpkHorizontalNav,
  subcomponents: { BpkHorizontalNavItem },
};

export const Example = DefaultExample;
export const ScrollToSelectedElement = ScrollToSelectedExample;

export const NotUnderlined = NotUnderlinedExample;

export const LightAppearance = LightAppearanceExample;

export const UsingCustomScrollColors = UsingCustomScrollColorsExample;

export const AnchorTags = AnchorTagsExample;

export const Extreme = ExtremeExample;

export const SpaceAround = SpacedAroundExample;

export const DisabledItem = DisabledItemExample;

export const Separators = SeparatorsExample;

export const InteractiveTabs = InteractiveTabsExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
