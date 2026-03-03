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

import BpkChatNotification from './BpkChatNotification';

const defaultProps = {
  label: 'Thanks for your feedback!',
  errorLabel: 'Something went wrong. Please try again.',
};

describe('BpkChatNotification accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues in the default state', async () => {
    const { container } = render(<BpkChatNotification {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in the error state', async () => {
    const { container } = render(
      <BpkChatNotification {...defaultProps} hasIssue />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues with long label text', async () => {
    const { container } = render(
      <BpkChatNotification
        label="Thank you so much for taking the time to share your feedback with us today!"
        errorLabel="Something went wrong. Please try again."
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
