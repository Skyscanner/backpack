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

import BpkCheckboxV2Control from './BpkCheckboxV2Control';
import BpkCheckboxV2Description from './BpkCheckboxV2Description';
import BpkCheckboxV2HiddenInput from './BpkCheckboxV2HiddenInput';
import BpkCheckboxV2Indicator from './BpkCheckboxV2Indicator';
import BpkCheckboxV2Label from './BpkCheckboxV2Label';
import BpkCheckboxV2Root from './BpkCheckboxV2Root';

// BpkCheckboxV2 is a composable namespace for building accessible checkbox UIs using the Ark UI Checkbox primitive.
// Compose Root, Control, Indicator, Label, Description, and HiddenInput sub-components to construct the desired checkbox layout.
const BpkCheckboxV2 = {
  Root: BpkCheckboxV2Root,
  Control: BpkCheckboxV2Control,
  Indicator: BpkCheckboxV2Indicator,
  Label: BpkCheckboxV2Label,
  Description: BpkCheckboxV2Description,
  HiddenInput: BpkCheckboxV2HiddenInput,
};

export default BpkCheckboxV2;
