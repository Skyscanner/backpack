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

import BpkChatbotButton from './BpkChatbotButton';

const mockOnClick = jest.fn();

describe('BpkChatbotButton', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render correctly (collapsed by default)', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when expanded', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" expanded onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when disabled', () => {
    const { asFragment } = render(
      <BpkChatbotButton label="Chat with AI" disabled onClick={mockOnClick} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom icon', () => {
    const { asFragment } = render(
      <BpkChatbotButton
        label="Chat with AI"
        icon={<span>icon</span>}
        onClick={mockOnClick}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should use aria-label when collapsed', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    const button = screen.getByTestId('bpk-chatbot-button');
    expect(button).toHaveAttribute('aria-label', 'Chat with AI');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should not have aria-label when expanded (visible text provides accessible name)', () => {
    render(
      <BpkChatbotButton label="Chat with AI" expanded onClick={mockOnClick} />,
    );
    const button = screen.getByTestId('bpk-chatbot-button');
    expect(button).not.toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onClick when clicked', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />,
    );
    fireEvent.click(screen.getByTestId('bpk-chatbot-button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    render(
      <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} disabled />,
    );
    fireEvent.click(screen.getByTestId('bpk-chatbot-button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should prevent event bubbling on click', () => {
    const parentClick = jest.fn();
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={parentClick}>
        <BpkChatbotButton label="Chat with AI" onClick={mockOnClick} />
      </div>,
    );
    const button = container.querySelector('[data-testid="bpk-chatbot-button"]');
    if (button) {
      fireEvent.click(button);
    }
    expect(mockOnClick).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });
});
