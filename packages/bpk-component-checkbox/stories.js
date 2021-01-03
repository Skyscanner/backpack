/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { colorSkyGrayTint01, spacingBase } from 'bpk-tokens/tokens/base.es6';

import BpkCheckbox from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

type State = {
  checked: boolean,
};

class StatefulCheckbox extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleChange = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
    // $FlowFixMe[incompatible-type] - ignoring as purely for storybook
    action(`Checkbox changed. Checked is now '${this.state.checked}'`);
  };

  render() {
    return (
      <div>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkCheckbox
          checked={this.state.checked}
          onChange={this.handleChange}
          {...this.props}
        />
      </div>
    );
  }
}

storiesOf('bpk-component-checkbox', module)
  .add('Stateful Example', () => (
    <StatefulCheckbox id="unchecked" name="unchecked" label="Press to toggle" />
  ))
  .add('Checked', () => (
    <BpkCheckbox id="checked" name="checked" label="Prefer directs" checked />
  ))
  .add('Unchecked', () => (
    <BpkCheckbox id="unchecked" name="unchecked" label="Prefer directs" />
  ))
  .add('Indeterminate', () => (
    <BpkCheckbox
      id="indeterminate"
      name="indeterminate"
      label="Prefer directs"
      checked
      indeterminate
    />
  ))
  .add('Invalid', () => (
    <BpkCheckbox
      id="checked"
      name="checked"
      label="Prefer directs"
      valid={false}
      checked={false}
    />
  ))
  .add('Multi line', () => (
    <BpkCheckbox
      id="multi_line"
      name="multi_line"
      label={loremIpsum}
      checked={false}
    />
  ))
  .add('White (Checked)', () => (
    <div style={{ backgroundColor: colorSkyGrayTint01, padding: spacingBase }}>
      <BpkCheckbox
        id="white_checked"
        name="checked"
        label="Prefer directs"
        white
        checked
      />
    </div>
  ))
  .add('White (Unchecked)', () => (
    <div style={{ backgroundColor: colorSkyGrayTint01, padding: spacingBase }}>
      <BpkCheckbox
        id="white_unchecked"
        name="unchecked"
        label="Prefer directs"
        white
        checked={false}
      />
    </div>
  ))
  .add('Disabled (Checked)', () => (
    <BpkCheckbox
      id="disabled_checked"
      name="disabled_checked"
      label="Prefer directs"
      checked
      disabled
    />
  ))
  .add('Disabled (Unchecked)', () => (
    <BpkCheckbox
      id="disabled"
      name="disabled"
      label="Prefer directs"
      disabled
    />
  ))
  .add('Required', () => (
    <BpkCheckbox
      id="required"
      name="required"
      label="Please accept the terms and conditions"
      checked
      required
    />
  ))
  .add('Small label', () => (
    <BpkCheckbox
      id="small"
      name="small"
      label="Direct flights only"
      onChange={action('checkbox changed')}
      checked
      smallLabel
    />
  ));
