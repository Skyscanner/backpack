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

import BpkRadio from './index';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

storiesOf('bpk-component-radio', module)
  .add('Checked', () => (
    <BpkRadio
      id="checked"
      name="checked"
      label="Return"
      onChange={action('radio changed')}
      checked
    />
  ))
  .add('Unchecked', () => (
    <BpkRadio
      id="unchecked"
      name="unchecked"
      label="Return"
      onChange={action('radio changed')}
    />
  ))
  .add('Multi line', () => (
    <BpkRadio
      id="multi_line"
      name="multi_line"
      label={loremIpsum}
      onChange={action('radio changed')}
    />
  ))
  .add('White (Checked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkRadio
        id="checked"
        name="checked"
        label="Return"
        onChange={action('radio changed')}
        white
        checked
      />
    </div>
  ))
  .add('White (Unchecked)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkRadio
        id="unchecked"
        name="unchecked"
        label="Return"
        onChange={action('radio changed')}
        white
      />
    </div>
  ))
  .add('Disabled (Checked)', () => (
    <BpkRadio
      id="disabled_checked"
      name="disabled_checked"
      label="Return"
      onChange={action('radio changed')}
      checked
      disabled
    />
  ))
  .add('Disabled (Unchecked)', () => (
    <BpkRadio
      id="disabled"
      name="disabled"
      label="Return"
      onChange={action('radio changed')}
      disabled
    />
  ));
