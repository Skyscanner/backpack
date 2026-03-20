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

import BpkPromptRoot from './BpkPromptRoot';

describe('BpkPromptRoot', () => {
  it('should render correctly with default props', () => {
    const { asFragment } = render(
      <BpkPromptRoot promptText="What insurance do I need?" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the prompt text', () => {
    render(<BpkPromptRoot promptText="What insurance do I need?" />);
    expect(
      screen.getByText('What insurance do I need?'),
    ).toBeInTheDocument();
  });

  it('should render with data-testid', () => {
    render(<BpkPromptRoot promptText="What insurance do I need?" />);
    expect(screen.getByTestId('bpk-prompt')).toBeInTheDocument();
  });

  it('should call onClick with promptText when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <BpkPromptRoot
        promptText="What insurance do I need?"
        onClick={mockOnClick}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'What insurance do I need?' }),
    );

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('What insurance do I need?');
  });

  it('should not throw when clicked without onClick handler', () => {
    render(<BpkPromptRoot promptText="What insurance do I need?" />);
    expect(() => {
      fireEvent.click(screen.getByTestId('bpk-prompt'));
    }).not.toThrow();
  });

  it('should call onClick when Enter key is pressed', () => {
    const mockOnClick = jest.fn();
    render(
      <BpkPromptRoot
        promptText="What insurance do I need?"
        onClick={mockOnClick}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('bpk-prompt'), { key: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('What insurance do I need?');
  });

  it('should call onClick when Space key is pressed', () => {
    const mockOnClick = jest.fn();
    render(
      <BpkPromptRoot
        promptText="What insurance do I need?"
        onClick={mockOnClick}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('bpk-prompt'), { key: ' ' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
