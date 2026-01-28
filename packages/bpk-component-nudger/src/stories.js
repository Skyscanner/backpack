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


import BpkNudger from './BpkNudger';
import {
  DefaultExample,
  WithLabelExample,
  LowerBoundExample,
  UpperBoundsExample,
  StatefulExample,
  OnDarkExample,
  MixedExample,
} from './examples';

export default {
  title: 'bpk-component-nudger',
  component: BpkNudger,
};

export const Default = DefaultExample;

export const WithLabel = WithLabelExample;

export const LowerBounds = LowerBoundExample;

export const UpperBounds = UpperBoundsExample;

export const Stateful = StatefulExample;

export const OnDarkNudger = OnDarkExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = {
  zoomEnabled: true
};
