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
import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BpkSplitInput from './BpkSplitInput';

const defaultProps = {
  name: 'otpInput',
  id: 'otpInput',
  label: 'otp input',
  onInputChange: jest.fn(),
  onSubmit: jest.fn(),
};

describe('BpkSplitInput', () => {
  it('should render without crashing', () => {
    render(<BpkSplitInput {...defaultProps} />);
    const inputs = screen.getAllByPlaceholderText('');
    expect(inputs).toHaveLength(4);
  });

  it('should render correctly with inputLength param', () => {
    render(<BpkSplitInput {...defaultProps} inputLength={6} />);
    const inputs = screen.getAllByPlaceholderText('');
    expect(inputs).toHaveLength(6);
  });

  it('should render correctly with large set as true', () => {
    render(<BpkSplitInput {...defaultProps} />);
    const inputs = screen.getAllByPlaceholderText('');
    inputs.forEach((input) => {
      expect(input).toHaveClass('bpk-input--large');
    });
  });

  it('should render correctly with placeholder', () => {
    const placeholder = 'x';
    render(<BpkSplitInput {...defaultProps} placeholder={placeholder} />);
    const inputs = screen.getAllByPlaceholderText('x');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('placeholder', placeholder);
    });
  });
});
