import React from 'react';
import { storiesOf } from '@storybook/react';

import BpkBannerAlert, { ALERT_TYPES } from './index';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

storiesOf('bpk-component-banner-alert', module)
  .add('Success', () => (
    <BpkBannerAlert message={message} type={ALERT_TYPES.SUCCESS} />
  ))
  .add('Success (long message)', () => (
    <BpkBannerAlert message={longMessage} type={ALERT_TYPES.SUCCESS} />
  ))
  .add('Success with React rendered message', () => (
    <BpkBannerAlert message={<span style={{ fontWeight: 700 }}>{message}</span>} type={ALERT_TYPES.SUCCESS} />
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
