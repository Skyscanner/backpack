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
import SEGMENT_TYPES from '../../packages/bpk-component-segmented-control/src/segmentTypes';

const TwoSegmentsDefault = () => (
  <BpkSegmentedControl
    buttonContents={['Value1', 'Value2',]}
    onItemClick={() => {}}
    selectedIndex={2}
    type = {SEGMENT_TYPES.CanvasDefault}
  />
);

const ThreeSegmentsCanvasConstrast = () => (
  <BpkSegmentedControl
    buttonContents={['Value1', 'Value2', 'Value 3']}
    onItemClick={() => {}}
    selectedIndex={2}
    type = {SEGMENT_TYPES.CanvasContrast}
  />
);

const FourSegmentsSurfaceDefault = () => (
  <BpkSegmentedControl
    buttonContents={['Value1', 'Value2', 'Value 3', 'Value4']}
    onItemClick={() => {}}
    selectedIndex={2}
    type = {SEGMENT_TYPES.SurfaceDefault}
  />
);

const FourSegmentsSurfaceContrast = () => (
  <BpkSegmentedControl
    buttonContents={['Value1', 'Value2', 'Value 3', 'Value4']}
    onItemClick={() => {}}
    selectedIndex={2}
    type = {SEGMENT_TYPES.SurfaceContrast}
  />
);

export { TwoSegmentsDefault, ThreeSegmentsCanvasConstrast, FourSegmentsSurfaceDefault, FourSegmentsSurfaceContrast };
