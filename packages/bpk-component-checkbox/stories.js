/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { colorGray700, spacingBase } from 'bpk-tokens/tokens/base.es6';

import BpkCheckbox from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

storiesOf('bpk-component-checkbox', module)
  .add('Checked', () => (
    <BpkCheckbox
      id="checked"
      name="checked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      checked
    />
  ))
  .add('Unchecked', () => (
    <BpkCheckbox
      id="unchecked"
      name="unchecked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
    />
  ))
  .add('Multi line', () => (
    <BpkCheckbox
      id="multi_line"
      name="multi_line"
      label={loremIpsum}
      onChange={action('checkbox changed')}
    />
  ))
  .add('White (Checked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkCheckbox
        id="white_checked"
        name="checked"
        label="Prefer directs"
        onChange={action('checkbox changed')}
        white
        checked
      />
    </div>
  ))
  .add('White (Unchecked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkCheckbox
        id="white_unchecked"
        name="unchecked"
        label="Prefer directs"
        white
        onChange={action('checkbox changed')}
      />
    </div>
  ))
  .add('Disabled (Checked)', () => (
    <BpkCheckbox
      id="disabled_checked"
      name="disabled_checked"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      checked
      disabled
    />
  ))
  .add('Disabled (Unchecked)', () => (
    <BpkCheckbox
      id="disabled"
      name="disabled"
      label="Prefer directs"
      onChange={action('checkbox changed')}
      disabled
    />
  ))
  .add('Required', () => (
    <BpkCheckbox
      id="required"
      name="required"
      label="Please accept the terms and conditions"
      onChange={action('checkbox changed')}
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
