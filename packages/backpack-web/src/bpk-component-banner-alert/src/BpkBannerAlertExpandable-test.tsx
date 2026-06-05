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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import BpkBannerAlertExpandable from './BpkBannerAlertExpandable';
import { ALERT_TYPES } from './common-types';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
const innerMessage =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
  'Quisque sagittis sagittis purus, id blandit ipsum. Pellentesque nec diam nec erat condimentum dapibus.' +
  'Nunc diam augue, egestas id egestas ut, facilisis nec mi.';

describe('BpkBannerAlertExpandable', () => {
  it('should not show inner message when "expanded" is not set to true', () => {
    render(
      <BpkBannerAlertExpandable
        type={ALERT_TYPES.SUCCESS}
        message={message}
        toggleButtonLabel="Show details"
        onExpandToggle={jest.fn()}
      >
        {innerMessage}
      </BpkBannerAlertExpandable>,
    );
    expect(screen.getByText(innerMessage)).not.toBeVisible();
  });

  it('should show inner message when "expanded" is set to true', () => {
    render(
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
    expect(screen.getByText(innerMessage)).toBeVisible();
  });
});
