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

import BpkAccordion from '../../packages/bpk-component-accordion/src/BpkAccordion';
import BpkAccordionItem from '../../packages/bpk-component-accordion/src/BpkAccordionItem';

import {
  SingleItemExample,
  SingleItemExampleInitiallyExpandedExample,
  MultipleItemsOpenExample,
  MultipleItemsOpenInitiallyExpandedExample,
  CustomExample,
  CustomTitleTextStyleExample,
  WithIconsExample,
  WithBoldTitlesExample,
  WithDarkBackgroundExample,
  WithSeoContentExample,
  WithSeoContentOnDarkExample,
  SingleItemExampleWithoutDivider,
  SingleItemExampleWithoutDividerOnDark,
} from './examples';
import {
  WithSingleItemAccordionStateMock,
  WithAccordionItemStateMock,
} from './stories-utils';

export default {
  title: 'bpk-component-accordion',
  component: BpkAccordion,
  subcomponents: {
    BpkAccordionItem,
    withSingleItemAccordionState: WithSingleItemAccordionStateMock,
    withAccordionItemState: WithAccordionItemStateMock,
  },
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

export const WithDarkBackground = WithDarkBackgroundExample;
export const WithContent = WithSeoContentExample;
export const WithSeoContentOnDark = WithSeoContentOnDarkExample;

export const WithoutDivider = SingleItemExampleWithoutDivider;
export const WithoutDividerOnDark = SingleItemExampleWithoutDividerOnDark;

export const VisualTest = SingleItemExample;
export const VisualTestOnDark = WithDarkBackgroundExample;

export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
