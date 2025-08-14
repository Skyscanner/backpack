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


import BpkBadge from '../../packages/bpk-component-tab-badge/src/BpkBadge';

import {
  SimpleExample,
  WithLongLabelExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-bubble',
  component: BpkBadge,
};

export const Default = SimpleExample;
export const LongLabel = WithLongLabelExample;

export const VisualTest = VisualTestExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  },
};
