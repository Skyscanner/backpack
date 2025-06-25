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

import { Component } from 'react';

import BpkRadio from '../../packages/bpk-component-radio';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

class GroupExample extends Component<{}, { value: string }> {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();
    this.state = { value: 'Lagos' };
  }

  updateValue = (value: string) => {
    action(`Radio changed. New value: ${value}`);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { ...rest } = this.props;
    return (
      <div>
        {['Lagos', 'Kano', 'Ibadan', 'Benin City'].map((city) => (
          <div>
            <BpkRadio
              {...rest}
              // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; o... Remove this comment to see the full error message
              id={city}
              name='group_example'
              label={city}
              onChange={(event: any) => {
                this.updateValue(event.target.value);
              }}
              value={city}
              checked={value === city}
              disabled={city === 'Benin City'}
            />
          </div>
        ))}
      </div>
    );
  }
}

const DefaultExample = () => <GroupExample />;

const MultilineExample = () => (
  <BpkRadio
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; o... Remove this comment to see the full error message
    id="multi_line"
    name="multi_line"
    label={loremIpsum}
    onChange={action('radio changed')}
  />
);

// @ts-expect-error TS(2322) FIXME: Type '{ valid: boolean; }' is not assignable to ty... Remove this comment to see the full error message
const InvalidExample = () => <GroupExample valid={false} />;

const WhiteExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: any[]; padded: true; }' is not a... Remove this comment to see the full error message
  <BpkDarkExampleWrapper padded>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'white'.
    // @ts-expect-error TS(2322): Type '{ white: true; }' is not assignable to type ... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ white: true; }' is not assignable to type ... Remove this comment to see the full error message
    <GroupExample white />
  </BpkDarkExampleWrapper>
);

const DisabledCheckedExample = () => (
  <BpkRadio
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; o... Remove this comment to see the full error message
    id="disabled_checked"
    name="disabled_checked"
    label="Return"
    onChange={action('radio changed')}
    checked
    disabled
  />
);

const DisabledUncheckedExample = () => (
  <BpkRadio
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; label: string; o... Remove this comment to see the full error message
    id="disabled"
    name="disabled"
    label="Return"
    onChange={action('radio changed')}
    disabled
  />
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <MultilineExample />
    <InvalidExample />
    <WhiteExample />
    <DisabledCheckedExample />
    <DisabledUncheckedExample />
  </div>
);

export {
  DefaultExample,
  MultilineExample,
  InvalidExample,
  WhiteExample,
  DisabledCheckedExample,
  DisabledUncheckedExample,
  MixedExample,
};
