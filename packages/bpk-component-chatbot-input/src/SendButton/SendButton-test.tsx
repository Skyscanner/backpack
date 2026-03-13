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

import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import SendButton from './SendButton';

const defaultProps = {
  ariaLabel: 'Send',
  onClick: jest.fn(),
};

describe('SendButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders send button correctly', () => {
    render(<SendButton {...defaultProps} />);

    expect(screen.getByTestId('bpk-chatbot-input-send')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const onClick = jest.fn();
    render(<SendButton {...defaultProps} onClick={onClick} />);

    const button = screen.getByTestId('bpk-chatbot-input-send');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<SendButton {...defaultProps} disabled />);

    expect(screen.getByTestId('bpk-chatbot-input-send')).toBeDisabled();
  });

  it('passes accessibility checks', async () => {
    const { container } = render(<SendButton {...defaultProps} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
