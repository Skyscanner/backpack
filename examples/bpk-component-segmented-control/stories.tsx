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

import BpkSegmentedControl from '../../packages/bpk-component-segmented-control';

import {
  SimpleDefault,
  SimpleCanvasContrast,
  SimpleSurfaceDefault,
  SimpleSurfaceContrast,
  ComplexSurfaceContrast,
  ComplexSurfaceDefault,
  ComplexSurfaceDefaultNoShadow,
} from './examples';

export default {
  title: 'bpk-component-segmented-control',
  component: BpkSegmentedControl,
};

export const SimpleTwoSegmentsCanvasDefault = SimpleDefault;
export const SimpleThreeSegmentsCanvasContrast = SimpleCanvasContrast;
export const SimpleFourSegmentsSurfaceDefault = SimpleSurfaceDefault;
export const SimpleFourSegmentsSurfaceContrast = SimpleSurfaceContrast;
export const ComplexThreeSegmentsSurfaceContrast = ComplexSurfaceContrast;
export const ComplexThreeSegmentsSurfaceDefault = ComplexSurfaceDefault;
export const ComplexThreeSegmentsSurfaceDefaultNoShadow =
  ComplexSurfaceDefaultNoShadow;
export const VisualTest = ComplexSurfaceDefault;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
