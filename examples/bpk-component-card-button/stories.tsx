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
import BpkSaveButton from '../../packages/bpk-component-card-button/src/BpkSaveButton';

import {
  DefaultExample,
  ContainedExample,
  OnDarkExample,
  CheckedExample,
  SmallDefaultExample,
  SmallContainedExample,
  SmallOnDarkExample,
  VisualTestExample,
  SmallCheckedExample,
  AsyncWithErrorCheckedExample,
} from './examples';

export default {
  title: 'bpk-component-card-button',
  component: BpkSaveButton,
};

export const Default = DefaultExample;
export const Contained = ContainedExample;
export const OnDark = OnDarkExample;
export const Checked = CheckedExample;
export const AsyncWithErrorChecked = AsyncWithErrorCheckedExample;
export const SmallDefault = SmallDefaultExample;
export const SmallContained = SmallContainedExample;
export const SmallOnDark = SmallOnDarkExample;
export const SmallChecked = SmallCheckedExample;
export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
