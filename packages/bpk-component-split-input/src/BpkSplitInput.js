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
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';
import { INPUT_TYPES } from '../../bpk-component-input';

import InputField from './BpkInputField';
import STYLES from './BpkSplitInput.module.scss';

const getClassName = cssModules(STYLES);

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;
const ENTER = 13;

class BpkSplitInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      inputValue: [],
    };
  }

  onInputChange = (input) => {
    this.setState({ inputValue: input });
    const { onChange } = this.props;
    const value = input.join('');
    onChange(value);
  };

  updateInputValue = (value) => {
    const { focusedInput, inputValue } = this.state;
    inputValue[focusedInput] = value;

    this.onInputChange(inputValue);
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    if (this.validateInput(inputValue)) {
      const value = inputValue.join('');
      onSubmit(value);
    }
  };

  validateInput = (inputValue) => {
    let index = 0;
    while (index < inputValue.length) {
      if (!this.isInputValid(inputValue[index])) {
        this.setState({ focusedInput: index });
        return false;
      }
      index += 1;
    }
    return true;
  };

  isNumeric = () => this.props.type === INPUT_TYPES.number;

  isInputValid = (value) => {
    const isTypeValid = this.isNumeric()
      ? /^\d$/.test(value)
      : typeof value === 'string';
    return isTypeValid && value.trim().length === 1;
  };

  focusInput = (inputIndex) => {
    const { inputLength } = this.props;
    const focusedInput = Math.max(Math.min(inputLength - 1, inputIndex), 0);
    this.setState({ focusedInput });
  };

  focusNextInput = () => {
    const { focusedInput } = this.state;
    this.focusInput(focusedInput + 1);
  };

  focusPreviousInput = () => {
    const { focusedInput } = this.state;
    this.focusInput(focusedInput - 1);
  };

  handleOnPaste = (e) => {
    e.preventDefault();
    const { inputLength } = this.props;
    const { focusedInput, inputValue } = this.state;

    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, inputLength - focusedInput)
      .split('');
    const charsReceived = pastedData.length;

    let firstInvalidInputPosition;
    let position = focusedInput;
    for (position; position < charsReceived; position += 1) {
      const firstElement = pastedData.shift();
      if (this.isInputValid(firstElement)) {
        inputValue[position] = firstElement;
      } else if (typeof firstInvalidInputPosition === 'undefined') {
        firstInvalidInputPosition = position;
      }
    }
    this.focusInput(
      typeof firstInvalidInputPosition !== 'undefined'
        ? firstInvalidInputPosition
        : position,
    );
    this.onInputChange(inputValue);
  };

  handleOnKeyDown = (e) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      this.updateInputValue('');
      this.focusPreviousInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      this.updateInputValue('');
    } else if (
      e.keyCode === LEFT_ARROW ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      e.preventDefault();
      this.focusPreviousInput();
    } else if (
      e.keyCode === RIGHT_ARROW ||
      e.key === 'Right' ||
      e.key === 'ArrowRight'
    ) {
      e.preventDefault();
      this.focusNextInput();
    } else if (e.keyCode === ENTER || e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
    }
  };

  handleOnChange = (e) => {
    const { value } = e.target;
    if (this.isInputValid(value)) {
      this.updateInputValue(value);
      this.focusNextInput();
    }
  };

  handleOnFocus = (e, index) => {
    this.setState({ focusedInput: index });
    e.target.select();
  };

  renderInputs = () => {
    const { focusedInput, inputValue } = this.state;
    const { id, inputLength, label, large, name, placeholder, type } =
      this.props;
    const inputs = [];
    for (let index = 0; index < inputLength; index += 1) {
      inputs.push(
        <InputField
          key={index}
          index={index}
          focus={focusedInput === index}
          id={`${id}-${index}`}
          label={label}
          name={name}
          type={type}
          large={large}
          value={inputValue && inputValue[index]}
          placeholder={placeholder}
          onChange={this.handleOnChange}
          onInput={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onPaste={this.handleOnPaste}
          onFocus={(e) => this.handleOnFocus(e, index)}
        />,
      );
    }

    return inputs;
  };

  render() {
    return (
      <div className={getClassName('bpk-split-input')}>
        {this.renderInputs()}
      </div>
    );
  }
}

BpkSplitInput.propTypes = {
  type: PropTypes.oneOf([INPUT_TYPES.text, INPUT_TYPES.number]),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputLength: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  large: PropTypes.bool,
};

BpkSplitInput.defaultProps = {
  type: INPUT_TYPES.number,
  inputLength: 4,
  large: true,
  placeholder: '',
};

export default BpkSplitInput;
export { INPUT_TYPES };
