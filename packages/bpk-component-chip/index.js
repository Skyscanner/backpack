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

import BpkSelectableChip, {
  type Props as SelectableProps,
} from './src/BpkSelectableChip';
import BpkDismissibleChip, {
  type Props as DismissibleProps,
} from './src/BpkDismissibleChip';
import BpkDropdownChip, {
  type Props as DropdownProps,
} from './src/BpkDropdownChip';
import { CHIP_TYPES } from './src/commonTypes';
import themeAttributes from './src/themeAttributes';

export type BpkSelectableChipProps = SelectableProps;
export type BpkDismissibleChipProps = DismissibleProps;
export type BpkDropdownChipProps = DropdownProps;

export default BpkSelectableChip;
export { BpkDismissibleChip, BpkDropdownChip, CHIP_TYPES, themeAttributes };
