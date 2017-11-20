/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fontWeightBold } from 'bpk-tokens/tokens/base.es6';

import BpkBannerAlert, { ALERT_TYPES } from './index';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

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
    <BpkBannerAlert dismissable message={message} type={ALERT_TYPES.SUCCESS} onDismiss={action('dismissed')} />
  ))
  .add('Success with React rendered message', () => (
    <BpkBannerAlert
      message={<span style={{ fontWeight: fontWeightBold }}>{message}</span>}
      type={ALERT_TYPES.SUCCESS}
    />
  ))
  .add('Success with children', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.SUCCESS} toggleButtonLabel="View more">
      {longMessage}
    </BpkBannerAlert>
  ))
  .add('Success with children (long message)', () => (
    <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} toggleButtonLabel="View more">
      {longMessage}
    </BpkBannerAlert>
  ))
  .add('Warn', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.WARN} />
  ))
  .add('Error', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.ERROR} />
  ));
