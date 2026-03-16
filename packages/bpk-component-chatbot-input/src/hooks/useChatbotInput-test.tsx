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

import type { KeyboardEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { CHATBOT_INPUT_TYPES, MAX_CHARACTERS } from '../constants';

import useChatbotInput from './useChatbotInput';

jest.mock('./useTextAreaAutoResize', () => () => ({
  isExpanding: false,
  textareaHeight: 40,
  containerHeight: 56,
  shouldReduceParentPadding: false,
  scrollToBottom: jest.fn(),
}));

describe('useChatbotInput', () => {
  const mockOnSubmit = jest.fn();
  const mockOnInputClick = jest.fn();

  const createProps = (overrides = {}) => ({
    inputValue: '',
    onSubmit: mockOnSubmit,
    onInputChange: jest.fn(),
    onInputFocus: jest.fn(),
    onInputBlur: jest.fn(),
    onInputClick: mockOnInputClick,
    onKeyDown: jest.fn(),
    placeholder: '',
    ...overrides,
  });

  const renderUseChatbotInput = (props = {}) =>
    renderHook(() => useChatbotInput(createProps(props)));

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnInputClick.mockClear();
  });

  describe('default type', () => {
    it('should enable send button when not focused and empty', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.DEFAULT,
      });

      expect(result.current.isDefault).toBe(true);
      expect(result.current.sendButtonDisabled).toBe(false);
    });

    it('should disable send button when focused but empty', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.DEFAULT,
      });

      act(() => {
        result.current.inputProps.onInputFocus();
      });

      expect(result.current.sendButtonDisabled).toBe(true);
    });

    it('should enable send button when has valid text', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.DEFAULT,
        inputValue: 'Hello',
      });

      expect(result.current.sendButtonDisabled).toBe(false);
    });
  });

  describe('composer type', () => {
    it('should disable send button when empty or whitespace', () => {
      const { result: emptyResult } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
      });

      expect(emptyResult.current.isDefault).toBe(false);
      expect(emptyResult.current.sendButtonDisabled).toBe(true);

      const { result: whitespaceResult } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
        inputValue: '   ',
      });

      expect(whitespaceResult.current.sendButtonDisabled).toBe(true);
    });

    it('should enable send button when has valid text', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
        inputValue: 'Hello',
      });

      expect(result.current.sendButtonDisabled).toBe(false);
    });
  });

  describe('common behavior', () => {
    it('should disable when isSending or isPolling', () => {
      const { result: sendingResult } = renderUseChatbotInput({
        isSending: true,
      });

      expect(sendingResult.current.isDisabled).toBe(true);
      expect(sendingResult.current.sendButtonDisabled).toBe(true);

      const { result: pollingResult } = renderUseChatbotInput({
        isPolling: true,
      });

      expect(pollingResult.current.isDisabled).toBe(true);
      expect(pollingResult.current.sendButtonDisabled).toBe(true);
    });

    it('should handle over limit state', () => {
      const longText = 'a'.repeat(MAX_CHARACTERS + 1);
      const { result } = renderUseChatbotInput({ inputValue: longText });

      expect(result.current.isOverLimit).toBe(true);
      expect(result.current.sendButtonDisabled).toBe(true);
      expect(result.current.inputProps.isOverLimit).toBe(true);
    });

    it('should call onSubmit only with valid trimmed text', () => {
      const { result: validResult } = renderUseChatbotInput({
        inputValue: 'Hello',
      });

      act(() => {
        validResult.current.handleSubmit();
      });

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);

      mockOnSubmit.mockClear();

      const { result: emptyResult } = renderUseChatbotInput({
        inputValue: '   ',
      });

      act(() => {
        emptyResult.current.handleSubmit();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should handle focus state changes', () => {
      const { result } = renderUseChatbotInput();

      expect(result.current.isFocused).toBe(false);

      act(() => {
        result.current.inputProps.onInputFocus();
      });

      expect(result.current.isFocused).toBe(true);

      act(() => {
        result.current.inputProps.onInputBlur();
      });

      expect(result.current.isFocused).toBe(false);
    });

    it('should handle Enter key to submit for default input type', () => {
      const { result } = renderUseChatbotInput({
        inputValue: 'Hello',
        onSubmit: mockOnSubmit,
      });

      const event = {
        key: 'Enter',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent;

      act(() => {
        result.current.inputProps.onKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('should handle Enter key to submit for composer input type (textarea)', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
        inputValue: 'Hello',
        onSubmit: mockOnSubmit,
      });

      const event = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent;

      act(() => {
        result.current.inputProps.onKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('should allow Shift+Enter key for newline in composer input type (textarea)', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
        inputValue: 'Hello',
        onSubmit: mockOnSubmit,
      });

      const event = {
        key: 'Enter',
        shiftKey: true,
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent;

      act(() => {
        result.current.inputProps.onKeyDown(event);
      });

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should allow space key for normal text input', () => {
      const { result } = renderUseChatbotInput();

      const event = {
        key: ' ',
        preventDefault: jest.fn(),
      } as unknown as KeyboardEvent;

      act(() => {
        result.current.inputProps.onKeyDown(event);
      });

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should return correct inputProps', () => {
      const { result } = renderUseChatbotInput({
        inputValue: 'Hello',
        placeholder: 'Enter message',
      });

      expect(result.current.inputProps.value).toBe('Hello');
      expect(result.current.inputProps.placeholder).toBe('Enter message');
      expect(result.current.inputProps.maxLength).toBe(MAX_CHARACTERS);
      expect(result.current.inputProps.dataTestId).toBe(
        'bpk-chatbot-input-field',
      );
    });

    it('should use empty string as default placeholder when not provided', () => {
      const { result } = renderUseChatbotInput({ inputValue: 'Hello' });

      expect(result.current.inputProps.placeholder).toBe('');
    });

    it('should use composer dataTestId for composer input type', () => {
      const { result } = renderUseChatbotInput({
        inputType: CHATBOT_INPUT_TYPES.COMPOSER,
      });

      expect(result.current.inputProps.dataTestId).toBe(
        'bpk-chatbot-textarea-field',
      );
    });

    it('should work without optional onInputClick and onKeyDown props', () => {
      const { result } = renderHook(() =>
        useChatbotInput({
          inputValue: 'Hello',
          onSubmit: mockOnSubmit,
          onInputChange: jest.fn(),
          onInputFocus: jest.fn(),
          onInputBlur: jest.fn(),
          placeholder: '',
        }),
      );

      expect(result.current.sendButtonDisabled).toBe(false);

      // Invoke the default no-op functions to ensure they are covered
      act(() => {
        result.current.inputProps.onInputClick();
        result.current.inputProps.onKeyDown({
          key: ' ',
        } as KeyboardEvent);
      });
    });
  });
});
