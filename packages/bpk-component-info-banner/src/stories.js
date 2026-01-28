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

import BpkInfoBanner from '../index';
import BpkInfoBannerDismissable from '../index';
import BpkInfoBannerExpandable from '../index';

import {
  DefaultExample,
  InfoExample,
  SuccessExample,
  SuccessLongMessageExample,
  DismissableExample,
  SuccessExpandableExample,
  SuccessExpandableWithActionExample,
  SuccessAnimateOnEnterExample,
  SuccessWithReactRenderedMessageExample,
  WarningExample,
  ErrorExample,
  SuccessDismissableBehaviourExample,
  SuccessExpandableBehaviourExample,
  SuccessAutomaticallyDismissedExample,
  SuccessCustomIconExample,
  DocsDefaultExample,
  OnContrastExample,
} from './examples';
import { withBannerAlertStateMock } from './stories-utils';

export default {
  title: 'bpk-component-info-banner',
  component: BpkInfoBanner,
  subcomponents: {
    BpkInfoBannerDismissable,
    BpkInfoBannerExpandable,
    withBannerAlertState: withBannerAlertStateMock,
  },
};

export const DocsDefault = DocsDefaultExample;
export const Default = DefaultExample;
export const Info = InfoExample;
export const Success = SuccessExample;
export const SuccessLongMessage = SuccessLongMessageExample;
export const SuccessDismissable = DismissableExample;
export const SuccessExpandable = SuccessExpandableExample;
export const SuccessExpandableWithAction = SuccessExpandableWithActionExample;
export const SuccessAnimateOnEnter = SuccessAnimateOnEnterExample;
export const SuccessWithReactRenderedMessage =
  SuccessWithReactRenderedMessageExample;
export const Warning = WarningExample;
export const Error = ErrorExample;
export const SuccessDismissableBehaviour = SuccessDismissableBehaviourExample;

export const OnContrast = OnContrastExample;

export const SuccessExpandableBehaviour = SuccessExpandableBehaviourExample;

export const SuccessAutomaticallyDismissedAfter5Seconds =
  SuccessAutomaticallyDismissedExample;
export const SuccessWithCustomIcon = SuccessCustomIconExample;

export const VisualTest = DocsDefaultExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true,
};
