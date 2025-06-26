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



import { Component } from 'react';

import BpkFieldSet from '../../packages/bpk-component-fieldset';
import BpkImage from '../../packages/bpk-component-image';
import BpkPhoneInput from '../../packages/bpk-component-phone-input';

const DIALING_CODE_TO_ID_MAP = {
  '1_us': 'us',
  '1_ca': 'ca',
  '44_uk': 'uk',
  '55_br': 'br',
  '998_uz': 'uz',
};

// @ts-expect-error TS(7006) FIXME: Parameter 'dialingCode' implicitly has an 'any' ty... Remove this comment to see the full error message
const getFlag = (dialingCode) => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const countryCode = DIALING_CODE_TO_ID_MAP[dialingCode];
  const url = `https://images.skyscnr.com/images/country/flag/header/${countryCode}.png`;
  return <BpkImage altText="Flag" aspectRatio={50 / 38} src={url} />;
};

type Props = {
  large: boolean,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  validationMessage: ?string,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  validNumber: ?string,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  description: ?string,
  disabled: boolean,
  dialingCodeMask: boolean,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  required: ?boolean,
  useLongLabels: boolean,
};

class StoryContainer extends Component<
  Props,
  // @ts-expect-error TS(1009) FIXME: Trailing comma not allowed.
  { dialingCode: string, value: string },
> {
  static defaultProps = {
    description: null,
    dialingCodeMask: false,
    disabled: false,
    large: false,
    required: false,
    useLongLabels: false,
    validNumber: null,
    validationMessage: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = { dialingCode: '44_uk', value: '' };
  }

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'SyntheticInputEvent'.
  onChange = (e: SyntheticInputEvent<HTMLElement>) => {
    this.setState({ value: e.target.value });
  };

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'SyntheticInputEvent'.
  onDialingCodeChange = (e: SyntheticInputEvent<HTMLElement>) => {
    this.setState({ dialingCode: e.target.value });
  };

  render() {
    const {
      description,
      dialingCodeMask,
      disabled,
      large,
      required,
      useLongLabels,
      validNumber,
      validationMessage,
    } = this.props;
    const { dialingCode, value } = this.state;

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
          dialingCodeMask={dialingCodeMask}
          onChange={this.onChange}
          onDialingCodeChange={this.onDialingCodeChange}
          value={value}
          dialingCode={dialingCode}
          dialingCodes={[
            { code: '1_us', description: '+1 (US)', numberPrefix: '+1' },
            { code: '1_ca', description: '+1 (CA)', numberPrefix: '+1' },
            { code: '44_uk', description: '+44 (UK)', numberPrefix: '+44' },
            { code: '55_br', description: '+55 (BR)', numberPrefix: '+55' },
            { code: '998_uz', description: '+998 (UZ)', numberPrefix: '+998' },
          ]}
          dialingCodeProps={{
            id: 'dialing-code',
            name: 'Dialing code',
            label: `${dialingCodeLabel}`,
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; '... Remove this comment to see the full error message
            'aria-label': 'Dialing code',
            image: getFlag(dialingCode),
          }}
        />
      </BpkFieldSet>
    );
  }
}

const DefaultExample = () => <StoryContainer />;

const LargeExample = () => <StoryContainer large />;

const WithValidationExample = () => (
  <StoryContainer
    validationMessage="Please enter a valid phone number"
    validNumber="0123456789"
    description="Enter 0123456789"
  />
);

const WithDialingCodeMaskExample = () => <StoryContainer dialingCodeMask />;

const DisabledExample = () => <StoryContainer disabled />;

const RequiredExample = () => <StoryContainer required />;

const DoubleLengthLabelExamples = () => <StoryContainer useLongLabels />;

const MixedExample = () => (
  <div>
    <DefaultExample />
    <LargeExample />
    <WithValidationExample />
    <WithDialingCodeMaskExample />
    <DisabledExample />
    <RequiredExample />
    <DoubleLengthLabelExamples />
  </div>
);

export {
  DefaultExample,
  LargeExample,
  WithValidationExample,
  WithDialingCodeMaskExample,
  DisabledExample,
  RequiredExample,
  DoubleLengthLabelExamples,
  MixedExample,
};
