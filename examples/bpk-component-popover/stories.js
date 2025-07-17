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


import BpkPopover from '../../packages/bpk-component-popover';

import {
  DefaultExample,
  WithCustomRenderTargetExample,
  HoverExample,
  WithoutArrowExample,
  WithLabelAsTitleExample,
  OnTheSideExample,
  InputTriggerExample,
  WithActionButtonExample,
  WithNoCloseButtonIconExample,
  WithNoTitleExample,
  VisualExample
} from './examples';

export default {
  title: 'bpk-component-popover',
  component: BpkPopover,
};

export const Default = DefaultExample;
export const WithCustomRenderTarget = WithCustomRenderTargetExample;
export const Hover = HoverExample;
export const WithoutArrow = WithoutArrowExample;
export const WithLabelAsTitle = WithLabelAsTitleExample;
export const WithNoCloseButtonIcon =
WithNoCloseButtonIconExample;
export const WithNoTitle = WithNoTitleExample;
export const OnTheSide = OnTheSideExample;
export const TriggeredByInput = InputTriggerExample;
export const WithActionButton = WithActionButtonExample;
export const VisualTest = VisualExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
