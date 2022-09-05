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

import {
  SingleItemExample,
  SingleItemExampleInitiallyExpanded,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
  VisualExample,
} from './examples';

export default {
  title: 'bpk-component-accordion',
  component: SingleItemExample,
};

export const SingleItemOnly = SingleItemExample;
SingleItemOnly.storyName = 'Single item only';

export const SingleItemOnlySecondItemInitiallyExpanded = SingleItemExampleInitiallyExpanded;
SingleItemOnlySecondItemInitiallyExpanded.storyName = 'Single item only (second item initially expanded)';

export const MultipleItemsOpen = MultipleItemsOpenExample;
MultipleItemsOpen.storyName = 'Multiple items open';

export const MultipleItemsOpenSecondThirdItemsInitiallyExpanded = MultipleItemsOpenInitiallyExpandedExample;
MultipleItemsOpenSecondThirdItemsInitiallyExpanded.storyName = 'Multiple items open (second & third items initially expanded)';

export const Custom = CustomExample;
Custom.storyName = 'Custom';

export const CustomTitleTextStyle = CustomTitleTextStyleExample;
CustomTitleTextStyle.storyName = 'Custom title textStyle';

export const WithIcons = WithIconsExample;
WithIcons.storyName = 'With icons';

export const WithBoldTitles = WithBoldTitlesExample;
WithBoldTitles.storyName = 'With bold titles';

export const VisualTest = VisualExample;
VisualTest.storyName = 'Visual test';