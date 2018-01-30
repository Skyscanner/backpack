/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import BpkClearButton from './BpkClearButton';
import CLEAR_BUTTON_MODES from './clearButtonModes';

import clearablePropType from './customPropTypes';
import STYLES from './bpk-input.scss';

const getClassName = cssModules(STYLES);

export const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  PASSWORD: 'password',
  TEL: 'tel',
};

const BpkInput = props => {
  const classNames = [getClassName('bpk-input')];
  const containerClassNames = [getClassName('bpk-input--clearable__container')];
  const clearButtonClassNames = [
    getClassName('bpk-input--clearable__clear-button'),
  ];
  const {
    className,
    clearButtonMode,
    clearButtonLabel,
    docked,
    dockedFirst,
    dockedLast,
    dockedMiddle,
    inputRef,
    large,
    onClear,
    valid,
    value,
    ...rest
  } = props;

  // Used as a ref for focussing the input when cleared.
  let ref = null;

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
      getClassName('bpk-input--clearable__clear-button--large'),
    );
  }
  if (clearable) {
    classNames.push(getClassName('bpk-input--clearable'));
    if (clearButtonMode === CLEAR_BUTTON_MODES.always) {
      classNames.push(getClassName('bpk-input--clearable--persistent'));
      clearButtonClassNames.push(
        getClassName('bpk-input--clearable--persistent__clear-button'),
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
      ref={input => {
        ref = input;
        if (inputRef) {
          inputRef(input);
        }
      }}
      aria-invalid={isInvalid}
      value={value}
      {...rest}
    />
  );

  return clearable ? (
    <div className={containerClassNames.join(' ')}>
      {renderedInput}
      {value.length > 0 && (
        <BpkClearButton
          tabIndex="-1"
          label={clearButtonLabel}
          onClick={e => {
            ref.focus();
            if (onClear) {
              onClear(e);
            }
          }}
          className={clearButtonClassNames.join(' ')}
        />
      )}
    </div>
  ) : (
    renderedInput
  );
};

BpkInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    INPUT_TYPES.TEXT,
    INPUT_TYPES.EMAIL,
    INPUT_TYPES.NUMBER,
    INPUT_TYPES.PASSWORD,
    INPUT_TYPES.TEL,
  ]),
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool,
  dockedFirst: PropTypes.bool,
  dockedMiddle: PropTypes.bool,
  dockedLast: PropTypes.bool,
  inputRef: PropTypes.func,
  clearButtonMode: PropTypes.oneOf(Object.keys(CLEAR_BUTTON_MODES)),
  clearButtonLabel: clearablePropType,
  onClear: clearablePropType,
};

BpkInput.defaultProps = {
  type: INPUT_TYPES.TEXT,
  className: null,
  valid: null,
  large: false,
  docked: false,
  dockedFirst: false,
  dockedMiddle: false,
  dockedLast: false,
  inputRef: null,
  clearButtonMode: CLEAR_BUTTON_MODES.never,
  clearButtonLabel: null,
  onClear: null,
};

export default BpkInput;
