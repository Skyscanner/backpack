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

  <BpkDarkExampleWrapper padded style={wrapperStyles} >
  <BpkSwapButton ariaLabel='Swap origin and destination' swapButtonStyle={SWAPBUTTON_STYLES.canvasDefault} onClick={action('Button clicked')}/>
  </BpkDarkExampleWrapper>
);
const CanvasContrastExample = () => (
  <div>
  <BpkDarkExampleWrapper padded style={wrapperStyles}>
    <BpkSwapButton ariaLabel='Swap origin and destination' swapButtonStyle={SWAPBUTTON_STYLES.canvasContrast} onClick={action('Button clicked')}/>
  </BpkDarkExampleWrapper>
  </div>

);

export {DefaultExample, CanvasDefaultExample, CanvasContrastExample} ;
