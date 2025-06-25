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

import BpkSwapButton, { SWAPBUTTON_STYLES } from '../../packages/bpk-component-swap-button';
import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';

const wrapperStyles = {
  height: '100px',
  width: '100px',
  padding: '2rem'
}

const DefaultExample = () => (
  <div style={wrapperStyles}>
  <BpkSwapButton ariaLabel='Swap origin and destination' onClick={action('Button clicked')}/>
  </div>
);

const CanvasDefaultExample = () => (

  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; padded: true; style: { ... Remove this comment to see the full error message
  <BpkDarkExampleWrapper padded style={wrapperStyles} >
  <BpkSwapButton ariaLabel='Swap origin and destination' swapButtonStyle={SWAPBUTTON_STYLES.canvasDefault} onClick={action('Button clicked')}/>
  </BpkDarkExampleWrapper>
);
const CanvasContrastExample = () => (
  <div>
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
  // @ts-expect-error TS(2322): Type '{ children: Element; padded: true; style: { ... Remove this comment to see the full error message
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; padded: true; style: { ... Remove this comment to see the full error message
  <BpkDarkExampleWrapper padded style={wrapperStyles}>
    <BpkSwapButton ariaLabel='Swap origin and destination' swapButtonStyle={SWAPBUTTON_STYLES.canvasContrast} onClick={action('Button clicked')}/>
  </BpkDarkExampleWrapper>
  </div>

);

export {DefaultExample, CanvasDefaultExample, CanvasContrastExample} ;
