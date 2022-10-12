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

/* @flow strict */

import React, { Component } from 'react';

import { cssModules } from '../../bpk-react-utils';

import BpkClearButton from './BpkClearButton';
import STYLES from './BpkInput.module.scss';
import {
  type Props,
  propTypes,
  defaultProps,
  CLEAR_BUTTON_MODES,
} from './common-types';

type State = {
  persistClearButton: boolean,
};

const getClassName = cssModules(STYLES);

class BpkInput extends Component<Props, State> {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { persistClearButton: false };
  }

  render() {
    const classNames = [getClassName('bpk-input')];
    const containerClassNames = [getClassName('bpk-input__container')];
    const clearButtonClassNames = [getClassName('bpk-input__clear-button')];
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
      valid,
      value,
      ...rest
    } = this.props;

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
        getClassName('bpk-input__clear-button--large'),
      );
    }
    if (clearable) {
      classNames.push(getClassName('bpk-input--clearable'));
      if (
        clearButtonMode === CLEAR_BUTTON_MODES.always ||
        this.state.persistClearButton
      ) {
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
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <input
        className={classNames.join(' ')}
        ref={(input) => {
          ref = input;
          if (inputRef) {
            inputRef(input);
          }
        }}
        aria-invalid={isInvalid}
        value={value}
        name={name}
        {...rest}
      />
    );

    // When we mouseDown, we should persist the clear button.
    // If we don't do this, then for `clearableWhileEditing` mode the mouseDown on the button will cause the input to lose focus,
    // which will hide the button. The `onClick` event cannot complete if the button is removed from the DOM but mouseUp!
    const onMouseDown = () => {
      this.setState({ persistClearButton: true });
    };

    return clearable ? (
      <div className={containerClassNames.join(' ')}>
        {renderedInput}
        {value.length > 0 && (
          <BpkClearButton
            tabIndex="-1"
            label={clearButtonLabel || ''}
            onMouseDown={onMouseDown}
            onClick={(e) => {
              if (ref) {
                ref.focus();
              }
              if (onClear) {
                e.target.name = name;
                onClear(e);
                this.setState({ persistClearButton: false });
              }
            }}
            className={clearButtonClassNames.join(' ')}
          />
        )}
      </div>
    ) : (
      renderedInput
    );
  }
}

export default BpkInput;
