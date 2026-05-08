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

import { act, renderHook } from '@testing-library/react';

import useChatbotInputManager from './useChatbotInputManager';

describe('useChatbotInputManager', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleInputChange', () => {
    it('should update inputValue', () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      act(() => {
        result.current.handleInputChange('hello');
      });

      expect(result.current.inputValue).toBe('hello');
    });
  });

  describe('handleSubmit', () => {
    it('should call onSubmit and clear input with valid text', async () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      act(() => {
        result.current.handleInputChange('hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).toHaveBeenCalledWith('hello');
      expect(result.current.inputValue).toBe('');
    });

    it('should not call onSubmit when input is empty', async () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when input is whitespace only', async () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      act(() => {
        result.current.handleInputChange('   ');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when isSending is true', async () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit, isSending: true }),
      );

      act(() => {
        result.current.handleInputChange('hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call sendMessage when provided', async () => {
      const mockSendMessage = jest.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() =>
        useChatbotInputManager({
          onSubmit: mockOnSubmit,
          sendMessage: mockSendMessage,
        }),
      );

      act(() => {
        result.current.handleInputChange('hello');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).toHaveBeenCalledWith('hello');
      expect(mockSendMessage).toHaveBeenCalledWith('hello');
    });

    it('should trim text before submitting', async () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      act(() => {
        result.current.handleInputChange('  hello  ');
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockOnSubmit).toHaveBeenCalledWith('hello');
    });
  });

  describe('autoClearOnSendingComplete', () => {
    it('should clear input when isSending transitions from true to false', () => {
      const { rerender, result } = renderHook(
        ({ isSending }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isSending,
            autoClearOnSendingComplete: true,
          }),
        { initialProps: { isSending: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isSending: false });

      expect(result.current.inputValue).toBe('');
    });

    it('should not clear input when autoClearOnSendingComplete is false', () => {
      const { rerender, result } = renderHook(
        ({ isSending }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isSending,
            autoClearOnSendingComplete: false,
          }),
        { initialProps: { isSending: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isSending: false });

      expect(result.current.inputValue).toBe('hello');
    });

    it('should not clear input when isSending transitions from false to true', () => {
      const { rerender, result } = renderHook(
        ({ isSending }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isSending,
            autoClearOnSendingComplete: true,
          }),
        { initialProps: { isSending: false } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isSending: true });

      expect(result.current.inputValue).toBe('hello');
    });
  });

  describe('autoClearOnModalClose', () => {
    it('should clear input when isModalOpen transitions from true to false', () => {
      const { rerender, result } = renderHook(
        ({ isModalOpen }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isModalOpen,
            autoClearOnModalClose: true,
          }),
        { initialProps: { isModalOpen: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isModalOpen: false });

      expect(result.current.inputValue).toBe('');
    });

    it('should not clear input when autoClearOnModalClose is false', () => {
      const { rerender, result } = renderHook(
        ({ isModalOpen }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isModalOpen,
            autoClearOnModalClose: false,
          }),
        { initialProps: { isModalOpen: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isModalOpen: false });

      expect(result.current.inputValue).toBe('hello');
    });
  });

  describe('autoClearOnClose', () => {
    it('should clear input when isOpen transitions from true to false', () => {
      const { rerender, result } = renderHook(
        ({ isOpen }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isOpen,
            autoClearOnClose: true,
          }),
        { initialProps: { isOpen: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isOpen: false });

      expect(result.current.inputValue).toBe('');
    });

    it('should not clear input when autoClearOnClose is false', () => {
      const { rerender, result } = renderHook(
        ({ isOpen }) =>
          useChatbotInputManager({
            onSubmit: mockOnSubmit,
            isOpen,
            autoClearOnClose: false,
          }),
        { initialProps: { isOpen: true } },
      );

      act(() => {
        result.current.setInputValue('hello');
      });

      rerender({ isOpen: false });

      expect(result.current.inputValue).toBe('hello');
    });
  });

  describe('handlePromptClick', () => {
    it('should set inputValue and call onPromptClick when promptText is provided', () => {
      const mockOnPromptClick = jest.fn();
      const { result } = renderHook(() =>
        useChatbotInputManager({
          onSubmit: mockOnSubmit,
          onPromptClick: mockOnPromptClick,
        }),
      );

      act(() => {
        result.current.handlePromptClick?.('prompt-1', 'Hello world');
      });

      expect(result.current.inputValue).toBe('Hello world');
      expect(mockOnPromptClick).toHaveBeenCalledWith('prompt-1', 'Hello world');
    });

    it('should not set inputValue when promptText is not provided', () => {
      const mockOnPromptClick = jest.fn();
      const { result } = renderHook(() =>
        useChatbotInputManager({
          onSubmit: mockOnSubmit,
          onPromptClick: mockOnPromptClick,
        }),
      );

      act(() => {
        result.current.handlePromptClick?.('prompt-1');
      });

      expect(result.current.inputValue).toBe('');
      expect(mockOnPromptClick).toHaveBeenCalledWith('prompt-1', undefined);
    });

    it('should not set inputValue when isSending is true', () => {
      const mockOnPromptClick = jest.fn();
      const { result } = renderHook(() =>
        useChatbotInputManager({
          onSubmit: mockOnSubmit,
          onPromptClick: mockOnPromptClick,
          isSending: true,
        }),
      );

      act(() => {
        result.current.handlePromptClick?.('prompt-1', 'Hello world');
      });

      expect(result.current.inputValue).toBe('');
      expect(mockOnPromptClick).toHaveBeenCalledWith('prompt-1', 'Hello world');
    });

    it('should not include handlePromptClick in return when onPromptClick is not provided', () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({ onSubmit: mockOnSubmit }),
      );

      expect(result.current.handlePromptClick).toBeUndefined();
    });

    it('should include handlePromptClick in return when onPromptClick is provided', () => {
      const { result } = renderHook(() =>
        useChatbotInputManager({
          onSubmit: mockOnSubmit,
          onPromptClick: jest.fn(),
        }),
      );

      expect(result.current.handlePromptClick).toBeDefined();
    });
  });
});
