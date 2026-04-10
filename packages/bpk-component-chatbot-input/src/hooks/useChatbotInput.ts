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

import { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent, RefObject } from 'react';

import { CHATBOT_INPUT_TYPES } from '../common-types';
import { MAX_CHARACTERS } from '../constants';

import useTextAreaAutoResize from './useTextAreaAutoResize';

import type { BaseInputFieldProps, ChatbotInputType } from '../common-types';

interface UseChatbotInputOptions {
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onSubmit: () => void | Promise<void>;
  placeholder: string;
  isSending?: boolean;
  isPolling?: boolean;
  inputType?: ChatbotInputType;
  maxCharacters?: number;
  onInputClick?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

interface UseChatbotInputReturn {
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  isFocused: boolean;
  isDisabled: boolean;
  isOverLimit: boolean;
  isExpanding: boolean;
  isCars: boolean;
  sendButtonDisabled: boolean;
  inputProps: BaseInputFieldProps;
  handleSubmit: () => void;
  containerHeight: number;
  textareaHeight: number;
  isCapped: boolean;
}

const useChatbotInput = ({
  inputType = CHATBOT_INPUT_TYPES.COMPOSER,
  inputValue,
  isPolling = false,
  isSending = false,
  maxCharacters = MAX_CHARACTERS,
  onInputBlur,
  onInputChange,
  onInputClick = () => {},
  onInputFocus,
  onKeyDown = () => {},
  onSubmit,
  placeholder,
}: UseChatbotInputOptions): UseChatbotInputReturn => {
  const isCars = inputType === CHATBOT_INPUT_TYPES.CARS;
  const isMultiLine =
    inputType === CHATBOT_INPUT_TYPES.CARS_COMPOSER ||
    inputType === CHATBOT_INPUT_TYPES.COMPOSER;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const isOverLimit = inputValue.length > maxCharacters;
  const isDisabled = isSending || isPolling;

  const { containerHeight, isCapped, isExpanding, textareaHeight } =
    useTextAreaAutoResize({
      ref: inputRef as RefObject<HTMLTextAreaElement>,
      value: inputValue,
      enabled: isMultiLine,
    });

  const handleSubmit = useCallback(() => {
    if (inputValue.trim() && !isDisabled && !isOverLimit) {
      onSubmit();
    }
  }, [inputValue, onSubmit, isDisabled, isOverLimit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!isMultiLine) {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
          return;
        }
        if (!e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
          return;
        }
      }
      onKeyDown?.(e);
    },
    [isMultiLine, handleSubmit, onKeyDown],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    onInputFocus();
  }, [onInputFocus]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    onInputBlur();
  }, [onInputBlur]);

  const inputProps = {
    value: inputValue,
    placeholder,
    disabled: isDisabled,
    isOverLimit,
    onInputChange,
    onInputFocus: handleInputFocus,
    onInputBlur: handleInputBlur,
    onInputClick,
    onKeyDown: handleKeyDown,
    dataTestId: isMultiLine
      ? 'bpk-chatbot-textarea-field'
      : 'bpk-chatbot-input-field',
  };

  const sendButtonDisabled = isCars
    ? (isFocused && !inputValue.trim()) || isDisabled || isOverLimit
    : !inputValue.trim() || isDisabled || isOverLimit;

  return {
    inputRef,
    isFocused,
    isDisabled,
    isOverLimit,
    isExpanding,
    isCars,
    sendButtonDisabled,
    inputProps,
    handleSubmit,
    containerHeight,
    textareaHeight,
    isCapped,
  };
};

export default useChatbotInput;
