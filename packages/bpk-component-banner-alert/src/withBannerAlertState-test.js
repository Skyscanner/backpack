/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
/* @flow */

import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import BpkCloseButton from 'bpk-component-close-button';

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
    const tree = shallow(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        dismissButtonLabel="Dismiss"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call provided `onDismiss`', () => {
    const onDismissMock = jest.fn();

    const wrapper = mount(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        onDismiss={onDismissMock}
        dismissButtonLabel="Dismiss"
      />,
    );

    wrapper
      .find(BpkCloseButton)
      .first()
      .simulate('click');
    expect(onDismissMock).toBeCalled();
  });

  it('should call provided `onHide` when hidding automatically', () => {
    jest.useFakeTimers();
    const onHideMock = jest.fn();

    mount(
      <BpkBannerAlertDismissableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        hideAfter={3}
        onHide={onHideMock}
        dismissButtonLabel="Dismiss"
      />,
    );

    jest.runAllTimers();

    expect(onHideMock).toBeCalled();
  });
});

describe('withBannerAlertState(BpkBannerAlertExpandable)', () => {
  it('should render correctly collapsed', () => {
    const tree = shallow(
      <BpkBannerAlertExpandableState
        type={ALERT_TYPES.SUCCESS}
        message={message}
        expanded={false}
        toggleButtonLabel="View more"
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly expanded', () => {
    const tree = shallow(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        expanded
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly and hide after some seconds', () => {
    jest.useFakeTimers();

    const tree = renderer.create(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        hideAfter={3}
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );

    expect(tree.toJSON()).toMatchSnapshot();

    jest.runAllTimers();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call provided `onHide` when hidding automatically', () => {
    jest.useFakeTimers();
    const onHideMock = jest.fn();

    mount(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        hideAfter={3}
        onHide={onHideMock}
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );

    jest.runAllTimers();

    expect(onHideMock).toBeCalled();
  });

  it('should call provided "onExpandToggle"', () => {
    const onExpandMock = jest.fn();

    const wrapper = mount(
      <BpkBannerAlertExpandableState
        message={message}
        type={ALERT_TYPES.SUCCESS}
        toggleButtonLabel="View more"
        onExpandToggle={onExpandMock}
      >
        {longMessage}
      </BpkBannerAlertExpandableState>,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(onExpandMock).toBeCalled();
  });
});
