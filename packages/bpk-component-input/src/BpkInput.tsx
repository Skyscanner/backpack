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

import { useState, forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkClearButton from './BpkClearButton';
import STYLES from './BpkInput.module.scss';
import { CLEAR_BUTTON_MODES, defaultProps } from './common-types';
import type { Props } from './common-types';

const getClassName = cssModules(STYLES);

const BpkInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      clearButtonLabel,
      clearButtonMode,
      docked,
      dockedFirst,
      dockedLast,
      dockedMiddle,
      inputRef,
      large,
      name,
      onClear,
      valid,
      value,
      ...rest
    },
    forwardedRef,
  ) => {
    const classNames = [getClassName('bpk-input')];
    const containerClassNames = [getClassName('bpk-input__container')];
    const clearButtonClassNames = [getClassName('bpk-input__clear-button')];
    const [persistClearButton, setPersistClearButton] = useState(false);

    // Used as a ref for focussing the input when cleared.
    let ref: HTMLInputElement | null = null;

    // Explicit check for false primitive value as undefined is
    // treated as neither valid nor invalid
    const isInvalid = valid === false;

    const clearable =
      clearButtonMode && clearButtonMode !== CLEAR_BUTTON_MODES.never;

    if (valid) {
      classNames.push(getClassName('bpk-input--valid'));
    } else if (isInvalid) {
      classNames.push(getClassName('bpk-input--invalid'));
    }

    if (large) {
      classNames.push(getClassName('bpk-input--large'));
      clearButtonClassNames.push(
        getClassName('bpk-input__clear-button--large'),
      );
    }
    if (clearable) {
      classNames.push(getClassName('bpk-input--clearable'));
      if (clearButtonMode === CLEAR_BUTTON_MODES.always || persistClearButton) {
        classNames.push(getClassName('bpk-input--persistent-clearable'));
        clearButtonClassNames.push(
          getClassName('bpk-input__clear-button--persistent'),
        );
      }
    }

    if (docked) {
      classNames.push(getClassName('bpk-input--docked'));
    }
    if (dockedFirst) {
      classNames.push(getClassName('bpk-input--docked-first'));
    }
    if (dockedMiddle) {
      classNames.push(getClassName('bpk-input--docked-middle'));
    }
    if (dockedLast) {
      classNames.push(getClassName('bpk-input--docked-last'));
    }
    if (className) {
      if (clearable) {
        containerClassNames.push(className);
      } else {
        classNames.push(className);
      }
    }

    const renderedInput = (
      <input
        className={classNames.join(' ')}
        ref={
          forwardedRef ||
          ((input: HTMLInputElement) => {
            ref = input;
            if (inputRef) {
              inputRef(input);
            }
          })
        }
        aria-invalid={isInvalid}
        value={value}
        name={name}
        {...rest}
      />
    );

    // When we mouseDown, we should persist the clear button.
    const onMouseDown = () => {
      setPersistClearButton(true);
    };

    return clearable ? (
      <div className={containerClassNames.join(' ')}>
        {renderedInput}
        {value.length > 0 && (
          <BpkClearButton
            tabIndex={-1}
            label={clearButtonLabel || ''}
            onMouseDown={onMouseDown}
            onClick={(e) => {
              if (onClear) {
                if (ref) {
                  ref.focus();
                }
                if (e.target instanceof HTMLButtonElement) {
                  const { target } = e;
                  target.name = name;
                }
                onClear(e);
                setPersistClearButton(false);
              }
            }}
            className={clearButtonClassNames.join(' ')}
          />
        )}
      </div>
    ) : (
      renderedInput
    );
  },
);

BpkInput.defaultProps = defaultProps;

export default BpkInput;
