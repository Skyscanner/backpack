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

import { forwardRef } from 'react';
import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

import { cssModules } from '../../../bpk-react-utils';
import { useInputHandlers } from '../hooks';

import type { BaseInputFieldProps } from '../types';

import STYLES from './InputField.module.scss';

const getClassName = cssModules(STYLES);

const InputField = forwardRef<HTMLInputElement, BaseInputFieldProps>(
  (
    {
      dataTestId,
      disabled = false,
      onInputBlur,
      onInputChange,
      onInputClick,
      onInputFocus,
      onKeyDown,
      placeholder,
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

    const handleWrapperEvent = (
      e:
        | MouseEvent<HTMLDivElement>
        | TouchEvent<HTMLDivElement>
        | KeyboardEvent<HTMLDivElement>,
    ) => {
      e.stopPropagation();
    };

    return (
      <div
        className={getClassName('bpk-chatbot-input-field')}
        onClick={handleWrapperEvent}
        onTouchStart={handleWrapperEvent}
        onKeyDown={handleWrapperEvent}
        role="presentation"
      >
        <label
          htmlFor="bpk-chatbot-input"
          className={getClassName('bpk-chatbot-input-field__label')}
        >
          {placeholder}
        </label>
        <input
          ref={ref}
          id="bpk-chatbot-input"
          type="text"
          className={getClassName('bpk-chatbot-input-field__input')}
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
          inputMode="text"
          enterKeyHint="send"
          data-testid={dataTestId}
        />
      </div>
    );
  },
);

export default InputField;
