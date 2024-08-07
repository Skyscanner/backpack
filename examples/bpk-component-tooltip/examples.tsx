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

import { useRef } from 'react';

import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkTooltip, {
  TOOLTIP_TYPES,
} from '../../packages/bpk-component-tooltip';
import { withDefaultProps } from '../../packages/bpk-react-utils';

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
};

const Heading = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyLongform,
  tagName: 'h4',
});


const DefaultExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="Montréal-Trudeau International Airport"
        id="my-tooltip"
        target={<div ref={target}><Heading>YUL</Heading></div>}
      >
        Montréal-Trudeau International Airport
      </BpkTooltip>
    </div>
  );
};

const DarkExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="Edinburgh Airport"
        type={TOOLTIP_TYPES.dark}
        id="my-tooltip"
        target={<div ref={target}><Heading>EDI</Heading></div>}
      >
        Edinburgh Airport
      </BpkTooltip>
    </div>
  );
};

const SideExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="Julius Nyerere International Airport, Dar es Salaam"
        id="my-tooltip"
        target={<div ref={target}><Heading>DAR</Heading></div>}
        placement="right"
      >
        Julius Nyerere International Airport, Dar es Salaam
      </BpkTooltip>
    </div>
  );
};

const NoPaddingExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="Singapore Changi Airport"
        id="my-tooltip"
        target={<div ref={target}><Heading>SIN</Heading></div>}
        padded={false}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomStyle: 'solid',
            padding: '.25rem',
          }}
        >
          Singapore Changi Airport
        </div>
      </BpkTooltip>
    </div>
  );
};

const LinkExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="We do hotels too!"
        id="my-tooltip"
        target={
          <a
            href="//skyscanner.net/hotels"
            target="_blank"
            rel="noopener noreferrer"
            ref={target}
          >
            Hotels
          </a>
        }
      >
        We do hotels too!
      </BpkTooltip>
    </div>
  );
};


const VisualTestExample = () => {
  const target = useRef(null);

  return (
    <div style={wrapperStyle}>
      <BpkTooltip
        ariaLabel="Montréal-Trudeau International Airport"
        id="my-tooltip"
        target={<div ref={target}><Heading>YUL</Heading></div>}
        isOpen
      >
        Montréal-Trudeau International Airport
      </BpkTooltip>
    </div>
  );
};

export {
  DefaultExample,
  DarkExample,
  SideExample,
  NoPaddingExample,
  LinkExample,
  VisualTestExample,
};
