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

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseChatbotInputManagerOptions {
  isSending?: boolean;
  onSubmit: (value: string) => void;
  sendMessage?: (message: string) => Promise<void>;
  onPromptClick?: (id: string, promptText?: string) => void;
  isModalOpen?: boolean;
  autoClearOnSendingComplete?: boolean;
  autoClearOnModalClose?: boolean;
  autoClearOnClose?: boolean;
  isOpen?: boolean;
}

interface UseChatbotInputManagerReturn {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleInputChange: (value: string) => void;
  handleSubmit: () => Promise<void> | void;
  handlePromptClick?: (id: string, promptText?: string) => void;
}

const useChatbotInputManager = ({
  autoClearOnClose = false,
  autoClearOnModalClose = false,
  autoClearOnSendingComplete = false,
  isModalOpen = false,
  isOpen,
  isSending = false,
  onPromptClick,
  onSubmit,
  sendMessage,
}: UseChatbotInputManagerOptions): UseChatbotInputManagerReturn => {
  const [inputValue, setInputValue] = useState('');
  const previousIsSending = useRef(isSending);
  const previousIsModalOpen = useRef(isModalOpen);
  const previousIsOpen = useRef(isOpen);

  useEffect(() => {
    if (autoClearOnSendingComplete && previousIsSending.current && !isSending) {
      setInputValue('');
    }
    previousIsSending.current = isSending;
  }, [isSending, autoClearOnSendingComplete]);

  useEffect(() => {
    if (autoClearOnModalClose && previousIsModalOpen.current && !isModalOpen) {
      setInputValue('');
    }
    previousIsModalOpen.current = isModalOpen;
  }, [isModalOpen, autoClearOnModalClose]);

  useEffect(() => {
    if (autoClearOnClose && previousIsOpen.current && !isOpen) {
      setInputValue('');
    }
    previousIsOpen.current = isOpen;
  }, [isOpen, autoClearOnClose]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(async () => {
    const userMessage = inputValue.trim();

    if (!userMessage || isSending) {
      return;
    }

    setInputValue('');
    onSubmit(userMessage);

    if (sendMessage) {
      await sendMessage(userMessage);
    }
  }, [inputValue, isSending, onSubmit, sendMessage]);

  const handlePromptClick = useCallback(
    (id: string, promptText?: string) => {
      if (promptText && !isSending && onPromptClick) {
        setInputValue(promptText);
      }
      onPromptClick?.(id, promptText);
    },
    [isSending, onPromptClick],
  );

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleSubmit,
    ...(onPromptClick && { handlePromptClick }),
  };
};

export default useChatbotInputManager;
