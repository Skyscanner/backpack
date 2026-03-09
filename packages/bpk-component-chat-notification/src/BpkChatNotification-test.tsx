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

import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';

import BpkChatNotification from './BpkChatNotification';

const TEXT = 'Thanks for your feedback!';

describe('BpkChatNotification', () => {
  it('should render correctly with an icon', () => {
    const { asFragment } = render(
      <BpkChatNotification text={TEXT} icon={TickCircleIcon} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without an icon', () => {
    const { asFragment } = render(
      <BpkChatNotification text={TEXT} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the text', () => {
    render(<BpkChatNotification text={TEXT} />);
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });

  it('should show the icon when provided', () => {
    const { container } = render(
      <BpkChatNotification text={TEXT} icon={TickCircleIcon} />,
    );
    expect(
      container.querySelector('.bpk-chat-notification__icon'),
    ).toBeInTheDocument();
  });

  it('should not show the icon container when icon is not provided', () => {
    const { container } = render(
      <BpkChatNotification text={TEXT} />,
    );
    expect(
      container.querySelector('.bpk-chat-notification__icon'),
    ).not.toBeInTheDocument();
  });

  it('should have the correct data-testid', () => {
    render(<BpkChatNotification text={TEXT} />);
    expect(screen.getByTestId('bpk-chat-notification')).toBeInTheDocument();
  });
});
