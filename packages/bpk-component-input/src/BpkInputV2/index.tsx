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

import BpkInputGroup from './BpkInputGroup';
import BpkInputV2 from './BpkInputV2';

export { INPUT_TYPES, CLEAR_BUTTON_MODES } from './common-types';
export type { BpkInputV2Props } from './common-types';

// Export BpkInputGroup
export { BpkInputGroup };
export type { BpkInputGroupProps } from './BpkInputGroup/BpkInputGroup';

// Default export without ChakraProvider wrapper since we now use native HTML elements
export default BpkInputV2;
