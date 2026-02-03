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
// @ts-nocheck

import { render } from '@testing-library/react';

import CurrencyIcon from '../../bpk-component-icon/sm/currency';

import BpkInfoBannerInner, { CONFIGURATION } from './BpkInfoBannerInner';
import { ALERT_TYPES, STYLE_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkInfoBannerInner', () => {
  it('should render correctly with "type" attribute equal to "success"', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner type={ALERT_TYPES.SUCCESS} message={message} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "warning"', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner type={ALERT_TYPES.WARNING} message={message} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "error"', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner type={ALERT_TYPES.ERROR} message={message} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "info"', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner type={ALERT_TYPES.INFO} message={message} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "style" attribute equal to "onContrast"', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        style={STYLE_TYPES.ON_CONTRAST}
        type={ALERT_TYPES.INFO}
        message={message}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with child nodes', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.SUCCESS}
        message={message}
        toggleButtonLabel="View more"
        configuration={CONFIGURATION.EXPANDABLE}
      >
        {message}
      </BpkInfoBannerInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a element based message', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
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
      </BpkInfoBannerInner>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom class name', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        className="custom-class"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom banner-alert class name', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        bannerClassName="custom-class"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with arbitrary props', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        id="custom-id"
        hidden="hidden"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with dismissable option', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        configuration={CONFIGURATION.DISMISSABLE}
        dismissButtonLabel="Dismiss"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with show set false', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        configuration={CONFIGURATION.DISMISSABLE}
        dismissButtonLabel="Dismiss"
        show={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // TODO Due to a bug in react-transition-group, this test will fail
  // https://github.com/reactjs/react-transition-group/issues/436
  // Should be reinstated once the bug is fixed
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should render correctly with animateOnEnter', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        configuration={CONFIGURATION.DISMISSABLE}
        dismissButtonLabel="Dismiss"
        animateOnEnter
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with animateOnLeave', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.WARNING}
        message={message}
        configuration={CONFIGURATION.DISMISSABLE}
        dismissButtonLabel="Dismiss"
        animateOnLeave
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "error" and "icon" equal to CurrencyIcon', () => {
    const { asFragment } = render(
      <BpkInfoBannerInner
        type={ALERT_TYPES.ERROR}
        message={message}
        icon={CurrencyIcon}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
