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

/**
 * BpkInput V2 - Flexible composable API for input components.
 *
 * @example
 * ```tsx
 * import BpkInput from '@skyscanner/backpack-web/bpk-component-input/BpkInputV2';
 *
 * <BpkInput.Root gap="0.5rem" large={false}>
 *   <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
 *   <BpkInput.Input id="price" name="price" value="100" />
 *   <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
 * </BpkInput.Root>
 * ```
 */

// Component imports
import BpkInput from './BpkInput';
import BpkInputAdornment from './BpkInputAdornment';
import BpkInputRoot from './BpkInputRoot';

// Export component types
export type {
  BpkInputRootProps,
  BpkInputProps,
  BpkInputAdornmentProps,
  PropsWithoutClearButtonMode,
  PropsWithClearButtonMode,
} from './common-types';

// Export constants
export { INPUT_TYPES, CLEAR_BUTTON_MODES } from './common-types';

// Component exports
export { default as BpkInput } from './BpkInput';
export { default as BpkInputAdornment } from './BpkInputAdornment';
export { default as BpkInputRoot } from './BpkInputRoot';

// Namespace object for composable API
const BpkInputV2 = {
  Root: BpkInputRoot,
  Input: BpkInput,
  InputAdornment: BpkInputAdornment,
};

export default BpkInputV2;
