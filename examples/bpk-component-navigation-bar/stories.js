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
  LongTitleTextExample,
  CustomTitleExample,
  LeadingIconOnlyExample,
  TrailingIconOnlyExample,
  WithLinksExample,
  WithLogoExample,
  StickyExample,
  OnDarkExample,
  WithLinksOnDarkExample,
  VisualTestExample,
} from './examples';

import BpkNavigationBar, { BpkNavigationBarButtonLink, BpkNavigationBarIconButton } from '@backpack/bpk-component-navigation-bar';


export default {
  title: 'bpk-component-navigation-bar',
  component: BpkNavigationBar,
  subcomponents: {
    BpkNavigationBarIconButton,
    BpkNavigationBarButtonLink,
  },
};

export const Default = DefaultExample;
export const LongTitleText = LongTitleTextExample;
export const CustomTitle = CustomTitleExample;
export const OnDark = OnDarkExample;
export const LeadingIconOnly = LeadingIconOnlyExample;

export const TrailingIconOnly = TrailingIconOnlyExample;

export const WithLinks = WithLinksExample;

export const WithLogo = WithLogoExample;
export const WithLinksOnDark = WithLinksOnDarkExample;

export const Sticky = StickyExample;
export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
