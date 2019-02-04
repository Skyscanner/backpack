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
/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import BpkBannerAlertInner, { CONFIGURATION } from './BpkBannerAlertInner';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkBannerAlertInner', () => {
  it('should render correctly with "type" attribute equal to "success"', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner type={ALERT_TYPES.SUCCESS} message={message} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "warn"', () => {
    const tree = renderer
      .create(<BpkBannerAlertInner type={ALERT_TYPES.WARN} message={message} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "error"', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner type={ALERT_TYPES.ERROR} message={message} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with child nodes', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.SUCCESS}
          message={message}
          toggleButtonLabel="View more"
          configuration={CONFIGURATION.EXPANDABLE}
        >
          {message}
        </BpkBannerAlertInner>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a element based message', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.SUCCESS}
          message={
            <p>
              All <span>good</span>
            </p>
          }
          toggleButtonLabel="View more"
          configuration={CONFIGURATION.EXPANDABLE}
        >
          {message}
        </BpkBannerAlertInner>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          className="custom-class"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom banner-alert class name', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          bannerClassName="custom-class"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          id="custom-id"
          hidden="hidden"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with dismissable option', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          configuration={CONFIGURATION.DISMISSABLE}
          dismissButtonLabel="Dismiss"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with show set false', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          configuration={CONFIGURATION.DISMISSABLE}
          dismissButtonLabel="Dismiss"
          show={false}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with animateOnEnter', () => {
    // TODO Due to a bug in react-transition-group, this test will fail
    // https://github.com/reactjs/react-transition-group/issues/436
    // Should be reinstated once the bug is fixed
    return;
    /* eslint-disable no-unreachable */
    // $FlowFixMe
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          configuration={CONFIGURATION.DISMISSABLE}
          dismissButtonLabel="Dismiss"
          animateOnEnter
        />,
      )
      .toJSON();
    // $FlowFixMe
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with animateOnLeave', () => {
    const tree = renderer
      .create(
        <BpkBannerAlertInner
          type={ALERT_TYPES.WARN}
          message={message}
          configuration={CONFIGURATION.DISMISSABLE}
          dismissButtonLabel="Dismiss"
          animateOnLeave
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
