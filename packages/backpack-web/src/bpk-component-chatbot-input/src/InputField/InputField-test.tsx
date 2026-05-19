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

import { useRef } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import InputField from './InputField';

const defaultProps = {
  value: '',
  placeholder: 'Ask away',
  dataTestId: 'chatbot-input-field',
  onInputChange: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
  onInputClick: jest.fn(),
  onKeyDown: jest.fn(),
};

const TestWrapper = (props: any) => {
  const ref = useRef<HTMLInputElement>(null);
  return <InputField ref={ref} {...defaultProps} {...props} />;
};

describe('InputField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field correctly', () => {
    render(<TestWrapper />);

    expect(screen.getByTestId(defaultProps.dataTestId)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
  });

  it('calls onInputChange when input value changes', () => {
    const onInputChange = jest.fn();
    render(<TestWrapper onInputChange={onInputChange} />);

    const testValue = 'New message';
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: testValue } });

    expect(onInputChange).toHaveBeenCalledWith(testValue);
  });

  it('calls onInputClick when input is clicked', () => {
    const onInputClick = jest.fn();
    render(<TestWrapper onInputClick={onInputClick} />);

    const input = screen.getByRole('textbox');
    fireEvent.click(input);

    expect(onInputClick).toHaveBeenCalled();
  });

  it('disables input when disabled prop is true', () => {
    render(<TestWrapper disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('passes accessibility checks', async () => {
    const { container } = render(<TestWrapper />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
