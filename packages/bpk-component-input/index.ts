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
import BpkInput from './src/BpkInput';
import {
  propTypes,
  defaultProps,
  CLEAR_BUTTON_MODES,
  INPUT_TYPES,
  type Props,
} from './src/common-types';
import themeAttributes from './src/themeAttributes';
import withOpenEvents from './src/withOpenEvents';

export default BpkInput;

export type BpkInputProps = Props;
export {
  propTypes,
  defaultProps,
  withOpenEvents,
  INPUT_TYPES,
  CLEAR_BUTTON_MODES,
  themeAttributes,
};
