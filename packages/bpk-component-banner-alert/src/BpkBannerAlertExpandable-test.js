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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BpkBannerAlertExpandable from './BpkBannerAlertExpandable';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const innerMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sagittis sagittis purus, id
blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus. Nunc diam augue, egestas id egestas ut, facilisis
nec mi.`;

describe('BpkBannerAlertExpandable', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBannerAlertExpandable
        type={ALERT_TYPES.SUCCESS}
        message={message}
        toggleButtonLabel="Show details"
        onExpandToggle={jest.fn()}
      >
        {innerMessage}
      </BpkBannerAlertExpandable>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render correctly expanded', () => {
    const tree = shallow(
      <BpkBannerAlertExpandable
        type={ALERT_TYPES.SUCCESS}
        message={message}
        toggleButtonLabel="Show details"
        onExpandToggle={jest.fn()}
        expanded
      >
        {innerMessage}
      </BpkBannerAlertExpandable>,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
