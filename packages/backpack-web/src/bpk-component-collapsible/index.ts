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

import BpkCollapsible from './src/BpkCollapsible';

export { default as useBpkCollapsible } from './src/useBpkCollapsible';
export { COLLAPSIBLE_VARIANTS } from './src/common-types';

export default BpkCollapsible;

export type {
  BpkCollapsibleOpenChangeDetails,
  BpkCollapsibleVariant,
} from './src/common-types';
export type { BpkCollapsibleRootProps } from './src/BpkCollapsibleRoot';
export type { BpkCollapsibleRootProviderProps } from './src/BpkCollapsibleRootProvider';
export type { BpkCollapsibleTriggerProps } from './src/BpkCollapsibleTrigger';
export type { BpkCollapsibleIndicatorProps } from './src/BpkCollapsibleIndicator';
export type { BpkCollapsibleContentProps } from './src/BpkCollapsibleContent';
export type {
  BpkUseCollapsibleProps,
  BpkUseCollapsibleReturn,
} from './src/useBpkCollapsible';
