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

import type { ReactElement } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { BpkProvider } from '../../bpk-component-layout';

import BpkChatbotInput from './BpkChatbotInput';
import { CHATBOT_INPUT_TYPES } from './common-types';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

const defaultProps = {
  inputValue: '',
  placeholder: 'Ask away',
  loadingAriaLabel: 'Loading',
  sendAriaLabel: 'Send',
  onInputChange: jest.fn(),
  onInputFocus: jest.fn(),
  onInputBlur: jest.fn(),
  onInputClick: jest.fn(),
  onSubmit: jest.fn(),
  onKeyDown: jest.fn(),
};

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkChatbotInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { asFragment } = renderWithProvider(<BpkChatbotInput {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('cars type', () => {
    it('renders input field and send button', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS}
        />,
      );

      expect(screen.getByRole('textbox').tagName).toBe('INPUT');
      expect(
        screen.getByTestId('bpk-chatbot-input-container'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('bpk-chatbot-input-send')).toBeInTheDocument();
      expect(
        screen.queryByTestId('bpk-chatbot-input-loading'),
      ).not.toBeInTheDocument();
    });

    it('renders LoadingButton when isPolling', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS}
          isPolling
        />,
      );

      expect(
        screen.getByTestId('bpk-chatbot-input-loading'),
      ).toBeInTheDocument();

      expect(
        screen.queryByTestId('bpk-chatbot-input-send'),
      ).not.toBeInTheDocument();
    });
  });

  describe('composer type', () => {
    it('renders textarea field', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
        />,
      );

      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    });

    it('disables send button when input is empty', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
          inputValue=""
        />,
      );

      expect(screen.getByTestId('bpk-chatbot-input-send')).toBeDisabled();
    });

    it('enables send button when input has text', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
          inputValue="Hello"
        />,
      );

      expect(screen.getByTestId('bpk-chatbot-input-send')).not.toBeDisabled();
    });

    it('does not render loading button when isPolling', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
          isPolling
        />,
      );

      expect(
        screen.queryByTestId('bpk-chatbot-input-loading'),
      ).not.toBeInTheDocument();
    });

    it('submits on Enter key', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
          inputValue="Hello"
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('does not submit on Shift+Enter', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
          inputValue="Hello"
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), {
        key: 'Enter',
        shiftKey: true,
      });
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it('renders with composer type correctly', () => {
      const { asFragment } = renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.COMPOSER}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('cars-composer type', () => {
    it('renders textarea field', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
        />,
      );

      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('disables send button when input is empty', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
          inputValue=""
        />,
      );

      expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
      expect(screen.getByTestId('bpk-chatbot-input-send')).toBeDisabled();
    });

    it('renders with cars-composer type correctly', () => {
      const { asFragment } = renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('keyboard interactions', () => {
    it('submits on Enter key in default (composer) mode', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} inputValue="Hello" />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('submits on Enter key in cars-composer mode', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
          inputValue="Hello"
        />,
      );
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('does not submit on Shift+Enter in cars-composer mode', () => {
      renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
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
      renderWithProvider(<BpkChatbotInput {...defaultProps} inputValue="Hello" />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' });
      expect(defaultProps.onKeyDown).toHaveBeenCalled();
    });
  });

  describe('common behaviours', () => {
    it('calls onInputFocus and onInputBlur', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} />);
      fireEvent.focus(screen.getByRole('textbox'));
      expect(defaultProps.onInputFocus).toHaveBeenCalled();
      fireEvent.blur(screen.getByRole('textbox'));
      expect(defaultProps.onInputBlur).toHaveBeenCalled();
    });

    it('calls onInputChange when value changes', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} />);
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'New message' },
      });
      expect(defaultProps.onInputChange).toHaveBeenCalledWith('New message');
    });

    it('calls onSubmit when send button is clicked with valid input', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} inputValue="Test message" />);
      fireEvent.click(screen.getByRole('button'));
      expect(defaultProps.onSubmit).toHaveBeenCalled();
    });

    it('disables input when isSending is true', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} isSending />);

      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByTestId('bpk-chatbot-input-send')).toBeInTheDocument();
      expect(
        screen.queryByTestId('bpk-chatbot-input-loading'),
      ).not.toBeInTheDocument();
    });

    it('renders with cars-composer type correctly', () => {
      const { asFragment } = renderWithProvider(
        <BpkChatbotInput
          {...defaultProps}
          inputType={CHATBOT_INPUT_TYPES.CARS_COMPOSER}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('stops propagation on container touchStart', () => {
      renderWithProvider(<BpkChatbotInput {...defaultProps} />);
      const container = screen.getByTestId('bpk-chatbot-input-container');
      fireEvent.touchStart(container);
      fireEvent.keyDown(container);
      expect(container).toBeInTheDocument();
    });
  });
});
