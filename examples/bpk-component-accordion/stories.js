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
  SingleItemExampleInitiallyExpandedExample,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
} from './examples';

export default {
  title: 'bpk-component-accordion',
};

export const SingleItemOnly = SingleItemExample;

export const SingleItemOnlySecondItemInitiallyExpanded =
  SingleItemExampleInitiallyExpandedExample;

export const MultipleItemsOpen = MultipleItemsOpenExample;

export const MultipleItemsOpenSecondThirdItemsInitiallyExpanded =
  MultipleItemsOpenInitiallyExpandedExample;

export const Custom = CustomExample;

export const CustomTitleTextStyle = CustomTitleTextStyleExample;

export const WithIcons = WithIconsExample;

export const WithBoldTitles = WithBoldTitlesExample;

export const VisualTest = SingleItemExample;
