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

import { render, screen, fireEvent } from '@testing-library/react';

import BpkPhoneInput from './BpkPhoneInput';

const dialingCodeProps = {
  id: 'dialing-code',
  name: 'Dialing code',
  label: 'Dialing code',
  className: 'dialing-code',
  wrapperClassName: 'dialing-wrapper',
};

const dialingCodes = [
  { code: '44', description: '+44', numberPrefix: '+44' },
  { code: '55', description: '+55', numberPrefix: '+55' },
];

const defaultProps = {
  id: 'phone-input-id',
  name: 'Telephone input',
  label: 'Telephone number',
  value: '1234',
  dialingCode: '44',
  className: 'fancy-input',
  onChange: () => {},
  onDialingCodeChange: () => {},
  dialingCodes,
  dialingCodeProps,
};

describe('BpkPhoneInput', () => {
  afterEach(() => jest.resetAllMocks());

  it('should render correctly', () => {
    const { asFragment } = render(<BpkPhoneInput {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const { asFragment } = render(<BpkPhoneInput {...defaultProps} large />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with the "dialingCodeMask" attribute', () => {
    const { asFragment } = render(
      <BpkPhoneInput {...defaultProps} dialingCodeMask />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const { asFragment } = render(<BpkPhoneInput {...defaultProps} disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "valid" attribute', () => {
    const { asFragment } = render(<BpkPhoneInput {...defaultProps} valid />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "wrapperProps" attribute', () => {
    const { asFragment } = render(
      <BpkPhoneInput
        {...defaultProps}
        wrapperProps={{ className: 'container', 'aria-label': 'container' }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a dialing code image attribute', () => {
    const { asFragment } = render(
      <BpkPhoneInput
        {...defaultProps}
        dialingCodeProps={{ image: <span />, ...dialingCodeProps }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call "onChange" when phone number changes', async () => {
    const onChange = jest.fn();

    render(<BpkPhoneInput {...defaultProps} onChange={onChange} />);

    const telephoneNumberInput = screen.getByRole('textbox', {
      name: /Telephone number/i,
    });

    await fireEvent.change(telephoneNumberInput, { target: { value: '99' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should call "onDialingCodeChange" when dialing code changes', async () => {
    const onDialingCodeChange = jest.fn();

    render(
      <BpkPhoneInput
        {...defaultProps}
        onDialingCodeChange={onDialingCodeChange}
      />,
    );
    const dialingCodeInput = screen.getByRole('combobox', {
      name: /Dialing code/i,
    });

    await fireEvent.change(dialingCodeInput, { target: { value: '99' } });

    expect(onDialingCodeChange).toHaveBeenCalled();
  });

  it('should error if the selected dialing code has no corresponding data', () => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

    expect(() =>
      render(<BpkPhoneInput {...defaultProps} dialingCode="00_non" />),
    ).toThrow(
      'BpkPhoneInput: A valid value must be provided for the "dialingCode" prop. The provided value for "dialingCode" (00_non) does not match any definitions in the "dialingCodes" prop',
    );
  });
});
