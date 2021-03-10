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

import React from 'react';
import { withDefaultProps } from 'bpk-react-utils';
import BpkText from 'bpk-component-text';
import { spacingSm, colorMonteverde } from 'bpk-tokens/tokens/base.es6';

import BpkTooltip, { TOOLTIP_TYPES } from './index';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  margin: '30px',
  textAlign: 'center',
};

const Heading = withDefaultProps(BpkText, {
  textStyle: 'lg',
  tagName: 'h4',
});

const DefaultExample = () => (
  <div style={wrapperStyle}>
    <BpkTooltip id="my-tooltip" target={<Heading>YUL</Heading>}>
      Montréal-Trudeau International Airport
    </BpkTooltip>
  </div>
);

const DarkExample = () => (
  <div style={wrapperStyle}>
    <BpkTooltip
      type={TOOLTIP_TYPES.dark}
      id="my-tooltip"
      target={<Heading>EDI</Heading>}
    >
      Edinburgh Airport
    </BpkTooltip>
  </div>
);

const SideExample = () => (
  <div style={wrapperStyle}>
    <BpkTooltip
      id="my-tooltip"
      target={<Heading>DAR</Heading>}
      placement="right"
    >
      Julius Nyerere International Airport, Dar es Salaam
    </BpkTooltip>
  </div>
);

const NoPaddingExample = () => (
  <div style={{ height: '500px', margin: '30px', textAlign: 'center' }}>
    <BpkTooltip id="my-tooltip" target={<Heading>SIN</Heading>} padded={false}>
      <div
        style={{
          borderBottomWidth: '5px',
          borderBottomColor: colorMonteverde,
          borderBottomStyle: 'solid',
          padding: spacingSm,
        }}
      >
        Singapore Changi Airport
      </div>
    </BpkTooltip>
  </div>
);

const LinkExample = () => (
  <div style={wrapperStyle}>
    <BpkTooltip
      id="my-tooltip"
      target={
        <a
          href="//skyscanner.net/hotels"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hotels
        </a>
      }
    >
      We do hotels too!
    </BpkTooltip>
  </div>
);

const PopperModifiersExample = () => (
  <div style={wrapperStyle}>
    <BpkTooltip
      id="my-tooltip"
      target={<Heading>BER</Heading>}
      popperModifiers={{
        flip: { enabled: false },
      }}
    >
      Berlin Brandenburg Airport
    </BpkTooltip>
  </div>
);

export {
  DefaultExample,
  DarkExample,
  SideExample,
  NoPaddingExample,
  LinkExample,
  PopperModifiersExample,
};
