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

import { useEffect } from 'react';
import type { RefObject } from 'react';

import { BpkFlex, BpkSpacing } from '../../bpk-component-layout';
import { getDataComponentAttribute } from '../../bpk-react-utils';

import { useChatbotInputContext } from './BpkChatbotInputContext';
import InputField from './InputField/InputField';
import SendButton from './SendButton/SendButton';
import TextAreaField from './TextAreaField/TextAreaField';
import { CHATBOT_INPUT_TYPES } from './common-types';
import { MAX_CHARACTERS } from './constants';
import { useChatbotInput } from './hooks';

import type { BpkChatbotInputInputProps } from './common-types';
import type { BpkFlexProps } from '../../bpk-component-layout';

const BpkChatbotInputInput = ({
  inputValue,
  isPolling = false,
  isSending = false,
  loadingAriaLabel,
  maxCharacters = MAX_CHARACTERS,
  maxLines,
  onInputBlur,
  onInputChange,
  onInputClick = () => {},
  onInputFocus,
  onKeyDown = () => {},
  onSubmit,
  placeholder,
  renderSendButton,
  sendAriaLabel,
}: BpkChatbotInputInputProps) => {
  const { inputType, setIsOverLimit } = useChatbotInputContext();

  const {
    containerHeight,
    handleSubmit,
    inputProps,
    inputRef,
    isCapped,
    isCars,
    isExpanding,
    isOverLimit,
    sendButtonDisabled,
    textareaHeight,
  } = useChatbotInput({
    placeholder,
    inputType,
    inputValue,
    isPolling,
    isSending,
    maxCharacters,
    maxLines,
    onInputBlur,
    onInputChange,
    onInputClick,
    onInputFocus,
    onKeyDown,
    onSubmit,
  });

  useEffect(() => {
    setIsOverLimit(isOverLimit);
  }, [isOverLimit, setIsOverLimit]);

  const isComposer = inputType === CHATBOT_INPUT_TYPES.COMPOSER;

  const flexProps: Partial<BpkFlexProps> = isCars
    ? {
        align: 'center',
        gap: BpkSpacing.MD,
      }
    : {
        align: isExpanding ? 'flex-end' : 'center',
        gap: BpkSpacing.Base,
      };

  return (
    <BpkFlex width="100%" {...flexProps} {...getDataComponentAttribute('ChatbotInput.Input')}>
      {isCars ? (
        <InputField
          ref={inputRef as RefObject<HTMLInputElement>}
          {...inputProps}
        />
      ) : (
        <TextAreaField
          ref={inputRef as RefObject<HTMLTextAreaElement>}
          containerHeight={containerHeight}
          textareaHeight={textareaHeight}
          isCapped={isCapped}
          isExpanding={isExpanding}
          isComposer={isComposer}
          maxLines={maxLines}
          {...inputProps}
        />
      )}
      {renderSendButton ? renderSendButton({
        disabled: sendButtonDisabled,
        onClick: handleSubmit,
        loading: !!(isCars && isPolling),
        ariaLabel: isCars && isPolling ? loadingAriaLabel : sendAriaLabel,
      }) : (
        <SendButton
          disabled={sendButtonDisabled}
          onClick={handleSubmit}
          ariaLabel={sendAriaLabel}
        />
      )}
    </BpkFlex>
  );
};

export default BpkChatbotInputInput;
