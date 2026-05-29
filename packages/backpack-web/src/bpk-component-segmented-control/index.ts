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

import BpkSegmentedControl, {
  useSegmentedControlPanels,
  type Props as BpkSegmentControlProps,
  type TabPanelProps,
} from './src/BpkSegmentedControl';

export type { BpkSegmentControlProps, TabPanelProps };
export { useSegmentedControlPanels };
export default BpkSegmentedControl;

export { default as BpkSegmentedControlV2, SEGMENT_TYPES_V2 } from './src/BpkSegmentedControlV2/BpkSegmentedControlV2';
export type {
  BpkSegmentedControlV2RootProps,
  BpkSegmentedControlV2ItemProps,
  BpkSegmentedControlV2ItemTextProps,
  SegmentTypesV2,
} from './src/BpkSegmentedControlV2/common-types';
