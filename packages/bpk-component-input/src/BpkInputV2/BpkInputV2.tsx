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

import type { MouseEvent } from 'react';
import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';

import { withButtonAlignment } from '../../../bpk-component-icon';
import ClearIcon from '../../../bpk-component-icon/sm/close-circle';
import { cssModules } from '../../../bpk-react-utils';

import { CLEAR_BUTTON_MODES } from './common-types';

import type { BpkInputV2Props } from './common-types';

import STYLES from './BpkInputV2.module.scss';

const getClassName = cssModules(STYLES);

const ClearButtonIcon = withButtonAlignment(ClearIcon);

/**
 * BpkInputV2 is built using native HTML input elements with ark-ui patterns,
 * providing enhanced functionality whilst maintaining Backpack's visual identity.
 *
 * This component supports text input with validation states, clear button functionality,
 * size variants, docked layouts, and multiple input types (text, email, password, tel, number).
 *
 * Use BpkInputGroup to add start/end elements like currency symbols or unit labels.
 *
 * @example
 * ```tsx
 * <BpkInputV2 id="test" name="test" value={value} onChange={handleChange} />
 * ```
 */
const BpkInputV2 = forwardRef<HTMLInputElement, BpkInputV2Props>((props, forwardedRef) => {
  const {
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
    size, // Extract from rest to avoid conflict with Chakra's size prop
    type = 'text',
    valid,
    value,
    ...rest
  } = props;

  // State for clear button persistence during click
  const [persistClearButton, setPersistClearButton] = useState(false);

  // Internal ref for input element
  const internalRef = useRef<HTMLInputElement>(null);

  // Combine internal and forwarded refs
  useEffect(() => {
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(internalRef.current);
      } else if (internalRef.current) {
        // eslint-disable-next-line no-param-reassign
        forwardedRef.current = internalRef.current;
      }
    }
    if (inputRef && internalRef.current) {
      inputRef(internalRef.current);
    }
  }, [forwardedRef, inputRef]);

  // Build CSS class names
  const classNames = [getClassName('bpk-input-v2')];
  const containerClassNames = [getClassName('bpk-input-v2__container')];
  const clearButtonClassNames = [getClassName('bpk-input-v2__clear-button')];

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const clearable =
    clearButtonMode && clearButtonMode !== CLEAR_BUTTON_MODES.never;

  // Apply validation classes
  if (valid) {
    classNames.push(getClassName('bpk-input-v2--valid'));
  } else if (isInvalid) {
    classNames.push(getClassName('bpk-input-v2--invalid'));
  }

  // Apply large variant classes
  if (large) {
    classNames.push(getClassName('bpk-input-v2--large'));
    clearButtonClassNames.push(
      getClassName('bpk-input-v2__clear-button--large'),
    );
  }

  // Apply clearable classes
  if (clearable) {
    classNames.push(getClassName('bpk-input-v2--clearable'));
    if (
      clearButtonMode === CLEAR_BUTTON_MODES.always ||
      persistClearButton
    ) {
      classNames.push(getClassName('bpk-input-v2--persistent-clearable'));
      clearButtonClassNames.push(
        getClassName('bpk-input-v2__clear-button--persistent'),
      );
    }
  }

  // Apply docked layout classes
  if (docked) {
    classNames.push(getClassName('bpk-input-v2--docked'));
  }
  if (dockedFirst) {
    classNames.push(getClassName('bpk-input-v2--docked-first'));
  }
  if (dockedMiddle) {
    classNames.push(getClassName('bpk-input-v2--docked-middle'));
  }
  if (dockedLast) {
    classNames.push(getClassName('bpk-input-v2--docked-last'));
  }

  // Apply custom className
  if (className) {
    if (clearable) {
      containerClassNames.push(className);
    } else {
      classNames.push(className);
    }
  }

  // Mouse down handler persists clear button during click
  const handleMouseDown = useCallback(() => {
    setPersistClearButton(true);
  }, []);

  // Clear button click handler
  const handleClear = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (internalRef.current) {
        internalRef.current.focus();
      }
      if (onClear) {
        if (e.target instanceof HTMLButtonElement) {
          const { target } = e;
          target.name = name;
        }
        onClear(e);
        setPersistClearButton(false);
      }
    },
    [name, onClear],
  );

  // Render native HTML input with Backpack styling
  const renderedInput = (
    <input
      ref={internalRef}
      className={classNames.join(' ')}
      aria-invalid={isInvalid}
      value={value}
      name={name}
      type={type}
      {...rest}
    />
  );

  // Return wrapped input with clear button if clearable
  return clearable ? (
    <div className={containerClassNames.join(' ')}>
      {renderedInput}
      {`${value}`.length > 0 && (
        <button
          type="button"
          title={clearButtonLabel || ''}
          aria-label={clearButtonLabel || ''}
          tabIndex={-1}
          onMouseDown={handleMouseDown}
          onClick={handleClear}
          className={clearButtonClassNames.join(' ')}
        >
          <ClearButtonIcon
            focusable="false" // prevents focus on IE11
            fill="currentcolor"
          />
        </button>
      )}
    </div>
  ) : (
    renderedInput
  );
});

BpkInputV2.displayName = 'BpkInputV2';

export default BpkInputV2;
