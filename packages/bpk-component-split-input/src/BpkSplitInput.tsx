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
// @ts-nocheck

import { Component } from 'react';
import type { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent,  } from 'react';

import { INPUT_TYPES } from '../../bpk-component-input';
import { cssModules } from '../../bpk-react-utils';

import InputField from './BpkInputField';

import STYLES from './BpkSplitInput.module.scss';

const getClassName = cssModules(STYLES);

interface Props {
  type?: string | number;
  id: string;
  label: string;
  name: string;
  inputLength?: number;
  placeholder?: string;
  onInputChange: (value: string | number) => void;
  onSubmit: (value: string | number) => void;
  large?: boolean;
}

interface State {
  focusedInput: number;
  inputValue: string[] | number[];
}

class BpkSplitInput extends Component<Props, State> {
  static defaultProps = {
    type: INPUT_TYPES.number,
    inputLength: 4,
    large: true,
    placeholder: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      focusedInput: 0,
      inputValue: [],
    };
  }

  onInputChange = (input: string[] | number[]) => {
    this.setState({ inputValue: input });
    const value = input.join('');
    this.props.onInputChange(value);
  };

  updateInputValue = (value: string | number ) => {
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

  validateInput = (inputValue: string[] | number[]) => {
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

  isInputValid = (value: string | number) => {
    const isTypeValid = this.isNumeric() ? /^\d$/.test(`${value}`) : typeof value === 'string';
    return isTypeValid && `${value}`.trim().length === 1;
  };

  focusInput = (inputIndex: number) => {
    const { inputLength } = this.props;
    const focusedInput = Math.max(Math.min(inputLength! - 1, inputIndex), 0);
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

  handleOnPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { inputLength } = this.props;
    const { focusedInput, inputValue } = this.state;

    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, inputLength! - focusedInput)
  .split('');
    const charsReceived = pastedData.length;

    let firstInvalidInputPosition;
    let position = focusedInput;
    for (position; position < charsReceived; position += 1) {
      const firstElement = pastedData.shift();
      if (this.isInputValid(firstElement!)) {
        inputValue[position] = firstElement!;
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

  handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      this.updateInputValue('');
      this.focusPreviousInput();
    } else if (e.key === 'Delete') {
      e.preventDefault();
      this.updateInputValue('');
    } else if (
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      e.preventDefault();
      this.focusPreviousInput();
    } else if (
      e.key === 'Right' ||
      e.key === 'ArrowRight'
    ) {
      e.preventDefault();
      this.focusNextInput();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    } else if (
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
    }
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (this.isInputValid(value)) {
      this.updateInputValue(value);
      this.focusNextInput();
    }
  };

  handleOnFocus = (e: FocusEvent<HTMLInputElement>, index: number) => {
    this.setState({ focusedInput: index });
    e.target.select();
  };

  renderInputs = () => {
    const { focusedInput, inputValue } = this.state;
    const { id, inputLength, label, large, name, placeholder, type, ...rest } = this.props;
    const inputs = [];
    for (let index = 0; index < inputLength!; index += 1) {
      inputs.push(
        <InputField
          key={index}
          index={index}
          focus={focusedInput === index}
          id={`${id}-${index}`}
          label={label}
          name={`${name}-${index}`}
          type={type}
          large={large}
          value={inputValue && inputValue[index]}
          placeholder={placeholder}
          onChange={this.handleOnChange}
          onInput={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onPaste={this.handleOnPaste}
          onFocus={(e: FocusEvent<HTMLInputElement>) => this.handleOnFocus(e, index)}
          {...rest}
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

export default BpkSplitInput;
export { INPUT_TYPES };
