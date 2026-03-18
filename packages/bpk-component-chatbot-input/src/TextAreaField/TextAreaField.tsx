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

import { forwardRef, useId } from 'react';

import { cssModules } from '../../../bpk-react-utils';
import { useInputHandlers } from '../hooks';

import type { BaseInputFieldProps } from '../common-types';

import STYLES from './TextAreaField.module.scss';

const getClassName = cssModules(STYLES);

interface TextAreaFieldProps extends BaseInputFieldProps {
  containerHeight: number;
  textareaHeight: number;
  shouldReduceParentPadding: boolean;
  isExpanding: boolean;
  isComposer: boolean;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      containerHeight,
      dataTestId,
      disabled = false,
      isComposer,
      isExpanding,
      isOverLimit = false,
      onInputBlur,
      onInputChange,
      onInputClick,
      onInputFocus,
      onKeyDown,
      placeholder,
      shouldReduceParentPadding,
      textareaHeight,
      value,
    },
    ref,
  ) => {
    const {
      handleInputChange,
      handleInputClick,
      handleTouchEnd,
      handleTouchStart,
    } = useInputHandlers(ref, onInputChange, onInputClick);

    const id = useId();

    return (
      <div
        className={getClassName('bpk-chatbot-textarea-field__container', {
          'bpk-chatbot-textarea-field__container--expanding': isExpanding,
          'bpk-chatbot-textarea-field__container--overLimit': isOverLimit,
        })}
        style={{ height: `${containerHeight}px` }}
      >
        <div
          className={getClassName(
            'bpk-chatbot-textarea-field__field',
            shouldReduceParentPadding &&
              'bpk-chatbot-textarea-field__field--fifthLine',
          )}
        >
          <label
            htmlFor={id}
            className={getClassName('bpk-chatbot-textarea-field__label')}
          >
            {placeholder}
          </label>
          <textarea
            ref={ref}
            id={id}
            className={getClassName(
              'bpk-chatbot-textarea-field__textarea',
              isComposer && 'bpk-chatbot-textarea-field__textarea--with-shadow',
            )}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onClick={handleInputClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            disabled={disabled}
            aria-label={placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="sentences"
            spellCheck="true"
            tabIndex={0}
            data-testid={dataTestId}
            rows={1}
            style={{ height: `${textareaHeight}px`, resize: 'none' }}
          />
        </div>
      </div>
    );
  },
);

export default TextAreaField;
