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
import userEvent from '@testing-library/user-event';

import BpkBottomSheet from './BpkBottomSheet';

jest.mock('../../tracking', () => ({
  ...jest.requireActual('../../tracking'),
  trackEvent: jest.fn(),
}));

describe('BottomSheet', () => {
  const user = userEvent.setup();

  it('should render correctly', () => {
    render(
      <BpkBottomSheet closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should handle mount when provided', () => {
    const handleMountFn = jest.fn();
    render(
      <BpkBottomSheet handleMount={handleMountFn} closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    expect(handleMountFn).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should not handle mount when handle mount not provided', () => {
    const handleMountFn = jest.fn();
    render(
      <BpkBottomSheet closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    expect(handleMountFn).not.toHaveBeenCalled();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should close if user clicks the close button', async () => {
    const { container } = render(
      <BpkBottomSheet closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(container).toBeEmptyDOMElement();
  });

  it('should not have a close button if isClosable is false', () => {
    render(
      <BpkBottomSheet isClosable={false}>
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  it('should call backgroundClickHandler when provided onMouseDown', () => {
    const handleBackgroundClickFn = jest.fn();
    const { container } = render(
      <BpkBottomSheet
        backgroundClickHandler={handleBackgroundClickFn}
        closeButtonLabel="Close"
      >
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const background = screen.getByRole('presentation');
    user.pointer({ target: background, keys: '[MouseLeft][MouseRight]' });

    expect(
      screen.queryByText('Skyscanner never takes a cut'),
    ).not.toBeInTheDocument();
    expect(handleBackgroundClickFn).toHaveBeenCalledTimes(1);
    expect(container).toBeEmptyDOMElement();
  });

  it('should call genericClickHandler when clicked', () => {
    const genericClickFn = jest.fn();
    const { container } = render(
      <BpkBottomSheet
        genericClickHandler={genericClickFn}
        closeButtonLabel="Close"
      >
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const background = screen.getByRole('presentation');
    user.pointer({ target: background, keys: '[MouseLeft][MouseRight]' });

    expect(genericClickFn).toHaveBeenCalledTimes(1);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not call click event when backgroundClickHandler not provided', () => {
    const handleBackgroundClickFn = jest.fn();
    render(
      <BpkBottomSheet closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const background = screen.getByRole('presentation');
    user.pointer({ target: background, keys: '[MouseLeft][MouseRight]' });

    expect(handleBackgroundClickFn).not.toHaveBeenCalled();
  });

  it('should not call click event when genericClickHandler not provided', () => {
    const genericClickFn = jest.fn();
    render(
      <BpkBottomSheet closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const background = screen.getByRole('presentation');
    user.pointer({ target: background, keys: '[MouseLeft][MouseRight]' });

    expect(genericClickFn).not.toHaveBeenCalled();
  });

  it('should close onTouchStart when backgroundClickHandler provided', () => {
    const handleBackgroundClickFn = jest.fn();
    render(
      <BpkBottomSheet
        backgroundClickHandler={handleBackgroundClickFn}
        closeButtonLabel="Close"
      >
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const background = screen.getByRole('presentation');
    user.pointer({ target: background, keys: '[TouchA]' });

    expect(
      screen.queryByText('Skyscanner never takes a cut'),
    ).not.toBeInTheDocument();
    expect(handleBackgroundClickFn).toHaveBeenCalledTimes(1);
  });

  it('should render title if provided', () => {
    render(
      <BpkBottomSheet title="Confidence" closeButtonLabel="Close">
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    expect(screen.getByText('Confidence')).toBeInTheDocument();
  });

  it('should render action if provided', async () => {
    const actionFn = jest.fn();
    render(
      <BpkBottomSheet
        actionText="Hello"
        action={actionFn}
        closeButtonLabel="Close"
      >
        Custom Bottom Sheet Content
      </BpkBottomSheet>,
    );

    const actionButton = screen.getByRole('button', { name: 'Hello' });
    await user.click(actionButton);

    expect(actionFn).toHaveBeenCalledTimes(1);
  });
});
