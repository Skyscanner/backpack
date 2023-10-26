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

import BpkInfoBanner from '../../packages/bpk-component-info-banner/src/BpkInfoBanner';
import BpkInfoBannerExpandable from '../../packages/bpk-component-info-banner/src/BpkInfoBannerExpandable';

import { withBannerAlertStateMock } from './stories-utils';
import {
  DefaultExample,
  InfoExample,
  SuccessExample,
  SuccessLongMessageExample,
  SuccessExpandableExample,
  SuccessAnimateOnEnterExample,
  SuccessWithReactRenderedMessageExample,
  WarningExample,
  ErrorExample,
  SuccessExpandableBehaviourExample,
  SuccessCustomIconExample,
  DocsDefaultExample,
} from './examples';

export default {
  title: 'bpk-component-info-banner',
  component: BpkInfoBanner,
  subcomponents: {
    BpkInfoBannerExpandable,
    withBannerAlertState: withBannerAlertStateMock,
  },
};

export const DocsDefault = DocsDefaultExample;
export const Default = DefaultExample;
export const Info = InfoExample;
export const Success = SuccessExample;
export const SuccessLongMessage = SuccessLongMessageExample;
export const SuccessExpandable = SuccessExpandableExample;
export const SuccessAnimateOnEnter = SuccessAnimateOnEnterExample;
export const SuccessWithReactRenderedMessage =
  SuccessWithReactRenderedMessageExample;
export const Warning = WarningExample;
export const Error = ErrorExample;

export const SuccessExpandableBehaviour = SuccessExpandableBehaviourExample;

export const SuccessWithCustomIcon = SuccessCustomIconExample;

export const VisualTest = DocsDefaultExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
