/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow */

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import BpkFieldSet from 'bpk-component-fieldset';
import BpkImage from 'bpk-component-image';

import BpkPhoneInput from './index';

const DIALING_CODE_TO_ID_MAP = {
  '1': 'us',
  '44': 'uk',
  '55': 'br',
  '998': 'uz',
};

const getFlag = dialingCode => {
  const countryCode = DIALING_CODE_TO_ID_MAP[dialingCode];
  const url = `https://images.skyscnr.com/images/country/flag/header/${countryCode}.png`;
  return <BpkImage altText="Flag" height={38} width={50} src={url} />;
};

type Props = {
  large: boolean,
  validationMessage: ?string,
  validNumber: ?string,
  description: ?string,
  disabled: boolean,
  required: ?boolean,
  useLongLabels: boolean,
};

class StoryContainer extends Component<
  Props,
  { dialingCode: string, value: string },
> {
  static defaultProps = {
    large: false,
    validationMessage: null,
    validNumber: null,
    description: null,
    disabled: false,
    required: false,
    useLongLabels: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = { dialingCode: '44', value: '' };
  }

  onChange = (e: SyntheticInputEvent<HTMLElement>) => {
    this.setState({ value: e.target.value });
  };

  onDialingCodeChange = (e: SyntheticInputEvent<HTMLElement>) => {
    this.setState({ dialingCode: e.target.value });
  };

  render() {
    const {
      large,
      validNumber,
      validationMessage,
      description,
      disabled,
      required,
      useLongLabels,
    } = this.props;
    const { value, dialingCode } = this.state;

    let dialingCodeLabel = 'Dialing code';
    let phoneNumberLabel = 'Telephone number';

    if (useLongLabels) {
      dialingCodeLabel = dialingCodeLabel.repeat(2);
      phoneNumberLabel = phoneNumberLabel.repeat(2);
    }

    return (
      <BpkFieldSet
        validationMessage={validationMessage}
        description={description}
        disabled={!!disabled}
        required={!!required}
      >
        <BpkPhoneInput
          id="phone-input-id"
          name="Telephone input"
          label={phoneNumberLabel}
          disabled={disabled}
          valid={value && validNumber ? validNumber === value : null}
          large={large}
          onChange={this.onChange}
          onDialingCodeChange={this.onDialingCodeChange}
          value={value}
          dialingCode={dialingCode}
          dialingCodes={[
            { code: '1', description: '+1' },
            { code: '44', description: '+44' },
            { code: '55', description: '+55' },
            { code: '998', description: '+998' },
          ]}
          dialingCodeProps={{
            id: 'dialing-code',
            name: 'Dialing code',
            label: `${dialingCodeLabel}`,
            'aria-label': 'Dialing code',
            image: getFlag(dialingCode),
          }}
        />
      </BpkFieldSet>
    );
  }
}

storiesOf('bpk-component-phone-input', module)
  .add('Default', () => <StoryContainer />)
  .add('Large', () => <StoryContainer large />)
  .add('With Validation', () => (
    <StoryContainer
      validationMessage="Please enter a valid phone number"
      validNumber="0123456789"
      description="Enter 0123456789"
    />
  ))
  .add('Disabled', () => <StoryContainer disabled />)
  .add('Required', () => <StoryContainer required />)
  .add('Double length labels', () => <StoryContainer useLongLabels />);
