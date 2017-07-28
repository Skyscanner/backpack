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
import BpkText, { withTextStyle } from 'bpk-component-text';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';
import BpkTooltip from './index';

const st = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  margin: '30px',
  textAlign: 'center',
};

const Heading = withTextStyle(BpkText, 'xxl', 'h1');

storiesOf('bpk-component-tooltip', module)
  .add('Default', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<Heading>£295</Heading>}
      >
        This is the cheapest price! 👍
      </BpkTooltip>
    </div>
  ))
  .add('On the side', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<Heading level="h1">£295</Heading>}
        tetherOptions={{
          attachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        }}
      >
        This is the cheapest price! 👍
      </BpkTooltip>
    </div>
  ))
  .add('Custom content', () => (
    <div style={{ height: '500px', margin: '30px', textAlign: 'center' }}>
      <BpkTooltip
        id="my-tooltip"
        target={<Heading level="h1">£295</Heading>}
        padded={false}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomColor: colorGreen500,
            borderBottomStyle: 'solid',
            padding: spacingSm,
          }}
        >
          This is the cheapest price!
        </div>
      </BpkTooltip>
    </div>
  ))
  .add('On a link', () => (
    <div style={st}>
      <BpkTooltip
        id="my-tooltip"
        target={<a href="//skyscanner.net" target="_blank" rel="noopener noreferrer">Click me!</a>}
      >
        Find cheap flights here! ✈️
      </BpkTooltip>
    </div>
  ));
