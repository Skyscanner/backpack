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
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { withDefaultProps } from 'bpk-react-utils';
import BpkCloseButton from 'bpk-component-close-button';

import BpkBannerAlert, { ALERT_TYPES } from './BpkBannerAlert';
import withBannerAlertState from './withBannerAlertState';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const longMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi. Donec et congue odio, nec laoreet est. Integer rhoncus varius arcu, a fringilla libero laoreet at. Mauris
porta varius ullamcorper. Sed laoreet libero mauris, non pretium lectus accumsan et. Suspendisse vehicula ullamcorper
sapien, et dapibus mi aliquet non. Pellentesque auctor sagittis lectus vitae rhoncus. Fusce id enim porttitor, mattis
ante in, vestibulum nulla.`;

const BannerAlert = withDefaultProps(BpkBannerAlert, {
  message,
  type: ALERT_TYPES.SUCCESS,
  toggleButtonLabel: 'View more',
  dismissButtonLabel: 'Dismiss',
});
const EnhancedComponent = withBannerAlertState(BannerAlert);

describe('withBannerAlertState(BpkBannerAlert)', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EnhancedComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly collapsed', () => {
    const tree = renderer
      .create(
        <EnhancedComponent expanded={false}>{longMessage}</EnhancedComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly expanded', () => {
    const tree = renderer
      .create(<EnhancedComponent expanded>{longMessage}</EnhancedComponent>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly and hide after some seconds', () => {
    jest.useFakeTimers();

    const tree = renderer.create(
      <EnhancedComponent hideAfter={3}>{longMessage}</EnhancedComponent>,
    );

    expect(tree.toJSON()).toMatchSnapshot();

    jest.runAllTimers();

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call provided "onDismiss"', () => {
    const onDismissMock = jest.fn();

    const wrapper = mount(
      <EnhancedComponent dismissable onDismiss={onDismissMock} />,
    );

    wrapper
      .find(BpkCloseButton)
      .first()
      .simulate('click');
    expect(onDismissMock).toBeCalled();
  });

  it('should call provided "onDismiss" when hidding automatically', () => {
    jest.useFakeTimers();
    const onDismissMock = jest.fn();

    mount(
      <EnhancedComponent dismissable hideAfter={3} onDismiss={onDismissMock} />,
    );

    jest.runAllTimers();

    expect(onDismissMock).toBeCalled();
  });

  it('should call provided "onExpandToggle"', () => {
    const onExpandMock = jest.fn();

    const wrapper = mount(
      <EnhancedComponent onExpandToggle={onExpandMock}>
        {longMessage}
      </EnhancedComponent>,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(onExpandMock).toBeCalled();
  });
});
