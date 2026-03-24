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

import BpkChatBubble from './BpkChatBubble';

describe('BpkChatBubble', () => {
  it('should render user bubble correctly', () => {
    const { asFragment } = render(
      <BpkChatBubble type="user">Hello there</BpkChatBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render bot bubble correctly', () => {
    const { asFragment } = render(
      <BpkChatBubble type="bot">How can I help?</BpkChatBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render retry bubble correctly', () => {
    const onRetry = jest.fn();
    const { asFragment } = render(
      <BpkChatBubble type="retry" onRetry={onRetry} retryLabel="Try again">
        Something went wrong.
      </BpkChatBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render suggestion bubble correctly', () => {
    const { asFragment } = render(
      <BpkChatBubble type="suggestion" suggestionAriaLabel="suggestion bubble">
        Show me options
      </BpkChatBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render bot bubble with feedback buttons when showFeedback is true', () => {
    const { asFragment } = render(
      <BpkChatBubble type="bot" showFeedback>
        Here is some information
      </BpkChatBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render user bubble with position classes', () => {
    render(
      <BpkChatBubble type="user" userPosition="first">
        First message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should render bot bubble with system position classes', () => {
    render(
      <BpkChatBubble type="bot" systemPosition="middle">
        Middle message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should render user bubble with middle position', () => {
    render(
      <BpkChatBubble type="user" userPosition="middle">
        Middle user message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should render user bubble with last position', () => {
    render(
      <BpkChatBubble type="user" userPosition="last">
        Last user message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should render bot bubble with system first position', () => {
    render(
      <BpkChatBubble type="bot" systemPosition="first">
        First system message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should render bot bubble with system last position', () => {
    render(
      <BpkChatBubble type="bot" systemPosition="last">
        Last system message
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-chat-bubble')).toBeInTheDocument();
  });

  it('should not call onSuggestionClick for non-Enter/Space key presses', () => {
    const onSuggestionClick = jest.fn();
    render(
      <BpkChatBubble
        type="suggestion"
        onSuggestionClick={onSuggestionClick}
        suggestionAriaLabel="suggestion bubble"
      >
        Show me options
      </BpkChatBubble>,
    );
    fireEvent.keyDown(
      screen.getByRole('button', { name: 'suggestion bubble' }),
      { key: 'Tab' },
    );
    expect(onSuggestionClick).not.toHaveBeenCalled();
  });

  it('should call onSuggestionClick when suggestion bubble is clicked', () => {
    const onSuggestionClick = jest.fn();
    render(
      <BpkChatBubble
        type="suggestion"
        onSuggestionClick={onSuggestionClick}
        suggestionAriaLabel="suggestion bubble"
      >
        Show me options
      </BpkChatBubble>,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'suggestion bubble' }),
    );
    expect(onSuggestionClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSuggestionClick when Enter is pressed on suggestion bubble', () => {
    const onSuggestionClick = jest.fn();
    render(
      <BpkChatBubble
        type="suggestion"
        onSuggestionClick={onSuggestionClick}
        suggestionAriaLabel="suggestion bubble"
      >
        Show me options
      </BpkChatBubble>,
    );
    fireEvent.keyDown(
      screen.getByRole('button', { name: 'suggestion bubble' }),
      { key: 'Enter' },
    );
    expect(onSuggestionClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSuggestionClick when Space is pressed on suggestion bubble', () => {
    const onSuggestionClick = jest.fn();
    render(
      <BpkChatBubble
        type="suggestion"
        onSuggestionClick={onSuggestionClick}
        suggestionAriaLabel="suggestion bubble"
      >
        Show me options
      </BpkChatBubble>,
    );
    fireEvent.keyDown(
      screen.getByRole('button', { name: 'suggestion bubble' }),
      { key: ' ' },
    );
    expect(onSuggestionClick).toHaveBeenCalledTimes(1);
  });

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    render(
      <BpkChatBubble type="retry" onRetry={onRetry} retryLabel="Try again">
        Something went wrong.
      </BpkChatBubble>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when onRetry is not provided', () => {
    render(
      <BpkChatBubble type="retry" retryLabel="Try again">
        Something went wrong.
      </BpkChatBubble>,
    );
    expect(
      screen.queryByRole('button', { name: 'Try again' }),
    ).not.toBeInTheDocument();
  });

  it('should render retry button as disabled when retryDisabled is true', () => {
    const onRetry = jest.fn();
    render(
      <BpkChatBubble
        type="retry"
        onRetry={onRetry}
        retryDisabled
        retryLabel="Try again"
      >
        Something went wrong.
      </BpkChatBubble>,
    );
    expect(screen.getByRole('button', { name: 'Try again' })).toBeDisabled();
  });

  it('should call onFeedbackClick when thumb button is clicked', () => {
    const onFeedbackClick = jest.fn();
    render(
      <BpkChatBubble type="bot" showFeedback onFeedbackClick={onFeedbackClick}>
        Here is some information
      </BpkChatBubble>,
    );
    fireEvent.click(screen.getByTestId('bpk-thumb-button-up'));
    expect(onFeedbackClick).toHaveBeenCalledWith('up');
  });

  it('should show selected state on thumb button', () => {
    render(
      <BpkChatBubble type="bot" showFeedback selectedFeedback="up">
        Here is some information
      </BpkChatBubble>,
    );
    expect(screen.getByTestId('bpk-thumb-button-up')).toHaveClass(
      'bpk-thumb-button--selected',
    );
  });

  it('should not show feedback buttons when showFeedback is false', () => {
    render(
      <BpkChatBubble type="bot">Here is some information</BpkChatBubble>,
    );
    expect(
      screen.queryByTestId('bpk-thumb-button-up'),
    ).not.toBeInTheDocument();
  });

  it('should apply animationDelay as CSS custom property', () => {
    render(
      <BpkChatBubble type="bot" animationDelay={150}>
        Delayed bubble
      </BpkChatBubble>,
    );
    const el = screen.getByTestId('bpk-chat-bubble');
    expect(el).toHaveStyle('--anim-delay: 150ms');
  });

  it('should clamp animationDelay above 300 to 300ms', () => {
    render(
      <BpkChatBubble type="bot" animationDelay={999}>
        Clamped delay
      </BpkChatBubble>,
    );
    const el = screen.getByTestId('bpk-chat-bubble');
    expect(el).toHaveStyle('--anim-delay: 300ms');
  });
});
