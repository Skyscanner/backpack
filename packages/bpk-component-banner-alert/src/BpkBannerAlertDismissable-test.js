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
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BpkBannerAlertDismissable from './BpkBannerAlertDismissable';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkBannerAlertDismissable', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <BpkBannerAlertDismissable
        type={ALERT_TYPES.SUCCESS}
        message={message}
        dismissButtonLabel="Dismiss"
        onDismiss={jest.fn()}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
