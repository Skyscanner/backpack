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

import BpkChatNotification from './BpkChatNotification';

const defaultProps = {
  label: 'Thanks for your feedback!',
  errorLabel: 'Something went wrong. Please try again.',
};

describe('BpkChatNotification', () => {
  it('should render correctly in the default state', () => {
    const { asFragment } = render(<BpkChatNotification {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly in the error state', () => {
    const { asFragment } = render(
      <BpkChatNotification {...defaultProps} hasIssue />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the label in the default state', () => {
    render(<BpkChatNotification {...defaultProps} />);
    expect(
      screen.getByText('Thanks for your feedback!'),
    ).toBeInTheDocument();
  });

  it('should show the errorLabel when hasIssue is true', () => {
    render(<BpkChatNotification {...defaultProps} hasIssue />);
    expect(
      screen.getByText('Something went wrong. Please try again.'),
    ).toBeInTheDocument();
  });

  it('should show the tick icon in the default state', () => {
    const { container } = render(<BpkChatNotification {...defaultProps} />);
    expect(
      container.querySelector('.bpk-chat-notification__icon'),
    ).toBeInTheDocument();
  });

  it('should not show the tick icon in the error state', () => {
    const { container } = render(
      <BpkChatNotification {...defaultProps} hasIssue />,
    );
    expect(
      container.querySelector('.bpk-chat-notification__icon'),
    ).not.toBeInTheDocument();
  });

  it('should have the correct data-testid', () => {
    render(<BpkChatNotification {...defaultProps} />);
    expect(screen.getByTestId('bpk-chat-notification')).toBeInTheDocument();
  });
});
