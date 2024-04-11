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


import BpkDismissibleChip from '../../packages/bpk-component-chip/src/BpkDismissibleChip';
import BpkDropdownChip from '../../packages/bpk-component-chip/src/BpkDropdownChip';
import BpkIconChip from '../../packages/bpk-component-chip/src/BpkIconChip';
import BpkSelectableChip from '../../packages/bpk-component-chip/src/BpkSelectableChip';

import {
  AllTypesExample,
  AllSelectableChipsExample,
  AllDropdownChipsExample,
  AllDismissibleChipsExample,
  RadioGroupChipsExample,
  AllIconChipsExample,
} from './examples';

export default {
  title: 'bpk-component-chip',
  component: BpkSelectableChip,
  subcomponents: {
    BpkDismissibleChip,
    BpkDropdownChip,
    BpkIconChip,
  },
};

export const AllTypes = AllTypesExample;
export const AllSelectableTypes = AllSelectableChipsExample;
export const AllIconOnlyTypes = AllIconChipsExample;
export const AllDropdownTypes = AllDropdownChipsExample;
export const AllDismissibleTypes = AllDismissibleChipsExample;
export const RadioGroup = RadioGroupChipsExample;
export const VisualTest = AllTypesExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
