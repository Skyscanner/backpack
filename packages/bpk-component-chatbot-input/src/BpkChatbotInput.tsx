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

import type { MouseEvent, RefObject, TouchEvent } from 'react';

import { BpkFlex, BpkSpacing } from '../../bpk-component-layout';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import InputField from './InputField/InputField';
import SendButton from './SendButton/SendButton';
import TextAreaField from './TextAreaField/TextAreaField';
import { CHATBOT_INPUT_TYPES } from './common-types';
import { MAX_CHARACTERS } from './constants';
import { useChatbotInput } from './hooks';

import type { BpkChatbotInputProps } from './common-types';
import type { BpkFlexProps } from '../../bpk-component-layout';

import STYLES from './BpkChatbotInput.module.scss';

export type { BpkChatbotInputProps };

const getClassName = cssModules(STYLES);

const BpkChatbotInput = ({
  inputType = CHATBOT_INPUT_TYPES.COMPOSER,
  inputValue,
  isPolling = false,
  isSending = false,
  loadingAriaLabel,
  maxCharacters = MAX_CHARACTERS,
  onInputBlur,
  onInputChange,
  onInputClick = () => {},
  onInputFocus,
  onKeyDown = () => {},
  onSubmit,
  placeholder,
  sendAriaLabel,
}: BpkChatbotInputProps) => {
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
    onInputBlur,
    onInputChange,
    onInputClick,
    onInputFocus,
    onKeyDown,
    onSubmit,
  });

  const isComposer = inputType === CHATBOT_INPUT_TYPES.COMPOSER;

  const containerClassName = getClassName(
    isCars ? 'bpk-chatbot-input--cars' : 'bpk-chatbot-input--composer',
    isComposer && 'bpk-chatbot-input--composer--with-shadow',
    isOverLimit && !isCars && 'bpk-chatbot-input--composer--overLimit',
  );

  const flexProps: Partial<BpkFlexProps> = isCars
    ? {
        align: 'center',
        gap: BpkSpacing.MD,
        paddingTop: BpkSpacing.MD,
        paddingBottom: BpkSpacing.MD,
        paddingEnd: BpkSpacing.MD,
        paddingStart: BpkSpacing.Base,
      }
    : {
        align: isExpanding ? 'flex-end' : 'center',
        gap: BpkSpacing.Base,
        padding: BpkSpacing.Base,
      };

  const handleContainerEvent = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
  };

  return (
    <div
      className={containerClassName}
      onClick={handleContainerEvent}
      onTouchStart={handleContainerEvent}
      role="presentation"
      data-testid="bpk-chatbot-input-container"
      {...getDataComponentAttribute('ChatbotInput')}
    >
      <BpkFlex {...flexProps}>
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
            {...inputProps}
          />
        )}
        <SendButton
          isCars={isCars}
          disabled={sendButtonDisabled}
          onClick={handleSubmit}
          ariaLabel={isCars && isPolling ? loadingAriaLabel : sendAriaLabel}
          isLoading={!!(isCars && isPolling)}
        />
      </BpkFlex>
    </div>
  );
};

export default BpkChatbotInput;
