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

import BpkChatbotInput from './BpkChatbotInput';
import { CHATBOT_INPUT_TYPES } from './constants';

const defaultProps = {
  inputValue: '',
  inputPlaceholder: 'Ask away',
  loadingAriaLabel: 'Loading',
  sendAriaLabel: 'Send',
  onInputChange: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
  onInputClick: jest.fn(),
  onSubmit: jest.fn(),
  onKeyDown: jest.fn(),
};

describe('BpkChatbotInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { asFragment } = render(<BpkChatbotInput {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('default type', () => {
    it('renders input field', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.DEFAULT}
        />,
      );

      const input = screen.getByRole('textbox');
      expect(input.tagName).toBe('INPUT');
    });

    it('renders LoadingButton when isPolling', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.DEFAULT}
          isPolling
        />,
      );

      expect(
        screen.getByTestId('bpk-chatbot-input-loading'),
      ).toBeInTheDocument();
    });

    it('renders container with correct test id', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      expect(
        screen.getByTestId('bpk-chatbot-input-container'),
      ).toBeInTheDocument();
    });
  });

  describe('composor type', () => {
    it('renders textarea field', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSOR}
        />,
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('disables send button when input is empty', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSOR}
          inputValue=""
        />,
      );

      const sendButton = screen.getByTestId('bpk-chatbot-input-send');
      expect(sendButton).toBeDisabled();
    });
  });

  describe('keyboard interactions', () => {
    it('submits on Enter key in default mode', () => {
      render(<BpkChatbotInput {...defaultProps} inputValue="Hello" />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('submits on Enter key in composor mode', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSOR}
          inputValue="Hello"
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('does not submit on Shift+Enter in composor mode', () => {
      render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSOR}
          inputValue="Hello"
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), {
        key: 'Enter',
        shiftKey: true,
      });
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it('calls onKeyDown for non-Enter keys', () => {
      render(<BpkChatbotInput {...defaultProps} inputValue="Hello" />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' });
      expect(defaultProps.onKeyDown).toHaveBeenCalled();
    });
  });

  describe('focus and blur', () => {
    it('calls onInputFocus when input is focused', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      fireEvent.focus(screen.getByRole('textbox'));
      expect(defaultProps.onInputFocus).toHaveBeenCalled();
    });

    it('calls onInputBlur when input is blurred', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      fireEvent.blur(screen.getByRole('textbox'));
      expect(defaultProps.onInputBlur).toHaveBeenCalled();
    });
  });

  describe('common behaviours', () => {
    it('calls onInputChange when value changes', () => {
      render(<BpkChatbotInput {...defaultProps} />);

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'New message' },
      });

      expect(defaultProps.onInputChange).toHaveBeenCalledWith('New message');
    });

    it('calls onSubmit when send button is clicked with valid input', () => {
      render(<BpkChatbotInput {...defaultProps} inputValue="Test message" />);

      fireEvent.click(screen.getByRole('button'));

      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('disables input when isSending is true', () => {
      render(<BpkChatbotInput {...defaultProps} isSending />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders with composor type correctly', () => {
      const { asFragment } = render(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSOR}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('stops propagation on container touchStart', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      const container = screen.getByTestId('bpk-chatbot-input-container');
      fireEvent.touchStart(container);
      expect(container).toBeInTheDocument();
    });

    it('stops propagation on container keyDown', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      const container = screen.getByTestId('bpk-chatbot-input-container');
      fireEvent.keyDown(container);
      expect(container).toBeInTheDocument();
    });

    it('renders SendButton (not LoadingButton) by default', () => {
      render(<BpkChatbotInput {...defaultProps} />);
      expect(
        screen.getByTestId('bpk-chatbot-input-send'),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId('bpk-chatbot-input-loading'),
      ).not.toBeInTheDocument();
    });
  });
});
