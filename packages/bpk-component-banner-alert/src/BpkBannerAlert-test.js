/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BpkBannerAlert from './BpkBannerAlert';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkBannerAlert', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBannerAlert type={ALERT_TYPES.SUCCESS} message={message} />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly hidden', () => {
    const tree = shallow(
      <BpkBannerAlert
        show={false}
        type={ALERT_TYPES.SUCCESS}
        message={message}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly with custom bannerClassName', () => {
    const tree = shallow(
      <BpkBannerAlert
        bannerClassName="custom-banner-class-name"
        type={ALERT_TYPES.SUCCESS}
        message={message}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
