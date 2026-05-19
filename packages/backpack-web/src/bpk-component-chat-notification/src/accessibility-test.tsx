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

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';

import BpkChatNotification from './BpkChatNotification';

describe('BpkChatNotification accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues with an icon', async () => {
    const { container } = render(
      <BpkChatNotification
        text="Thanks for your feedback!"
        icon={TickCircleIcon}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues without an icon', async () => {
    const { container } = render(
      <BpkChatNotification text="Something went wrong. Please try again." />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with long text', async () => {
    const { container } = render(
      <BpkChatNotification text="Thank you so much for taking the time to share your feedback with us today!" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
