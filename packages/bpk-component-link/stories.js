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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { colorGray700, spacingBase } from 'bpk-tokens/tokens/base.es6';

import BpkLink, { BpkButtonLink } from './index';

storiesOf('bpk-component-link', module)
  .add('Example', () => (
    <div>
      <BpkLink href="#" onClick={action('#1 clicked')}>
        Link #1
      </BpkLink>
      <br />
      <BpkLink href="#" onClick={action('#2 clicked')}>
        Link #2
      </BpkLink>
    </div>
  ))
  .add('Example (buttons)', () => (
    <div>
      <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink>
      <br />
      <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
    </div>
  ))
  .add('Example (alternate)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkLink href="#" onClick={action('#1 clicked')} alternate>
        Link #1
      </BpkLink>
      <br />
      <BpkLink href="#" onClick={action('#2 clicked')} alternate>
        Link #2
      </BpkLink>
    </div>
  ))
  .add('Example (alternate + buttons)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkButtonLink onClick={action('#1 clicked')} alternate>
        Link #1
      </BpkButtonLink>
      <br />
      <BpkButtonLink onClick={action('#2 clicked')} alternate>
        Link #2
      </BpkButtonLink>
    </div>
  ));
