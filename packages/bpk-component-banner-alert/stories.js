/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import React from 'react';
import { action } from '@storybook/addon-actions';
import { fontWeightBold } from 'bpk-tokens/tokens/base.es6';
import CurrencyIcon from 'bpk-component-icon/sm/currency';

import BpkBannerAlert, {
  ALERT_TYPES,
  withBannerAlertState,
  BpkBannerAlertDismissable,
  BpkBannerAlertExpandable,
} from './index';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const BpkBannerAlertDismissableState = withBannerAlertState(
  BpkBannerAlertDismissable,
);
const BpkBannerAlertExpandableState = withBannerAlertState(
  BpkBannerAlertExpandable,
);

export default {
  title: 'bpk-component-banner-alert',
};

export const Neutral = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.NEUTRAL} />
);

export const Primary = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.PRIMARY} />
);

export const Success = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.SUCCESS} />
);

export const SuccessLongMessage = () => (
  <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} />
);

SuccessLongMessage.story = {
  name: 'Success (long message)',
};

export const SuccessDismissable = () => (
  <BpkBannerAlertDismissable
    dismissButtonLabel="Dismiss"
    message={message}
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

SuccessDismissable.story = {
  name: 'Success (dismissable)',
};

export const SuccessExpandable = () => (
  <BpkBannerAlertExpandable
    message={message}
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandable>
);

SuccessExpandable.story = {
  name: 'Success (expandable)',
};

export const SuccessAnimateOnEnter = () => (
  <BpkBannerAlert
    animateOnEnter
    message={message}
    type={ALERT_TYPES.SUCCESS}
    onDismiss={action('dismissed')}
  />
);

SuccessAnimateOnEnter.story = {
  name: 'Success (animate on enter)',
};

export const SuccessWithReactRenderedMessage = () => (
  <BpkBannerAlert
    message={<span style={{ fontWeight: fontWeightBold }}>{message}</span>}
    type={ALERT_TYPES.SUCCESS}
  />
);

export const Warn = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.WARN} />
);

export const Error = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.ERROR} />
);

export const Event = () => (
  <BpkBannerAlert message={message} type={ALERT_TYPES.EVENT} />
);

export const SuccessDismissableBehaviour = () => (
  <BpkBannerAlertDismissableState
    dismissButtonLabel="Dismiss"
    message={message}
    type={ALERT_TYPES.SUCCESS}
  />
);

SuccessDismissableBehaviour.story = {
  name: 'Success (dismissable behaviour)',
};

export const SuccessExpandableBehaviour = () => (
  <BpkBannerAlertExpandableState
    message={message}
    type={ALERT_TYPES.SUCCESS}
    toggleButtonLabel="View more"
  >
    {longMessage}
  </BpkBannerAlertExpandableState>
);

SuccessExpandableBehaviour.story = {
  name: 'Success (expandable behaviour)',
};

export const SuccessAutomaticallyDismissedAfter5Seconds = () => (
  <BpkBannerAlertDismissableState
    hideAfter={5}
    message={message}
    type={ALERT_TYPES.SUCCESS}
    dismissButtonLabel="Dismiss"
  />
);

SuccessAutomaticallyDismissedAfter5Seconds.story = {
  name: 'Success (automatically dismissed after 5 seconds)',
};

export const SuccessWithCustomIcon = () => (
  <BpkBannerAlert
    message={message}
    type={ALERT_TYPES.SUCCESS}
    icon={CurrencyIcon}
  />
);
