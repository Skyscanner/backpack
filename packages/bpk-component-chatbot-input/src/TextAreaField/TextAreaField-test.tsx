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

import TextAreaField from './TextAreaField';

const defaultProps = {
  value: '',
  placeholder: 'Ask away',
  dataTestId: 'chatbot-textarea-field',
  onInputChange: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
  onInputClick: jest.fn(),
  onKeyDown: jest.fn(),
  containerHeight: 56,
  textareaHeight: 24,
  shouldReduceParentPadding: false,
  isExpanding: false,
};

const TestWrapper = (props: any) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  return <TextAreaField ref={ref} {...defaultProps} {...props} />;
};

describe('TextAreaField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders textarea field correctly', () => {
    render(<TestWrapper />);

    expect(screen.getByTestId(defaultProps.dataTestId)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
  });

  it('calls onInputChange when textarea value changes', () => {
    const onInputChange = jest.fn();
    render(<TestWrapper onInputChange={onInputChange} />);

    const testValue = 'New message';
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: testValue } });

    expect(onInputChange).toHaveBeenCalledWith(testValue);
  });

  it('calls onInputClick when textarea is clicked', () => {
    const onInputClick = jest.fn();
    render(<TestWrapper onInputClick={onInputClick} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.click(textarea);

    expect(onInputClick).toHaveBeenCalled();
  });

  it('disables textarea when disabled prop is true', () => {
    render(<TestWrapper disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies fifth-line class when shouldReduceParentPadding is true', () => {
    const { container } = render(
      <TestWrapper isExpanding shouldReduceParentPadding />,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes accessibility checks', async () => {
    const { container } = render(<TestWrapper />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
