/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
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

storiesOf('bpk-component-banner-alert', module)
  .add('Neutral', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.NEUTRAL} />
  ))
  .add('Success', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.SUCCESS} />
  ))
  .add('Success (long message)', () => (
    <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} />
  ))
  .add('Success (dismissable)', () => (
    <BpkBannerAlertDismissable
      dismissButtonLabel="Dismiss"
      message={message}
      type={ALERT_TYPES.SUCCESS}
      onDismiss={action('dismissed')}
    />
  ))
  .add('Success(expandable)', () => (
    <BpkBannerAlertExpandable
      message={message}
      type={ALERT_TYPES.SUCCESS}
      toggleButtonLabel="View more"
    >
      {longMessage}
    </BpkBannerAlertExpandable>
  ))
  .add('Success (animate on enter)', () => (
    <BpkBannerAlert
      animateOnEnter
      message={message}
      type={ALERT_TYPES.SUCCESS}
      onDismiss={action('dismissed')}
    />
  ))
  .add('Success with React rendered message', () => (
    <BpkBannerAlert
      message={<span style={{ fontWeight: fontWeightBold }}>{message}</span>}
      type={ALERT_TYPES.SUCCESS}
    />
  ))
  .add('Warn', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.WARN} />
  ))
  .add('Error', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.ERROR} />
  ))
  .add('Success (dismissable behaviour)', () => (
    <BpkBannerAlertDismissableState
      dismissButtonLabel="Dismiss"
      message={message}
      type={ALERT_TYPES.SUCCESS}
    />
  ))
  .add('Success (expandable behaviour)', () => (
    <BpkBannerAlertExpandableState
      message={message}
      type={ALERT_TYPES.SUCCESS}
      toggleButtonLabel="View more"
    >
      {longMessage}
    </BpkBannerAlertExpandableState>
  ))
  .add('Success (automatically dismissed after 5 seconds)', () => (
    <BpkBannerAlertDismissableState
      hideAfter={5}
      message={message}
      type={ALERT_TYPES.SUCCESS}
      dismissButtonLabel="Dismiss"
    />
  ))
  .add('Success with custom icon', () => (
    <BpkBannerAlert
      message={message}
      type={ALERT_TYPES.SUCCESS}
      icon={CurrencyIcon}
    />
  ));
