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

import React from 'react';
import { shallow, mount } from 'enzyme';
import { INPUT_TYPES } from 'bpk-component-input';

import BpkSplitInput from './BpkSplitInput';

const defaultProps = {
  name: 'otpInput',
  id: 'otpInput',
  label: 'otp input',
  onChange: () => {},
  onSubmit: () => {},
};

const typeInInput = (input, element) => {
  const inputChars = input.split('');
  for (let i = 0; i < inputChars.length; i += 1) {
    const event = { target: { value: inputChars[i] } };
    element.find('input').at(i).simulate('change', event);
  }
};

const pasteInInput = (input, element) => {
  const pasteEvent = {
    clipboardData: { getData: jest.fn().mockReturnValueOnce(input) },
  };

  element.find('input').at(0).simulate('paste', pasteEvent);
};

describe('BpkSplitInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<BpkSplitInput {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with inputLength param', () => {
    const wrapper = shallow(
      <BpkSplitInput {...defaultProps} inputLength={6} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with large set as false', () => {
    const wrapper = shallow(<BpkSplitInput {...defaultProps} large={false} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with placeholder', () => {
    const wrapper = shallow(
      <BpkSplitInput {...defaultProps} placeholder="x" />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange callback function on every valid numeric input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().inputValue).toEqual([]);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().inputValue).toEqual(['9', '2', '3', '4']);
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenLastCalledWith('9234');
  });

  it('should call onChange callback function on every valid char input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        type={INPUT_TYPES.text}
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().inputValue).toEqual([]);

    typeInInput('xyz6', bpkSplitInput);

    expect(bpkSplitInput.state().inputValue).toEqual(['x', 'y', 'z', '6']);
    expect(mockOnChange).toHaveBeenCalledTimes(4);
    expect(mockOnChange).toHaveBeenCalledWith('xyz6');
  });

  it('should call onChange callback function only on valid numeric input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().inputValue).toEqual([]);

    typeInInput('92x4', bpkSplitInput);

    expect(bpkSplitInput.state().inputValue).toEqual(['9', '2', '4']);
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenLastCalledWith('924');
  });

  it('should not call onChange callback function on invalid input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().inputValue).toEqual([]);

    typeInInput('$', bpkSplitInput);

    expect(bpkSplitInput.state().inputValue).toEqual([]);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should update the focusedInput state on valid input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(1);
  });

  it('should update the focusedInput state on focus to an input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    const event = { target: { select: jest.fn() } };
    bpkSplitInput.find('input').at(2).prop('onFocus')(event);

    expect(bpkSplitInput.state().focusedInput).toEqual(2);
  });

  it('should update the focusedInput state and the inputValue on pressing Backspace', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);

    bpkSplitInput.find('input').at(3).simulate('keydown', { key: 'Backspace' });

    expect(bpkSplitInput.state().focusedInput).toEqual(2);
    expect(mockOnChange).toHaveBeenLastCalledWith('923');
  });

  it('should update the input value but not the focusedInput state on pressing Delete', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);

    bpkSplitInput.find('input').at(3).simulate('keydown', { key: 'Delete' });

    expect(bpkSplitInput.state().focusedInput).toEqual(3);
    expect(mockOnChange).toHaveBeenLastCalledWith('923');
  });

  it('should update the focusedInput state without updating the value on pressing Left arrow key', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);

    bpkSplitInput.find('input').at(3).simulate('keydown', { key: 'Left' });

    expect(bpkSplitInput.state().focusedInput).toEqual(2);
    expect(mockOnChange).toHaveBeenLastCalledWith('9234');
  });

  it('should not update the focusedInput state or the value on pressing Left arrow key when on the left most input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    bpkSplitInput.find('input').at(0).simulate('keydown', { key: 'Left' });

    expect(bpkSplitInput.state().focusedInput).toEqual(0);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should update the focusedInput state without updating the value on pressing Right arrow key', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);

    bpkSplitInput.find('input').at(2).simulate('keydown', { key: 'Right' });

    expect(bpkSplitInput.state().focusedInput).toEqual(3);
    expect(mockOnChange).toHaveBeenLastCalledWith('9234');
  });

  it('should not update the focusedInput state or the value on pressing Right arrow key when on the Right most input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    typeInInput('9234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);

    bpkSplitInput.find('input').at(3).simulate('keydown', { key: 'Right' });

    expect(bpkSplitInput.state().focusedInput).toEqual(3);
    expect(mockOnChange).toHaveBeenLastCalledWith('9234');
  });

  it('should not update the focusedInput state or the value on pressing space bar', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    expect(bpkSplitInput.state().focusedInput).toEqual(0);

    bpkSplitInput.find('input').at(0).simulate('keydown', { key: 'Spacebar' });

    expect(bpkSplitInput.state().focusedInput).toEqual(0);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should call onSubmit callback when the input is valid and Enter key is pressed', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        inputLength={6}
        onSubmit={mockOnSubmit}
      />,
    );

    typeInInput('923467', bpkSplitInput);

    bpkSplitInput.find('input').at(0).simulate('keydown', { keyCode: 13 });

    expect(mockOnSubmit).toHaveBeenCalledWith('923467');
  });

  it('should spread the pasted text over multiple input fields on valid input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );

    pasteInInput('1234', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(3);
    expect(mockOnChange).toHaveBeenCalledWith('1234');
  });

  it('should spread the valid pasted input over multiple input fields and focus the first invalid input', async () => {
    const bpkSplitInput = mount(
      <BpkSplitInput
        name="otpInput"
        id="otpInput"
        label="otp input"
        onChange={mockOnChange}
        onSubmit={() => {}}
      />,
    );
    pasteInInput('12x4', bpkSplitInput);

    expect(bpkSplitInput.state().focusedInput).toEqual(2);
    expect(mockOnChange).toHaveBeenCalledWith('124');
  });
});
