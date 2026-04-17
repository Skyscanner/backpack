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

import BpkButton, { BUTTON_TYPES, SIZE_TYPES } from '../../bpk-component-button';
import { withButtonAlignment } from '../../bpk-component-icon';
import ArrowUpIcon from '../../bpk-component-icon/sm/long-arrow-up';
import { BpkFlex, BpkSpacing } from '../../bpk-component-layout';
import { getDataComponentAttribute } from '../../bpk-react-utils';

import { useChatbotInputContext } from './BpkChatbotInputContext';
import InputField from './InputField/InputField';
import TextAreaField from './TextAreaField/TextAreaField';
import { CHATBOT_INPUT_TYPES } from './common-types';
import { MAX_CHARACTERS } from './constants';
import { useChatbotInput } from './hooks';

import type { BpkChatbotInputInputProps } from './common-types';
import type { BpkFlexProps } from '../../bpk-component-layout';

const AlignedArrowUpIcon = withButtonAlignment(ArrowUpIcon);

// BpkChatbotInputInput renders the text entry area of a chatbot input, supporting both a
// single-line input field and a multi-line textarea. It handles character-limit tracking,
// send-button rendering, and loading/polling states.
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
        loading: isPolling,
        ariaLabel: isPolling ? loadingAriaLabel : sendAriaLabel,
      }) : (
        <BpkButton
          type={BUTTON_TYPES.primary}
          size={SIZE_TYPES.small}
          iconOnly
          onClick={handleSubmit}
          disabled={sendButtonDisabled}
          loading={isPolling}
          aria-label={isPolling ? loadingAriaLabel : sendAriaLabel}
          data-testid="bpk-chatbot-input-send"
        >
          <AlignedArrowUpIcon />
        </BpkButton>
      )}
    </BpkFlex>
  );
};

export default BpkChatbotInputInput;
