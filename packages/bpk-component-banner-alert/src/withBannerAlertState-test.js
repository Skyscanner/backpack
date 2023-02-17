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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ALERT_TYPES } from './common-types';
import BpkBannerAlertDismissable from './BpkBannerAlertDismissable';
import BpkBannerAlertExpandable from './BpkBannerAlertExpandable';
import withBannerAlertState from './withBannerAlertState';

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
describe('withBannerAlertState(BpkBannerAlertDismissable)', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        dismissButtonLabel="Dismiss"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call provided `onDismiss`', async () => {
    const onDismissMock = jest.fn();

    render(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        onDismiss={onDismissMock}
        dismissButtonLabel="Dismiss"
      />,
    );

    const dismissButton = screen.getByRole('button', { name: 'Dismiss' });

    await userEvent.click(dismissButton);
    expect(onDismissMock).toHaveBeenCalled();
  });

  it('should call provided `onHide` when hidding automatically', () => {
    jest.useFakeTimers();
    const onHideMock = jest.fn();

    render(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        hideAfter={3}
        onHide={onHideMock}
        dismissButtonLabel="Dismiss"
      />,
    );

    jest.runAllTimers();

    expect(onHideMock).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

describe('withBannerAlertState(BpkBannerAlertExpandable)', () => {
  it('should render correctly collapsed', () => {
    const { asFragment } = render(
      <BpkBannerAlertExpandableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        expanded={false}
        toggleButtonLabel="View more"
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly expanded', () => {
    const { asFragment } = render(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        expanded
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call provided "onExpandToggle"', async () => {
    const onExpandMock = jest.fn();

    render(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        onExpandToggle={onExpandMock}
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );

    const expandButton = screen.getByRole('button', { name: 'View more' });

    await userEvent.click(expandButton);
    expect(onExpandMock).toHaveBeenCalled();
  });
});
