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

/* @flow */

import React, { Component } from 'react';
import BpkPhoneInput from 'bpk-component-phone-input';
import readme from 'bpk-component-phone-input/readme.md';
import BpkImage from 'bpk-component-image';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import DocsPageBuilder from './../../components/DocsPageBuilder';

import IntroBlurb from './../../components/neo/IntroBlurb';

import NativePhoneInput from '../NativePhoneInputPage';

const DIALING_CODE_TO_ID_MAP = {
  '44': 'uk',
  '55': 'br',
};

const getFlag = dialingCode => {
  const countryCode = DIALING_CODE_TO_ID_MAP[dialingCode];
  const url = `https://images.skyscnr.com/images/country/flag/header/${countryCode}.png`;
  return (
    <BpkImage
      altText="Flag"
      height={38}
      width={50}
      style={{ width: '100%' }}
      src={url}
    />
  );
};

type Props = {
  large: boolean,
};

type State = {
  dialingCode: string,
  value: string,
};

class StoryContainer extends Component<Props, State> {
  static defaultProps = {
    large: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = { dialingCode: '44', value: '' };
  }

  onChange = evt => {
    this.setState({ value: evt.target.value });
  };

  onDialingCodeChange = evt => {
    this.setState({ dialingCode: evt.target.value });
  };

  render() {
    return (
      <BpkPhoneInput
        id="phone-input-id"
        name="Telephone input"
        placeholder="Telephone number"
        large={this.props.large}
        onChange={this.onChange}
        onDialingCodeChange={this.onDialingCodeChange}
        value={this.state.value}
        dialingCode={this.state.dialingCode}
        dialingCodes={[
          { code: '44', description: '+44' },
          { code: '55', description: '+55' },
        ]}
        dialingCodeProps={{
          id: 'dialing-code',
          name: 'Dialing code',
          'aria-label': 'Dialing code',
          image: getFlag(this.state.dialingCode),
        }}
      />
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [<StoryContainer />],
  },
  {
    id: 'large',
    title: 'Large',
    examples: [<StoryContainer large />],
  },
];

const WebSubPage = () => (
  <DocsPageBuilder
    title="Phone input"
    components={components}
    readme={readme}
    showMenu={false}
    wrapped
  />
);

const NeoBadgePage = () => (
  <DocsPageWrapper
    title="Phone input"
    blurb={[
      <IntroBlurb>
        The phone number input encapsulates two components that together enable
        the collection of phone numbers.
      </IntroBlurb>,
    ]}
    webSubpage={<WebSubPage />}
    nativeSubpage={<NativePhoneInput />}
  />
);

export default NeoBadgePage;
